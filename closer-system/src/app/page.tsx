'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const { user, loading: authLoading, signIn, signUp } = useAuth();

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
          throw new Error('請輸入姓名');
        }
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
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
  };

  // Loading 畫面
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-500">載入中...</div>
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
            {isSignUp ? '學員註冊' : '學員登入'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 姓名欄位（只在註冊時顯示） */}
            {isSignUp && (
              <div>
                <label className="form-label">姓名</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="請輸入姓名"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="form-label">{t.login.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="form-label">{t.login.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">密碼至少 6 個字元</p>
              )}
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading
                ? (isSignUp ? '註冊中...' : t.login.loggingIn)
                : (isSignUp ? '註冊' : t.login.loginButton)
              }
            </button>
          </form>

          {/* 切換登入/註冊 */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              {isSignUp ? (
                <>
                  已有帳號？{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    登入
                  </button>
                </>
              ) : (
                <>
                  還沒有帳號？{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    註冊
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
