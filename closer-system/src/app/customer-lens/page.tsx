'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/lib/i18n/context';
import { useProfile } from '@/contexts/ProfileContext';

// 定義表單資料類型
interface CustomerLensFormData {
  // 共用 - 目標客戶基本資料
  targetCompanyName: string;
  targetCompanyWebsite: string;
  targetCompanyNewsUrl: string;
  decisionMakerName: string;
  decisionMakerLinkedIn: string;
  meetingDateTime: string;
  // 痛點對照表專用
  targetIndustry: string;
  targetRole: string;
  targetCompanySize: string;
  // 會議速查專用
  meetingType: string;
  meetingDuration: string;
  meetingObjectives: string;
}

const initialFormData: CustomerLensFormData = {
  targetCompanyName: '',
  targetCompanyWebsite: '',
  targetCompanyNewsUrl: '',
  decisionMakerName: '',
  decisionMakerLinkedIn: '',
  meetingDateTime: '',
  targetIndustry: '',
  targetRole: '',
  targetCompanySize: '',
  meetingType: '',
  meetingDuration: '',
  meetingObjectives: '',
};

type TabType = 'infoCard' | 'painPoints' | 'meetingPrep';

export default function CustomerLensPage() {
  const [activeTab, setActiveTab] = useState<TabType>('infoCard');
  const [formData, setFormData] = useState<CustomerLensFormData>(initialFormData);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLanguage();
  const { profile: userProfile, profileLoading } = useProfile();

  // 更新表單欄位
  const updateField = (field: keyof CustomerLensFormData, value: string) => {
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

  // 產生客戶情報卡 Prompt
  const generateInfoCardPrompt = () => {
    const prompt = `請根據我上傳的客戶資料，幫我製作一份「客戶情報卡」，格式如下：

【客戶情報卡】

■ 基本資訊
- 公司名稱：${formData.targetCompanyName || '（請填入）'}
- 產業別：
- 公司規模：（員工數 / 營收規模）
- 成立年份：
- 總部位置：

■ 公司近況（列出 3 個重點）
1.
2.
3.

■ 業務重點與策略方向
- 主要產品/服務：
- 目標市場：
- 近期策略重點：

■ 可能面臨的挑戰（列出 3 個）
1.
2.
3.

■ 決策者資訊
- 姓名：${formData.decisionMakerName || '（請填入）'}
- 職稱：
- 專業背景：
- 在這家公司的年資：
- 過去經歷亮點：
- 關注的議題/興趣：

■ 開場話題建議（3 個）
1. 「我注意到貴公司最近___，想請教___」
2. 「看到您之前分享的___，我很認同___」
3. 「貴公司在___方面的成績很亮眼，想了解___」

===== 我的背景資訊（供參考）=====
- 我的公司/產品：${userProfile.productService || '（請在 Content Clone 模組填寫）'}
- 我的核心優勢：${userProfile.productAdvantage || '（請在 Content Clone 模組填寫）'}
- 我的成功案例：${userProfile.catchphrases || '（可在 Content Clone 模組填寫）'}

===== 需要分析的客戶資料 =====
- 客戶官網：${formData.targetCompanyWebsite || '（請貼上網址）'}
- 客戶年報/新聞：${formData.targetCompanyNewsUrl || '（選填）'}
- 決策者 LinkedIn：${formData.decisionMakerLinkedIn || '（選填）'}
- 預計會議時間：${formData.meetingDateTime || '（選填）'}

請根據上傳的資料填入，如果資料不足，請標註「資料不足，建議補充」。`;

    setGeneratedPrompt(prompt);
  };

  // 產生痛點對照表 Prompt
  const generatePainPointsPrompt = () => {
    const prompt = `請根據我上傳的「我司產品資料」和「客戶公司資料」，幫我製作一份「產品 × 客戶痛點對照表」。

分析步驟：
1. 從客戶資料中，找出他們可能面臨的 3-5 個業務痛點/挑戰
2. 從我司產品資料中，找出對應的解決方案
3. 如果有相關成功案例，一併列出

請用以下表格格式呈現：

【產品 × 客戶痛點對照表】

| 客戶痛點 | 痛點說明 | 我們的解決方案 | 帶來的效益 | 相關案例 |
|---------|---------|---------------|-----------|---------|
| 痛點 1 | | | | |
| 痛點 2 | | | | |
| 痛點 3 | | | | |
| 痛點 4 | | | | |
| 痛點 5 | | | | |

表格後，請補充：

■ 最強切入點
根據分析，建議從「___」這個痛點切入，因為：
1.
2.

■ 話術建議
「我們發現很多像貴公司這樣的___企業，都面臨___的挑戰。我們過去幫助___公司，透過___，達成了___的成果。不知道貴公司目前在這方面的情況如何？」

===== 我的產品/服務資訊 =====
- 主要產品/服務：${userProfile.productService || '（請在 Content Clone 模組填寫）'}
- 核心優勢：${userProfile.productAdvantage || '（請在 Content Clone 模組填寫）'}
- 目標客群：${userProfile.idealCustomer || '（請在 Content Clone 模組填寫）'}
- 客戶常見痛點：${userProfile.painPoints?.join('、') || '（請在 Content Clone 模組填寫）'}

===== 目標客戶資訊 =====
- 客戶公司：${formData.targetCompanyName || '（請填入）'}
- 客戶官網：${formData.targetCompanyWebsite || '（請貼上網址）'}
- 客戶產業：${formData.targetIndustry || '（請選擇）'}
- 客戶角色：${formData.targetRole || '（例：採購、IT、財務、行銷）'}
- 公司規模：${formData.targetCompanySize || '（例：50人、500人、5000人以上）'}`;

    setGeneratedPrompt(prompt);
  };

  // 產生會議速查 Prompt
  const generateMeetingPrepPrompt = () => {
    const prompt = `請根據前面分析的所有資料，幫我製作一份「會議前 5 分鐘速查表」，讓我在見客戶前快速複習。

【會議前 5 分鐘速查】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 30 秒記住這個客戶

公司：${formData.targetCompanyName || '_______________'}
決策者：${formData.decisionMakerName || '_______________'}
一句話描述：「這是一家___的公司，正在___」

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 開場（展現你有做功課）

□ 提到：「___」（近期新聞/成績/動態）
□ 讚美：「___」（具體、真誠、有細節）
□ 連結：「這讓我想到___」（帶到你的專業）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 探詢痛點（問對問題）

□ 問題 1：「貴公司目前在___方面，最大的挑戰是什麼？」
□ 問題 2：「如果可以改善___，對你們會有什麼影響？」
□ 問題 3：「你們之前有嘗試過什麼方法來解決這個問題嗎？」

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 準備好的案例

□ 案例公司：_______________
□ 他們的問題：_______________
□ 我們怎麼幫：_______________
□ 達成的成果：_______________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 會議結束前的 CTA

□ 如果有興趣：「那我們下一步可以___」
□ 如果需要考慮：「我整理一份___給您參考」
□ 如果需要其他人：「方便幫我引薦___嗎？」

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 地雷區（避免踩到）

□ 不要提：_______________
□ 不要問：_______________
□ 注意：_______________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

===== 會議資訊 =====
- 會議類型：${formData.meetingType || '（例：初次拜訪、提案、談判、售後）'}
- 預計時長：${formData.meetingDuration || '（例：30分鐘、1小時）'}
- 會議目標：${formData.meetingObjectives || '（例：了解需求、報價、成交）'}
- 會議時間：${formData.meetingDateTime || '（請填入）'}

===== 我的準備 =====
- 我的產品/服務：${userProfile.productService || '（請在 Content Clone 模組填寫）'}
- 我的核心優勢：${userProfile.productAdvantage || '（請在 Content Clone 模組填寫）'}
- 我的 CTA：${userProfile.cta || '（請在 Content Clone 模組填寫）'}

請根據上傳的資料，把所有___填入具體內容。如果某項資料不足，請標註「建議會前確認」。`;

    setGeneratedPrompt(prompt);
  };

  // 根據 Tab 產生 Prompt
  const handleGenerate = () => {
    switch (activeTab) {
      case 'infoCard':
        generateInfoCardPrompt();
        break;
      case 'painPoints':
        generatePainPointsPrompt();
        break;
      case 'meetingPrep':
        generateMeetingPrepPrompt();
        break;
    }
  };

  // Tab 切換時清空結果
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setGeneratedPrompt('');
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
          <h1 className="text-2xl font-bold text-gray-900">{t.customerLens.title}</h1>
          <p className="text-gray-500 mt-1">{t.customerLens.subtitle}</p>
        </div>

        {/* Tab 切換 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => handleTabChange('infoCard')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'infoCard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">📋</span>
                {t.customerLens.tabs.infoCard}
              </button>
              <button
                onClick={() => handleTabChange('painPoints')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'painPoints'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">🎯</span>
                {t.customerLens.tabs.painPoints}
              </button>
              <button
                onClick={() => handleTabChange('meetingPrep')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'meetingPrep'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">⏱️</span>
                {t.customerLens.tabs.meetingPrep}
              </button>
            </nav>
          </div>

          {/* Tab 內容 */}
          <div className="p-6">
            {/* 情報卡 Tab */}
            {activeTab === 'infoCard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {t.customerLens.infoCard.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {t.customerLens.infoCard.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.company}
                    </label>
                    <input
                      type="text"
                      value={formData.targetCompanyName}
                      onChange={(e) => updateField('targetCompanyName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.infoCard.companyPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.customerName}
                    </label>
                    <input
                      type="text"
                      value={formData.decisionMakerName}
                      onChange={(e) => updateField('decisionMakerName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.infoCard.customerNamePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.customerLens.infoCard.websiteUrl}
                  </label>
                  <input
                    type="url"
                    value={formData.targetCompanyWebsite}
                    onChange={(e) => updateField('targetCompanyWebsite', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.customerLens.infoCard.websiteUrlPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.customerLens.infoCard.newsUrl}{t.customerLens.infoCard.newsUrlOptional}
                  </label>
                  <input
                    type="url"
                    value={formData.targetCompanyNewsUrl}
                    onChange={(e) => updateField('targetCompanyNewsUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.example.com/news"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.linkedinUrl}
                    </label>
                    <input
                      type="url"
                      value={formData.decisionMakerLinkedIn}
                      onChange={(e) => updateField('decisionMakerLinkedIn', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.infoCard.linkedinUrlPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.meetingTime}
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.meetingDateTime}
                      onChange={(e) => updateField('meetingDateTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 痛點對照表 Tab */}
            {activeTab === 'painPoints' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {t.customerLens.painPoints.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {t.customerLens.painPoints.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.company}
                    </label>
                    <input
                      type="text"
                      value={formData.targetCompanyName}
                      onChange={(e) => updateField('targetCompanyName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.infoCard.companyPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.websiteUrl}
                    </label>
                    <input
                      type="url"
                      value={formData.targetCompanyWebsite}
                      onChange={(e) => updateField('targetCompanyWebsite', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.infoCard.websiteUrlPlaceholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.painPoints.industry}
                    </label>
                    <select
                      value={formData.targetIndustry}
                      onChange={(e) => updateField('targetIndustry', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{t.customerLens.painPoints.industryPlaceholder}</option>
                      {t.industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.painPoints.role}
                    </label>
                    <input
                      type="text"
                      value={formData.targetRole}
                      onChange={(e) => updateField('targetRole', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.painPoints.rolePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.painPoints.companySize}
                    </label>
                    <input
                      type="text"
                      value={formData.targetCompanySize}
                      onChange={(e) => updateField('targetCompanySize', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.painPoints.companySizePlaceholder}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 會議速查 Tab */}
            {activeTab === 'meetingPrep' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {t.customerLens.meetingPrep.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {t.customerLens.meetingPrep.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.company}
                    </label>
                    <input
                      type="text"
                      value={formData.targetCompanyName}
                      onChange={(e) => updateField('targetCompanyName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.infoCard.companyPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.customerName}
                    </label>
                    <input
                      type="text"
                      value={formData.decisionMakerName}
                      onChange={(e) => updateField('decisionMakerName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.infoCard.customerNamePlaceholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.meetingPrep.meetingType}
                    </label>
                    <input
                      type="text"
                      value={formData.meetingType}
                      onChange={(e) => updateField('meetingType', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.meetingPrep.meetingTypePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.meetingPrep.duration}
                    </label>
                    <input
                      type="text"
                      value={formData.meetingDuration}
                      onChange={(e) => updateField('meetingDuration', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.customerLens.meetingPrep.durationPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.customerLens.infoCard.meetingTime}
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.meetingDateTime}
                      onChange={(e) => updateField('meetingDateTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.customerLens.meetingPrep.objectives}
                  </label>
                  <textarea
                    value={formData.meetingObjectives}
                    onChange={(e) => updateField('meetingObjectives', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.customerLens.meetingPrep.objectivesPlaceholder}
                  />
                </div>
              </div>
            )}

            {/* 產生按鈕 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={handleGenerate}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {activeTab === 'infoCard' && t.customerLens.infoCard.generate}
                {activeTab === 'painPoints' && t.customerLens.painPoints.generate}
                {activeTab === 'meetingPrep' && t.customerLens.meetingPrep.generate}
              </button>
            </div>
          </div>
        </div>

        {/* 結果顯示區 */}
        {generatedPrompt && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.customerLens.result.title}
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
                  {isCopied ? t.common.copied : t.customerLens.result.copyResult}
                </button>
                <a
                  href="https://notebooklm.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {t.customerLens.result.openNotebookLM}
                </a>
              </div>
            </div>

            {/* 使用說明 */}
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">使用方式：</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. 前往 <a href="https://notebooklm.google.com/" target="_blank" rel="noopener noreferrer" className="underline">NotebookLM</a> 建立新筆記本</li>
                <li>2. 上傳客戶相關資料（官網截圖、年報 PDF、LinkedIn 資料等）</li>
                <li>3. 複製下方 Prompt，貼到 NotebookLM 對話框</li>
                <li>4. AI 會根據你上傳的資料產出分析結果</li>
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
        {(!userProfile.productService || !userProfile.productAdvantage) && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">提示：</span>
              建議先到「內容分身術」模組填寫你的產品/服務資料，讓 AI 能產出更精準的分析。
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
