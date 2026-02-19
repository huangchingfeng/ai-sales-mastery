'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateGems, UserProfile, GeneratedGem, GemType } from '@/lib/prompts/templates';
import { loadProfile, saveProfile, saveProfileToCloud, loadProfileFromCloud } from '@/lib/storage/profile';
import { useLanguage } from '@/lib/i18n/context';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Gem 類型對應的圖示和顏色
const gemStyles: Record<GemType, { icon: string; bgColor: string; textColor: string }> = {
  content: { icon: '✍️', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  presentation: { icon: '📊', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  qa: { icon: '💬', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  sales: { icon: '🎯', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
  email: { icon: '📧', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
};

export default function ResultPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [gems, setGems] = useState<GeneratedGem[] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [noProfile, setNoProfile] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      // 等待 auth 狀態確認
      if (authLoading) return;

      // 檢查登入狀態（用 useAuth 的 user）
      if (!user) {
        router.push('/');
        return;
      }

      // 從雲端或本地讀取用戶資料
      let savedProfile: UserProfile | null = null;
      if (user) {
        savedProfile = await loadProfileFromCloud(user.uid);
      } else {
        savedProfile = loadProfile();
      }

      if (!savedProfile) {
        setNoProfile(true);
        return;
      }

      setProfile(savedProfile);

      // 產生 Gems
      const generatedGems = generateGems(savedProfile);
      setGems(generatedGems);
    };

    loadData();
  }, [router, user, authLoading]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSave = async () => {
    if (profile) {
      if (user) {
        await saveProfileToCloud(user.uid, profile);
      } else {
        saveProfile(profile);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  // 取得 Gem 類型的翻譯名稱
  const getGemTypeLabel = (type: GemType) => {
    const labels = t.results.tabs;
    return labels[type as keyof typeof labels] || type;
  };

  // 沒有 profile 資料時顯示提示並導回
  if (noProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {t.results?.noProfileTitle || '尚未填寫資料'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {t.results?.noProfileDescription || '請先完成「內容分身術」的資料填寫，才能產生專屬 Gem。'}
          </p>
          <button
            onClick={() => router.push('/content-clone')}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.results?.goToContentClone || '前往填寫資料'}
          </button>
        </div>
      </div>
    );
  }

  if (!gems || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div role="status" aria-label="Loading" className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
                aria-label={t.sidebar.dashboard}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.results.title}</h1>
                <p className="text-sm text-gray-500">Hi {profile.name}，{t.results.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => router.push('/content-clone')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {t.results.editProfile}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Experience Level Badge */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {profile.yearsExperience} | {profile.industry} | {profile.jobTitle}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{t.results.promptLevel}：</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                {profile.yearsExperience.includes('10') ? t.results.levelFramework.expert :
                 profile.yearsExperience.includes('5-10') ? t.results.levelFramework.advanced :
                 profile.yearsExperience.includes('3-5') ? t.results.levelFramework.intermediate : t.results.levelFramework.beginner}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gems Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {gems.map((gem) => {
            const style = gemStyles[gem.type];
            return (
              <div key={gem.id} className="card">
                {/* Gem Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{style.icon}</span>
                      <div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${style.bgColor} ${style.textColor}`}>
                          {getGemTypeLabel(gem.type)}
                        </span>
                      </div>
                    </div>

                    {/* Gem Name */}
                    <h3 className="text-lg font-bold text-gray-900 mt-2">{gem.gemName}</h3>

                    {/* Gem Description */}
                    <p className="text-sm text-gray-600 mt-1">{gem.gemDescription}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleExpand(gem.id)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      {expandedId === gem.id ? t.results.collapse : t.results.expand}
                    </button>
                    <button
                      onClick={() => copyToClipboard(gem.systemPrompt, gem.id)}
                      aria-label={t.results.copyGemPrompt}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        copiedId === gem.id
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {copiedId === gem.id ? t.common.copied : t.results.copyGemPrompt}
                    </button>
                  </div>
                </div>

                {/* Example Prompts */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {t.results.examplePrompts}
                  </h4>
                  <div className="space-y-2">
                    {gem.examplePrompts.map((example, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
                      >
                        <span className="text-blue-500">💡</span>
                        <span>「{example}」</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expanded Content - System Prompt */}
                {expandedId === gem.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {t.results?.systemPromptTitle || 'Gem 系統提示詞'}
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                        {gem.systemPrompt}
                      </pre>
                    </div>
                    <div className="mt-3 flex items-start space-x-2">
                      <span className="text-xs text-gray-400">📝</span>
                      <p className="text-xs text-gray-500">{t.results.howToSetup}: {gem.howToUse}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-blue-900 mb-3">
            {t.results.howToUse}
          </h3>
          <ol className="space-y-2 text-sm text-blue-800">
            {t.results.steps.map((step, index) => (
              <li key={index}>{index + 1}. {step}</li>
            ))}
          </ol>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => router.push('/content-clone')}
            className="btn-secondary"
          >
            {t.results.editProfile}
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {saved ? t.common.saved : t.common.save}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>{t.footer.text}</p>
          <p className="mt-1">{t.footer.email}</p>
        </div>
      </footer>
    </div>
  );
}
