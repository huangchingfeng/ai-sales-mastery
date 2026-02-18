# CLOSER 學習系統 - 部署說明

本文件說明 CLOSER 學習系統的部署流程，包含本地開發、建置與部署到 GitHub Pages 的完整步驟。

---

## 1. 專案架構

### 技術棧

| 項目 | 技術 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS 4 |
| 後端服務 | Firebase (Authentication + Firestore) |
| 部署模式 | 靜態匯出 (Static Export) |

### 專案結構

```
closer-system/
├── src/
│   ├── app/              # Next.js App Router 頁面
│   ├── components/       # React 元件
│   └── lib/
│       ├── firebase/     # Firebase 設定與服務
│       ├── i18n/         # 多語系翻譯
│       ├── prompts/      # AI 指令範本
│       └── storage/      # 本地儲存邏輯
├── public/               # 靜態資源
├── docs/                 # 文件
├── next.config.ts        # Next.js 設定
├── package.json          # 專案設定
└── .env.local           # 環境變數（不進版控）
```

### Next.js 設定

專案使用靜態匯出模式，並設定 `basePath` 以配合 GitHub Pages 的子目錄部署：

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',           // 靜態匯出模式
  images: {
    unoptimized: true,        // 靜態匯出不支援 Next.js 圖片最佳化
  },
  basePath: '/ai-sales-mastery/closer-system',  // GitHub Pages 子目錄
};
```

---

## 2. 環境變數設定

### 環境變數清單

在 `.env.local` 檔案中設定以下 Firebase 環境變數：

| 變數名稱 | 說明 | 範例值 |
|---------|------|--------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API 金鑰 | `AIzaSy...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase 認證網域 | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase 專案 ID | `your-project-id` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase 儲存空間 | `your-project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase 訊息傳送者 ID | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase 應用程式 ID | `1:123456789:web:abc123` |

### 建立環境變數檔案

```bash
# 複製範本檔案
cp .env.local.example .env.local

# 編輯並填入實際的 Firebase 設定值
```

> **重要提示**：
> - `.env.local` 檔案不應加入版本控制（已在 `.gitignore` 中排除）
> - 所有環境變數都以 `NEXT_PUBLIC_` 開頭，表示會暴露在前端程式碼中
> - 這些是 Firebase 的公開設定，安全性由 Firebase 安全規則保護

---

## 3. 本地開發

### 安裝依賴套件

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

### 訪問開發網站

開發伺服器啟動後，在瀏覽器開啟：

```
http://localhost:3000/ai-sales-mastery/closer-system
```

> **注意**：由於設定了 `basePath`，必須包含完整路徑才能正常訪問。

### 開發模式特點

- 支援熱重載 (Hot Reload)
- 錯誤訊息會顯示在瀏覽器
- Firebase 連接到實際的專案（使用 `.env.local` 的設定）

---

## 4. 建置與部署

### 建置靜態網站

```bash
npm run build
```

建置完成後，會在專案根目錄產生 `out/` 資料夾，包含所有靜態檔案。

### 驗證建置結果

```bash
# 檢視建置產出
ls -la out/

