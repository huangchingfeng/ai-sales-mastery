'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { useProfile } from '@/contexts/ProfileContext';
import DashboardLayout from '@/components/DashboardLayout';

// Tab 類型
type TabType = 'fullProposal' | 'quickProposal' | 'presentation';

// 提案輸入資料
interface ProposalInput {
  // 共用
  targetCompany: string;
  targetIndustry: string;
  companySize: string;
  projectDescription: string;
  // 完整提案
  budget: string;
  timeline: string;
  competitors: string;
  // 快速提案
  scenario: string;
  keyPoints: string;
  // 簡報
  topic: string;
  audience: string;
  duration: string;
  style: string;
}

const emptyInput: ProposalInput = {
  targetCompany: '',
  targetIndustry: '',
  companySize: '',
  projectDescription: '',
  budget: '',
  timeline: '',
  competitors: '',
  scenario: '',
  keyPoints: '',
  topic: '',
  audience: '',
  duration: '',
  style: '',
};

export default function ProposalMachinePage() {
  const [activeTab, setActiveTab] = useState<TabType>('fullProposal');
  const [input, setInput] = useState<ProposalInput>(emptyInput);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const { profile, profileLoading } = useProfile();

  // 更新輸入欄位
  const updateInput = (field: keyof ProposalInput, value: string) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  // 複製功能
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  // 產生完整提案 Prompt
  const generateFullProposalPrompt = (): string => {
    const companyInfo = `
【我的公司資料】

公司名稱：${profile.name || '[你的公司名稱]'}
主要產品/服務：${profile.productService || '[你的產品/服務]'}
產品優勢：
${profile.productAdvantage || '[你的產品優勢]'}

價格區間：${profile.priceRange || '[價格區間]'}

【成功案例】
${profile.commonQuestions?.length > 0 ? profile.commonQuestions.filter(q => q).map((q, i) => `案例 ${i + 1}：${q}`).join('\n') : '[請填入你的成功案例]'}
`.trim();

    return `請幫我製作一份給「${input.targetCompany}」的業務提案書。

## 步驟

1. **搜尋客戶資料**
   - 搜尋「${input.targetCompany}」的官網、最新新聞、公司介紹
   - 了解他們的產業、規模、主要業務
   - 找出他們可能面臨的挑戰或需求

2. **分析需求**
   - 根據搜尋結果，推測他們可能的痛點
   - 思考我的產品/服務如何解決這些問題

3. **製作提案書**
   - 用以下結構產出提案：

---

# ${input.targetCompany} 合作提案書

## 1. 關於貴公司（展現我有做功課）
- 簡述對方公司背景
- 提到近期動態或成績
- 點出可能的挑戰/機會

## 2. 我們觀察到的機會
- 列出 2-3 個我們可以幫忙的地方
- 連結到對方的業務目標

## 3. 建議方案
- 方案概述
- 具體服務內容
- 預期效益

## 4. 成功案例
- 相似產業/規模的客戶
- 他們的問題
- 我們的解決方案
- 達成的成果

## 5. 投資與回報
- 費用說明${input.budget ? `\n- 預算範圍：${input.budget}` : ''}
- ROI 分析（如適用）${input.timeline ? `\n- 預計時程：${input.timeline}` : ''}

## 6. 下一步
- 建議的行動
- 聯絡方式

---

## 客戶資訊

- 客戶公司：${input.targetCompany}
- 客戶產業：${input.targetIndustry || '[產業]'}
- 公司規模：${input.companySize || '[規模]'}
${input.projectDescription ? `- 專案需求：${input.projectDescription}` : ''}
${input.competitors ? `- 競爭對手：${input.competitors}` : ''}

## 我的公司資料（請用這些資料）

${companyInfo}

## 輸出格式

請產出 Word 文件格式（.docx），包含：
- 專業的排版
- 清晰的標題層級
- 適當的間距`;
  };

  // 產生快速提案 Prompt
  const generateQuickProposalPrompt = (): string => {
    const companyInfo = `
公司名稱：${profile.name || '[你的公司名稱]'}
主要產品/服務：${profile.productService || '[你的產品/服務]'}
產品優勢：${profile.productAdvantage || '[你的產品優勢]'}
價格區間：${profile.priceRange || '[價格區間]'}
`.trim();

    return `請幫我製作一份給「${input.targetCompany}」的簡易提案。

搜尋這家公司的基本資料，然後用以下格式產出：

---

# 致 ${input.targetCompany} 合作提案

## 為什麼找我們？

根據我們對貴公司的了解，您可能正在面對：
- [痛點 1]
- [痛點 2]

## 我們的建議

[一段話說明解決方案]

## 成功案例

[公司名稱] 也有類似的挑戰，我們幫助他們 [成果]。

## 下一步

如果您有興趣，我們可以安排一次 30 分鐘的線上會議，進一步了解貴公司的需求。

---

## 客戶資訊

- 客戶公司：${input.targetCompany}
- 客戶產業：${input.targetIndustry || '[產業]'}
${input.scenario ? `- 提案情境：${input.scenario}` : ''}
${input.keyPoints ? `- 關鍵賣點：${input.keyPoints}` : ''}

## 我的公司資料

${companyInfo}`;
  };

  // 產生簡報大綱 Prompt
  const generatePresentationPrompt = (): string => {
    const companyInfo = `
公司名稱：${profile.name || '[你的公司名稱]'}
主要產品/服務：${profile.productService || '[你的產品/服務]'}
產品優勢：${profile.productAdvantage || '[你的產品優勢]'}
`.trim();

    return `請幫我製作一份給「${input.targetCompany}」的提案簡報大綱。

搜尋這家公司的資料，然後產出 10 頁簡報的內容大綱：

---

## 簡報大綱

**第 1 頁：封面**
- 提案標題：${input.topic || '[提案主題]'}
- 日期
- 我的公司 logo

**第 2 頁：關於 ${input.targetCompany}**
- 展現我有做功課
- 讚美他們的成績

**第 3 頁：我們觀察到的機會**
- 2-3 個可以幫忙的地方

**第 4 頁：挑戰**
- 如果不處理，會怎樣？

**第 5 頁：解決方案概述**
- 一句話說明我們怎麼幫

**第 6 頁：具體服務內容**
- 列點說明

**第 7 頁：成功案例**
- 相似客戶的故事

**第 8 頁：投資與回報**
- 費用 + ROI

**第 9 頁：為什麼選我們**
- 3 個差異化優勢

**第 10 頁：下一步**
- CTA + 聯絡方式

---

## 簡報資訊

- 客戶公司：${input.targetCompany}
- 客戶產業：${input.targetIndustry || '[產業]'}
- 聽眾對象：${input.audience || '[聽眾]'}
- 簡報時長：${input.duration || '[時長]'}
- 簡報風格：${input.style || '[風格]'}

請幫我把每一頁的「講者備註」也寫出來，包含：
- 這頁要講什麼
- 預計講多久
- 可能的 Q&A

## 我的公司資料

${companyInfo}`;
  };

  // 產生 Prompt
  const handleGenerate = () => {
    let prompt = '';
    switch (activeTab) {
      case 'fullProposal':
        prompt = generateFullProposalPrompt();
        break;
      case 'quickProposal':
        prompt = generateQuickProposalPrompt();
        break;
      case 'presentation':
        prompt = generatePresentationPrompt();
        break;
    }
    setGeneratedPrompt(prompt);
  };

  // Tab 樣式
  const tabClass = (tab: TabType) => `
    px-6 py-3 text-sm font-medium rounded-t-lg transition-colors
    ${activeTab === tab
      ? 'bg-white text-blue-600 border-t-2 border-l border-r border-blue-500'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }
  `;

  if (profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-500">{t.common.loading}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* 頁面標題 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t.proposalMachine.title}</h1>
          <p className="text-gray-500 mt-1">{t.proposalMachine.subtitle}</p>
        </div>

        {/* 提示：Profile 資料 */}
        {!profile.name && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              提示：請先完成「內容分身」設定，讓系統自動帶入你的公司資料
            </p>
          </div>
        )}

        {/* Tab 導航 */}
        <div className="flex space-x-1 mb-0">
          <button
            onClick={() => setActiveTab('fullProposal')}
            className={tabClass('fullProposal')}
          >
            {t.proposalMachine.tabs.fullProposal}
          </button>
          <button
            onClick={() => setActiveTab('quickProposal')}
            className={tabClass('quickProposal')}
          >
            {t.proposalMachine.tabs.quickProposal}
          </button>
          <button
            onClick={() => setActiveTab('presentation')}
            className={tabClass('presentation')}
          >
            {t.proposalMachine.tabs.presentation}
          </button>
        </div>

        {/* Tab 內容 */}
        <div className="bg-white rounded-b-lg rounded-tr-lg shadow-sm border border-gray-200 p-6">
          {/* 完整提案 Tab */}
          {activeTab === 'fullProposal' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t.proposalMachine.fullProposal.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {t.proposalMachine.fullProposal.description}
                </p>
              </div>

              {/* 客戶資訊 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.customerName}
                  </label>
                  <input
                    type="text"
                    value={input.targetCompany}
                    onChange={(e) => updateInput('targetCompany', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.customerNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.customerIndustry}
                  </label>
                  <input
                    type="text"
                    value={input.targetIndustry}
                    onChange={(e) => updateInput('targetIndustry', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.customerIndustryPlaceholder}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.companySize}{t.proposalMachine.fullProposal.companySizeOptional}
                  </label>
                  <input
                    type="text"
                    value={input.companySize}
                    onChange={(e) => updateInput('companySize', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.companySizePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.budget}
                  </label>
                  <input
                    type="text"
                    value={input.budget}
                    onChange={(e) => updateInput('budget', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.budgetPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.proposalMachine.fullProposal.customerNeeds}
                </label>
                <textarea
                  value={input.projectDescription}
                  onChange={(e) => updateInput('projectDescription', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder={t.proposalMachine.fullProposal.customerNeedsPlaceholder}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.timeline}
                  </label>
                  <input
                    type="text"
                    value={input.timeline}
                    onChange={(e) => updateInput('timeline', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.timelinePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.competitors}
                  </label>
                  <input
                    type="text"
                    value={input.competitors}
                    onChange={(e) => updateInput('competitors', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.competitorsPlaceholder}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!input.targetCompany}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t.proposalMachine.fullProposal.generate}
              </button>
            </div>
          )}

          {/* 快速提案 Tab */}
          {activeTab === 'quickProposal' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t.proposalMachine.quickProposal.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {t.proposalMachine.quickProposal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.customerName}
                  </label>
                  <input
                    type="text"
                    value={input.targetCompany}
                    onChange={(e) => updateInput('targetCompany', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.customerNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.customerIndustry}
                  </label>
                  <input
                    type="text"
                    value={input.targetIndustry}
                    onChange={(e) => updateInput('targetIndustry', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.customerIndustryPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.proposalMachine.quickProposal.scenario}
                </label>
                <textarea
                  value={input.scenario}
                  onChange={(e) => updateInput('scenario', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder={t.proposalMachine.quickProposal.scenarioPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.proposalMachine.quickProposal.keyPoints}
                </label>
                <textarea
                  value={input.keyPoints}
                  onChange={(e) => updateInput('keyPoints', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder={t.proposalMachine.quickProposal.keyPointsPlaceholder}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!input.targetCompany}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t.proposalMachine.quickProposal.generate}
              </button>
            </div>
          )}

          {/* 簡報大綱 Tab */}
          {activeTab === 'presentation' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t.proposalMachine.presentation.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {t.proposalMachine.presentation.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.customerName}
                  </label>
                  <input
                    type="text"
                    value={input.targetCompany}
                    onChange={(e) => updateInput('targetCompany', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.customerNamePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.fullProposal.customerIndustry}
                  </label>
                  <input
                    type="text"
                    value={input.targetIndustry}
                    onChange={(e) => updateInput('targetIndustry', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.fullProposal.customerIndustryPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.proposalMachine.presentation.topic}
                </label>
                <input
                  type="text"
                  value={input.topic}
                  onChange={(e) => updateInput('topic', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t.proposalMachine.presentation.topicPlaceholder}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.presentation.audience}
                  </label>
                  <input
                    type="text"
                    value={input.audience}
                    onChange={(e) => updateInput('audience', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.presentation.audiencePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.proposalMachine.presentation.duration}
                  </label>
                  <input
                    type="text"
                    value={input.duration}
                    onChange={(e) => updateInput('duration', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t.proposalMachine.presentation.durationPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.proposalMachine.presentation.style}
                </label>
                <input
                  type="text"
                  value={input.style}
                  onChange={(e) => updateInput('style', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t.proposalMachine.presentation.stylePlaceholder}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!input.targetCompany}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t.proposalMachine.presentation.generate}
              </button>
            </div>
          )}
        </div>

        {/* 產出結果區 */}
        {generatedPrompt && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t.proposalMachine.result.title}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {copied ? t.common.copied : t.proposalMachine.result.copyResult}
                </button>
                <a
                  href="https://manus.im/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {t.proposalMachine.result.openManus}
                </a>
              </div>
            </div>

            {/* Prompt 顯示區 */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                {generatedPrompt}
              </pre>
            </div>

            {/* 使用說明 */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">使用說明</h4>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>點擊「複製提案」按鈕複製上方 Prompt</li>
                <li>前往 <a href="https://manus.im/" target="_blank" rel="noopener noreferrer" className="underline">Manus.im</a> 並貼上 Prompt</li>
                <li>Manus 會自動搜尋客戶資料並產出完整提案</li>
                <li>等待 2-5 分鐘後即可下載 Word/PDF 格式提案</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
