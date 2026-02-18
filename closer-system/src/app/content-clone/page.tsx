'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/lib/prompts/templates';
import { loadProfile, saveProfile, saveProfileToCloud, loadProfileFromCloud, emptyProfile } from '@/lib/storage/profile';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ContentClonePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>(emptyProfile);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { t, language } = useLanguage();
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

      // 從雲端或本地載入 Profile
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

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // 儲存資料到雲端或本地（包含當前語言設定）
      const profileToSave = { ...formData, language };
      if (user) {
        await saveProfileToCloud(user.uid, profileToSave);
      } else {
        saveProfile(profileToSave);
      }
      router.push('/content-clone/result');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
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

  const STEPS = [
    { id: 1, name: t.contentClone.steps.basics, letter: 'C' },
    { id: 2, name: t.contentClone.steps.product, letter: 'L' },
    { id: 3, name: t.contentClone.steps.target, letter: 'O' },
    { id: 4, name: t.contentClone.steps.style, letter: 'S' },
    { id: 5, name: t.contentClone.steps.preference, letter: 'E' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t.contentClone.title}</h1>
              <p className="text-sm text-gray-500">{t.contentClone.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="text-sm text-gray-500">
                {t.common.step} {currentStep} / 5
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex justify-between">
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`step-indicator ${
                  currentStep === step.id ? 'step-active' :
                  currentStep > step.id ? 'step-completed' : 'step-pending'
                }`}>
                  {currentStep > step.id ? '✓' : step.letter}
                </div>
                <span className={`text-xs mt-1 ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="card">
          {/* Step 1: 基本資料 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{t.contentClone.step1.title}</h2>
                <p className="text-sm text-gray-500">{t.contentClone.step1.description}</p>
              </div>

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
            </div>
          )}

          {/* Step 2: 產品/服務 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{t.contentClone.step2.title}</h2>
                <p className="text-sm text-gray-500">{t.contentClone.step2.description}</p>
              </div>

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
            </div>
          )}

          {/* Step 3: 目標客群 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{t.contentClone.step3.title}</h2>
                <p className="text-sm text-gray-500">{t.contentClone.step3.description}</p>
              </div>

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
            </div>
          )}

          {/* Step 4: 說話風格 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{t.contentClone.step4.title}</h2>
                <p className="text-sm text-gray-500">{t.contentClone.step4.description}</p>
              </div>

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
            </div>
          )}

          {/* Step 5: 內容偏好 */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{t.contentClone.step5.title}</h2>
                <p className="text-sm text-gray-500">{t.contentClone.step5.description}</p>
              </div>

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
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleBack}
              className={`btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
            >
              {t.common.previous}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary"
            >
              {currentStep === 5 ? t.common.submit : t.common.next}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
