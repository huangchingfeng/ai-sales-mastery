'use client';

import { useLanguage } from '@/lib/i18n/context';
import { Language } from '@/lib/i18n/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage, languageNames } = useLanguage();

  const languages: Language[] = ['zh-TW', 'zh-CN', 'en', 'ms', 'ja', 'ko'];

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-700 cursor-pointer hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
