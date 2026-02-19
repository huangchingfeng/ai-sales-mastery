'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { validateInviteCode, markInviteCodeAsUsed } from '@/lib/firebase/inviteCodes';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const { user, loading: authLoading, signIn, signUp } = useAuth();

  // 標記元件已掛載（解決 SSG 預渲染問題）
  useEffect(() => {
    setMounted(true);
  }, []);

  // 已登入則跳轉到 Dashboard
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error(t.register?.nameRequired || 'Please enter your name');
        }
        if (!inviteCode.trim()) {
          throw new Error(t.register?.inviteCodeRequired || '請輸入註冊碼');
        }

        // 驗證註冊碼
        const validation = await validateInviteCode(inviteCode, email.trim());
        if (!validation.valid) {
          throw new Error(validation.error || t.register?.invalidCode || '註冊碼無效或不符合');
        }

        // 註冊帳號
        await signUp(email.trim(), password, name.trim());

        // 標記註冊碼為已使用
        if (validation.inviteCode) {
          await markInviteCodeAsUsed(validation.inviteCode.id);
        }
      } else {
        await signIn(email.trim(), password);
      }
      // 登入成功會由 useEffect 處理跳轉
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 切換登入/註冊模式
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setName('');
    setInviteCode('');
  };

  // Loading 畫面（只有在客戶端掛載後才顯示）
  // SSG 時 mounted=false，直接渲染登入表單，避免把「載入中...」寫死在 HTML
  if (mounted && authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div role="status" aria-label="Loading" className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.login.title}
          </h1>
          <p className="text-lg text-blue-600 font-medium">{t.login.subtitle}</p>
          <p className="text-sm text-gray-500 mt-2">{t.login.tagline}</p>
        </div>

        {/* Login/SignUp Card */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {isSignUp ? t.login.signUpTitle : t.login.signInTitle}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 姓名欄位（只在註冊時顯示） */}
            {isSignUp && (
              <div>
                <label htmlFor="register-name" className="form-label">{t.register?.name || 'Name'}</label>
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder={t.register?.namePlaceholder || 'Enter your name'}
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="form-label">{t.login.email}</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* 註冊碼欄位（只在註冊時顯示） */}
            {isSignUp && (
              <div>
                <label htmlFor="register-invite-code" className="form-label">{t.register?.inviteCode || '註冊碼'}</label>
                <input
                  id="register-invite-code"
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  className="form-input"
                  placeholder={t.register?.inviteCodePlaceholder || '請輸入 6 位數註冊碼'}
                  maxLength={6}
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label htmlFor="login-password" className="form-label">{t.login.password}</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={isSignUp ? 6 : undefined}
              />
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">{t.register?.passwordHint || 'Password must be at least 6 characters'}</p>
              )}
            </div>

            {error && (
              <div role="alert" className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading
                ? (isSignUp ? (t.register?.signingUp || 'Signing up...') : t.login.loggingIn)
                : (isSignUp ? (t.register?.signUp || 'Sign Up') : t.login.loginButton)
              }
            </button>
          </form>

          {/* 切換登入/註冊 */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              {isSignUp ? (
                <>
                  {t.login.hasAccount}{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {t.login.signIn}
                  </button>
                </>
              ) : (
                <>
                  {t.login.noAccount}{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {t.register?.signUp || 'Sign Up'}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © 2026 AI Sales Mastery by Afeng Huang
        </p>
      </div>
    </div>
  );
}
