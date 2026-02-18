'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/lib/i18n/context';
import { useProfile } from '@/contexts/ProfileContext';

// 6 種跟進情境
type ScenarioType = 'postMeeting' | 'silentCustomer' | 'holiday' | 'birthday' | 'valueShare' | 'referral';

// 情境配置
const scenarioConfig: Record<ScenarioType, {
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}> = {
  postMeeting: {
    icon: '📝',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
  },
  silentCustomer: {
    icon: '💤',
    colorClass: 'text-amber-600',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
  },
  holiday: {
    icon: '🎊',
    colorClass: 'text-red-600',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
  },
  birthday: {
    icon: '🎂',
    colorClass: 'text-pink-600',
    bgClass: 'bg-pink-50',
    borderClass: 'border-pink-200',
  },
  valueShare: {
    icon: '📚',
    colorClass: 'text-green-600',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
  },
  referral: {
    icon: '🤝',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-200',
  },
};

// 表單資料介面
interface FollowUpFormData {
  // 共用欄位
  customerName: string;
  customerCompany: string;
  relationship: 'stranger' | 'normal' | 'familiar' | 'close';
  platform: 'email' | 'line' | 'whatsapp';

  // 會議後跟進
  meetingDate: string;
  meetingTopic: string;
  meetingPoints: string;
  customerQuestions: string;
  nextStep: string;

  // 沉默客戶喚醒
  lastContactDate: string;
  lastContent: string;
  noCloseReason: string;
  approachType: 'value' | 'trend' | 'greeting' | 'newService' | 'other';
  approachOther: string;

  // 節日問候
  holidayName: string;
  holidayTone: 'formal' | 'warm' | 'humor' | 'simple';
  mentionBusiness: 'none' | 'light' | 'clear';

  // 生日祝福
  birthdayTone: 'formal' | 'personal' | 'humor';
  customerInterests: string;

  // 分享價值
  customerIndustry: string;
  customerTopics: string;
  shareType: 'article' | 'report' | 'news' | 'tool' | 'event';
  shareTitle: string;
  shareReason: string;
  shareLink: string;

  // 轉介紹請求
  cooperationDuration: string;
  cooperationResult: string;
  referralTarget: string;
  referralIndustry: string;
  referralPosition: string;
  hasReward: boolean;
  rewardContent: string;
}

const initialFormData: FollowUpFormData = {
  customerName: '',
  customerCompany: '',
  relationship: 'normal',
  platform: 'line',
  meetingDate: '',
  meetingTopic: '',
  meetingPoints: '',
  customerQuestions: '',
  nextStep: '',
  lastContactDate: '',
  lastContent: '',
  noCloseReason: '',
  approachType: 'value',
  approachOther: '',
  holidayName: '',
  holidayTone: 'warm',
  mentionBusiness: 'light',
  birthdayTone: 'personal',
  customerInterests: '',
  customerIndustry: '',
  customerTopics: '',
  shareType: 'article',
  shareTitle: '',
  shareReason: '',
  shareLink: '',
  cooperationDuration: '',
  cooperationResult: '',
  referralTarget: '',
  referralIndustry: '',
  referralPosition: '',
  hasReward: false,
  rewardContent: '',
};

