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

// Admin 相關函數
export {
  checkIsAdmin,
  getUserData,
  setUserData,
  generateInviteCode,
  validateInviteCode,
  getInviteCodeByCode,
  markInviteCodeUsed,
  getAllInviteCodes,
  deleteInviteCode,
  isAdminEmail,
  initializeUserData,
  type UserRole,
  type UserData,
  type InviteCode,
} from './admin';

// 課程相關函數
export {
  createCourse,
  getAllCourses,
  getCourseById,
  getCourseByName,
  updateCourseStudentCount,
  getOrCreateCourse,
  type Course,
} from './courses';

// 註冊碼相關函數（從 inviteCodes.ts）
export {
  createInviteCode,
  getInviteCodesByCourse,
  getInviteCodeByEmailAndCourse,
  isAdmin,
} from './inviteCodes';
