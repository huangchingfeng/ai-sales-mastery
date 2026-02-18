'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { UserProfile } from '@/lib/prompts/templates';
import { emptyProfile, loadProfileFromCloud, saveProfileToCloud, loadProfile, saveProfile } from '@/lib/storage/profile';

interface ProfileContextType {
  profile: UserProfile;
  profileLoading: boolean;
  updateProfile: (newProfile: UserProfile) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [profileLoading, setProfileLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  // 載入 Profile
  const loadUserProfile = useCallback(async () => {
    if (authLoading) return;

    setProfileLoading(true);
    try {
      let savedProfile: UserProfile | null = null;

      if (user) {
        // 已登入：從雲端載入
        savedProfile = await loadProfileFromCloud(user.uid);
      } else {
        // 未登入：從本地載入
        savedProfile = loadProfile();
      }

      if (savedProfile) {
        setProfile(savedProfile);
      } else {
        setProfile(emptyProfile);
      }
    } catch (error) {
      console.error('載入 Profile 失敗:', error);
      // 發生錯誤時嘗試從本地載入
      const localProfile = loadProfile();
      if (localProfile) {
        setProfile(localProfile);
      }
    } finally {
      setProfileLoading(false);
    }
  }, [user, authLoading]);

  // 當用戶狀態變化時載入 Profile
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  // 更新 Profile
  const updateProfile = useCallback(async (newProfile: UserProfile) => {
    setProfile(newProfile);

    try {
      if (user) {
        // 已登入：儲存到雲端（同時也會存到本地）
        await saveProfileToCloud(user.uid, newProfile);
      } else {
        // 未登入：只存到本地
        saveProfile(newProfile);
      }
    } catch (error) {
      console.error('儲存 Profile 失敗:', error);
      // 即使雲端失敗，也確保本地有儲存
      saveProfile(newProfile);
      throw error;
    }
  }, [user]);

  // 重新載入 Profile
  const refreshProfile = useCallback(async () => {
    await loadUserProfile();
  }, [loadUserProfile]);

  return (
    <ProfileContext.Provider value={{ profile, profileLoading, updateProfile, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
