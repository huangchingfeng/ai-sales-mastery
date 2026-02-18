import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { UserProfile } from '../prompts/templates';

// Firestore 擴展的 Profile（包含時間戳記）
export interface StoredUserProfile extends UserProfile {
  email?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Collection 路徑常數
const USERS_COLLECTION = 'users';
const PROFILES_SUBCOLLECTION = 'profiles';
const MAIN_PROFILE_DOC = 'main';

// 檢查 Firestore 是否可用
function checkDb() {
  if (!db) {
    throw new Error('Firestore 未初始化。請確認環境變數已正確設定。');
  }
  return db;
}

/**
 * 儲存用戶 Profile 到 Firestore
 * 路徑：users/{userId}/profiles/main
 *
 * @param userId - Firebase Auth 用戶 ID
 * @param profile - 要儲存的 Profile 資料
 */
export async function saveUserProfile(
  userId: string,
  profile: UserProfile
): Promise<void> {
  const firestore = checkDb();
  try {
    const profileRef = doc(firestore, USERS_COLLECTION, userId, PROFILES_SUBCOLLECTION, MAIN_PROFILE_DOC);

    // 檢查是否已存在 profile
    const existingDoc = await getDoc(profileRef);

    if (existingDoc.exists()) {
      // 更新現有 profile
      await updateDoc(profileRef, {
        ...profile,
        updatedAt: serverTimestamp(),
      });
    } else {
      // 建立新 profile
      await setDoc(profileRef, {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('儲存 Profile 失敗:', error);
    throw new Error('無法儲存用戶資料，請稍後再試');
  }
}

/**
 * 從 Firestore 讀取用戶 Profile
 * 路徑：users/{userId}/profiles/main
 *
 * @param userId - Firebase Auth 用戶 ID
 * @returns UserProfile 或 null（如果不存在）
 */
export async function loadUserProfile(userId: string): Promise<StoredUserProfile | null> {
  const firestore = checkDb();
  try {
    const profileRef = doc(firestore, USERS_COLLECTION, userId, PROFILES_SUBCOLLECTION, MAIN_PROFILE_DOC);
    const docSnap = await getDoc(profileRef);

    if (docSnap.exists()) {
      return docSnap.data() as StoredUserProfile;
    }

    return null;
  } catch (error) {
    console.error('讀取 Profile 失敗:', error);
    throw new Error('無法讀取用戶資料，請稍後再試');
  }
}

/**
 * 更新用戶 Profile 的部分欄位
 *
 * @param userId - Firebase Auth 用戶 ID
 * @param updates - 要更新的欄位
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> {
  const firestore = checkDb();
  try {
    const profileRef = doc(firestore, USERS_COLLECTION, userId, PROFILES_SUBCOLLECTION, MAIN_PROFILE_DOC);

    await updateDoc(profileRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('更新 Profile 失敗:', error);
    throw new Error('無法更新用戶資料，請稍後再試');
  }
}

/**
 * 檢查用戶是否已建立 Profile
 *
 * @param userId - Firebase Auth 用戶 ID
 * @returns boolean
 */
export async function hasUserProfile(userId: string): Promise<boolean> {
  if (!db) return false;  // Build 時直接回傳 false
  try {
    const profileRef = doc(db, USERS_COLLECTION, userId, PROFILES_SUBCOLLECTION, MAIN_PROFILE_DOC);
    const docSnap = await getDoc(profileRef);
    return docSnap.exists();
  } catch (error) {
    console.error('檢查 Profile 失敗:', error);
    return false;
  }
}