export default function FollowUpPage() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType | null>(null);
  const [formData, setFormData] = useState<FollowUpFormData>(initialFormData);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLanguage();
  const { profile: userProfile, profileLoading } = useProfile();

  // 更新表單欄位
  const updateField = <K extends keyof FollowUpFormData>(field: K, value: FollowUpFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 複製到剪貼簿
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  // 取得關係程度中文
  const getRelationshipText = (rel: string) => {
    const map: Record<string, string> = {
      stranger: '陌生',
      normal: '普通',
      familiar: '熟悉',
      close: '很熟',
    };
    return map[rel] || rel;
  };

  // 取得平台中文
  const getPlatformText = (platform: string) => {
    const map: Record<string, string> = {
      email: 'Email',
      line: 'LINE',
      whatsapp: 'WhatsApp',
    };
    return map[platform] || platform;
  };

  // 產生會議後跟進 Prompt
  const generatePostMeetingPrompt = () => {
    return `請幫我寫一封「會議後跟進」訊息。

客戶資訊：
- 客戶姓名：${formData.customerName || '（請填入）'}
- 公司名稱：${formData.customerCompany || '（請填入）'}
- 會議日期：${formData.meetingDate || '（請填入）'}
- 會議主題：${formData.meetingTopic || '（請填入）'}

會議重點：
${formData.meetingPoints || '（請填入會議討論的重點，用換行分隔）'}

客戶提出的問題/疑慮：
${formData.customerQuestions || '（請填入客戶的問題或疑慮）'}

約定的下一步：
${formData.nextStep || '（請填入約定的下一步行動）'}

發送管道：${getPlatformText(formData.platform)}

===== 我的背景資訊 =====
- 姓名：${userProfile.name || '（請在 Content Clone 模組填寫）'}
- 產品/服務：${userProfile.productService || '（請在 Content Clone 模組填寫）'}
- 說話風格：${userProfile.toneStyle || '（請在 Content Clone 模組填寫）'}
${userProfile.catchphrases ? `- 常用語/口頭禪：${userProfile.catchphrases}` : ''}

請產出 3 個版本的跟進訊息：
- 版本 A：正式版
- 版本 B：親切版
- 版本 C：簡短版

每個版本包含：
1. 感謝對方的時間
2. 會議重點摘要
3. 回應他們的問題/疑慮
4. 確認下一步行動
5. 明確的 CTA

每個版本標註建議的發送時間。`;
  };

  // 產生沉默客戶喚醒 Prompt
  const generateSilentCustomerPrompt = () => {
    const approachMap: Record<string, string> = {
      value: '分享一個對他有用的資訊',
      trend: '提到產業趨勢或新聞',
      greeting: '單純問候關心',
      newService: '提到我們有新的服務/優惠',
      other: formData.approachOther || '其他',
    };

    return `請幫我寫一封「沉默客戶喚醒」訊息。

客戶資訊：
- 客戶姓名：${formData.customerName || '（請填入）'}
- 公司名稱：${formData.customerCompany || '（請填入）'}
- 上次聯絡：${formData.lastContactDate || '（請填入日期）'}
- 上次聊的內容：${formData.lastContent || '（請填入）'}
- 當時沒成交的原因：${formData.noCloseReason || '（例如：預算/時機/需要考慮）'}

我想用的切入點：${approachMap[formData.approachType]}

發送管道：${getPlatformText(formData.platform)}

===== 我的背景資訊 =====
- 姓名：${userProfile.name || '（請在 Content Clone 模組填寫）'}
- 產品/服務：${userProfile.productService || '（請在 Content Clone 模組填寫）'}
- 說話風格：${userProfile.toneStyle || '（請在 Content Clone 模組填寫）'}
${userProfile.catchphrases ? `- 常用語/口頭禪：${userProfile.catchphrases}` : ''}

請產出 3 個版本，原則：
1. 不要太銷售感
2. 提供價值或關心
3. 輕鬆自然，像朋友問候
4. 有一個軟性的 CTA（不是「要不要買」）

每個版本標註建議的發送時間。`;
  };

  // 產生節日問候 Prompt
  const generateHolidayPrompt = () => {
    const toneMap: Record<string, string> = {
      formal: '正式祝福',
      warm: '溫馨關懷',
      humor: '輕鬆幽默',
      simple: '簡單俐落',
    };

    const businessMap: Record<string, string> = {
      none: '完全不提（純問候）',
      light: '輕輕帶過（年後有空聊聊）',
      clear: '明確提到（新年新方案）',
    };

    return `請幫我寫一封「節日問候」訊息。

客戶資訊：
- 客戶姓名：${formData.customerName || '（請填入）'}
- 關係程度：${getRelationshipText(formData.relationship)}
- 上次互動：${formData.lastContactDate || '（請填入）'}

節日：${formData.holidayName || '（請填入節日名稱）'}

我想傳達的感覺：${toneMap[formData.holidayTone]}

是否要提到業務？${businessMap[formData.mentionBusiness]}

發送管道：${getPlatformText(formData.platform)}

===== 我的背景資訊 =====
- 姓名：${userProfile.name || '（請在 Content Clone 模組填寫）'}
- 說話風格：${userProfile.toneStyle || '（請在 Content Clone 模組填寫）'}
${userProfile.catchphrases ? `- 常用語/口頭禪：${userProfile.catchphrases}` : ''}

請產出 3 個版本，原則：
1. 真誠，不要太制式
2. 符合節日氛圍
3. 根據關係程度調整語氣

每個版本標註建議的發送時間。`;
  };

  // 產生生日祝福 Prompt
  const generateBirthdayPrompt = () => {
    const toneMap: Record<string, string> = {
      formal: '正式祝福',
      personal: '溫馨個人化',
      humor: '輕鬆幽默',
    };

    return `請幫我寫一封「生日祝福」訊息。

客戶資訊：
- 客戶姓名：${formData.customerName || '（請填入）'}
- 關係程度：${getRelationshipText(formData.relationship)}
- 我知道他的興趣/特點：${formData.customerInterests || '（例如：愛喝咖啡/喜歡高爾夫/有小孩）'}

我想傳達的感覺：${toneMap[formData.birthdayTone]}

發送管道：${getPlatformText(formData.platform)}

===== 我的背景資訊 =====
- 姓名：${userProfile.name || '（請在 Content Clone 模組填寫）'}
- 說話風格：${userProfile.toneStyle || '（請在 Content Clone 模組填寫）'}
${userProfile.catchphrases ? `- 常用語/口頭禪：${userProfile.catchphrases}` : ''}

請產出 3 個版本，原則：
1. 個人化（不要像群發）
2. 如果知道他的興趣，融入祝福
3. 真誠簡短
4. 不要提業務

每個版本標註建議的發送時間。`;
  };

  // 產生分享價值 Prompt
  const generateValueSharePrompt = () => {
    const typeMap: Record<string, string> = {
      article: '文章',
      report: '報告',
      news: '新聞',
      tool: '工具',
      event: '活動',
    };

    return `請幫我寫一封「分享價值」訊息。

客戶資訊：
- 客戶姓名：${formData.customerName || '（請填入）'}
- 產業：${formData.customerIndustry || '（請填入）'}
- 他關心的議題：${formData.customerTopics || '（請填入）'}

我要分享的內容：
- 類型：${typeMap[formData.shareType]}
- 標題或主題：${formData.shareTitle || '（請填入）'}
- 為什麼對他有用：${formData.shareReason || '（請填入）'}
- 連結：${formData.shareLink || '（請填入）'}

發送管道：${getPlatformText(formData.platform)}

===== 我的背景資訊 =====
- 姓名：${userProfile.name || '（請在 Content Clone 模組填寫）'}
- 產品/服務：${userProfile.productService || '（請在 Content Clone 模組填寫）'}
- 說話風格：${userProfile.toneStyle || '（請在 Content Clone 模組填寫）'}
${userProfile.catchphrases ? `- 常用語/口頭禪：${userProfile.catchphrases}` : ''}

請產出 3 個版本，原則：
1. 說明為什麼想到他
2. 簡述重點（不用看完整篇也知道在講什麼）
3. 輕鬆的 CTA（有興趣可以看看）
4. 不要銷售感

每個版本標註建議的發送時間。`;
  };

  // 產生轉介紹請求 Prompt
  const generateReferralPrompt = () => {
    return `請幫我寫一封「轉介紹請求」訊息。

客戶資訊：
- 客戶姓名：${formData.customerName || '（請填入）'}
- 合作多久：${formData.cooperationDuration || '（請填入）'}
- 合作成果：${formData.cooperationResult || '（請填入具體成果）'}
- 關係程度：${getRelationshipText(formData.relationship)}

我希望他介紹的對象：
- 產業：${formData.referralIndustry || '（請填入）'}
- 職位：${formData.referralPosition || '（請填入）'}
- 或描述：${formData.referralTarget || '（請描述希望介紹什麼樣的人）'}

我有提供轉介紹獎勵嗎？${formData.hasReward ? `有，內容是：${formData.rewardContent}` : '沒有'}

發送管道：${getPlatformText(formData.platform)}

===== 我的背景資訊 =====
- 姓名：${userProfile.name || '（請在 Content Clone 模組填寫）'}
- 產品/服務：${userProfile.productService || '（請在 Content Clone 模組填寫）'}
- 說話風格：${userProfile.toneStyle || '（請在 Content Clone 模組填寫）'}
${userProfile.catchphrases ? `- 常用語/口頭禪：${userProfile.catchphrases}` : ''}

請產出 3 個版本，原則：
1. 先肯定合作成果
2. 說明希望服務更多像他這樣的客戶
3. 具體說明希望介紹什麼樣的人
4. 讓對方好開口（提供介紹的說詞）
5. 不要有壓力感

每個版本標註建議的發送時間。`;
  };

  // 根據情境產生 Prompt
  const handleGenerate = () => {
    let prompt = '';
    switch (activeScenario) {
      case 'postMeeting':
        prompt = generatePostMeetingPrompt();
        break;
      case 'silentCustomer':
        prompt = generateSilentCustomerPrompt();
        break;
      case 'holiday':
        prompt = generateHolidayPrompt();
        break;
      case 'birthday':
        prompt = generateBirthdayPrompt();
        break;
      case 'valueShare':
        prompt = generateValueSharePrompt();
        break;
      case 'referral':
        prompt = generateReferralPrompt();
        break;
    }
    setGeneratedPrompt(prompt);
  };

  // 清除結果並切換情境
  const handleScenarioChange = (scenario: ScenarioType) => {
    setActiveScenario(scenario);
    setGeneratedPrompt('');
  };

  // 返回情境選擇
  const handleBack = () => {
    setActiveScenario(null);
    setGeneratedPrompt('');
    setFormData(initialFormData);
  };

  if (profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">{t.common.loading}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* 頁面標題 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t.followUp.title}</h1>
          <p className="text-gray-500 mt-1">{t.followUp.subtitle}</p>
        </div>

        {/* 情境選擇卡片 */}
        {!activeScenario && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(scenarioConfig) as ScenarioType[]).map((scenario) => {
              const config = scenarioConfig[scenario];
              return (
                <button
                  key={scenario}
                  onClick={() => handleScenarioChange(scenario)}
                  className={`p-6 rounded-xl border-2 ${config.borderClass} ${config.bgClass} hover:shadow-lg transition-all duration-200 text-left group`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{config.icon}</span>
                    <h3 className={`font-semibold ${config.colorClass}`}>
                      {t.followUp.scenarios[scenario]}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {getScenarioDescription(scenario)}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
                    {t.followUp.form.startUsing}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 情境表單 */}
        {activeScenario && (
          <div className="bg-white rounded-lg shadow-sm">
            {/* 表單標題 */}
            <div className={`p-4 border-b ${scenarioConfig[activeScenario].bgClass} rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{scenarioConfig[activeScenario].icon}</span>
                  <div>
                    <h2 className={`font-semibold ${scenarioConfig[activeScenario].colorClass}`}>
                      {t.followUp.scenarios[activeScenario]}
                    </h2>
                    <p className="text-sm text-gray-600">{getScenarioDescription(activeScenario)}</p>
                  </div>
                </div>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors"
                >
                  {t.followUp.form.backToSelect}
                </button>
              </div>
            </div>

            {/* 表單內容 */}
            <div className="p-6 space-y-6">
              {/* 共用欄位 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.followUp.form.customerName} *
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => updateField('customerName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={t.followUp.form.customerNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.followUp.form.companyName}
                  </label>
                  <input
                    type="text"
                    value={formData.customerCompany}
                    onChange={(e) => updateField('customerCompany', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={t.followUp.form.companyNamePlaceholder}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.followUp.form.relationship}
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => updateField('relationship', e.target.value as FollowUpFormData['relationship'])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="stranger">{t.followUp.form.relationshipOptions.stranger}</option>
                    <option value="normal">{t.followUp.form.relationshipOptions.normal}</option>
                    <option value="familiar">{t.followUp.form.relationshipOptions.familiar}</option>
                    <option value="close">{t.followUp.form.relationshipOptions.close}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.followUp.form.platform}
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => updateField('platform', e.target.value as FollowUpFormData['platform'])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="email">{t.followUp.form.platformOptions.email}</option>
                    <option value="line">{t.followUp.form.platformOptions.line}</option>
                    <option value="whatsapp">{t.followUp.form.platformOptions.whatsapp}</option>
                  </select>
                </div>
              </div>

              {/* 會議後跟進專用欄位 */}
              {activeScenario === 'postMeeting' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        會議日期
                      </label>
                      <input
                        type="date"
                        value={formData.meetingDate}
                        onChange={(e) => updateField('meetingDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        會議主題
                      </label>
                      <input
                        type="text"
                        value={formData.meetingTopic}
                        onChange={(e) => updateField('meetingTopic', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：AI 導入計畫討論"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      會議重點（每行一個重點）
                    </label>
                    <textarea
                      value={formData.meetingPoints}
                      onChange={(e) => updateField('meetingPoints', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="1. 第一個重點&#10;2. 第二個重點&#10;3. 第三個重點"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      客戶提出的問題/疑慮
                    </label>
                    <textarea
                      value={formData.customerQuestions}
                      onChange={(e) => updateField('customerQuestions', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="例：培訓時數是否可以調整？預算是否可以分期？"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      約定的下一步
                    </label>
                    <input
                      type="text"
                      value={formData.nextStep}
                      onChange={(e) => updateField('nextStep', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="例：本週五前提供正式報價"
                    />
                  </div>
                </>
              )}

              {/* 沉默客戶喚醒專用欄位 */}
              {activeScenario === 'silentCustomer' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        上次聯絡日期
                      </label>
                      <input
                        type="date"
                        value={formData.lastContactDate}
                        onChange={(e) => updateField('lastContactDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        當時沒成交的原因
                      </label>
                      <input
                        type="text"
                        value={formData.noCloseReason}
                        onChange={(e) => updateField('noCloseReason', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：預算不足 / 時機不對 / 需要考慮"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      上次聊的內容
                    </label>
                    <textarea
                      value={formData.lastContent}
                      onChange={(e) => updateField('lastContent', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="例：討論過 AI 培訓方案，客戶表示 Q2 後再考慮"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      切入點
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        { value: 'value', label: '分享有用資訊' },
                        { value: 'trend', label: '產業趨勢/新聞' },
                        { value: 'greeting', label: '單純問候關心' },
                        { value: 'newService', label: '新服務/優惠' },
                        { value: 'other', label: '其他' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.approachType === option.value
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="approachType"
                            value={option.value}
                            checked={formData.approachType === option.value}
                            onChange={(e) => updateField('approachType', e.target.value as FollowUpFormData['approachType'])}
                            className="sr-only"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {formData.approachType === 'other' && (
                      <input
                        type="text"
                        value={formData.approachOther}
                        onChange={(e) => updateField('approachOther', e.target.value)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="請描述你想用的切入點"
                      />
                    )}
                  </div>
                </>
              )}

              {/* 節日問候專用欄位 */}
              {activeScenario === 'holiday' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        節日名稱
                      </label>
                      <input
                        type="text"
                        value={formData.holidayName}
                        onChange={(e) => updateField('holidayName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：農曆新年 / 中秋節 / 聖誕節"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        上次互動
                      </label>
                      <input
                        type="text"
                        value={formData.lastContactDate}
                        onChange={(e) => updateField('lastContactDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：上個月開會 / 半年前合作"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      傳達的感覺
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { value: 'formal', label: '正式祝福' },
                        { value: 'warm', label: '溫馨關懷' },
                        { value: 'humor', label: '輕鬆幽默' },
                        { value: 'simple', label: '簡單俐落' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.holidayTone === option.value
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="holidayTone"
                            value={option.value}
                            checked={formData.holidayTone === option.value}
                            onChange={(e) => updateField('holidayTone', e.target.value as FollowUpFormData['holidayTone'])}
                            className="sr-only"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      是否提到業務
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'none', label: '完全不提' },
                        { value: 'light', label: '輕輕帶過' },
                        { value: 'clear', label: '明確提到' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.mentionBusiness === option.value
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mentionBusiness"
                            value={option.value}
                            checked={formData.mentionBusiness === option.value}
                            onChange={(e) => updateField('mentionBusiness', e.target.value as FollowUpFormData['mentionBusiness'])}
                            className="sr-only"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 生日祝福專用欄位 */}
              {activeScenario === 'birthday' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      傳達的感覺
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'formal', label: '正式祝福' },
                        { value: 'personal', label: '溫馨個人化' },
                        { value: 'humor', label: '輕鬆幽默' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.birthdayTone === option.value
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="birthdayTone"
                            value={option.value}
                            checked={formData.birthdayTone === option.value}
                            onChange={(e) => updateField('birthdayTone', e.target.value as FollowUpFormData['birthdayTone'])}
                            className="sr-only"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      客戶的興趣/特點（選填，讓祝福更個人化）
                    </label>
                    <input
                      type="text"
                      value={formData.customerInterests}
                      onChange={(e) => updateField('customerInterests', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="例：愛喝咖啡 / 喜歡高爾夫 / 有兩個小孩"
                    />
                  </div>
                </>
              )}

              {/* 分享價值專用欄位 */}
              {activeScenario === 'valueShare' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        客戶產業
                      </label>
                      <input
                        type="text"
                        value={formData.customerIndustry}
                        onChange={(e) => updateField('customerIndustry', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：製造業 / 金融業"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        他關心的議題
                      </label>
                      <input
                        type="text"
                        value={formData.customerTopics}
                        onChange={(e) => updateField('customerTopics', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：數位轉型 / AI 應用 / 效率提升"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      分享內容類型
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {[
                        { value: 'article', label: '文章' },
                        { value: 'report', label: '報告' },
                        { value: 'news', label: '新聞' },
                        { value: 'tool', label: '工具' },
                        { value: 'event', label: '活動' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.shareType === option.value
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shareType"
                            value={option.value}
                            checked={formData.shareType === option.value}
                            onChange={(e) => updateField('shareType', e.target.value as FollowUpFormData['shareType'])}
                            className="sr-only"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      標題或主題
                    </label>
                    <input
                      type="text"
                      value={formData.shareTitle}
                      onChange={(e) => updateField('shareTitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="例：2026 製造業 AI 應用趨勢報告"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      為什麼對他有用
                    </label>
                    <textarea
                      value={formData.shareReason}
                      onChange={(e) => updateField('shareReason', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="例：裡面提到的 ROI 數據跟他之前問的很相關"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      連結（選填）
                    </label>
                    <input
                      type="url"
                      value={formData.shareLink}
                      onChange={(e) => updateField('shareLink', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                </>
              )}

              {/* 轉介紹請求專用欄位 */}
              {activeScenario === 'referral' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        合作多久
                      </label>
                      <input
                        type="text"
                        value={formData.cooperationDuration}
                        onChange={(e) => updateField('cooperationDuration', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：半年 / 一年 / 三年"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        合作成果
                      </label>
                      <input
                        type="text"
                        value={formData.cooperationResult}
                        onChange={(e) => updateField('cooperationResult', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：效率提升 30% / 營收成長 20%"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      希望介紹的對象描述
                    </label>
                    <textarea
                      value={formData.referralTarget}
                      onChange={(e) => updateField('referralTarget', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="例：正在考慮 AI 培訓的企業主 / 想提升團隊效率的主管"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        希望的產業（選填）
                      </label>
                      <input
                        type="text"
                        value={formData.referralIndustry}
                        onChange={(e) => updateField('referralIndustry', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：科技業 / 製造業"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        希望的職位（選填）
                      </label>
                      <input
                        type="text"
                        value={formData.referralPosition}
                        onChange={(e) => updateField('referralPosition', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：HR主管 / 業務主管"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasReward}
                        onChange={(e) => updateField('hasReward', e.target.checked)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        我有提供轉介紹獎勵
                      </span>
                    </label>
                    {formData.hasReward && (
                      <input
                        type="text"
                        value={formData.rewardContent}
                        onChange={(e) => updateField('rewardContent', e.target.value)}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="例：成交後提供 10% 回饋金 / 免費顧問諮詢一次"
                      />
                    )}
                  </div>
                </>
              )}

              {/* 產生按鈕 */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleGenerate}
                  disabled={!formData.customerName}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {t.followUp.form.generateFollowUp}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 結果顯示區 */}
        {generatedPrompt && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.followUp.result.title}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isCopied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isCopied ? t.common.copied : t.followUp.result.copyMessage}
                </button>
                <a
                  href="https://gemini.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-lg hover:from-teal-200 hover:to-cyan-200 transition-colors"
                >
                  {t.followUp.result.openGemini}
                </a>
              </div>
            </div>

            {/* 使用說明 */}
            <div className="mb-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
              <h4 className="text-sm font-medium text-teal-800 mb-2">{t.followUp.usage.title}</h4>
              <ol className="text-sm text-teal-700 space-y-1">
                <li>1. {t.followUp.usage.step1}</li>
                <li>2. {t.followUp.usage.step2}</li>
                <li>3. {t.followUp.usage.step3}</li>
                <li>4. {t.followUp.usage.step4}</li>
              </ol>
            </div>

            {/* Prompt 顯示 */}
            <div className="relative">
              <pre className="p-4 bg-gray-50 rounded-lg text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto max-h-[500px] overflow-y-auto">
                {generatedPrompt}
              </pre>
            </div>
          </div>
        )}

        {/* 提示：如果 UserProfile 不完整 */}
        {(!userProfile.name || !userProfile.toneStyle) && activeScenario && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">提示：</span>
              建議先到「內容分身術」模組填寫你的基本資料和說話風格，讓 AI 能產出更貼近你風格的訊息。
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// 取得情境描述
function getScenarioDescription(scenario: ScenarioType): string {
  const descriptions: Record<ScenarioType, string> = {
    postMeeting: '剛開完會，當天或隔天發送感謝訊息，整理重點並推進下一步',
    silentCustomer: '客戶 1-3 個月沒聯絡，重新建立連結，不要太銷售',
    holiday: '新年、中秋、聖誕等節日問候，維繫關係讓客戶記得你',
    birthday: '客戶生日當天或前一天，個人化關懷建立情感連結',
    valueShare: '看到對客戶有用的資訊，提供價值維持存在感',
    referral: '客戶合作順利時，請他幫忙介紹擴大業務範圍',
  };
  return descriptions[scenario];
}
