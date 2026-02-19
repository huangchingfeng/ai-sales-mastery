'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, languageNames } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['zh-TW'];
  languageNames: typeof languageNames;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh-TW');

  // 從 localStorage 載入語言設定
  useEffect(() => {
    const saved = localStorage.getItem('closer_language');
    if (saved && saved in translations) {
      setLanguageState(saved as Language);
    }
  }, []);

  // html lang 動態切換
  useEffect(() => {
    const langMap: Record<Language, string> = {
      'zh-TW': 'zh-Hant-TW',
      'zh-CN': 'zh-Hans-CN',
      'en': 'en',
      'ms': 'ms',
      'ja': 'ja',
      'ko': 'ko',
    };
    document.documentElement.lang = langMap[language] || 'en';
  }, [language]);

  // 多 tab 同步：監聽其他 tab 的語言變更
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'closer_language' && e.newValue && e.newValue in translations) {
        setLanguageState(e.newValue as Language);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('closer_language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        languageNames,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
