import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  UserCredential,
  Unsubscribe,
} from 'firebase/auth';
import { auth } from './config';

// 檢查 auth 是否可用
function checkAuth() {
  if (!auth) {
    throw new Error('Firebase Auth 未初始化。請確認環境變數已正確設定。');
  }
  return auth;
}

// 回調函數類型
export type AuthStateCallback = (user: User | null) => void;

// 錯誤類型
export interface AuthError {
  code: string;
  message: string;
}

/**
 * 使用 Email/Password 註冊新用戶
 * @param email - 用戶電子郵件
 * @param password - 密碼（至少 6 個字元）
 * @param name - 用戶顯示名稱
 * @returns UserCredential 或拋出錯誤
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<UserCredential> {
  const firebaseAuth = checkAuth();
  try {
    // 建立帳號
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    // 更新顯示名稱
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    }

    return userCredential;
  } catch (error) {
    const authError = error as AuthError;
    // 轉換常見錯誤訊息為中文
    throw new Error(getAuthErrorMessage(authError.code));
  }
}

/**
 * 使用 Email/Password 登入
 * @param email - 用戶電子郵件
 * @param password - 密碼
 * @returns UserCredential 或拋出錯誤
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  const firebaseAuth = checkAuth();
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(getAuthErrorMessage(authError.code));
  }
}

/**
 * 登出當前用戶
 */
export async function signOutUser(): Promise<void> {
  const firebaseAuth = checkAuth();
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(getAuthErrorMessage(authError.code));
  }
}

/**
 * 監聽用戶登入狀態變化
 * @param callback - 當狀態變化時呼叫的函數
 * @returns 取消訂閱函數
 */
export function onAuthStateChange(callback: AuthStateCallback): Unsubscribe {
  // 如果 auth 未初始化（build 時），回傳 noop 函數
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * 取得當前登入用戶
 * @returns 當前用戶或 null
 */
export function getCurrentUser(): User | null {
  if (!auth) return null;
  return auth.currentUser;
}

/**
 * 將 Firebase Auth 錯誤碼轉換為中文訊息
 */
function getAuthErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': '此電子郵件已被註冊',
    'auth/invalid-email': '電子郵件格式不正確',
    'auth/operation-not-allowed': '此登入方式未啟用',
    'auth/weak-password': '密碼強度不足，請使用至少 6 個字元',
    'auth/user-disabled': '此帳號已被停用',
    'auth/user-not-found': '找不到此帳號',
    'auth/wrong-password': '密碼錯誤',
    'auth/invalid-credential': '帳號或密碼錯誤',
    'auth/too-many-requests': '登入嘗試次數過多，請稍後再試',
    'auth/network-request-failed': '網路連線失敗，請檢查網路',
  };

  return errorMessages[code] || `登入失敗：${code}`;
}
