'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/lib/prompts/templates';
import { loadProfileFromCloud, saveProfileToCloud, emptyProfile, loadProfile } from '@/lib/storage/profile';
import DashboardLayout from '@/components/DashboardLayout';

// 可展開/收合的區塊元件
interface SectionProps {
  title: string;
  icon: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Section({ title, icon, isOpen, onToggle, children }: SectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4 space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<UserProfile>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState({
    basics: true,
    product: false,
    target: false,
    style: false,
    preference: false,
  });

  const router = useRouter();
  const { t, language } = useLanguage();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (authLoading) return;

      if (!user) {
        router.push('/');
        return;
      }

      let savedProfile: UserProfile | null = null;
      if (user) {
        savedProfile = await loadProfileFromCloud(user.uid);
      } else {
        savedProfile = loadProfile();
      }

      if (savedProfile) {
        setFormData(savedProfile);
      }
      setIsLoading(false);
    };

    loadData();
  }, [router, user, authLoading]);

  const updateField = (field: keyof UserProfile, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: 'painPoints' | 'platforms', value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      updateField(field, current.filter(item => item !== value));
    } else {
      updateField(field, [...current, value]);
    }
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...formData.commonQuestions];
    newQuestions[index] = value;
    updateField('commonQuestions', newQuestions);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const profileToSave = { ...formData, language };
      await saveProfileToCloud(user.uid, profileToSave);
      setSaveMessage(t.common.saved);
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('儲存失敗:', error);
      setSaveMessage(t.profile?.saveError || 'Error saving');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">{t.common.loading}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t.profile?.title || t.sidebar.myProfile}</h1>
          <p className="text-gray-600 mt-1">{t.profile?.subtitle || 'Edit your profile information'}</p>
        </div>

        {/* Profile Sections */}
        <div className="space-y-4">
          {/* Section 1: 基本資料 */}
          <Section
            title={t.contentClone.steps.basics}
            icon="👤"
            isOpen={openSections.basics}
            onToggle={() => toggleSection('basics')}
          >
            <div>
              <label className="form-label">{t.contentClone.step1.name}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="form-input"
                placeholder={t.contentClone.step1.namePlaceholder}
              />
            </div>

            <div>
              <label className="form-label">{t.contentClone.step1.industry}</label>
              <select
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                className="form-input"
              >
                <option value="">{t.contentClone.step1.industryPlaceholder}</option>
                {t.industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">{t.contentClone.step1.jobTitle}</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => updateField('jobTitle', e.target.value)}
                className="form-input"
                placeholder={t.contentClone.step1.jobTitlePlaceholder}
              />
            </div>

            <div>
              <label className="form-label">{t.contentClone.step1.experience}</label>
              <select
                value={formData.yearsExperience}
                onChange={(e) => updateField('yearsExperience', e.target.value)}
                className="form-input"
              >
                <option value="">{t.contentClone.step1.experiencePlaceholder}</option>
                {t.experienceOptions.map(exp => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </Section>

          {/* Section 2: 產品服務 */}
          <Section
            title={t.contentClone.steps.product}
            icon="📦"
            isOpen={openSections.product}
            onToggle={() => toggleSection('product')}
          >
            <div>
              <label className="form-label">{t.contentClone.step2.product}</label>
              <textarea
                value={formData.productService}
                onChange={(e) => updateField('productService', e.target.value)}
                className="form-textarea"
                rows={4}
                placeholder={t.contentClone.step2.productPlaceholder}
              />
            </div>

            <div>
              <label className="form-label">{t.contentClone.step2.advantage}</label>
              <textarea
                value={formData.productAdvantage}
                onChange={(e) => updateField('productAdvantage', e.target.value)}
                className="form-textarea"
                rows={3}
                placeholder={t.contentClone.step2.advantagePlaceholder}
              />
            </div>

            <div>
              <label className="form-label">{t.contentClone.step2.price}</label>
              <select
                value={formData.priceRange}
                onChange={(e) => updateField('priceRange', e.target.value)}
                className="form-input"
              >
                <option value="">{t.contentClone.step2.pricePlaceholder}</option>
                {t.priceOptions.map(price => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
            </div>
          </Section>

          {/* Section 3: 目標客群 */}
          <Section
            title={t.contentClone.steps.target}
            icon="🎯"
            isOpen={openSections.target}
            onToggle={() => toggleSection('target')}
          >
            <div>
              <label className="form-label">{t.contentClone.step3.idealCustomer}</label>
              <textarea
                value={formData.idealCustomer}
                onChange={(e) => updateField('idealCustomer', e.target.value)}
                className="form-textarea"
                rows={3}
                placeholder={t.contentClone.step3.idealCustomerPlaceholder}
              />
            </div>

            <div>
              <label className="form-label">{t.contentClone.step3.painPoints}</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {t.painPointOptions.map(point => (
                  <label key={point} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.painPoints.includes(point)}
                      onChange={() => toggleArrayField('painPoints', point)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">{point}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">{t.contentClone.step3.commonQuestions}</label>
              <div className="space-y-3 mt-2">
                {[0, 1, 2].map(index => (
                  <input
                    key={index}
                    type="text"
                    value={formData.commonQuestions[index] || ''}
                    onChange={(e) => updateQuestion(index, e.target.value)}
                    className="form-input"
                    placeholder={`${t.contentClone.step3.questionPlaceholder} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Section>

          {/* Section 4: 說話風格 */}
          <Section
            title={t.contentClone.steps.style}
            icon="🎨"
            isOpen={openSections.style}
            onToggle={() => toggleSection('style')}
          >
            <div>
              <label className="form-label">{t.contentClone.step4.tone}</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {t.toneOptions.map(tone => (
                  <label
                    key={tone}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      formData.toneStyle === tone
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="toneStyle"
                      value={tone}
                      checked={formData.toneStyle === tone}
                      onChange={(e) => updateField('toneStyle', e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-medium">{tone}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">{t.contentClone.step4.catchphrases}</label>
              <textarea
                value={formData.catchphrases}
                onChange={(e) => updateField('catchphrases', e.target.value)}
                className="form-textarea"
                rows={2}
                placeholder={t.contentClone.step4.catchphrasesPlaceholder}
              />
            </div>

            <div>
              <label className="form-label">{t.contentClone.step4.avoidWords}</label>
              <input
                type="text"
                value={formData.avoidWords}
                onChange={(e) => updateField('avoidWords', e.target.value)}
                className="form-input"
                placeholder={t.contentClone.step4.avoidWordsPlaceholder}
              />
            </div>

            <div>
              <label className="form-label">{t.contentClone.step4.sampleWriting}</label>
              <textarea
                value={formData.sampleWriting}
                onChange={(e) => updateField('sampleWriting', e.target.value)}
                className="form-textarea"
                rows={4}
                placeholder={t.contentClone.step4.sampleWritingPlaceholder}
              />
            </div>
          </Section>

          {/* Section 5: 內容偏好 */}
          <Section
            title={t.contentClone.steps.preference}
            icon="⚙️"
            isOpen={openSections.preference}
            onToggle={() => toggleSection('preference')}
          >
            <div>
              <label className="form-label">{t.contentClone.step5.platforms}</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {t.platformOptions.map(platform => (
                  <label
                    key={platform}
                    className={`p-3 border rounded-lg cursor-pointer text-center ${
                      formData.platforms.includes(platform)
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(platform)}
                      onChange={() => toggleArrayField('platforms', platform)}
                      className="sr-only"
                    />
                    <span className="text-sm">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">{t.contentClone.step5.contentLength}</label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {t.lengthOptions.map(length => (
                  <label
                    key={length}
                    className={`p-4 border rounded-lg cursor-pointer text-center ${
                      formData.contentLength === length
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentLength"
                      value={length}
                      checked={formData.contentLength === length}
                      onChange={(e) => updateField('contentLength', e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-sm font-medium">{length}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">{t.contentClone.step5.cta}</label>
              <input
                type="text"
                value={formData.cta}
                onChange={(e) => updateField('cta', e.target.value)}
                className="form-input"
                placeholder={t.contentClone.step5.ctaPlaceholder}
              />
            </div>
          </Section>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span className={`text-sm ${saveMessage === t.common.saved ? 'text-green-600' : 'text-red-600'}`}>
                {saveMessage}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.profile?.saving || 'Saving...'}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t.profile?.saveChanges || t.common.save}
              </>
            )}
          </button>
        </div>

        {/* Expand All / Collapse All */}
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setOpenSections({ basics: true, product: true, target: true, style: true, preference: true })}
            className="text-blue-600 hover:text-blue-800"
          >
            {t.profile?.expandAll || 'Expand All'}
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={() => setOpenSections({ basics: false, product: false, target: false, style: false, preference: false })}
            className="text-blue-600 hover:text-blue-800"
          >
            {t.profile?.collapseAll || 'Collapse All'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
