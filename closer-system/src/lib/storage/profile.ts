// 用戶資料持久化系統
// 本地：localStorage（快速存取）
// 雲端：Firestore（跨裝置同步）

import { UserProfile } from '../prompts/templates';
import { Language } from '../i18n/translations';
import {
  saveUserProfile as saveToFirestore,
  loadUserProfile as loadFromFirestore,
  hasUserProfile as checkFirestoreProfile,
} from '../firebase/firestore';

const STORAGE_KEY = 'closer_user_profile';

// 預設空白 Profile
export const emptyProfile: UserProfile = {
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

// 儲存 Profile
export function saveProfile(profile: UserProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }
}

// 載入 Profile
export function loadProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved) as UserProfile;
  } catch {
    return null;
  }
}

// 檢查是否有儲存的 Profile
export function hasProfile(): boolean {
  if (typeof window === 'undefined') return false;

  const profile = loadProfile();
  if (!profile) return false;

  // 至少要有名字和產業才算有效
  return !!(profile.name && profile.industry);
}

// 清除 Profile
export function clearProfile(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// 更新部分 Profile
export function updateProfile(updates: Partial<UserProfile>): void {
  const current = loadProfile() || emptyProfile;
  const updated = { ...current, ...updates };
  saveProfile(updated);
}

// ===== 雲端同步功能 =====

/**
 * 儲存 Profile 到雲端（Firestore）
 * 同時也儲存到 localStorage 作為快取
 */
export async function saveProfileToCloud(userId: string, profile: UserProfile): Promise<void> {
  // 先存到本地（快速）
  saveProfile(profile);

  // 再存到雲端
  await saveToFirestore(userId, profile);
}

/**
 * 從雲端載入 Profile
 * 如果雲端有資料，會同步到 localStorage
 */
export async function loadProfileFromCloud(userId: string): Promise<UserProfile | null> {
  try {
    const cloudProfile = await loadFromFirestore(userId);

    if (cloudProfile) {
      // 同步到本地
      saveProfile(cloudProfile as UserProfile);
      return cloudProfile as UserProfile;
    }

    // 雲端沒有，嘗試本地
    return loadProfile();
  } catch (error) {
    console.error('載入雲端 Profile 失敗，使用本地資料:', error);
    return loadProfile();
  }
}

/**
 * 檢查雲端是否有 Profile
 */
export async function hasProfileInCloud(userId: string): Promise<boolean> {
  try {
    return await checkFirestoreProfile(userId);
  } catch {
    return false;
  }
}

/**
 * 同步本地 Profile 到雲端
 * 用於用戶首次登入後，將既有本地資料上傳
 */
export async function syncLocalToCloud(userId: string): Promise<void> {
  const localProfile = loadProfile();
  if (localProfile) {
    await saveToFirestore(userId, localProfile);
  }
}
