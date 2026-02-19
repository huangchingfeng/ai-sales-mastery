'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/lib/i18n/context';
import { hasProfile } from '@/lib/storage/profile';
import DashboardLayout from '@/components/DashboardLayout';

interface ModuleCard {
  key: 'contentClone' | 'customerLens' | 'proposalMachine' | 'followUp';
  href: string;
  icon: string;
  available: boolean;
  color: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const profileComplete = hasProfile();

  const modules: ModuleCard[] = [
    {
      key: 'contentClone',
      href: '/content-clone',
      icon: '✨',
      available: true,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'customerLens',
      href: '/customer-lens',
      icon: '🔍',
      available: true,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'proposalMachine',
      href: '/proposal-machine',
      icon: '💰',
      available: true,
      color: 'from-amber-500 to-orange-600',
    },
    {
      key: 'followUp',
      href: '/follow-up',
      icon: '🔄',
      available: true,
      color: 'from-teal-500 to-cyan-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {t.dashboard.welcome}
            {user?.displayName && (
              <span className="text-blue-600">
                {', '}
                {user.displayName}
              </span>
            )}
            !
          </h1>
          <p className="text-gray-600 mt-2">
            {t.dashboard.title}
          </p>
        </div>

        {/* Profile Completion Notice */}
        {!profileComplete && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-amber-800 font-medium">
                  {t.dashboard.completeProfile}
                </p>
                <Link
                  href="/content-clone"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-amber-700 hover:text-amber-900 font-medium"
                >
                  {t.dashboard.modules.contentClone.title}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const moduleData = t.dashboard.modules[module.key];

            return (
              <div
                key={module.key}
                className={`
                  relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100
                  ${module.available ? 'hover:shadow-md transition-shadow duration-200' : 'opacity-75'}
                `}
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${module.color}`} />

                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`
                      w-14 h-14 rounded-xl bg-gradient-to-r ${module.color}
                      flex items-center justify-center text-2xl shadow-lg
                    `}>
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {moduleData.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {moduleData.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  {module.available ? (
                    <Link
                      href={module.href}
                      className={`
                        inline-flex items-center justify-center w-full gap-2
                        px-4 py-3 rounded-lg font-medium
                        bg-gradient-to-r ${module.color} text-white
                        hover:opacity-90 transition-opacity duration-200
                      `}
                    >
                      {t.dashboard.enter}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <div className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      {t.dashboard.comingSoon}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats (Optional - can be expanded later) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{t.dashboard.stats.aiPrompts}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {profileComplete ? '\u2713' : '-'}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{t.dashboard.stats.gems}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {profileComplete ? '\u2713' : '-'}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{t.dashboard.stats.modules}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{profileComplete ? '1' : '0'}/4</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{t.dashboard.stats.status}</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {profileComplete ? t.dashboard.stats.ready : t.dashboard.stats.pending}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