# 使用本地伺服器測試
npx serve out
```

### 部署到 GitHub Pages

#### 方法一：手動部署

1. **建置專案**
   ```bash
   npm run build
   ```

2. **複製 `out/` 資料夾內容到 GitHub Pages 分支**
   ```bash
   # 假設 GitHub Pages 使用 gh-pages 分支
   git checkout gh-pages

   # 清空現有內容（保留 .git）
   rm -rf ai-sales-mastery/closer-system/*

   # 複製新建置的檔案
   cp -r out/* ai-sales-mastery/closer-system/

   # 提交並推送
   git add .
   git commit -m "Deploy CLOSER system"
   git push origin gh-pages
   ```

3. **確認部署**

   訪問：`https://[username].github.io/ai-sales-mastery/closer-system`

#### 方法二：使用 GitHub Actions 自動部署

在 `.github/workflows/deploy.yml` 建立自動部署流程：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          destination_dir: ai-sales-mastery/closer-system
```

> **注意**：使用 GitHub Actions 時，需要在 Repository Settings > Secrets 中設定 Firebase 環境變數。

### 靜態匯出限制

由於使用 `output: 'export'` 靜態匯出模式，以下功能無法使用：

| 功能 | 限制說明 | 替代方案 |
|-----|---------|---------|
| API Routes | 不支援 `/api/*` 路由 | 使用 Firebase Functions |
| Server Components | 需在建置時預渲染 | 使用 Client Components |
| 圖片最佳化 | `next/image` 需設定 `unoptimized: true` | 已在設定中處理 |
| 動態路由 | 需使用 `generateStaticParams` | 已處理 |
| Middleware | 不支援 | 使用 Firebase Security Rules |

---

## 5. Firebase 設定

### 步驟 1：建立 Firebase 專案

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 點擊「新增專案」
3. 輸入專案名稱（例如：`closer-learning-system`）
4. 選擇是否啟用 Google Analytics（建議啟用）
5. 完成專案建立

### 步驟 2：啟用 Authentication

1. 在左側選單點擊「Authentication」
2. 點擊「開始使用」
3. 選擇「Sign-in method」標籤
4. 點擊「電子郵件/密碼」
5. 啟用「電子郵件/密碼」選項
6. 儲存設定

### 步驟 3：建立 Firestore 資料庫

1. 在左側選單點擊「Firestore Database」
2. 點擊「建立資料庫」
3. 選擇「在生產模式中啟動」
4. 選擇資料庫位置：
   - **asia-east1**（台灣）- 推薦
   - **asia-southeast1**（新加坡）
5. 完成建立

### 步驟 4：設定安全規則

在 Firestore > 規則，貼上以下內容：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用戶只能讀寫自己的資料
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

點擊「發布」儲存規則。

### 步驟 5：取得 Web 應用程式設定

1. 點擊左上角的齒輪圖示 > 「專案設定」
2. 滾動到「您的應用程式」區塊
3. 點擊「新增應用程式」
4. 選擇 Web 平台（`</>`圖示）
5. 輸入應用程式暱稱（例如：`closer-web`）
6. 不需勾選「Firebase Hosting」
7. 點擊「註冊應用程式」
8. 複製 `firebaseConfig` 中的值到 `.env.local`

### 步驟 6：設定已授權網域

1. Authentication > Settings > Authorized domains
2. 新增您的 GitHub Pages 網域：
   - `[username].github.io`
3. 新增本地開發網域（通常已存在）：
   - `localhost`

---

## 6. 常見問題

### 404 錯誤 (頁面找不到)

**問題描述**：部署後訪問頁面出現 404 錯誤。

**可能原因與解決方案**：

1. **basePath 問題**
   - 確認訪問 URL 包含完整的 basePath
   - 正確：`https://[username].github.io/ai-sales-mastery/closer-system`
   - 錯誤：`https://[username].github.io/closer-system`

2. **部署路徑錯誤**
   - 確認 `out/` 內容部署到正確的目錄
   - GitHub Pages 根目錄應包含 `ai-sales-mastery/closer-system/` 結構

3. **靜態檔案未正確產生**
   - 重新執行 `npm run build`
   - 檢查 `out/` 資料夾是否包含 `index.html`

### Firebase 初始化錯誤

**問題描述**：Console 顯示 Firebase 初始化失敗或 `auth is null`。

**可能原因與解決方案**：

1. **環境變數未設定**
   - 確認 `.env.local` 檔案存在
   - 確認所有 Firebase 環境變數都有填入值

2. **API Key 錯誤**
   - 從 Firebase Console 重新複製設定值
   - 確認沒有多餘的空格或引號

3. **網域未授權**
   - 在 Firebase Console > Authentication > Authorized domains 新增網域

### Build 時的環境變數問題

**問題描述**：本地開發正常，但 build 後 Firebase 功能無法使用。

**可能原因與解決方案**：

1. **環境變數未傳遞到 build 過程**
   - 確認使用 GitHub Actions 時有設定 Secrets
   - 本地 build 時確認 `.env.local` 存在

2. **Next.js 環境變數前綴**
   - 確認所有環境變數都以 `NEXT_PUBLIC_` 開頭
   - 沒有這個前綴的變數不會被打包到前端程式碼

### 登入功能無法使用

**問題描述**：點擊登入沒有反應或顯示錯誤。

**可能原因與解決方案**：

1. **Authentication 未啟用**
   - 確認 Firebase Console 中已啟用「電子郵件/密碼」登入方式

2. **瀏覽器快取問題**
   - 清除瀏覽器快取後重試
   - 使用無痕模式測試

3. **Firebase SDK 版本問題**
   - 執行 `npm update firebase` 更新到最新版本

### 資料無法儲存

**問題描述**：用戶資料無法寫入 Firestore。

**可能原因與解決方案**：

1. **安全規則問題**
   - 確認 Firestore 安全規則已正確設定
   - 檢查用戶是否已登入（`request.auth != null`）

2. **資料結構問題**
   - 確認寫入的資料符合規則中定義的路徑結構

---

## 7. 維護指南

### 更新依賴套件

```bash
# 檢視可更新的套件
npm outdated

# 更新所有套件
npm update

# 更新特定套件
npm update next firebase
```

### 監控 Firebase 使用量

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇專案
3. 點擊「使用量與計費」
4. 監控：
   - Authentication：每月活躍用戶數
   - Firestore：讀取/寫入/刪除次數
   - Storage：儲存空間使用量

### 備份資料

```bash
# 使用 Firebase CLI 匯出 Firestore 資料
firebase firestore:export gs://[bucket-name]/backups/$(date +%Y%m%d)
```

---

## 8. 相關連結

- [Next.js 文件](https://nextjs.org/docs)
- [Firebase 文件](https://firebase.google.com/docs)
- [GitHub Pages 文件](https://docs.github.com/en/pages)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)

---

*最後更新：2026-02-18*
