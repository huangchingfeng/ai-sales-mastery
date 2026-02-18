// Firebase 設定與服務實例
export { auth, db } from './config';
export { default as app } from './config';

// Auth 相關函數
export {
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  onAuthStateChange,
  getCurrentUser,
  type AuthStateCallback,
  type AuthError,
} from './auth';

// Firestore 相關函數
export {
  saveUserProfile,
  loadUserProfile,
  updateUserProfile,
  hasUserProfile,
  type StoredUserProfile,
} from './firestore';
