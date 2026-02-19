'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/lib/i18n/context';
import { isAdminEmail } from '@/lib/firebase/inviteCodes';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  available: boolean;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  // 檢查是否為 Admin（使用 Email 白名單，同步檢查）
  const isAdminUser = user?.email ? isAdminEmail(user.email) : false;

  const navItems: NavItem[] = [
    {
      href: '/dashboard',
      label: t.sidebar.dashboard,
      icon: '📊',
      available: true,
    },
    {
      href: '/content-clone',
      label: t.sidebar.contentClone,
      icon: '✨',
      available: true,
    },
    {
      href: '/customer-lens',
      label: t.sidebar.customerLens,
      icon: '🔍',
      available: true,
    },
    {
      href: '/proposal-machine',
      label: t.sidebar.proposalMachine,
      icon: '💰',
      available: true,
    },
    {
      href: '/follow-up',
      label: t.sidebar.followUp,
      icon: '🔄',
      available: true,
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link href="/dashboard" className="block">
              <h1 className="text-2xl font-bold text-blue-600">CLOSER</h1>
              <p className="text-xs text-gray-500 mt-1">Close More, Work Less</p>
            </Link>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.displayName || t.sidebar.defaultUser}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.available ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-colors duration-200
                        ${
                          isActive(item.href)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg
                        text-gray-400 cursor-not-allowed"
                    >
                      <span className="text-xl opacity-50">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">
                        {t.dashboard.comingSoon}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Profile Link */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors duration-200
                ${
                  pathname === '/profile'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <span className="text-xl">👤</span>
              <span className="font-medium">{t.sidebar.myProfile}</span>
            </Link>

            {/* Admin Link (只對 admin 顯示) */}
            {isAdminUser && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg mt-2
                  transition-colors duration-200
                  ${
                    pathname === '/admin'
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-xl">⚙️</span>
                <span className="font-medium">{t.admin?.title || '管理後台'}</span>
              </Link>
            )}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-3
                text-gray-600 hover:text-red-600 hover:bg-red-50
                rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="font-medium">{t.sidebar.logout}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
