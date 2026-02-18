# CLOSER 學習系統 - Firebase API 說明文件

本文件說明 CLOSER 學習系統使用的 Firebase 服務 API，包含認證（Auth）、資料庫（Firestore）、以及本地儲存（Storage）的完整介面說明。

---

## 目錄

1. [Firebase Auth API](#firebase-auth-api)
2. [Firestore API](#firestore-api)
3. [資料結構](#資料結構)
4. [Storage API（本地儲存）](#storage-api本地儲存)
5. [AuthContext（React Context）](#authcontextreact-context)

---

## Firebase Auth API

檔案位置：`src/lib/firebase/auth.ts`

### signUpWithEmail

使用 Email/Password 註冊新用戶。

```typescript
async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<UserCredential>
```

**參數說明：**
| 參數 | 類型 | 說明 |
|------|------|------|
| email | string | 用戶電子郵件 |
| password | string | 密碼（至少 6 個字元） |
| name | string | 用戶顯示名稱 |

**回傳值：**
- `UserCredential` - Firebase 用戶憑證物件

**使用範例：**
```typescript
import { signUpWithEmail } from '@/lib/firebase/auth';

try {
  const userCredential = await signUpWithEmail(
    'user@example.com',
    'password123',
    '王小明'
  );
  console.log('註冊成功:', userCredential.user.uid);
} catch (error) {
  console.error('註冊失敗:', error.message);
}
```

---

### signInWithEmail

使用 Email/Password 登入。

```typescript
async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential>
```

**參數說明：**
| 參數 | 類型 | 說明 |
|------|------|------|
| email | string | 用戶電子郵件 |
| password | string | 密碼 |

**回傳值：**
- `UserCredential` - Firebase 用戶憑證物件

**使用範例：**
```typescript
import { signInWithEmail } from '@/lib/firebase/auth';

try {
  const userCredential = await signInWithEmail(
    'user@example.com',
    'password123'
  );
  console.log('登入成功:', userCredential.user.displayName);
} catch (error) {
  console.error('登入失敗:', error.message);
}
```

---

### signOutUser

登出當前用戶。

```typescript
async function signOutUser(): Promise<void>
```

**使用範例：**
```typescript
import { signOutUser } from '@/lib/firebase/auth';

try {
  await signOutUser();
  console.log('登出成功');
} catch (error) {
  console.error('登出失敗:', error.message);
}
```

---

### onAuthStateChange

監聽用戶登入狀態變化。

```typescript
function onAuthStateChange(callback: AuthStateCallback): Unsubscribe
```

**參數說明：**
| 參數 | 類型 | 說明 |
|------|------|------|
| callback | `(user: User \| null) => void` | 狀態變化時呼叫的函數 |

**回傳值：**
- `Unsubscribe` - 取消訂閱函數

**使用範例：**
```typescript
import { onAuthStateChange } from '@/lib/firebase/auth';

// 開始監聽
const unsubscribe = onAuthStateChange((user) => {
  if (user) {
    console.log('用戶已登入:', user.email);
  } else {
    console.log('用戶已登出');
  }
});

// 停止監聽（例如在組件卸載時）
unsubscribe();
```

---

### getCurrentUser

取得當前登入用戶。

```typescript
function getCurrentUser(): User | null
```

**回傳值：**
- `User | null` - 當前用戶物件，若未登入則為 null

**使用範例：**
```typescript
import { getCurrentUser } from '@/lib/firebase/auth';

const user = getCurrentUser();
if (user) {
  console.log('當前用戶:', user.email);
} else {
  console.log('尚未登入');
}
```

---

### 錯誤處理

Firebase Auth 的錯誤碼會自動轉換為中文訊息：

| 錯誤碼 | 中文訊息 |
|--------|----------|
| `auth/email-already-in-use` | 此電子郵件已被註冊 |
| `auth/invalid-email` | 電子郵件格式不正確 |
| `auth/operation-not-allowed` | 此登入方式未啟用 |
| `auth/weak-password` | 密碼強度不足，請使用至少 6 個字元 |
| `auth/user-disabled` | 此帳號已被停用 |
| `auth/user-not-found` | 找不到此帳號 |
| `auth/wrong-password` | 密碼錯誤 |
| `auth/invalid-credential` | 帳號或密碼錯誤 |
| `auth/too-many-requests` | 登入嘗試次數過多，請稍後再試 |
| `auth/network-request-failed` | 網路連線失敗，請檢查網路 |

**錯誤處理範例：**
```typescript
try {
  await signInWithEmail(email, password);
} catch (error) {
  // error.message 已經是中文訊息
  alert(error.message);
}
```

---

## Firestore API

檔案位置：`src/lib/firebase/firestore.ts`

### 資料路徑

```
users/{userId}/profiles/main
```

所有用戶資料都儲存在此路徑下。

---

### saveUserProfile

儲存用戶 Profile 到 Firestore。如果資料已存在則更新，否則建立新資料。

```typescript
async function saveUserProfile(
  userId: string,
  profile: UserProfile
): Promise<void>
```

**參數說明：**
| 參數 | 類型 | 說明 |
|------|------|------|
| userId | string | Firebase Auth 用戶 ID |
| profile | UserProfile | 要儲存的 Profile 資料 |

**使用範例：**
```typescript
import { saveUserProfile } from '@/lib/firebase/firestore';

const profile = {
  name: '王小明',
  industry: '保險業',
  jobTitle: '業務經理',
  // ... 其他欄位
};

try {
  await saveUserProfile(user.uid, profile);
  console.log('儲存成功');
} catch (error) {
  console.error('儲存失敗:', error.message);
}
```

---

### loadUserProfile

從 Firestore 讀取用戶 Profile。

```typescript
async function loadUserProfile(
  userId: string
): Promise<StoredUserProfile | null>
```

**參數說明：**
| 參數 | 類型 | 說明 |
|------|------|------|
| userId | string | Firebase Auth 用戶 ID |

**回傳值：**
- `StoredUserProfile | null` - 用戶資料，若不存在則為 null

**使用範例：**
```typescript
import { loadUserProfile } from '@/lib/firebase/firestore';

const profile = await loadUserProfile(user.uid);
if (profile) {
  console.log('用戶名稱:', profile.name);
  console.log('建立時間:', profile.createdAt?.toDate());
} else {
  console.log('尚未建立 Profile');
}
```

---

### updateUserProfile

更新用戶 Profile 的部分欄位。

```typescript
async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<void>
```

**參數說明：**
| 參數 | 類型 | 說明 |
|------|------|------|
| userId | string | Firebase Auth 用戶 ID |
| updates | Partial<UserProfile> | 要更新的欄位 |

**使用範例：**
```typescript
import { updateUserProfile } from '@/lib/firebase/firestore';

// 只更新特定欄位
await updateUserProfile(user.uid, {
  jobTitle: '資深業務經理',
  yearsExperience: '5-10年',
});
```

---

### hasUserProfile

檢查用戶是否已建立 Profile。

```typescript
async function hasUserProfile(userId: string): Promise<boolean>
```

**參數說明：**
| 參數 | 類型 | 說明 |
|------|------|------|
| userId | string | Firebase Auth 用戶 ID |

**回傳值：**
- `boolean` - 是否已有 Profile

**使用範例：**
```typescript
import { hasUserProfile } from '@/lib/firebase/firestore';

const hasProfile = await hasUserProfile(user.uid);
if (hasProfile) {
  // 導向主頁
} else {
  // 導向資料填寫頁
}
```

---

## 資料結構

### UserProfile 介面

用戶基本資料結構，用於前端操作。

```typescript
interface UserProfile {
  // 基本資訊
  name: string;              // 姓名
  industry: string;          // 產業
  jobTitle: string;          // 職稱
  yearsExperience: string;   // 年資（如 "1-3年"、"5-10年"）

  // 產品/服務
  productService: string;    // 主要產品或服務
  productAdvantage: string;  // 核心優勢
  priceRange: string;        // 價格區間

  // 目標客群
  idealCustomer: string;     // 理想客戶描述
  painPoints: string[];      // 客戶常見痛點（陣列）
  commonQuestions: string[]; // 客戶常問問題（陣列，通常 3 個）

  // 風格設定
  toneStyle: string;         // 語氣風格（如「專業但親切」）
  catchphrases: string;      // 常用語/口頭禪
  avoidWords: string;        // 禁用詞彙
  sampleWriting: string;     // 文字風格範例

  // 內容偏好
  platforms: string[];       // 發布平台（FB/IG/LinkedIn 等）
  contentLength: string;     // 偏好內容長度
  cta: string;               // 行動呼籲

  // 語言設定
  language?: Language;       // 'zh-TW' | 'zh-CN' | 'en' | 'ms' | 'ja' | 'ko'
}
```

---

### StoredUserProfile 介面

儲存在 Firestore 的擴展資料結構，包含時間戳記。

```typescript
interface StoredUserProfile extends UserProfile {
  email?: string;            // 用戶 Email
  createdAt?: Timestamp;     // 建立時間（Firebase Timestamp）
  updatedAt?: Timestamp;     // 更新時間（Firebase Timestamp）
}
```

**時間戳記使用範例：**
```typescript
const profile = await loadUserProfile(userId);
if (profile?.createdAt) {
  // 轉換為 JavaScript Date
  const createdDate = profile.createdAt.toDate();
  console.log('建立於:', createdDate.toLocaleDateString('zh-TW'));
}
```

---

### Firestore 路徑結構

```
firestore-root/
└── users/                           # Collection
    └── {userId}/                    # Document (用戶 ID)
        └── profiles/                # Subcollection
            └── main                 # Document (主要 Profile)
                ├── name
                ├── industry
                ├── jobTitle
                ├── yearsExperience
                ├── productService
                ├── productAdvantage
                ├── priceRange
                ├── idealCustomer
                ├── painPoints[]
                ├── commonQuestions[]
                ├── toneStyle
                ├── catchphrases
                ├── avoidWords
                ├── sampleWriting
                ├── platforms[]
                ├── contentLength
                ├── cta
                ├── language
                ├── email
                ├── createdAt
                └── updatedAt
```

---

## Storage API（本地儲存）

檔案位置：`src/lib/storage/profile.ts`

本地儲存使用 `localStorage`，提供快速存取和離線支援。

### 常數

```typescript
const STORAGE_KEY = 'closer_user_profile';
```

---

### saveProfile

將 Profile 存到 localStorage。

```typescript
function saveProfile(profile: UserProfile): void
```

**使用範例：**
```typescript
import { saveProfile } from '@/lib/storage/profile';

saveProfile({
  name: '王小明',
  industry: '保險業',
  // ...
});
```

---

### loadProfile

從 localStorage 讀取 Profile。

```typescript
function loadProfile(): UserProfile | null
```

**回傳值：**
- `UserProfile | null` - 本地儲存的資料，若不存在則為 null

**使用範例：**
```typescript
import { loadProfile } from '@/lib/storage/profile';

const profile = loadProfile();
if (profile) {
  console.log('本地有資料:', profile.name);
}
```

---

### hasProfile

檢查是否有有效的儲存 Profile。

```typescript
function hasProfile(): boolean
```

**驗證邏輯：**
- 必須有 `name` 和 `industry` 欄位才算有效

---

### clearProfile

清除本地儲存的 Profile。

```typescript
function clearProfile(): void
```

---

### updateProfile

更新部分 Profile 欄位。

```typescript
function updateProfile(updates: Partial<UserProfile>): void
```

**使用範例：**
```typescript
import { updateProfile } from '@/lib/storage/profile';

updateProfile({
  jobTitle: '資深經理',
});
```

---

### saveProfileToCloud

儲存 Profile 到雲端（同時也儲存到 localStorage 作為快取）。

```typescript
async function saveProfileToCloud(
  userId: string,
  profile: UserProfile
): Promise<void>
```

**使用範例：**
```typescript
import { saveProfileToCloud } from '@/lib/storage/profile';

await saveProfileToCloud(user.uid, profile);
// 會同時存到 localStorage 和 Firestore
```

---

### loadProfileFromCloud

從雲端載入 Profile（如果雲端有資料，會同步到 localStorage）。

```typescript
async function loadProfileFromCloud(
  userId: string
): Promise<UserProfile | null>
```

**載入邏輯：**
1. 嘗試從 Firestore 載入
2. 如果成功，同步到 localStorage
3. 如果失敗，回傳 localStorage 的資料

**使用範例：**
```typescript
import { loadProfileFromCloud } from '@/lib/storage/profile';

const profile = await loadProfileFromCloud(user.uid);
// 優先使用雲端資料，失敗時使用本地快取
```

---

### hasProfileInCloud

檢查雲端是否有 Profile。

```typescript
async function hasProfileInCloud(userId: string): Promise<boolean>
```

---

### syncLocalToCloud

將本地 Profile 同步到雲端。用於用戶首次登入後，將既有本地資料上傳。

```typescript
async function syncLocalToCloud(userId: string): Promise<void>
```

**使用範例：**
```typescript
import { syncLocalToCloud } from '@/lib/storage/profile';

// 用戶登入後，檢查是否需要同步
const hasCloud = await hasProfileInCloud(user.uid);
if (!hasCloud && hasProfile()) {
  await syncLocalToCloud(user.uid);
}
```

---

### emptyProfile

預設空白 Profile 物件。

```typescript
const emptyProfile: UserProfile = {
  name: '',
  industry: '',
  jobTitle: '',
  yearsExperience: '',
  productService: '',
  productAdvantage: '',
  priceRange: '',
  idealCustomer: '',
  painPoints: [],
  commonQuestions: ['', '', ''],
  toneStyle: '',
  catchphrases: '',
  avoidWords: '',
  sampleWriting: '',
  platforms: [],
  contentLength: '',
  cta: '',
  language: 'zh-TW',
};
```

---

## AuthContext（React Context）

檔案位置：`src/contexts/AuthContext.tsx`

提供全域認證狀態管理的 React Context。

### AuthProvider

包裹應用程式的認證提供者元件。

```tsx
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

---

### useAuth Hook

取得認證狀態和方法的 Hook。

```typescript
interface AuthContextType {
  user: User | null;           // 當前用戶
  loading: boolean;            // 是否正在載入
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

function useAuth(): AuthContextType
```

**使用範例：**

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth();

  // 載入中狀態
  if (loading) {
    return <div>載入中...</div>;
  }

  // 未登入狀態
  if (!user) {
    return (
      <button onClick={() => signIn('user@example.com', 'password')}>
        登入
      </button>
    );
  }

  // 已登入狀態
  return (
    <div>
      <p>歡迎, {user.displayName}</p>
      <button onClick={signOut}>登出</button>
    </div>
  );
}
```

---

### 完整登入流程範例

```tsx
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      // 成功後會自動更新 user 狀態
    } catch (err) {
      setError(err.message); // 已經是中文訊息
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isSignUp && (
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="電子郵件"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">
        {isSignUp ? '註冊' : '登入'}
      </button>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? '已有帳號？登入' : '沒有帳號？註冊'}
      </button>
    </form>
  );
}
```

---

## 環境變數設定

在 `.env.local` 中設定 Firebase 專案資訊：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

---

## 注意事項

### Build 時的處理

Firebase 服務在沒有環境變數時不會初始化，以支援靜態建置：

```typescript
// auth.ts
if (!auth) {
  callback(null);
  return () => {};
}

// firestore.ts
if (!db) return false;
```

### Server-Side Rendering (SSR)

本地儲存 API 會檢查 `window` 物件：

```typescript
if (typeof window === 'undefined') return null;
```

### 錯誤處理最佳實踐

```typescript
try {
  await saveProfileToCloud(userId, profile);
} catch (error) {
  // 雲端儲存失敗時，資料仍會保存在本地
  console.error('雲端同步失敗:', error);
  // 可以顯示提示，但不影響使用者體驗
}
```

---

## 版本資訊

- 文件版本：1.0.0
- 最後更新：2026-02-18
- 適用專案：CLOSER 學習系統
