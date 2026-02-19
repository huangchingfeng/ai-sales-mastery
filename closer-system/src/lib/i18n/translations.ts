// 多語言翻譯系統
// 支援：繁體中文、簡體中文、英文、馬來文、日文、韓文

export type Language = 'zh-TW' | 'zh-CN' | 'en' | 'ms' | 'ja' | 'ko';

export const languageNames: Record<Language, string> = {
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  'en': 'English',
  'ms': 'Bahasa Melayu',
  'ja': '日本語',
  'ko': '한국어',
};

export const translations: Record<Language, {
  // 通用
  common: {
    save: string;
    saved: string;
    next: string;
    previous: string;
    submit: string;
    copy: string;
    copied: string;
    edit: string;
    cancel: string;
    loading: string;
    step: string;
    tip: string;
    back: string;
  };
  // 登入頁
  login: {
    title: string;
    subtitle: string;
    tagline: string;
    email: string;
    password: string;
    loginButton: string;
    loggingIn: string;
    wrongPassword: string;
    noAccount: string;
    signUpTitle: string;
    signInTitle: string;
    hasAccount: string;
    signIn: string;
  };
  // Sidebar
  sidebar: {
    dashboard: string;
    contentClone: string;
    customerLens: string;
    proposalMachine: string;
    followUp: string;
    myProfile: string;
    logout: string;
    defaultUser: string;
  };
  // Dashboard
  dashboard: {
    welcome: string;
    title: string;
    subtitle: string;
    profileComplete: string;
    modules: {
      contentClone: {
        title: string;
        description: string;
        icon: string;
      };
      customerLens: {
        title: string;
        description: string;
        icon: string;
      };
      proposalMachine: {
        title: string;
        description: string;
        icon: string;
      };
      followUp: {
        title: string;
        description: string;
        icon: string;
      };
    };
    enter: string;
    enterModule: string;
    completeProfile: string;
    comingSoon: string;
    stats: {
      aiPrompts: string;
      gems: string;
      modules: string;
      status: string;
      ready: string;
      pending: string;
    };
  };
  // Content Clone
  contentClone: {
    title: string;
    subtitle: string;
    steps: {
      basics: string;
      product: string;
      target: string;
      style: string;
      preference: string;
    };
    // Step 1
    step1: {
      title: string;
      description: string;
      name: string;
      namePlaceholder: string;
      industry: string;
      industryPlaceholder: string;
      jobTitle: string;
      jobTitlePlaceholder: string;
      experience: string;
      experiencePlaceholder: string;
    };
    // Step 2
    step2: {
      title: string;
      description: string;
      product: string;
      productPlaceholder: string;
      advantage: string;
      advantagePlaceholder: string;
      price: string;
      pricePlaceholder: string;
    };
    // Step 3
    step3: {
      title: string;
      description: string;
      idealCustomer: string;
      idealCustomerPlaceholder: string;
      painPoints: string;
      commonQuestions: string;
      questionPlaceholder: string;
    };
    // Step 4
    step4: {
      title: string;
      description: string;
      tone: string;
      catchphrases: string;
      catchphrasesPlaceholder: string;
      avoidWords: string;
      avoidWordsPlaceholder: string;
      sampleWriting: string;
      sampleWritingPlaceholder: string;
    };
    // Step 5
    step5: {
      title: string;
      description: string;
      platforms: string;
      contentLength: string;
      cta: string;
      ctaPlaceholder: string;
    };
  };
  // Customer Lens (模組 2)
  customerLens: {
    title: string;
    subtitle: string;
    tabs: {
      infoCard: string;
      painPoints: string;
      meetingPrep: string;
    };
    infoCard: {
      title: string;
      description: string;
      customerName: string;
      customerNamePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      position: string;
      positionPlaceholder: string;
      linkedinUrl: string;
      linkedinUrlPlaceholder: string;
      otherInfo: string;
      otherInfoPlaceholder: string;
      websiteUrl: string;
      websiteUrlPlaceholder: string;
      newsUrl: string;
      newsUrlOptional: string;
      meetingTime: string;
      generate: string;
      generating: string;
    };
    painPoints: {
      title: string;
      description: string;
      industry: string;
      industryPlaceholder: string;
      role: string;
      rolePlaceholder: string;
      companySize: string;
      companySizePlaceholder: string;
      generate: string;
      generating: string;
    };
    meetingPrep: {
      title: string;
      description: string;
      meetingType: string;
      meetingTypePlaceholder: string;
      duration: string;
      durationPlaceholder: string;
      objectives: string;
      objectivesPlaceholder: string;
      generate: string;
      generating: string;
    };
    result: {
      title: string;
      copyResult: string;
      regenerate: string;
      openNotebookLM: string;
    };
    usage: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    uploadGuide: {
      title: string;
      website: string;
      annualReport: string;
      linkedin: string;
    };
    profileWarning: string;
  };
  // Proposal Machine (模組 3)
  proposalMachine: {
    title: string;
    subtitle: string;
    tabs: {
      fullProposal: string;
      quickProposal: string;
      presentation: string;
    };
    fullProposal: {
      title: string;
      description: string;
      customerName: string;
      customerNamePlaceholder: string;
      customerIndustry: string;
      customerIndustryPlaceholder: string;
      companySize: string;
      companySizePlaceholder: string;
      companySizeOptional: string;
      customerNeeds: string;
      customerNeedsPlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      timeline: string;
      timelinePlaceholder: string;
      competitors: string;
      competitorsPlaceholder: string;
      generate: string;
      generating: string;
    };
    quickProposal: {
      title: string;
      description: string;
      scenario: string;
      scenarioPlaceholder: string;
      keyPoints: string;
      keyPointsPlaceholder: string;
      generate: string;
      generating: string;
    };
    presentation: {
      title: string;
      description: string;
      topic: string;
      topicPlaceholder: string;
      audience: string;
      audiencePlaceholder: string;
      duration: string;
      durationPlaceholder: string;
      style: string;
      stylePlaceholder: string;
      generate: string;
      generating: string;
    };
    result: {
      title: string;
      copyResult: string;
      regenerate: string;
      openManus: string;
      downloadPdf: string;
    };
    usage: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    profileWarning: string;
  };
  // Follow Up (模組 4)
  followUp: {
    title: string;
    subtitle: string;
    scenarios: {
      postMeeting: string;
      silentCustomer: string;
      holiday: string;
      birthday: string;
      valueShare: string;
      referral: string;
    };
    scenarioDescriptions: {
      postMeeting: string;
      silentCustomer: string;
      holiday: string;
      birthday: string;
      valueShare: string;
      referral: string;
    };
    form: {
      selectScenario: string;
      customerName: string;
      customerNamePlaceholder: string;
      companyName: string;
      companyNamePlaceholder: string;
      lastContact: string;
      lastContactPlaceholder: string;
      relationship: string;
      relationshipPlaceholder: string;
      relationshipOptions: {
        stranger: string;
        normal: string;
        familiar: string;
        close: string;
      };
      context: string;
      contextPlaceholder: string;
      tone: string;
      tonePlaceholder: string;
      platform: string;
      platformPlaceholder: string;
      platformOptions: {
        email: string;
        line: string;
        whatsapp: string;
      };
      generate: string;
      generating: string;
      startUsing: string;
      backToSelect: string;
      generateFollowUp: string;
      // Post Meeting fields
      meetingDate: string;
      meetingTopic: string;
      meetingTopicPlaceholder: string;
      meetingPoints: string;
      meetingPointsPlaceholder: string;
      customerQuestions: string;
      customerQuestionsPlaceholder: string;
      nextStep: string;
      nextStepPlaceholder: string;
      // Silent Customer fields
      lastContactDate: string;
      noCloseReason: string;
      noCloseReasonPlaceholder: string;
      lastContentLabel: string;
      lastContentPlaceholder: string;
      approachType: string;
      approachOptions: {
        value: string;
        trend: string;
        greeting: string;
        newService: string;
        other: string;
      };
      approachOtherPlaceholder: string;
      // Holiday fields
      holidayName: string;
      holidayNamePlaceholder: string;
      lastInteraction: string;
      lastInteractionPlaceholder: string;
      feelingLabel: string;
      feelingOptions: {
        formal: string;
        warm: string;
        humor: string;
        simple: string;
      };
      mentionBusiness: string;
      mentionBusinessOptions: {
        none: string;
        light: string;
        clear: string;
      };
      // Birthday fields
      birthdayFeelingOptions: {
        formal: string;
        personal: string;
        humor: string;
      };
      customerInterests: string;
      customerInterestsPlaceholder: string;
      // Value Share fields
      customerIndustry: string;
      customerIndustryPlaceholder: string;
      customerTopics: string;
      customerTopicsPlaceholder: string;
      shareTypeLabel: string;
      shareTypeOptions: {
        article: string;
        report: string;
        news: string;
        tool: string;
        event: string;
      };
      shareTitle: string;
      shareTitlePlaceholder: string;
      shareReason: string;
      shareReasonPlaceholder: string;
      shareLink: string;
      shareLinkPlaceholder: string;
      // Referral fields
      cooperationDuration: string;
      cooperationDurationPlaceholder: string;
      cooperationResult: string;
      cooperationResultPlaceholder: string;
      referralTarget: string;
      referralTargetPlaceholder: string;
      referralIndustry: string;
      referralIndustryPlaceholder: string;
      referralPosition: string;
      referralPositionPlaceholder: string;
      hasReward: string;
      rewardContentPlaceholder: string;
    };
    result: {
      title: string;
      copyMessage: string;
      regenerate: string;
      variations: string;
      openGemini: string;
    };
    usage: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
    };
    profileWarning: string;
  };
  // 產業選項
  industries: string[];
  // 年資選項
  experienceOptions: string[];
  // 價格區間選項
  priceOptions: string[];
  // 痛點選項
  painPointOptions: string[];
  // 語氣風格選項
  toneOptions: string[];
  // 平台選項
  platformOptions: string[];
  // 內容長度選項
  lengthOptions: string[];
  // 結果頁
  results: {
    title: string;
    subtitle: string;
    tabs: {
      content: string;
      presentation: string;
      qa: string;
      sales: string;
      email: string;
    };
    usageTips: string;
    copyPrompt: string;
    copyGemPrompt: string;
    editProfile: string;
    expand: string;
    collapse: string;
    howToUse: string;
    steps: string[];
    gemName: string;
    gemDescription: string;
    howToSetup: string;
    examplePrompts: string;
    levelLabels: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
      all: string;
    };
    promptLevel: string;
    levelFramework: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
    };
    systemPromptTitle: string;
    noProfileTitle: string;
    noProfileDescription: string;
    goToContentClone: string;
  };
  // Profile 頁面
  profile: {
    title: string;
    subtitle: string;
    saveChanges: string;
    saving: string;
    saveError: string;
    expandAll: string;
    collapseAll: string;
  };
  // 註冊相關
  register?: {
    inviteCode: string;
    inviteCodePlaceholder: string;
    inviteCodeRequired: string;
    invalidCode: string;
    name: string;
    namePlaceholder: string;
    passwordHint: string;
    signingUp: string;
    signUp: string;
    nameRequired: string;
  };
  // Footer
  footer: {
    text: string;
    email: string;
  };
  // 表單驗證
  validation: {
    industryRequired: string;
    productRequired: string;
  };
  // Follow-Up prompt 用的 maps
  followUpPromptMaps: {
    approach: {
      value: string;
      trend: string;
      greeting: string;
      newService: string;
      other: string;
    };
    tone: {
      formal: string;
      warm: string;
      humor: string;
      simple: string;
    };
    birthdayTone: {
      formal: string;
      personal: string;
      humor: string;
    };
    business: {
      none: string;
      light: string;
      clear: string;
    };
    shareType: {
      article: string;
      report: string;
      news: string;
      tool: string;
      event: string;
    };
  };
  // Admin 後台
  admin?: {
    title: string;
    inviteCodes: string;
    addStudent: string;
    studentName: string;
    studentEmail: string;
    generateCode: string;
    copyCode: string;
    status: string;
    used: string;
    unused: string;
    // 課程批量管理
    uploadExcel?: string;
    dragDropHint?: string;
    supportedFormats?: string;
    courseList?: string;
    studentList?: string;
    selectCourse?: string;
    importing?: string;
    importSuccess?: string;
    importError?: string;
    noCourses?: string;
    noStudents?: string;
    students?: string;
    excelFormat?: string;
    downloadTemplate?: string;
    adminWarning?: string;
  };
}> = {
  // ============ 繁體中文 ============
  'zh-TW': {
    common: {
      save: '儲存',
      saved: '已儲存',
      next: '下一步',
      previous: '上一步',
      submit: '產生 Prompts',
      copy: '複製',
      copied: '已複製！',
      edit: '編輯',
      cancel: '取消',
      loading: '載入中...',
      step: '步驟',
      tip: '提示',
      back: '返回',
    },
    login: {
      title: 'CLOSER',
      subtitle: '業績自動倍增',
      tagline: 'Close More, Work Less',
      email: 'Email',
      password: '密碼',
      loginButton: '登入',
      loggingIn: '登入中...',
      wrongPassword: '密碼錯誤，請重新輸入',
      noAccount: '還沒有帳號？請聯繫阿峰老師',
      signUpTitle: '學員註冊',
      signInTitle: '學員登入',
      hasAccount: '已有帳號？',
      signIn: '登入',
    },
    sidebar: {
      dashboard: '儀表板',
      contentClone: '內容分身術',
      customerLens: '客戶透視鏡',
      proposalMachine: '提案印鈔機',
      followUp: '跟進永動機',
      myProfile: '我的資料',
      logout: '登出',
      defaultUser: '使用者',
    },
    dashboard: {
      welcome: '歡迎回來',
      title: '選擇一個模組開始使用 AI 助理',
      subtitle: '選擇一個模組開始使用 AI 助理',
      profileComplete: '資料完成度',
      modules: {
        contentClone: {
          title: '內容分身術',
          description: '你睡覺的時候，它幫你發文',
          icon: '✍️',
        },
        customerLens: {
          title: '客戶透視鏡',
          description: '見面之前，你就已經贏了',
          icon: '🔍',
        },
        proposalMachine: {
          title: '提案印鈔機',
          description: '3 分鐘，一份客製化提案',
          icon: '📄',
        },
        followUp: {
          title: '跟進永動機',
          description: '再也不漏掉任何一個客戶',
          icon: '🔄',
        },
      },
      enter: '進入',
      enterModule: '進入模組',
      completeProfile: '請先完成資料填寫',
      comingSoon: '即將推出',
      stats: {
        aiPrompts: 'AI Prompts',
        gems: 'Gems',
        modules: '模組',
        status: '狀態',
        ready: '準備就緒',
        pending: '待完成',
      },
    },
    contentClone: {
      title: 'Content Clone',
      subtitle: '業務分身術',
      steps: {
        basics: '基本資料',
        product: '產品服務',
        target: '目標客群',
        style: '說話風格',
        preference: '內容偏好',
      },
      step1: {
        title: '基本資料',
        description: '讓我們先了解你的背景',
        name: '你的名字',
        namePlaceholder: '例：陳小明',
        industry: '你的產業',
        industryPlaceholder: '請選擇產業',
        jobTitle: '職稱',
        jobTitlePlaceholder: '例：資深業務經理',
        experience: '從業年資',
        experiencePlaceholder: '請選擇',
      },
      step2: {
        title: '產品/服務',
        description: '告訴我你賣什麼',
        product: '主要產品/服務',
        productPlaceholder: '例：企業保險規劃、高端房地產...',
        advantage: '你的核心優勢',
        advantagePlaceholder: '例：10年經驗、專業團隊支援...',
        price: '價格區間',
        pricePlaceholder: '請選擇',
      },
      step3: {
        title: '目標客群',
        description: '你的理想客戶是誰？',
        idealCustomer: '理想客戶描述',
        idealCustomerPlaceholder: '例：30-50歲企業主，年收入500萬以上...',
        painPoints: '客戶常見痛點（可多選）',
        commonQuestions: '客戶最常問的問題',
        questionPlaceholder: '請輸入問題',
      },
      step4: {
        title: '說話風格',
        description: '讓 AI 學會你的風格',
        tone: '你的語氣風格',
        catchphrases: '口頭禪/常用語',
        catchphrasesPlaceholder: '例：「重點是...」「坦白說...」',
        avoidWords: '禁用詞彙',
        avoidWordsPlaceholder: '例：不要說「便宜」，要說「超值」',
        sampleWriting: '參考文字（選填）',
        sampleWritingPlaceholder: '貼上一段你過去寫過的文字，讓 AI 學習你的風格...',
      },
      step5: {
        title: '內容偏好',
        description: '你想在哪裡發布內容？',
        platforms: '主要發布平台',
        contentLength: '內容長度偏好',
        cta: '行動呼籲（CTA）',
        ctaPlaceholder: '例：想了解更多？私訊我',
      },
    },
    customerLens: {
      title: '客戶透視鏡',
      subtitle: '使用 NotebookLM 分析客戶，產出情報卡',
      tabs: {
        infoCard: '客戶情報卡',
        painPoints: '痛點對照表',
        meetingPrep: '會議速查',
      },
      infoCard: {
        title: '客戶情報卡',
        description: '輸入客戶基本資訊，AI 會幫你產出完整情報',
        customerName: '客戶姓名',
        customerNamePlaceholder: '例：王大明',
        company: '公司名稱',
        companyPlaceholder: '例：台積電',
        position: '職稱',
        positionPlaceholder: '例：採購經理',
        linkedinUrl: 'LinkedIn 網址（選填）',
        linkedinUrlPlaceholder: 'https://linkedin.com/in/...',
        otherInfo: '其他已知資訊',
        otherInfoPlaceholder: '例：曾參加過我們的研討會、對環保議題有興趣...',
        websiteUrl: '客戶官網網址',
        websiteUrlPlaceholder: '請輸入客戶官網網址',
        newsUrl: '客戶年報/新聞網址',
        newsUrlOptional: '（選填）',
        meetingTime: '預計會議時間',
        generate: '產生情報卡',
        generating: '分析中...',
      },
      painPoints: {
        title: '痛點對照表',
        description: '根據產業與角色，分析可能的痛點',
        industry: '客戶產業',
        industryPlaceholder: '請選擇產業',
        role: '客戶角色',
        rolePlaceholder: '例：採購、IT、財務、行銷',
        companySize: '公司規模',
        companySizePlaceholder: '例：50人、500人、5000人以上',
        generate: '分析痛點',
        generating: '分析中...',
      },
      meetingPrep: {
        title: '會議速查',
        description: '快速準備會議資料',
        meetingType: '會議類型',
        meetingTypePlaceholder: '例：初次拜訪、提案、談判、售後',
        duration: '預計時長',
        durationPlaceholder: '例：30分鐘、1小時',
        objectives: '會議目標',
        objectivesPlaceholder: '例：了解需求、報價、成交...',
        generate: '產生會議準備',
        generating: '準備中...',
      },
      result: {
        title: '分析結果',
        copyResult: '複製結果',
        regenerate: '重新產生',
        openNotebookLM: '在 NotebookLM 中開啟',
      },
      usage: {
        title: '使用方式：',
        step1: '前往 NotebookLM 建立新筆記本',
        step2: '上傳客戶相關資料（官網截圖、年報 PDF、LinkedIn 資料等）',
        step3: '複製下方 Prompt，貼到 NotebookLM 對話框',
        step4: 'AI 會根據你上傳的資料產出分析結果',
      },
      uploadGuide: {
        title: '請先上傳以下資料到 NotebookLM',
        website: '客戶官網網址',
        annualReport: '客戶年報 / 新聞網址（選填）',
        linkedin: '決策者 LinkedIn 頁面（選填）',
      },
      profileWarning: '建議先到「內容分身術」模組填寫你的產品/服務資料，讓 AI 能產出更精準的分析。',
    },
    proposalMachine: {
      title: '提案印鈔機',
      subtitle: '使用 Manus 自動產出客製化提案',
      tabs: {
        fullProposal: '完整提案',
        quickProposal: '快速提案',
        presentation: '簡報大綱',
      },
      fullProposal: {
        title: '完整提案',
        description: '產出完整的客製化提案書',
        customerName: '客戶名稱',
        customerNamePlaceholder: '例：台積電',
        customerIndustry: '客戶產業',
        customerIndustryPlaceholder: '例：半導體、金融、零售',
        companySize: '公司規模',
        companySizePlaceholder: '例：500人、上市公司',
        companySizeOptional: '（選填）',
        customerNeeds: '客戶需求',
        customerNeedsPlaceholder: '描述客戶的主要需求和期望...',
        budget: '預算範圍',
        budgetPlaceholder: '例：100-200萬',
        timeline: '預計時程',
        timelinePlaceholder: '例：3個月內導入',
        competitors: '競爭對手（選填）',
        competitorsPlaceholder: '例：已在評估 A 公司、B 公司',
        generate: '產生提案',
        generating: '產生中...',
      },
      quickProposal: {
        title: '快速提案',
        description: '3 分鐘產出簡易提案',
        scenario: '提案情境',
        scenarioPlaceholder: '例：客戶想要提升員工生產力',
        keyPoints: '關鍵賣點',
        keyPointsPlaceholder: '例：省時50%、成本降低30%',
        generate: '快速產生',
        generating: '產生中...',
      },
      presentation: {
        title: '簡報大綱',
        description: '產出簡報結構和重點',
        topic: '簡報主題',
        topicPlaceholder: '例：AI 導入企業效益分析',
        audience: '聽眾對象',
        audiencePlaceholder: '例：高階主管、IT 部門',
        duration: '簡報時長',
        durationPlaceholder: '例：15分鐘、30分鐘',
        style: '簡報風格',
        stylePlaceholder: '例：專業嚴謹、輕鬆活潑',
        generate: '產生大綱',
        generating: '產生中...',
      },
      result: {
        title: '提案結果',
        copyResult: '複製提案',
        regenerate: '重新產生',
        openManus: '在 Manus 中編輯',
        downloadPdf: '下載 PDF',
      },
      usage: {
        title: '使用說明',
        step1: '點擊「複製提案」按鈕複製上方 Prompt',
        step2: '前往 Manus.im 並貼上 Prompt',
        step3: 'Manus 會自動搜尋客戶資料並產出完整提案',
        step4: '等待 2-5 分鐘後即可下載 Word/PDF 格式提案',
      },
      profileWarning: '請先完成「內容分身」設定，讓系統自動帶入你的公司資料',
    },
    followUp: {
      title: '跟進永動機',
      subtitle: '用 AI 產出個人化跟進訊息',
      scenarios: {
        postMeeting: '會議後跟進',
        silentCustomer: '沉默客戶喚醒',
        holiday: '節日問候',
        birthday: '生日祝福',
        valueShare: '分享價值',
        referral: '轉介紹請求',
      },
      scenarioDescriptions: {
        postMeeting: '剛開完會，當天或隔天發送感謝訊息，整理重點並推進下一步',
        silentCustomer: '客戶 1-3 個月沒聯絡，重新建立連結，不要太銷售',
        holiday: '新年、中秋、聖誕等節日問候，維繫關係讓客戶記得你',
        birthday: '客戶生日當天或前一天，個人化關懷建立情感連結',
        valueShare: '看到對客戶有用的資訊，提供價值維持存在感',
        referral: '客戶合作順利時，請他幫忙介紹擴大業務範圍',
      },
      form: {
        selectScenario: '選擇跟進情境',
        customerName: '客戶姓名',
        customerNamePlaceholder: '例：王大明',
        companyName: '公司名稱',
        companyNamePlaceholder: '例：ABC 科技公司',
        lastContact: '上次聯繫',
        lastContactPlaceholder: '例：3天前見面、1週前通話',
        relationship: '關係程度',
        relationshipPlaceholder: '例：初次接觸、熟識、老客戶',
        relationshipOptions: {
          stranger: '陌生（第一次聯繫）',
          normal: '普通（見過幾次面）',
          familiar: '熟悉（合作過）',
          close: '很熟（老客戶/朋友）',
        },
        context: '背景資訊',
        contextPlaceholder: '例：上次討論了什麼、有什麼進展...',
        tone: '訊息語氣',
        tonePlaceholder: '例：親切、專業、輕鬆',
        platform: '發送平台',
        platformPlaceholder: '例：LINE、Email、WhatsApp',
        platformOptions: {
          email: 'Email',
          line: 'LINE',
          whatsapp: 'WhatsApp',
        },
        generate: '產生跟進訊息',
        generating: '產生中...',
        startUsing: '開始使用',
        backToSelect: '返回選擇',
        generateFollowUp: '產生跟進訊息 Prompt',
        // Post Meeting fields
        meetingDate: '會議日期',
        meetingTopic: '會議主題',
        meetingTopicPlaceholder: '例：AI 導入計畫討論',
        meetingPoints: '會議重點（每行一個重點）',
        meetingPointsPlaceholder: '1. 第一個重點\n2. 第二個重點\n3. 第三個重點',
        customerQuestions: '客戶提出的問題/疑慮',
        customerQuestionsPlaceholder: '例：培訓時數是否可以調整？預算是否可以分期？',
        nextStep: '約定的下一步',
        nextStepPlaceholder: '例：本週五前提供正式報價',
        // Silent Customer fields
        lastContactDate: '上次聯絡日期',
        noCloseReason: '當時沒成交的原因',
        noCloseReasonPlaceholder: '例：預算不足 / 時機不對 / 需要考慮',
        lastContentLabel: '上次聊的內容',
        lastContentPlaceholder: '例：討論過 AI 培訓方案，客戶表示 Q2 後再考慮',
        approachType: '切入點',
        approachOptions: {
          value: '分享有用資訊',
          trend: '產業趨勢/新聞',
          greeting: '單純問候關心',
          newService: '新服務/優惠',
          other: '其他',
        },
        approachOtherPlaceholder: '請描述你想用的切入點',
        // Holiday fields
        holidayName: '節日名稱',
        holidayNamePlaceholder: '例：農曆新年 / 中秋節 / 聖誕節',
        lastInteraction: '上次互動',
        lastInteractionPlaceholder: '例：上個月開會 / 半年前合作',
        feelingLabel: '傳達的感覺',
        feelingOptions: {
          formal: '正式祝福',
          warm: '溫馨關懷',
          humor: '輕鬆幽默',
          simple: '簡單俐落',
        },
        mentionBusiness: '是否提到業務',
        mentionBusinessOptions: {
          none: '完全不提',
          light: '輕輕帶過',
          clear: '明確提到',
        },
        // Birthday fields
        birthdayFeelingOptions: {
          formal: '正式祝福',
          personal: '溫馨個人化',
          humor: '輕鬆幽默',
        },
        customerInterests: '客戶的興趣/特點（選填，讓祝福更個人化）',
        customerInterestsPlaceholder: '例：愛喝咖啡 / 喜歡高爾夫 / 有兩個小孩',
        // Value Share fields
        customerIndustry: '客戶產業',
        customerIndustryPlaceholder: '例：製造業 / 金融業',
        customerTopics: '他關心的議題',
        customerTopicsPlaceholder: '例：數位轉型 / AI 應用 / 效率提升',
        shareTypeLabel: '分享內容類型',
        shareTypeOptions: {
          article: '文章',
          report: '報告',
          news: '新聞',
          tool: '工具',
          event: '活動',
        },
        shareTitle: '標題或主題',
        shareTitlePlaceholder: '例：2026 製造業 AI 應用趨勢報告',
        shareReason: '為什麼對他有用',
        shareReasonPlaceholder: '例：裡面提到的 ROI 數據跟他之前問的很相關',
        shareLink: '連結（選填）',
        shareLinkPlaceholder: 'https://...',
        // Referral fields
        cooperationDuration: '合作多久',
        cooperationDurationPlaceholder: '例：半年 / 一年 / 三年',
        cooperationResult: '合作成果',
        cooperationResultPlaceholder: '例：效率提升 30% / 營收成長 20%',
        referralTarget: '希望介紹的對象描述',
        referralTargetPlaceholder: '例：正在考慮 AI 培訓的企業主 / 想提升團隊效率的主管',
        referralIndustry: '希望的產業（選填）',
        referralIndustryPlaceholder: '例：科技業 / 製造業',
        referralPosition: '希望的職位（選填）',
        referralPositionPlaceholder: '例：HR主管 / 業務主管',
        hasReward: '我有提供轉介紹獎勵',
        rewardContentPlaceholder: '例：成交後提供 10% 回饋金 / 免費顧問諮詢一次',
      },
      result: {
        title: '跟進訊息',
        copyMessage: '複製訊息',
        regenerate: '換一個版本',
        variations: '其他版本',
        openGemini: '開啟 Gemini',
      },
      usage: {
        title: '使用方式：',
        step1: '複製下方 Prompt',
        step2: '前往 Gemini 或你慣用的 AI 工具',
        step3: '貼上 Prompt，AI 會產出 3 個版本的跟進訊息',
        step4: '選擇適合的版本，稍作調整後發送',
      },
      profileWarning: '建議先到「內容分身術」模組填寫你的基本資料和說話風格，讓 AI 能產出更貼近你風格的訊息。',
    },
    industries: [
      '保險業', '房地產', 'B2B 業務', '金融服務', '汽車銷售',
      '珠寶精品', '科技/IT', '製造業', '顧問服務', '教育培訓',
      '醫療保健', '其他',
    ],
    experienceOptions: ['1-3年', '3-5年', '5-10年', '10年以上'],
    priceOptions: ['10萬以下', '10-50萬', '50-100萬', '100萬以上'],
    painPointOptions: [
      '不知道如何選擇', '擔心買錯', '預算有限', '沒有時間研究',
      '不信任業務員', '比較太多選項', '害怕被推銷',
    ],
    toneOptions: ['專業權威', '親切溫暖', '幽默風趣', '直接爽快', '知性穩重'],
    platformOptions: ['Facebook', 'LINE', 'Instagram', 'LinkedIn', 'WhatsApp', 'Email'],
    lengthOptions: ['簡短（200-300字）', '中等（500-600字）', '完整（800-1000字）'],
    results: {
      title: '你的專屬 AI 助理',
      subtitle: '以下是為你量身打造的 5 個 Gem AI 助理，可直接複製到 Gemini 使用',
      tabs: {
        content: '內容創作',
        presentation: '簡報製作',
        qa: '客戶問答',
        sales: '銷售話術',
        email: 'Email 撰寫',
      },
      usageTips: '使用提示',
      copyPrompt: '複製 Prompt',
      copyGemPrompt: '複製 Gem 提示詞',
      editProfile: '修改資料',
      expand: '展開',
      collapse: '收起',
      howToUse: '如何設定 Gem AI 助理？',
      steps: [
        '複製上方的「Gem 提示詞」',
        '開啟 Gemini（gemini.google.com）',
        '點擊左側「Gems」→「新增 Gem」',
        '貼上提示詞作為「說明」欄位',
        '儲存後就能隨時呼叫助理',
      ],
      gemName: 'Gem 名稱',
      gemDescription: 'Gem 說明',
      howToSetup: '如何設定這個 Gem',
      examplePrompts: '示範提問',
      levelLabels: {
        beginner: '基礎',
        intermediate: '進階',
        advanced: '專家',
        expert: '大師',
        all: '通用',
      },
      promptLevel: 'Prompts 等級',
      levelFramework: {
        beginner: '基礎框架',
        intermediate: '進階框架',
        advanced: '專家級框架',
        expert: '大師級框架',
      },
      systemPromptTitle: 'Gem 系統提示詞',
      noProfileTitle: '尚未填寫資料',
      noProfileDescription: '請先完成「內容分身術」的資料填寫，才能產生專屬 Gem。',
      goToContentClone: '前往填寫資料',
    },
    profile: {
      title: '我的資料',
      subtitle: '編輯你的個人資料，讓 AI 更了解你',
      saveChanges: '儲存變更',
      saving: '儲存中...',
      saveError: '儲存失敗，請重試',
      expandAll: '全部展開',
      collapseAll: '全部收合',
    },
    register: {
      inviteCode: '註冊碼',
      inviteCodePlaceholder: '請輸入 6 位數註冊碼',
      inviteCodeRequired: '請輸入註冊碼',
      invalidCode: '註冊碼無效或不符合',
      name: '姓名',
      namePlaceholder: '請輸入姓名',
      passwordHint: '密碼至少 6 個字元',
      signingUp: '註冊中...',
      signUp: '註冊',
      nameRequired: '請輸入姓名',
    },
    admin: {
      title: '管理後台',
      inviteCodes: '註冊碼管理',
      addStudent: '新增學員',
      studentName: '學員姓名',
      studentEmail: '學員 Email',
      generateCode: '產生註冊碼',
      copyCode: '複製',
      status: '狀態',
      used: '已使用',
      unused: '未使用',
      // 課程批量管理
      uploadExcel: '上傳 Excel',
      dragDropHint: '拖曳 Excel 檔案到此處，或點擊選擇檔案',
      supportedFormats: '支援格式：.xlsx, .xls',
      courseList: '課程列表',
      studentList: '學員名單',
      selectCourse: '請選擇課程查看學員',
      importing: '匯入中...',
      importSuccess: '成功匯入 {count} 位學員',
      importError: '匯入失敗',
      noCourses: '尚無課程',
      noStudents: '此課程尚無學員',
      students: '位學員',
      excelFormat: 'Excel 欄位格式：課程日期/名稱、姓名、Email',
      downloadTemplate: '下載範本',
      adminWarning: '此為管理員專用頁面，所有操作皆有記錄。請確保 Firestore Security Rules 已正確設定以保護資料安全。',
    },
    footer: {
      text: 'CLOSER 業績自動倍增 by Afeng Huang',
      email: 'ai@autolab.cloud',
    },
    validation: {
      industryRequired: '請選擇產業',
      productRequired: '請填寫產品/服務',
    },
    followUpPromptMaps: {
      approach: {
        value: '分享一個對他有用的資訊',
        trend: '提到產業趨勢或新聞',
        greeting: '單純問候關心',
        newService: '提到我們有新的服務/優惠',
        other: '其他',
      },
      tone: {
        formal: '正式祝福',
        warm: '溫馨關懷',
        humor: '輕鬆幽默',
        simple: '簡單俐落',
      },
      birthdayTone: {
        formal: '正式祝福',
        personal: '溫馨個人化',
        humor: '輕鬆幽默',
      },
      business: {
        none: '完全不提（純問候）',
        light: '輕輕帶過（年後有空聊聊）',
        clear: '明確提到（新年新方案）',
      },
      shareType: {
        article: '文章',
        report: '報告',
        news: '新聞',
        tool: '工具',
        event: '活動',
      },
    },
  },

  // ============ 簡體中文 ============
  'zh-CN': {
    common: {
      save: '保存',
      saved: '已保存',
      next: '下一步',
      previous: '上一步',
      submit: '生成 Prompts',
      copy: '复制',
      copied: '已复制！',
      edit: '编辑',
      cancel: '取消',
      loading: '加载中...',
      step: '步骤',
      tip: '提示',
      back: '返回',
    },
    login: {
      title: 'CLOSER',
      subtitle: '业绩自动倍增',
      tagline: 'Close More, Work Less',
      email: '邮箱',
      password: '密码',
      loginButton: '登录',
      loggingIn: '登录中...',
      wrongPassword: '密码错误，请重新输入',
      noAccount: '还没有账号？请联系阿峰老师',
      signUpTitle: '学员注册',
      signInTitle: '学员登录',
      hasAccount: '已有账号？',
      signIn: '登录',
    },
    sidebar: {
      dashboard: '仪表板',
      contentClone: '内容分身术',
      customerLens: '客户透视镜',
      proposalMachine: '提案印钞机',
      followUp: '跟进永动机',
      myProfile: '我的资料',
      logout: '退出登录',
      defaultUser: '用户',
    },
    dashboard: {
      welcome: '欢迎回来',
      title: '选择一个模块开始使用 AI 助理',
      subtitle: '选择一个模块开始使用 AI 助理',
      profileComplete: '资料完成度',
      modules: {
        contentClone: {
          title: '内容分身术',
          description: '你睡觉的时候，它帮你发文',
          icon: '✍️',
        },
        customerLens: {
          title: '客户透视镜',
          description: '见面之前，你就已经赢了',
          icon: '🔍',
        },
        proposalMachine: {
          title: '提案印钞机',
          description: '3 分钟，一份定制化提案',
          icon: '📄',
        },
        followUp: {
          title: '跟进永动机',
          description: '再也不漏掉任何一个客户',
          icon: '🔄',
        },
      },
      enter: '进入',
      enterModule: '进入模块',
      completeProfile: '请先完成资料填写',
      comingSoon: '即将推出',
      stats: {
        aiPrompts: 'AI Prompts',
        gems: 'Gems',
        modules: '模块',
        status: '状态',
        ready: '准备就绪',
        pending: '待完成',
      },
    },
    contentClone: {
      title: 'Content Clone',
      subtitle: '业务分身术',
      steps: {
        basics: '基本资料',
        product: '产品服务',
        target: '目标客群',
        style: '说话风格',
        preference: '内容偏好',
      },
      step1: {
        title: '基本资料',
        description: '让我们先了解你的背景',
        name: '你的名字',
        namePlaceholder: '例：陈小明',
        industry: '你的行业',
        industryPlaceholder: '请选择行业',
        jobTitle: '职称',
        jobTitlePlaceholder: '例：资深销售经理',
        experience: '从业年限',
        experiencePlaceholder: '请选择',
      },
      step2: {
        title: '产品/服务',
        description: '告诉我你卖什么',
        product: '主要产品/服务',
        productPlaceholder: '例：企业保险规划、高端房地产...',
        advantage: '你的核心优势',
        advantagePlaceholder: '例：10年经验、专业团队支持...',
        price: '价格区间',
        pricePlaceholder: '请选择',
      },
      step3: {
        title: '目标客群',
        description: '你的理想客户是谁？',
        idealCustomer: '理想客户描述',
        idealCustomerPlaceholder: '例：30-50岁企业主，年收入500万以上...',
        painPoints: '客户常见痛点（可多选）',
        commonQuestions: '客户最常问的问题',
        questionPlaceholder: '请输入问题',
      },
      step4: {
        title: '说话风格',
        description: '让 AI 学会你的风格',
        tone: '你的语气风格',
        catchphrases: '口头禅/常用语',
        catchphrasesPlaceholder: '例：「重点是...」「坦白说...」',
        avoidWords: '禁用词汇',
        avoidWordsPlaceholder: '例：不要说「便宜」，要说「超值」',
        sampleWriting: '参考文字（选填）',
        sampleWritingPlaceholder: '贴上一段你过去写过的文字，让 AI 学习你的风格...',
      },
      step5: {
        title: '内容偏好',
        description: '你想在哪里发布内容？',
        platforms: '主要发布平台',
        contentLength: '内容长度偏好',
        cta: '行动呼吁（CTA）',
        ctaPlaceholder: '例：想了解更多？私信我',
      },
    },
    customerLens: {
      title: '客户透视镜',
      subtitle: '使用 NotebookLM 分析客户，产出情报卡',
      tabs: {
        infoCard: '客户情报卡',
        painPoints: '痛点对照表',
        meetingPrep: '会议速查',
      },
      infoCard: {
        title: '客户情报卡',
        description: '输入客户基本信息，AI 会帮你产出完整情报',
        customerName: '客户姓名',
        customerNamePlaceholder: '例：王大明',
        company: '公司名称',
        companyPlaceholder: '例：华为',
        position: '职位',
        positionPlaceholder: '例：采购经理',
        linkedinUrl: 'LinkedIn 网址（选填）',
        linkedinUrlPlaceholder: 'https://linkedin.com/in/...',
        otherInfo: '其他已知信息',
        otherInfoPlaceholder: '例：曾参加过我们的研讨会、对环保议题有兴趣...',
        websiteUrl: '客户官网网址',
        websiteUrlPlaceholder: '请输入客户官网网址',
        newsUrl: '客户年报/新闻网址',
        newsUrlOptional: '（选填）',
        meetingTime: '预计会议时间',
        generate: '生成情报卡',
        generating: '分析中...',
      },
      painPoints: {
        title: '痛点对照表',
        description: '根据行业与角色，分析可能的痛点',
        industry: '客户行业',
        industryPlaceholder: '请选择行业',
        role: '客户角色',
        rolePlaceholder: '例：采购、IT、财务、市场',
        companySize: '公司规模',
        companySizePlaceholder: '例：50人、500人、5000人以上',
        generate: '分析痛点',
        generating: '分析中...',
      },
      meetingPrep: {
        title: '会议速查',
        description: '快速准备会议资料',
        meetingType: '会议类型',
        meetingTypePlaceholder: '例：初次拜访、提案、谈判、售后',
        duration: '预计时长',
        durationPlaceholder: '例：30分钟、1小时',
        objectives: '会议目标',
        objectivesPlaceholder: '例：了解需求、报价、成交...',
        generate: '生成会议准备',
        generating: '准备中...',
      },
      result: {
        title: '分析结果',
        copyResult: '复制结果',
        regenerate: '重新生成',
        openNotebookLM: '在 NotebookLM 中打开',
      },
      usage: {
        title: '使用方式：',
        step1: '前往 NotebookLM 创建新笔记本',
        step2: '上传客户相关资料（官网截图、年报 PDF、LinkedIn 资料等）',
        step3: '复制下方 Prompt，贴到 NotebookLM 对话框',
        step4: 'AI 会根据你上传的资料产出分析结果',
      },
      uploadGuide: {
        title: '请先上传以下资料到 NotebookLM',
        website: '客户官网网址',
        annualReport: '客户年报 / 新闻网址（选填）',
        linkedin: '决策者 LinkedIn 页面（选填）',
      },
      profileWarning: '建议先到「内容分身术」模块填写你的产品/服务资料，让 AI 能产出更精准的分析。',
    },
    proposalMachine: {
      title: '提案印钞机',
      subtitle: '使用 Manus 自动产出定制化提案',
      tabs: {
        fullProposal: '完整提案',
        quickProposal: '快速提案',
        presentation: '简报大纲',
      },
      fullProposal: {
        title: '完整提案',
        description: '产出完整的定制化提案书',
        customerName: '客户名称',
        customerNamePlaceholder: '例：华为',
        customerIndustry: '客户行业',
        customerIndustryPlaceholder: '例：半导体、金融、零售',
        companySize: '公司规模',
        companySizePlaceholder: '例：500人、上市公司',
        companySizeOptional: '（选填）',
        customerNeeds: '客户需求',
        customerNeedsPlaceholder: '描述客户的主要需求和期望...',
        budget: '预算范围',
        budgetPlaceholder: '例：100-200万',
        timeline: '预计时程',
        timelinePlaceholder: '例：3个月内导入',
        competitors: '竞争对手（选填）',
        competitorsPlaceholder: '例：已在评估 A 公司、B 公司',
        generate: '生成提案',
        generating: '生成中...',
      },
      quickProposal: {
        title: '快速提案',
        description: '3 分钟产出简易提案',
        scenario: '提案情境',
        scenarioPlaceholder: '例：客户想要提升员工生产力',
        keyPoints: '关键卖点',
        keyPointsPlaceholder: '例：省时50%、成本降低30%',
        generate: '快速生成',
        generating: '生成中...',
      },
      presentation: {
        title: '简报大纲',
        description: '产出简报结构和重点',
        topic: '简报主题',
        topicPlaceholder: '例：AI 导入企业效益分析',
        audience: '听众对象',
        audiencePlaceholder: '例：高管、IT 部门',
        duration: '简报时长',
        durationPlaceholder: '例：15分钟、30分钟',
        style: '简报风格',
        stylePlaceholder: '例：专业严谨、轻松活泼',
        generate: '生成大纲',
        generating: '生成中...',
      },
      result: {
        title: '提案结果',
        copyResult: '复制提案',
        regenerate: '重新生成',
        openManus: '在 Manus 中编辑',
        downloadPdf: '下载 PDF',
      },
      usage: {
        title: '使用说明',
        step1: '点击「复制提案」按钮复制上方 Prompt',
        step2: '前往 Manus.im 并贴上 Prompt',
        step3: 'Manus 会自动搜索客户资料并产出完整提案',
        step4: '等待 2-5 分钟后即可下载 Word/PDF 格式提案',
      },
      profileWarning: '请先完成「内容分身」设置，让系统自动带入你的公司资料',
    },
    followUp: {
      title: '跟进永动机',
      subtitle: '用 AI 产出个人化跟进消息',
      scenarios: {
        postMeeting: '会议后跟进',
        silentCustomer: '沉默客户唤醒',
        holiday: '节日问候',
        birthday: '生日祝福',
        valueShare: '分享价值',
        referral: '转介绍请求',
      },
      scenarioDescriptions: {
        postMeeting: '刚开完会，当天或隔天发送感谢消息，整理重点并推进下一步',
        silentCustomer: '客户 1-3 个月没联络，重新建立连结，不要太销售',
        holiday: '新年、中秋、圣诞等节日问候，维系关系让客户记得你',
        birthday: '客户生日当天或前一天，个人化关怀建立情感连结',
        valueShare: '看到对客户有用的信息，提供价值维持存在感',
        referral: '客户合作顺利时，请他帮忙介绍扩大业务范围',
      },
      form: {
        selectScenario: '选择跟进情境',
        customerName: '客户姓名',
        customerNamePlaceholder: '例：王大明',
        companyName: '公司名称',
        companyNamePlaceholder: '例：ABC 科技公司',
        lastContact: '上次联系',
        lastContactPlaceholder: '例：3天前见面、1周前通话',
        relationship: '关系程度',
        relationshipPlaceholder: '例：初次接触、熟识、老客户',
        relationshipOptions: {
          stranger: '陌生（第一次联系）',
          normal: '普通（见过几次面）',
          familiar: '熟悉（合作过）',
          close: '很熟（老客户/朋友）',
        },
        context: '背景信息',
        contextPlaceholder: '例：上次讨论了什么、有什么进展...',
        tone: '消息语气',
        tonePlaceholder: '例：亲切、专业、轻松',
        platform: '发送平台',
        platformPlaceholder: '例：微信、Email、WhatsApp',
        platformOptions: {
          email: 'Email',
          line: 'LINE',
          whatsapp: 'WhatsApp',
        },
        generate: '生成跟进消息',
        generating: '生成中...',
        startUsing: '开始使用',
        backToSelect: '返回选择',
        generateFollowUp: '生成跟进消息 Prompt',
        // Post Meeting fields
        meetingDate: '会议日期',
        meetingTopic: '会议主题',
        meetingTopicPlaceholder: '例：AI 导入计划讨论',
        meetingPoints: '会议重点（每行一个重点）',
        meetingPointsPlaceholder: '1. 第一个重点\n2. 第二个重点\n3. 第三个重点',
        customerQuestions: '客户提出的问题/疑虑',
        customerQuestionsPlaceholder: '例：培训时数是否可以调整？预算是否可以分期？',
        nextStep: '约定的下一步',
        nextStepPlaceholder: '例：本周五前提供正式报价',
        // Silent Customer fields
        lastContactDate: '上次联络日期',
        noCloseReason: '当时没成交的原因',
        noCloseReasonPlaceholder: '例：预算不足 / 时机不对 / 需要考虑',
        lastContentLabel: '上次聊的内容',
        lastContentPlaceholder: '例：讨论过 AI 培训方案，客户表示 Q2 后再考虑',
        approachType: '切入点',
        approachOptions: {
          value: '分享有用信息',
          trend: '产业趋势/新闻',
          greeting: '单纯问候关心',
          newService: '新服务/优惠',
          other: '其他',
        },
        approachOtherPlaceholder: '请描述你想用的切入点',
        // Holiday fields
        holidayName: '节日名称',
        holidayNamePlaceholder: '例：春节 / 中秋节 / 圣诞节',
        lastInteraction: '上次互动',
        lastInteractionPlaceholder: '例：上个月开会 / 半年前合作',
        feelingLabel: '传达的感觉',
        feelingOptions: {
          formal: '正式祝福',
          warm: '温馨关怀',
          humor: '轻松幽默',
          simple: '简单俐落',
        },
        mentionBusiness: '是否提到业务',
        mentionBusinessOptions: {
          none: '完全不提',
          light: '轻轻带过',
          clear: '明确提到',
        },
        // Birthday fields
        birthdayFeelingOptions: {
          formal: '正式祝福',
          personal: '温馨个人化',
          humor: '轻松幽默',
        },
        customerInterests: '客户的兴趣/特点（选填，让祝福更个人化）',
        customerInterestsPlaceholder: '例：爱喝咖啡 / 喜欢高尔夫 / 有两个小孩',
        // Value Share fields
        customerIndustry: '客户产业',
        customerIndustryPlaceholder: '例：制造业 / 金融业',
        customerTopics: '他关心的议题',
        customerTopicsPlaceholder: '例：数字转型 / AI 应用 / 效率提升',
        shareTypeLabel: '分享内容类型',
        shareTypeOptions: {
          article: '文章',
          report: '报告',
          news: '新闻',
          tool: '工具',
          event: '活动',
        },
        shareTitle: '标题或主题',
        shareTitlePlaceholder: '例：2026 制造业 AI 应用趋势报告',
        shareReason: '为什么对他有用',
        shareReasonPlaceholder: '例：里面提到的 ROI 数据跟他之前问的很相关',
        shareLink: '链接（选填）',
        shareLinkPlaceholder: 'https://...',
        // Referral fields
        cooperationDuration: '合作多久',
        cooperationDurationPlaceholder: '例：半年 / 一年 / 三年',
        cooperationResult: '合作成果',
        cooperationResultPlaceholder: '例：效率提升 30% / 营收成长 20%',
        referralTarget: '希望介绍的对象描述',
        referralTargetPlaceholder: '例：正在考虑 AI 培训的企业主 / 想提升团队效率的主管',
        referralIndustry: '希望的产业（选填）',
        referralIndustryPlaceholder: '例：科技业 / 制造业',
        referralPosition: '希望的职位（选填）',
        referralPositionPlaceholder: '例：HR主管 / 业务主管',
        hasReward: '我有提供转介绍奖励',
        rewardContentPlaceholder: '例：成交后提供 10% 回馈金 / 免费顾问咨询一次',
      },
      result: {
        title: '跟进消息',
        copyMessage: '复制消息',
        regenerate: '换一个版本',
        variations: '其他版本',
        openGemini: '打开 Gemini',
      },
      usage: {
        title: '使用方式：',
        step1: '复制下方 Prompt',
        step2: '前往 Gemini 或你惯用的 AI 工具',
        step3: '粘贴 Prompt，AI 会产出 3 个版本的跟进消息',
        step4: '选择适合的版本，稍作调整后发送',
      },
      profileWarning: '建议先到「内容分身术」模块填写你的基本资料和说话风格，让 AI 能产出更贴近你风格的消息。',
    },
    industries: [
      '保险业', '房地产', 'B2B 销售', '金融服务', '汽车销售',
      '珠宝奢侈品', '科技/IT', '制造业', '咨询服务', '教育培训',
      '医疗健康', '其他',
    ],
    experienceOptions: ['1-3年', '3-5年', '5-10年', '10年以上'],
    priceOptions: ['10万以下', '10-50万', '50-100万', '100万以上'],
    painPointOptions: [
      '不知道如何选择', '担心买错', '预算有限', '没有时间研究',
      '不信任销售员', '比较太多选项', '害怕被推销',
    ],
    toneOptions: ['专业权威', '亲切温暖', '幽默风趣', '直接爽快', '知性稳重'],
    platformOptions: ['Facebook', 'LINE', 'Instagram', 'LinkedIn', 'WhatsApp', 'Email'],
    lengthOptions: ['简短（200-300字）', '中等（500-600字）', '完整（800-1000字）'],
    results: {
      title: '你的专属 AI 助理',
      subtitle: '以下是为你量身打造的 5 个 Gem AI 助理，可直接复制到 Gemini 使用',
      tabs: {
        content: '内容创作',
        presentation: '简报制作',
        qa: '客户问答',
        sales: '销售话术',
        email: 'Email 撰写',
      },
      usageTips: '使用提示',
      copyPrompt: '复制 Prompt',
      copyGemPrompt: '复制 Gem 提示词',
      editProfile: '修改资料',
      expand: '展开',
      collapse: '收起',
      howToUse: '如何设定 Gem AI 助理？',
      steps: [
        '复制上方的「Gem 提示词」',
        '打开 Gemini（gemini.google.com）',
        '点击左侧「Gems」→「新增 Gem」',
        '粘贴提示词作为「说明」栏位',
        '保存后就能随时呼叫助理',
      ],
      gemName: 'Gem 名称',
      gemDescription: 'Gem 说明',
      howToSetup: '如何设定这个 Gem',
      examplePrompts: '示范提问',
      levelLabels: {
        beginner: '基础',
        intermediate: '进阶',
        advanced: '专家',
        expert: '大师',
        all: '通用',
      },
      promptLevel: 'Prompts 等级',
      levelFramework: {
        beginner: '基础框架',
        intermediate: '进阶框架',
        advanced: '专家级框架',
        expert: '大师级框架',
      },
      systemPromptTitle: 'Gem 系统提示词',
      noProfileTitle: '尚未填写资料',
      noProfileDescription: '请先完成「内容分身术」的资料填写，才能生成专属 Gem。',
      goToContentClone: '前往填写资料',
    },
    profile: {
      title: '我的资料',
      subtitle: '编辑你的个人资料，让 AI 更了解你',
      saveChanges: '保存更改',
      saving: '保存中...',
      saveError: '保存失败，请重试',
      expandAll: '全部展开',
      collapseAll: '全部收起',
    },
    register: {
      inviteCode: '注册码',
      inviteCodePlaceholder: '请输入 6 位数注册码',
      inviteCodeRequired: '请输入注册码',
      invalidCode: '注册码无效或不符合',
      name: '姓名',
      namePlaceholder: '请输入姓名',
      passwordHint: '密码至少 6 个字符',
      signingUp: '注册中...',
      signUp: '注册',
      nameRequired: '请输入姓名',
    },
    admin: {
      title: '管理后台',
      inviteCodes: '注册码管理',
      addStudent: '新增学员',
      studentName: '学员姓名',
      studentEmail: '学员 Email',
      generateCode: '生成注册码',
      copyCode: '复制',
      status: '状态',
      used: '已使用',
      unused: '未使用',
      // 课程批量管理
      uploadExcel: '上传 Excel',
      dragDropHint: '拖曳 Excel 文件到此处，或点击选择文件',
      supportedFormats: '支持格式：.xlsx, .xls',
      courseList: '课程列表',
      studentList: '学员名单',
      selectCourse: '请选择课程查看学员',
      importing: '导入中...',
      importSuccess: '成功导入 {count} 位学员',
      importError: '导入失败',
      noCourses: '暂无课程',
      noStudents: '此课程暂无学员',
      students: '位学员',
      excelFormat: 'Excel 栏位格式：课程日期/名称、姓名、Email',
      downloadTemplate: '下载模板',
      adminWarning: '此为管理员专用页面，所有操作均有记录。请确保 Firestore Security Rules 已正确设置以保护数据安全。',
    },
    footer: {
      text: 'CLOSER 业绩自动倍增 by Afeng Huang',
      email: 'ai@autolab.cloud',
    },
    validation: {
      industryRequired: '请选择行业',
      productRequired: '请填写产品/服务',
    },
    followUpPromptMaps: {
      approach: {
        value: '分享一个对他有用的信息',
        trend: '提到产业趋势或新闻',
        greeting: '单纯问候关心',
        newService: '提到我们有新的服务/优惠',
        other: '其他',
      },
      tone: {
        formal: '正式祝福',
        warm: '温馨关怀',
        humor: '轻松幽默',
        simple: '简单利落',
      },
      birthdayTone: {
        formal: '正式祝福',
        personal: '温馨个人化',
        humor: '轻松幽默',
      },
      business: {
        none: '完全不提（纯问候）',
        light: '轻轻带过（年后有空聊聊）',
        clear: '明确提到（新年新方案）',
      },
      shareType: {
        article: '文章',
        report: '报告',
        news: '新闻',
        tool: '工具',
        event: '活动',
      },
    },
  },

  // ============ English ============
  'en': {
    common: {
      save: 'Save',
      saved: 'Saved',
      next: 'Next',
      previous: 'Previous',
      submit: 'Generate Prompts',
      copy: 'Copy',
      copied: 'Copied!',
      edit: 'Edit',
      cancel: 'Cancel',
      loading: 'Loading...',
      step: 'Step',
      tip: 'Tip',
      back: 'Back',
    },
    login: {
      title: 'CLOSER',
      subtitle: 'Double Your Sales',
      tagline: 'Close More, Work Less',
      email: 'Email',
      password: 'Password',
      loginButton: 'Login',
      loggingIn: 'Logging in...',
      wrongPassword: 'Wrong password, please try again',
      noAccount: 'No account yet? Contact Afeng',
      signUpTitle: 'Student Sign Up',
      signInTitle: 'Student Sign In',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
    },
    sidebar: {
      dashboard: 'Dashboard',
      contentClone: 'Content Clone',
      customerLens: 'Customer Lens',
      proposalMachine: 'Proposal Machine',
      followUp: 'Follow-Up Engine',
      myProfile: 'My Profile',
      logout: 'Logout',
      defaultUser: 'User',
    },
    dashboard: {
      welcome: 'Welcome Back',
      title: 'Select a module to start using AI assistants',
      subtitle: 'Select a module to start using AI assistants',
      profileComplete: 'Profile Completion',
      modules: {
        contentClone: {
          title: 'Content Clone',
          description: 'It posts for you while you sleep',
          icon: '✍️',
        },
        customerLens: {
          title: 'Customer Lens',
          description: 'Win before you even meet',
          icon: '🔍',
        },
        proposalMachine: {
          title: 'Proposal Machine',
          description: '3 minutes to a custom proposal',
          icon: '📄',
        },
        followUp: {
          title: 'Follow-Up Engine',
          description: 'Never lose track of any customer',
          icon: '🔄',
        },
      },
      enter: 'Enter',
      enterModule: 'Enter Module',
      completeProfile: 'Please complete your profile first',
      comingSoon: 'Coming Soon',
      stats: {
        aiPrompts: 'AI Prompts',
        gems: 'Gems',
        modules: 'Modules',
        status: 'Status',
        ready: 'Ready',
        pending: 'Pending',
      },
    },
    contentClone: {
      title: 'Content Clone',
      subtitle: 'Your Digital Sales Twin',
      steps: {
        basics: 'Basics',
        product: 'Product',
        target: 'Target',
        style: 'Style',
        preference: 'Preference',
      },
      step1: {
        title: 'Basic Info',
        description: 'Tell us about yourself',
        name: 'Your Name',
        namePlaceholder: 'e.g., John Smith',
        industry: 'Your Industry',
        industryPlaceholder: 'Select industry',
        jobTitle: 'Job Title',
        jobTitlePlaceholder: 'e.g., Senior Sales Manager',
        experience: 'Years of Experience',
        experiencePlaceholder: 'Select',
      },
      step2: {
        title: 'Product/Service',
        description: 'What do you sell?',
        product: 'Main Product/Service',
        productPlaceholder: 'e.g., Enterprise insurance, luxury real estate...',
        advantage: 'Your Core Advantage',
        advantagePlaceholder: 'e.g., 10 years experience, professional team...',
        price: 'Price Range',
        pricePlaceholder: 'Select',
      },
      step3: {
        title: 'Target Audience',
        description: 'Who is your ideal customer?',
        idealCustomer: 'Ideal Customer Description',
        idealCustomerPlaceholder: 'e.g., Business owners aged 30-50, annual income $200K+...',
        painPoints: 'Common Customer Pain Points (multi-select)',
        commonQuestions: 'Most Common Customer Questions',
        questionPlaceholder: 'Enter a question',
      },
      step4: {
        title: 'Communication Style',
        description: 'Let AI learn your voice',
        tone: 'Your Tone of Voice',
        catchphrases: 'Catchphrases',
        catchphrasesPlaceholder: 'e.g., "The key point is...", "To be honest..."',
        avoidWords: 'Words to Avoid',
        avoidWordsPlaceholder: 'e.g., Don\'t say "cheap", say "value"',
        sampleWriting: 'Sample Writing (optional)',
        sampleWritingPlaceholder: 'Paste some text you\'ve written to help AI learn your style...',
      },
      step5: {
        title: 'Content Preferences',
        description: 'Where will you publish?',
        platforms: 'Main Platforms',
        contentLength: 'Preferred Content Length',
        cta: 'Call-to-Action (CTA)',
        ctaPlaceholder: 'e.g., Want to learn more? DM me',
      },
    },
    customerLens: {
      title: 'Customer Lens',
      subtitle: 'Use NotebookLM to analyze customers and generate intel cards',
      tabs: {
        infoCard: 'Customer Intel Card',
        painPoints: 'Pain Point Map',
        meetingPrep: 'Meeting Prep',
      },
      infoCard: {
        title: 'Customer Intel Card',
        description: 'Enter customer info, AI will generate comprehensive intel',
        customerName: 'Customer Name',
        customerNamePlaceholder: 'e.g., John Smith',
        company: 'Company Name',
        companyPlaceholder: 'e.g., Apple Inc.',
        position: 'Position',
        positionPlaceholder: 'e.g., Procurement Manager',
        linkedinUrl: 'LinkedIn URL (optional)',
        linkedinUrlPlaceholder: 'https://linkedin.com/in/...',
        otherInfo: 'Other Known Info',
        otherInfoPlaceholder: 'e.g., Attended our seminar, interested in sustainability...',
        websiteUrl: 'Customer Website URL',
        websiteUrlPlaceholder: 'Enter customer website URL',
        newsUrl: 'Annual Report / News URL',
        newsUrlOptional: '(optional)',
        meetingTime: 'Expected Meeting Time',
        generate: 'Generate Intel Card',
        generating: 'Analyzing...',
      },
      painPoints: {
        title: 'Pain Point Map',
        description: 'Analyze potential pain points by industry and role',
        industry: 'Customer Industry',
        industryPlaceholder: 'Select industry',
        role: 'Customer Role',
        rolePlaceholder: 'e.g., Procurement, IT, Finance, Marketing',
        companySize: 'Company Size',
        companySizePlaceholder: 'e.g., 50, 500, 5000+ employees',
        generate: 'Analyze Pain Points',
        generating: 'Analyzing...',
      },
      meetingPrep: {
        title: 'Meeting Prep',
        description: 'Quickly prepare meeting materials',
        meetingType: 'Meeting Type',
        meetingTypePlaceholder: 'e.g., First visit, Proposal, Negotiation, After-sales',
        duration: 'Expected Duration',
        durationPlaceholder: 'e.g., 30 minutes, 1 hour',
        objectives: 'Meeting Objectives',
        objectivesPlaceholder: 'e.g., Understand needs, Quote, Close deal...',
        generate: 'Generate Meeting Prep',
        generating: 'Preparing...',
      },
      result: {
        title: 'Analysis Results',
        copyResult: 'Copy Results',
        regenerate: 'Regenerate',
        openNotebookLM: 'Open in NotebookLM',
      },
      usage: {
        title: 'How to Use:',
        step1: 'Go to NotebookLM and create a new notebook',
        step2: 'Upload customer materials (website screenshots, annual reports, LinkedIn profiles, etc.)',
        step3: 'Copy the Prompt below and paste it into NotebookLM',
        step4: 'AI will analyze your uploaded materials and generate results',
      },
      uploadGuide: {
        title: 'Please upload the following to NotebookLM first',
        website: 'Customer website URL',
        annualReport: 'Customer annual report / News URL (optional)',
        linkedin: 'Decision maker LinkedIn page (optional)',
      },
      profileWarning: 'We recommend completing your product/service profile in Content Clone first for more accurate AI analysis.',
    },
    proposalMachine: {
      title: 'Proposal Machine',
      subtitle: 'Use Manus to automatically generate custom proposals',
      tabs: {
        fullProposal: 'Full Proposal',
        quickProposal: 'Quick Proposal',
        presentation: 'Presentation Outline',
      },
      fullProposal: {
        title: 'Full Proposal',
        description: 'Generate a complete custom proposal',
        customerName: 'Customer Name',
        customerNamePlaceholder: 'e.g., Apple Inc.',
        customerIndustry: 'Customer Industry',
        customerIndustryPlaceholder: 'e.g., Semiconductor, Finance, Retail',
        companySize: 'Company Size',
        companySizePlaceholder: 'e.g., 500 employees, Public company',
        companySizeOptional: '(optional)',
        customerNeeds: 'Customer Needs',
        customerNeedsPlaceholder: 'Describe main customer needs and expectations...',
        budget: 'Budget Range',
        budgetPlaceholder: 'e.g., $100K-$200K',
        timeline: 'Expected Timeline',
        timelinePlaceholder: 'e.g., Implementation within 3 months',
        competitors: 'Competitors (optional)',
        competitorsPlaceholder: 'e.g., Currently evaluating Company A, Company B',
        generate: 'Generate Proposal',
        generating: 'Generating...',
      },
      quickProposal: {
        title: 'Quick Proposal',
        description: 'Generate a simple proposal in 3 minutes',
        scenario: 'Proposal Scenario',
        scenarioPlaceholder: 'e.g., Customer wants to improve employee productivity',
        keyPoints: 'Key Selling Points',
        keyPointsPlaceholder: 'e.g., Save 50% time, reduce costs by 30%',
        generate: 'Quick Generate',
        generating: 'Generating...',
      },
      presentation: {
        title: 'Presentation Outline',
        description: 'Generate presentation structure and key points',
        topic: 'Presentation Topic',
        topicPlaceholder: 'e.g., AI Implementation ROI Analysis',
        audience: 'Target Audience',
        audiencePlaceholder: 'e.g., Executives, IT Department',
        duration: 'Presentation Duration',
        durationPlaceholder: 'e.g., 15 minutes, 30 minutes',
        style: 'Presentation Style',
        stylePlaceholder: 'e.g., Professional, Casual and engaging',
        generate: 'Generate Outline',
        generating: 'Generating...',
      },
      result: {
        title: 'Proposal Results',
        copyResult: 'Copy Proposal',
        regenerate: 'Regenerate',
        openManus: 'Edit in Manus',
        downloadPdf: 'Download PDF',
      },
      usage: {
        title: 'Instructions',
        step1: 'Click "Copy Proposal" button to copy the Prompt above',
        step2: 'Go to Manus.im and paste the Prompt',
        step3: 'Manus will automatically search customer info and generate a complete proposal',
        step4: 'Wait 2-5 minutes to download the proposal in Word/PDF format',
      },
      profileWarning: 'Please complete your Content Clone profile first so the system can auto-fill your company information',
    },
    followUp: {
      title: 'Follow-Up Engine',
      subtitle: 'Use AI to generate personalized follow-up messages',
      scenarios: {
        postMeeting: 'Post-Meeting Follow-Up',
        silentCustomer: 'Reactivate Silent Customer',
        holiday: 'Holiday Greetings',
        birthday: 'Birthday Wishes',
        valueShare: 'Share Value',
        referral: 'Referral Request',
      },
      scenarioDescriptions: {
        postMeeting: 'Just finished a meeting, send a thank you message the same day or next day to summarize key points and push next steps',
        silentCustomer: 'Customer inactive for 1-3 months, re-establish connection without being too salesy',
        holiday: 'New Year, Mid-Autumn, Christmas greetings to maintain relationship and stay memorable',
        birthday: 'On or before customer birthday, personalized care to build emotional connection',
        valueShare: 'Share useful information with customer to provide value and maintain presence',
        referral: 'When customer relationship is good, ask for referrals to expand business scope',
      },
      form: {
        selectScenario: 'Select Follow-Up Scenario',
        customerName: 'Customer Name',
        customerNamePlaceholder: 'e.g., John Smith',
        companyName: 'Company Name',
        companyNamePlaceholder: 'e.g., ABC Tech Company',
        lastContact: 'Last Contact',
        lastContactPlaceholder: 'e.g., Met 3 days ago, called 1 week ago',
        relationship: 'Relationship Level',
        relationshipPlaceholder: 'e.g., First contact, Familiar, Long-term customer',
        relationshipOptions: {
          stranger: 'Stranger (First contact)',
          normal: 'Normal (Met a few times)',
          familiar: 'Familiar (Have worked together)',
          close: 'Close (Long-term customer/Friend)',
        },
        context: 'Background Info',
        contextPlaceholder: 'e.g., What was discussed, any progress...',
        tone: 'Message Tone',
        tonePlaceholder: 'e.g., Friendly, Professional, Casual',
        platform: 'Sending Platform',
        platformPlaceholder: 'e.g., LINE, Email, WhatsApp',
        platformOptions: {
          email: 'Email',
          line: 'LINE',
          whatsapp: 'WhatsApp',
        },
        generate: 'Generate Follow-Up Message',
        generating: 'Generating...',
        startUsing: 'Start Using',
        backToSelect: 'Back to Selection',
        generateFollowUp: 'Generate Follow-Up Prompt',
        // Post Meeting fields
        meetingDate: 'Meeting Date',
        meetingTopic: 'Meeting Topic',
        meetingTopicPlaceholder: 'e.g., AI Implementation Plan Discussion',
        meetingPoints: 'Key Meeting Points (one per line)',
        meetingPointsPlaceholder: '1. First key point\n2. Second key point\n3. Third key point',
        customerQuestions: 'Customer Questions/Concerns',
        customerQuestionsPlaceholder: 'e.g., Can training hours be adjusted? Can budget be paid in installments?',
        nextStep: 'Agreed Next Step',
        nextStepPlaceholder: 'e.g., Provide formal quote by Friday',
        // Silent Customer fields
        lastContactDate: 'Last Contact Date',
        noCloseReason: 'Reason for Not Closing',
        noCloseReasonPlaceholder: 'e.g., Budget insufficient / Wrong timing / Needs consideration',
        lastContentLabel: 'Previous Discussion',
        lastContentPlaceholder: 'e.g., Discussed AI training plan, customer said to reconsider after Q2',
        approachType: 'Approach Type',
        approachOptions: {
          value: 'Share Useful Info',
          trend: 'Industry Trends/News',
          greeting: 'Simple Greeting',
          newService: 'New Service/Offer',
          other: 'Other',
        },
        approachOtherPlaceholder: 'Describe your approach',
        // Holiday fields
        holidayName: 'Holiday Name',
        holidayNamePlaceholder: 'e.g., Chinese New Year / Christmas / Thanksgiving',
        lastInteraction: 'Last Interaction',
        lastInteractionPlaceholder: 'e.g., Met last month / Worked together 6 months ago',
        feelingLabel: 'Tone/Feeling',
        feelingOptions: {
          formal: 'Formal Blessing',
          warm: 'Warm & Caring',
          humor: 'Light & Humorous',
          simple: 'Simple & Clean',
        },
        mentionBusiness: 'Mention Business?',
        mentionBusinessOptions: {
          none: 'Not at all',
          light: 'Lightly mention',
          clear: 'Clearly mention',
        },
        // Birthday fields
        birthdayFeelingOptions: {
          formal: 'Formal Blessing',
          personal: 'Warm & Personal',
          humor: 'Light & Humorous',
        },
        customerInterests: 'Customer Interests/Traits (optional, for personalization)',
        customerInterestsPlaceholder: 'e.g., Loves coffee / Plays golf / Has two kids',
        // Value Share fields
        customerIndustry: 'Customer Industry',
        customerIndustryPlaceholder: 'e.g., Manufacturing / Finance',
        customerTopics: 'Topics They Care About',
        customerTopicsPlaceholder: 'e.g., Digital transformation / AI applications / Efficiency',
        shareTypeLabel: 'Content Type',
        shareTypeOptions: {
          article: 'Article',
          report: 'Report',
          news: 'News',
          tool: 'Tool',
          event: 'Event',
        },
        shareTitle: 'Title or Topic',
        shareTitlePlaceholder: 'e.g., 2026 Manufacturing AI Trends Report',
        shareReason: 'Why It\'s Useful for Them',
        shareReasonPlaceholder: 'e.g., The ROI data relates to their previous question',
        shareLink: 'Link (optional)',
        shareLinkPlaceholder: 'https://...',
        // Referral fields
        cooperationDuration: 'Cooperation Duration',
        cooperationDurationPlaceholder: 'e.g., 6 months / 1 year / 3 years',
        cooperationResult: 'Cooperation Results',
        cooperationResultPlaceholder: 'e.g., 30% efficiency increase / 20% revenue growth',
        referralTarget: 'Ideal Referral Description',
        referralTargetPlaceholder: 'e.g., Business owners considering AI training / Managers looking to improve team efficiency',
        referralIndustry: 'Preferred Industry (optional)',
        referralIndustryPlaceholder: 'e.g., Tech / Manufacturing',
        referralPosition: 'Preferred Position (optional)',
        referralPositionPlaceholder: 'e.g., HR Manager / Sales Director',
        hasReward: 'I offer referral rewards',
        rewardContentPlaceholder: 'e.g., 10% commission on close / Free consultation session',
      },
      result: {
        title: 'Follow-Up Message',
        copyMessage: 'Copy Message',
        regenerate: 'Try Another Version',
        variations: 'Other Versions',
        openGemini: 'Open Gemini',
      },
      usage: {
        title: 'How to use:',
        step1: 'Copy the Prompt below',
        step2: 'Go to Gemini or your preferred AI tool',
        step3: 'Paste Prompt, AI will generate 3 versions of follow-up messages',
        step4: 'Choose the suitable version, adjust and send',
      },
      profileWarning: 'We recommend completing your basic info and speaking style in Content Clone first for AI messages that match your style.',
    },
    industries: [
      'Insurance', 'Real Estate', 'B2B Sales', 'Financial Services', 'Auto Sales',
      'Luxury Goods', 'Tech/IT', 'Manufacturing', 'Consulting', 'Education',
      'Healthcare', 'Other',
    ],
    experienceOptions: ['1-3 years', '3-5 years', '5-10 years', '10+ years'],
    priceOptions: ['Under $30K', '$30K-$150K', '$150K-$300K', '$300K+'],
    painPointOptions: [
      'Don\'t know how to choose', 'Afraid of making mistakes', 'Limited budget', 'No time to research',
      'Don\'t trust salespeople', 'Too many options', 'Afraid of being sold to',
    ],
    toneOptions: ['Professional', 'Warm & Friendly', 'Humorous', 'Direct', 'Thoughtful'],
    platformOptions: ['Facebook', 'LINE', 'Instagram', 'LinkedIn', 'WhatsApp', 'Email'],
    lengthOptions: ['Short (200-300 words)', 'Medium (500-600 words)', 'Full (800-1000 words)'],
    results: {
      title: 'Your AI Assistants',
      subtitle: 'Here are 5 custom Gem AI assistants built for you. Copy to Gemini and start using.',
      tabs: {
        content: 'Content Creation',
        presentation: 'Presentation',
        qa: 'Customer Q&A',
        sales: 'Sales Scripts',
        email: 'Email Writing',
      },
      usageTips: 'Usage Tips',
      copyPrompt: 'Copy Prompt',
      copyGemPrompt: 'Copy Gem Prompt',
      editProfile: 'Edit Profile',
      expand: 'Expand',
      collapse: 'Collapse',
      howToUse: 'How to set up Gem AI Assistant?',
      steps: [
        'Copy the "Gem Prompt" above',
        'Open Gemini (gemini.google.com)',
        'Click "Gems" on the left → "Create Gem"',
        'Paste the prompt in the "Instructions" field',
        'Save and call your assistant anytime',
      ],
      gemName: 'Gem Name',
      gemDescription: 'Gem Description',
      howToSetup: 'How to set up this Gem',
      examplePrompts: 'Example Prompts',
      levelLabels: {
        beginner: 'Basic',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        expert: 'Master',
        all: 'Universal',
      },
      promptLevel: 'Prompt Level',
      levelFramework: {
        beginner: 'Basic Framework',
        intermediate: 'Intermediate Framework',
        advanced: 'Advanced Framework',
        expert: 'Master Framework',
      },
      systemPromptTitle: 'Gem System Prompt',
      noProfileTitle: 'Profile Not Found',
      noProfileDescription: 'Please complete the Content Clone setup first to generate your personalized Gems.',
      goToContentClone: 'Go to Content Clone',
    },
    profile: {
      title: 'My Profile',
      subtitle: 'Edit your profile information so AI can understand you better',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      saveError: 'Failed to save. Please try again.',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
    },
    register: {
      inviteCode: 'Invite Code',
      inviteCodePlaceholder: 'Enter 6-digit invite code',
      inviteCodeRequired: 'Please enter invite code',
      invalidCode: 'Invalid invite code or email mismatch',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      passwordHint: 'Password must be at least 6 characters',
      signingUp: 'Signing up...',
      signUp: 'Sign Up',
      nameRequired: 'Please enter your name',
    },
    admin: {
      title: 'Admin Panel',
      inviteCodes: 'Invite Code Management',
      addStudent: 'Add Student',
      studentName: 'Student Name',
      studentEmail: 'Student Email',
      generateCode: 'Generate Code',
      copyCode: 'Copy',
      status: 'Status',
      used: 'Used',
      unused: 'Unused',
      // Course batch management
      uploadExcel: 'Upload Excel',
      dragDropHint: 'Drag and drop Excel file here, or click to select',
      supportedFormats: 'Supported formats: .xlsx, .xls',
      courseList: 'Course List',
      studentList: 'Student List',
      selectCourse: 'Select a course to view students',
      importing: 'Importing...',
      importSuccess: 'Successfully imported {count} students',
      importError: 'Import failed',
      noCourses: 'No courses yet',
      noStudents: 'No students in this course',
      students: 'students',
      excelFormat: 'Excel format: Course Date/Name, Name, Email',
      downloadTemplate: 'Download Template',
      adminWarning: 'This is an admin-only page. All operations are logged. Please ensure Firestore Security Rules are properly configured to protect data.',
    },
    footer: {
      text: 'CLOSER Auto-Multiply Revenue by Afeng Huang',
      email: 'ai@autolab.cloud',
    },
    validation: {
      industryRequired: 'Industry is required',
      productRequired: 'Product/Service is required',
    },
    followUpPromptMaps: {
      approach: {
        value: 'Share useful information',
        trend: 'Mention industry trends or news',
        greeting: 'Simple greeting and care',
        newService: 'Mention new services/offers',
        other: 'Other',
      },
      tone: {
        formal: 'Formal blessing',
        warm: 'Warm and caring',
        humor: 'Light and humorous',
        simple: 'Simple and clean',
      },
      birthdayTone: {
        formal: 'Formal blessing',
        personal: 'Warm and personal',
        humor: 'Light and humorous',
      },
      business: {
        none: 'Not at all (pure greeting)',
        light: 'Lightly mention (let\'s catch up after the holidays)',
        clear: 'Clearly mention (new year, new plans)',
      },
      shareType: {
        article: 'Article',
        report: 'Report',
        news: 'News',
        tool: 'Tool',
        event: 'Event',
      },
    },
  },

  // ============ Bahasa Melayu ============
  'ms': {
    common: {
      save: 'Simpan',
      saved: 'Disimpan',
      next: 'Seterusnya',
      previous: 'Sebelumnya',
      submit: 'Jana Prompts',
      copy: 'Salin',
      copied: 'Disalin!',
      edit: 'Edit',
      cancel: 'Batal',
      loading: 'Memuatkan...',
      step: 'Langkah',
      tip: 'Petua',
      back: 'Kembali',
    },
    login: {
      title: 'CLOSER',
      subtitle: 'Gandakan Jualan Anda',
      tagline: 'Close More, Work Less',
      email: 'E-mel',
      password: 'Kata Laluan',
      loginButton: 'Log Masuk',
      loggingIn: 'Sedang log masuk...',
      wrongPassword: 'Kata laluan salah, sila cuba lagi',
      noAccount: 'Tiada akaun? Hubungi Afeng',
      signUpTitle: 'Pendaftaran Pelajar',
      signInTitle: 'Log Masuk Pelajar',
      hasAccount: 'Sudah ada akaun?',
      signIn: 'Log Masuk',
    },
    sidebar: {
      dashboard: 'Papan Pemuka',
      contentClone: 'Klon Kandungan',
      customerLens: 'Lensa Pelanggan',
      proposalMachine: 'Mesin Cadangan',
      followUp: 'Enjin Susulan',
      myProfile: 'Profil Saya',
      logout: 'Log Keluar',
      defaultUser: 'Pengguna',
    },
    dashboard: {
      welcome: 'Selamat Kembali',
      title: 'Pilih modul untuk mula menggunakan pembantu AI',
      subtitle: 'Pilih modul untuk mula menggunakan pembantu AI',
      profileComplete: 'Kelengkapan Profil',
      modules: {
        contentClone: {
          title: 'Klon Kandungan',
          description: 'Ia posting untuk anda semasa anda tidur',
          icon: '✍️',
        },
        customerLens: {
          title: 'Lensa Pelanggan',
          description: 'Menang sebelum anda berjumpa',
          icon: '🔍',
        },
        proposalMachine: {
          title: 'Mesin Cadangan',
          description: '3 minit untuk cadangan tersuai',
          icon: '📄',
        },
        followUp: {
          title: 'Enjin Susulan',
          description: 'Jangan pernah terlepas mana-mana pelanggan',
          icon: '🔄',
        },
      },
      enter: 'Masuk',
      enterModule: 'Masuk Modul',
      completeProfile: 'Sila lengkapkan profil anda dahulu',
      comingSoon: 'Akan Datang',
      stats: {
        aiPrompts: 'AI Prompts',
        gems: 'Gems',
        modules: 'Modul',
        status: 'Status',
        ready: 'Sedia',
        pending: 'Menunggu',
      },
    },
    contentClone: {
      title: 'Content Clone',
      subtitle: 'Klon Jualan Digital Anda',
      steps: {
        basics: 'Asas',
        product: 'Produk',
        target: 'Sasaran',
        style: 'Gaya',
        preference: 'Keutamaan',
      },
      step1: {
        title: 'Maklumat Asas',
        description: 'Beritahu kami tentang diri anda',
        name: 'Nama Anda',
        namePlaceholder: 'cth: Ahmad bin Hassan',
        industry: 'Industri Anda',
        industryPlaceholder: 'Pilih industri',
        jobTitle: 'Jawatan',
        jobTitlePlaceholder: 'cth: Pengurus Jualan Kanan',
        experience: 'Pengalaman (Tahun)',
        experiencePlaceholder: 'Pilih',
      },
      step2: {
        title: 'Produk/Perkhidmatan',
        description: 'Apa yang anda jual?',
        product: 'Produk/Perkhidmatan Utama',
        productPlaceholder: 'cth: Insurans korporat, hartanah mewah...',
        advantage: 'Kelebihan Teras Anda',
        advantagePlaceholder: 'cth: 10 tahun pengalaman, pasukan profesional...',
        price: 'Julat Harga',
        pricePlaceholder: 'Pilih',
      },
      step3: {
        title: 'Sasaran Pelanggan',
        description: 'Siapa pelanggan ideal anda?',
        idealCustomer: 'Deskripsi Pelanggan Ideal',
        idealCustomerPlaceholder: 'cth: Pemilik perniagaan 30-50 tahun, pendapatan RM500K+...',
        painPoints: 'Masalah Pelanggan (pelbagai pilihan)',
        commonQuestions: 'Soalan Lazim Pelanggan',
        questionPlaceholder: 'Masukkan soalan',
      },
      step4: {
        title: 'Gaya Komunikasi',
        description: 'Biarkan AI belajar suara anda',
        tone: 'Nada Suara Anda',
        catchphrases: 'Kata-kata Kegemaran',
        catchphrasesPlaceholder: 'cth: "Poin utama ialah...", "Sejujurnya..."',
        avoidWords: 'Perkataan untuk Dielakkan',
        avoidWordsPlaceholder: 'cth: Jangan kata "murah", kata "berbaloi"',
        sampleWriting: 'Contoh Penulisan (pilihan)',
        sampleWritingPlaceholder: 'Tampal teks yang anda tulis untuk AI belajar gaya anda...',
      },
      step5: {
        title: 'Keutamaan Kandungan',
        description: 'Di mana anda akan menerbitkan?',
        platforms: 'Platform Utama',
        contentLength: 'Panjang Kandungan',
        cta: 'Panggilan Tindakan (CTA)',
        ctaPlaceholder: 'cth: Mahu tahu lebih? DM saya',
      },
    },
    customerLens: {
      title: 'Lensa Pelanggan',
      subtitle: 'Gunakan NotebookLM untuk menganalisis pelanggan dan jana kad intel',
      tabs: {
        infoCard: 'Kad Intel Pelanggan',
        painPoints: 'Peta Masalah',
        meetingPrep: 'Persediaan Mesyuarat',
      },
      infoCard: {
        title: 'Kad Intel Pelanggan',
        description: 'Masukkan maklumat pelanggan, AI akan jana intel lengkap',
        customerName: 'Nama Pelanggan',
        customerNamePlaceholder: 'cth: Ahmad Hassan',
        company: 'Nama Syarikat',
        companyPlaceholder: 'cth: Petronas',
        position: 'Jawatan',
        positionPlaceholder: 'cth: Pengurus Perolehan',
        linkedinUrl: 'URL LinkedIn (pilihan)',
        linkedinUrlPlaceholder: 'https://linkedin.com/in/...',
        otherInfo: 'Maklumat Lain yang Diketahui',
        otherInfoPlaceholder: 'cth: Menghadiri seminar kami, berminat dengan kelestarian...',
        websiteUrl: 'URL Laman Web Pelanggan',
        websiteUrlPlaceholder: 'Masukkan URL laman web pelanggan',
        newsUrl: 'URL Laporan Tahunan / Berita',
        newsUrlOptional: '(pilihan)',
        meetingTime: 'Jangkaan Masa Mesyuarat',
        generate: 'Jana Kad Intel',
        generating: 'Menganalisis...',
      },
      painPoints: {
        title: 'Peta Masalah',
        description: 'Analisis potensi masalah mengikut industri dan peranan',
        industry: 'Industri Pelanggan',
        industryPlaceholder: 'Pilih industri',
        role: 'Peranan Pelanggan',
        rolePlaceholder: 'cth: Perolehan, IT, Kewangan, Pemasaran',
        companySize: 'Saiz Syarikat',
        companySizePlaceholder: 'cth: 50, 500, 5000+ pekerja',
        generate: 'Analisis Masalah',
        generating: 'Menganalisis...',
      },
      meetingPrep: {
        title: 'Persediaan Mesyuarat',
        description: 'Sediakan bahan mesyuarat dengan cepat',
        meetingType: 'Jenis Mesyuarat',
        meetingTypePlaceholder: 'cth: Lawatan pertama, Cadangan, Rundingan, Selepas jualan',
        duration: 'Jangkaan Tempoh',
        durationPlaceholder: 'cth: 30 minit, 1 jam',
        objectives: 'Objektif Mesyuarat',
        objectivesPlaceholder: 'cth: Fahami keperluan, Sebut harga, Tutup perjanjian...',
        generate: 'Jana Persediaan Mesyuarat',
        generating: 'Menyediakan...',
      },
      result: {
        title: 'Hasil Analisis',
        copyResult: 'Salin Hasil',
        regenerate: 'Jana Semula',
        openNotebookLM: 'Buka dalam NotebookLM',
      },
      usage: {
        title: 'Cara Penggunaan:',
        step1: 'Pergi ke NotebookLM dan cipta notebook baru',
        step2: 'Muat naik bahan pelanggan (tangkapan skrin laman web, laporan tahunan, profil LinkedIn, dll.)',
        step3: 'Salin Prompt di bawah dan tampalkannya ke NotebookLM',
        step4: 'AI akan menganalisis bahan yang dimuat naik dan menjana hasil',
      },
      uploadGuide: {
        title: 'Sila muat naik perkara berikut ke NotebookLM dahulu',
        website: 'URL laman web pelanggan',
        annualReport: 'Laporan tahunan / URL berita pelanggan (pilihan)',
        linkedin: 'Halaman LinkedIn pembuat keputusan (pilihan)',
      },
      profileWarning: 'Kami mencadangkan melengkapkan profil produk/perkhidmatan anda di Content Clone terlebih dahulu untuk analisis AI yang lebih tepat.',
    },
    proposalMachine: {
      title: 'Mesin Cadangan',
      subtitle: 'Gunakan Manus untuk menjana cadangan tersuai secara automatik',
      tabs: {
        fullProposal: 'Cadangan Penuh',
        quickProposal: 'Cadangan Pantas',
        presentation: 'Rangka Pembentangan',
      },
      fullProposal: {
        title: 'Cadangan Penuh',
        description: 'Jana cadangan tersuai yang lengkap',
        customerName: 'Nama Pelanggan',
        customerNamePlaceholder: 'cth: Petronas',
        customerIndustry: 'Industri Pelanggan',
        customerIndustryPlaceholder: 'cth: Semikonduktor, Kewangan, Runcit',
        companySize: 'Saiz Syarikat',
        companySizePlaceholder: 'cth: 500 pekerja, Syarikat awam',
        companySizeOptional: '(pilihan)',
        customerNeeds: 'Keperluan Pelanggan',
        customerNeedsPlaceholder: 'Terangkan keperluan dan jangkaan utama pelanggan...',
        budget: 'Julat Bajet',
        budgetPlaceholder: 'cth: RM100K-RM200K',
        timeline: 'Jangkaan Tempoh Masa',
        timelinePlaceholder: 'cth: Pelaksanaan dalam 3 bulan',
        competitors: 'Pesaing (pilihan)',
        competitorsPlaceholder: 'cth: Sedang menilai Syarikat A, Syarikat B',
        generate: 'Jana Cadangan',
        generating: 'Menjana...',
      },
      quickProposal: {
        title: 'Cadangan Pantas',
        description: 'Jana cadangan ringkas dalam 3 minit',
        scenario: 'Senario Cadangan',
        scenarioPlaceholder: 'cth: Pelanggan mahu meningkatkan produktiviti pekerja',
        keyPoints: 'Titik Jualan Utama',
        keyPointsPlaceholder: 'cth: Jimat 50% masa, kurangkan kos 30%',
        generate: 'Jana Pantas',
        generating: 'Menjana...',
      },
      presentation: {
        title: 'Rangka Pembentangan',
        description: 'Jana struktur dan poin utama pembentangan',
        topic: 'Topik Pembentangan',
        topicPlaceholder: 'cth: Analisis ROI Pelaksanaan AI',
        audience: 'Penonton Sasaran',
        audiencePlaceholder: 'cth: Eksekutif, Jabatan IT',
        duration: 'Tempoh Pembentangan',
        durationPlaceholder: 'cth: 15 minit, 30 minit',
        style: 'Gaya Pembentangan',
        stylePlaceholder: 'cth: Profesional, Santai dan menarik',
        generate: 'Jana Rangka',
        generating: 'Menjana...',
      },
      result: {
        title: 'Hasil Cadangan',
        copyResult: 'Salin Cadangan',
        regenerate: 'Jana Semula',
        openManus: 'Edit dalam Manus',
        downloadPdf: 'Muat Turun PDF',
      },
      usage: {
        title: 'Arahan',
        step1: 'Klik butang "Salin Cadangan" untuk menyalin Prompt di atas',
        step2: 'Pergi ke Manus.im dan tampalkan Prompt',
        step3: 'Manus akan mencari maklumat pelanggan secara automatik dan menjana cadangan lengkap',
        step4: 'Tunggu 2-5 minit untuk memuat turun cadangan dalam format Word/PDF',
      },
      profileWarning: 'Sila lengkapkan profil Content Clone anda terlebih dahulu supaya sistem dapat mengisi maklumat syarikat anda secara automatik',
    },
    followUp: {
      title: 'Enjin Susulan',
      subtitle: 'Gunakan AI untuk menjana mesej susulan yang diperibadikan',
      scenarios: {
        postMeeting: 'Susulan Selepas Mesyuarat',
        silentCustomer: 'Aktifkan Pelanggan Senyap',
        holiday: 'Ucapan Perayaan',
        birthday: 'Ucapan Hari Jadi',
        valueShare: 'Kongsi Nilai',
        referral: 'Permintaan Rujukan',
      },
      scenarioDescriptions: {
        postMeeting: 'Baru selesai mesyuarat, hantar mesej terima kasih pada hari yang sama atau esoknya untuk meringkaskan perkara penting',
        silentCustomer: 'Pelanggan tidak aktif selama 1-3 bulan, hubungi semula tanpa terlalu menjual',
        holiday: 'Ucapan Tahun Baru, Pertengahan Musim Luruh, Krismas untuk mengekalkan hubungan',
        birthday: 'Pada atau sebelum hari jadi pelanggan, penjagaan peribadi untuk membina hubungan emosi',
        valueShare: 'Kongsi maklumat berguna dengan pelanggan untuk memberi nilai dan mengekalkan kehadiran',
        referral: 'Apabila hubungan pelanggan baik, minta rujukan untuk memperluaskan skop perniagaan',
      },
      form: {
        selectScenario: 'Pilih Senario Susulan',
        customerName: 'Nama Pelanggan',
        customerNamePlaceholder: 'cth: Ahmad Hassan',
        companyName: 'Nama Syarikat',
        companyNamePlaceholder: 'cth: Syarikat Teknologi ABC',
        lastContact: 'Hubungan Terakhir',
        lastContactPlaceholder: 'cth: Berjumpa 3 hari lalu, telefon 1 minggu lalu',
        relationship: 'Tahap Hubungan',
        relationshipPlaceholder: 'cth: Pertama kali, Rapat, Pelanggan lama',
        relationshipOptions: {
          stranger: 'Asing (Pertama kali)',
          normal: 'Normal (Berjumpa beberapa kali)',
          familiar: 'Akrab (Pernah bekerjasama)',
          close: 'Rapat (Pelanggan lama/Kawan)',
        },
        context: 'Maklumat Latar Belakang',
        contextPlaceholder: 'cth: Apa yang dibincangkan, sebarang kemajuan...',
        tone: 'Nada Mesej',
        tonePlaceholder: 'cth: Mesra, Profesional, Santai',
        platform: 'Platform Penghantaran',
        platformPlaceholder: 'cth: WhatsApp, E-mel, LINE',
        platformOptions: {
          email: 'E-mel',
          line: 'LINE',
          whatsapp: 'WhatsApp',
        },
        generate: 'Jana Mesej Susulan',
        generating: 'Menjana...',
        startUsing: 'Mula Guna',
        backToSelect: 'Kembali ke Pilihan',
        generateFollowUp: 'Jana Prompt Susulan',
        // Post Meeting fields
        meetingDate: 'Tarikh Mesyuarat',
        meetingTopic: 'Topik Mesyuarat',
        meetingTopicPlaceholder: 'cth: Perbincangan Rancangan Pelaksanaan AI',
        meetingPoints: 'Perkara Utama Mesyuarat (satu baris satu)',
        meetingPointsPlaceholder: '1. Perkara pertama\n2. Perkara kedua\n3. Perkara ketiga',
        customerQuestions: 'Soalan/Kebimbangan Pelanggan',
        customerQuestionsPlaceholder: 'cth: Boleh laraskan jam latihan? Boleh bayar ansuran?',
        nextStep: 'Langkah Seterusnya yang Dipersetujui',
        nextStepPlaceholder: 'cth: Berikan sebut harga rasmi sebelum Jumaat',
        // Silent Customer fields
        lastContactDate: 'Tarikh Hubungan Terakhir',
        noCloseReason: 'Sebab Tidak Menutup',
        noCloseReasonPlaceholder: 'cth: Bajet tidak mencukupi / Masa tidak sesuai / Perlu pertimbangan',
        lastContentLabel: 'Perbincangan Sebelumnya',
        lastContentPlaceholder: 'cth: Bincang rancangan latihan AI, pelanggan kata pertimbang selepas Q2',
        approachType: 'Jenis Pendekatan',
        approachOptions: {
          value: 'Kongsi Maklumat Berguna',
          trend: 'Trend/Berita Industri',
          greeting: 'Salam Ringkas',
          newService: 'Perkhidmatan/Tawaran Baru',
          other: 'Lain-lain',
        },
        approachOtherPlaceholder: 'Terangkan pendekatan anda',
        // Holiday fields
        holidayName: 'Nama Perayaan',
        holidayNamePlaceholder: 'cth: Hari Raya Aidilfitri / Tahun Baru Cina / Deepavali',
        lastInteraction: 'Interaksi Terakhir',
        lastInteractionPlaceholder: 'cth: Berjumpa bulan lepas / Bekerjasama 6 bulan lalu',
        feelingLabel: 'Nada/Perasaan',
        feelingOptions: {
          formal: 'Ucapan Rasmi',
          warm: 'Mesra & Prihatin',
          humor: 'Santai & Jenaka',
          simple: 'Ringkas & Bersih',
        },
        mentionBusiness: 'Sebut Perniagaan?',
        mentionBusinessOptions: {
          none: 'Langsung tidak',
          light: 'Sebut sedikit',
          clear: 'Sebut jelas',
        },
        // Birthday fields
        birthdayFeelingOptions: {
          formal: 'Ucapan Rasmi',
          personal: 'Mesra & Peribadi',
          humor: 'Santai & Jenaka',
        },
        customerInterests: 'Minat/Ciri Pelanggan (pilihan, untuk peribadikan)',
        customerInterestsPlaceholder: 'cth: Suka kopi / Main golf / Ada dua anak',
        // Value Share fields
        customerIndustry: 'Industri Pelanggan',
        customerIndustryPlaceholder: 'cth: Pembuatan / Kewangan',
        customerTopics: 'Topik yang Diminati',
        customerTopicsPlaceholder: 'cth: Transformasi digital / Aplikasi AI / Kecekapan',
        shareTypeLabel: 'Jenis Kandungan',
        shareTypeOptions: {
          article: 'Artikel',
          report: 'Laporan',
          news: 'Berita',
          tool: 'Alat',
          event: 'Acara',
        },
        shareTitle: 'Tajuk atau Topik',
        shareTitlePlaceholder: 'cth: Laporan Trend AI Pembuatan 2026',
        shareReason: 'Mengapa Berguna untuk Mereka',
        shareReasonPlaceholder: 'cth: Data ROI berkaitan dengan soalan mereka sebelumnya',
        shareLink: 'Pautan (pilihan)',
        shareLinkPlaceholder: 'https://...',
        // Referral fields
        cooperationDuration: 'Tempoh Kerjasama',
        cooperationDurationPlaceholder: 'cth: 6 bulan / 1 tahun / 3 tahun',
        cooperationResult: 'Hasil Kerjasama',
        cooperationResultPlaceholder: 'cth: 30% peningkatan kecekapan / 20% pertumbuhan hasil',
        referralTarget: 'Penerangan Rujukan Ideal',
        referralTargetPlaceholder: 'cth: Pemilik perniagaan yang mempertimbangkan latihan AI / Pengurus yang ingin tingkatkan kecekapan pasukan',
        referralIndustry: 'Industri Pilihan (pilihan)',
        referralIndustryPlaceholder: 'cth: Teknologi / Pembuatan',
        referralPosition: 'Jawatan Pilihan (pilihan)',
        referralPositionPlaceholder: 'cth: Pengurus HR / Pengarah Jualan',
        hasReward: 'Saya menawarkan ganjaran rujukan',
        rewardContentPlaceholder: 'cth: 10% komisen atas penutupan / Sesi perundingan percuma',
      },
      result: {
        title: 'Mesej Susulan',
        copyMessage: 'Salin Mesej',
        regenerate: 'Cuba Versi Lain',
        variations: 'Versi Lain',
        openGemini: 'Buka Gemini',
      },
      usage: {
        title: 'Cara guna:',
        step1: 'Salin Prompt di bawah',
        step2: 'Pergi ke Gemini atau alat AI pilihan anda',
        step3: 'Tampal Prompt, AI akan jana 3 versi mesej susulan',
        step4: 'Pilih versi yang sesuai, laras dan hantar',
      },
      profileWarning: 'Kami mencadangkan melengkapkan maklumat asas dan gaya pertuturan anda di Content Clone terlebih dahulu untuk mesej AI yang sepadan dengan gaya anda.',
    },
    industries: [
      'Insurans', 'Hartanah', 'Jualan B2B', 'Perkhidmatan Kewangan', 'Jualan Kereta',
      'Barangan Mewah', 'Teknologi/IT', 'Pembuatan', 'Perundingan', 'Pendidikan',
      'Penjagaan Kesihatan', 'Lain-lain',
    ],
    experienceOptions: ['1-3 tahun', '3-5 tahun', '5-10 tahun', '10+ tahun'],
    priceOptions: ['Bawah RM30K', 'RM30K-RM150K', 'RM150K-RM300K', 'RM300K+'],
    painPointOptions: [
      'Tak tahu cara pilih', 'Takut buat kesilapan', 'Bajet terhad', 'Tiada masa untuk kajian',
      'Tak percaya jurujual', 'Terlalu banyak pilihan', 'Takut kena jual',
    ],
    toneOptions: ['Profesional', 'Mesra & Hangat', 'Jenaka', 'Terus Terang', 'Bijaksana'],
    platformOptions: ['Facebook', 'LINE', 'Instagram', 'LinkedIn', 'WhatsApp', 'E-mel'],
    lengthOptions: ['Pendek (200-300 patah)', 'Sederhana (500-600 patah)', 'Penuh (800-1000 patah)'],
    results: {
      title: 'Pembantu AI Anda',
      subtitle: 'Berikut adalah 5 Pembantu Gem AI yang dibina khas untuk anda. Salin ke Gemini dan mula gunakan.',
      tabs: {
        content: 'Penciptaan Kandungan',
        presentation: 'Pembentangan',
        qa: 'Soal Jawab Pelanggan',
        sales: 'Skrip Jualan',
        email: 'Penulisan Email',
      },
      usageTips: 'Tips Penggunaan',
      copyPrompt: 'Salin Prompt',
      copyGemPrompt: 'Salin Prompt Gem',
      editProfile: 'Edit Profil',
      expand: 'Kembang',
      collapse: 'Kuncup',
      howToUse: 'Bagaimana menyediakan Pembantu Gem AI?',
      steps: [
        'Salin "Prompt Gem" di atas',
        'Buka Gemini (gemini.google.com)',
        'Klik "Gems" di sebelah kiri → "Cipta Gem"',
        'Tampal prompt di medan "Arahan"',
        'Simpan dan panggil pembantu anda bila-bila masa',
      ],
      gemName: 'Nama Gem',
      gemDescription: 'Penerangan Gem',
      howToSetup: 'Cara menyediakan Gem ini',
      examplePrompts: 'Contoh Prompt',
      levelLabels: {
        beginner: 'Asas',
        intermediate: 'Pertengahan',
        advanced: 'Lanjutan',
        expert: 'Pakar',
        all: 'Universal',
      },
      promptLevel: 'Tahap Prompt',
      levelFramework: {
        beginner: 'Rangka Kerja Asas',
        intermediate: 'Rangka Kerja Pertengahan',
        advanced: 'Rangka Kerja Lanjutan',
        expert: 'Rangka Kerja Pakar',
      },
      systemPromptTitle: 'Prompt Sistem Gem',
      noProfileTitle: 'Data Belum Diisi',
      noProfileDescription: 'Sila lengkapkan pengisian data Content Clone terlebih dahulu untuk menjana Gem peribadi anda.',
      goToContentClone: 'Pergi ke Content Clone',
    },
    profile: {
      title: 'Profil Saya',
      subtitle: 'Edit maklumat profil anda supaya AI lebih memahami anda',
      saveChanges: 'Simpan Perubahan',
      saving: 'Menyimpan...',
      saveError: 'Gagal menyimpan. Sila cuba lagi.',
      expandAll: 'Kembang Semua',
      collapseAll: 'Kuncup Semua',
    },
    register: {
      inviteCode: 'Kod Jemputan',
      inviteCodePlaceholder: 'Masukkan kod jemputan 6 digit',
      inviteCodeRequired: 'Sila masukkan kod jemputan',
      invalidCode: 'Kod jemputan tidak sah atau tidak sepadan',
      name: 'Nama',
      namePlaceholder: 'Masukkan nama anda',
      passwordHint: 'Kata laluan sekurang-kurangnya 6 aksara',
      signingUp: 'Mendaftar...',
      signUp: 'Daftar',
      nameRequired: 'Sila masukkan nama anda',
    },
    admin: {
      title: 'Panel Pentadbir',
      inviteCodes: 'Pengurusan Kod Jemputan',
      addStudent: 'Tambah Pelajar',
      studentName: 'Nama Pelajar',
      studentEmail: 'Emel Pelajar',
      generateCode: 'Jana Kod',
      copyCode: 'Salin',
      status: 'Status',
      used: 'Digunakan',
      unused: 'Belum Digunakan',
      // Pengurusan kursus kelompok
      uploadExcel: 'Muat Naik Excel',
      dragDropHint: 'Seret dan lepas fail Excel di sini, atau klik untuk memilih',
      supportedFormats: 'Format yang disokong: .xlsx, .xls',
      courseList: 'Senarai Kursus',
      studentList: 'Senarai Pelajar',
      selectCourse: 'Pilih kursus untuk melihat pelajar',
      importing: 'Mengimport...',
      importSuccess: 'Berjaya mengimport {count} pelajar',
      importError: 'Import gagal',
      noCourses: 'Tiada kursus lagi',
      noStudents: 'Tiada pelajar dalam kursus ini',
      students: 'pelajar',
      excelFormat: 'Format Excel: Tarikh/Nama Kursus, Nama, Emel',
      downloadTemplate: 'Muat Turun Templat',
      adminWarning: 'Ini adalah halaman khusus pentadbir. Semua operasi direkodkan. Sila pastikan Firestore Security Rules dikonfigurasi dengan betul untuk melindungi data.',
    },
    footer: {
      text: 'CLOSER Auto-Gandakan Hasil oleh Afeng Huang',
      email: 'ai@autolab.cloud',
    },
    validation: {
      industryRequired: 'Industri diperlukan',
      productRequired: 'Produk/Perkhidmatan diperlukan',
    },
    followUpPromptMaps: {
      approach: {
        value: 'Kongsi maklumat berguna',
        trend: 'Sebut trend industri atau berita',
        greeting: 'Salam ringkas dan prihatin',
        newService: 'Sebut perkhidmatan/tawaran baru',
        other: 'Lain-lain',
      },
      tone: {
        formal: 'Ucapan rasmi',
        warm: 'Mesra dan prihatin',
        humor: 'Santai dan jenaka',
        simple: 'Ringkas dan bersih',
      },
      birthdayTone: {
        formal: 'Ucapan rasmi',
        personal: 'Mesra dan peribadi',
        humor: 'Santai dan jenaka',
      },
      business: {
        none: 'Langsung tidak (salam sahaja)',
        light: 'Sebut sedikit (jom jumpa selepas perayaan)',
        clear: 'Sebut jelas (tahun baru, rancangan baru)',
      },
      shareType: {
        article: 'Artikel',
        report: 'Laporan',
        news: 'Berita',
        tool: 'Alat',
        event: 'Acara',
      },
    },
  },

  // ============ 日本語 ============
  'ja': {
    common: {
      save: '保存',
      saved: '保存しました',
      next: '次へ',
      previous: '戻る',
      submit: 'Promptsを生成',
      copy: 'コピー',
      copied: 'コピーしました！',
      edit: '編集',
      cancel: 'キャンセル',
      loading: '読み込み中...',
      step: 'ステップ',
      tip: 'ヒント',
      back: '戻る',
    },
    login: {
      title: 'CLOSER',
      subtitle: '売上を自動で倍増',
      tagline: 'Close More, Work Less',
      email: 'メールアドレス',
      password: 'パスワード',
      loginButton: 'ログイン',
      loggingIn: 'ログイン中...',
      wrongPassword: 'パスワードが違います',
      noAccount: 'アカウントをお持ちでない方はAfengまでご連絡ください',
      signUpTitle: '受講生登録',
      signInTitle: '受講生ログイン',
      hasAccount: 'アカウントをお持ちですか？',
      signIn: 'ログイン',
    },
    sidebar: {
      dashboard: 'ダッシュボード',
      contentClone: 'コンテンツクローン',
      customerLens: '顧客レンズ',
      proposalMachine: '提案マシン',
      followUp: 'フォローアップエンジン',
      myProfile: 'マイプロフィール',
      logout: 'ログアウト',
      defaultUser: 'ユーザー',
    },
    dashboard: {
      welcome: 'おかえりなさい',
      title: 'モジュールを選択してAIアシスタントを使い始めましょう',
      subtitle: 'モジュールを選択してAIアシスタントを使い始めましょう',
      profileComplete: 'プロフィール完成度',
      modules: {
        contentClone: {
          title: 'コンテンツクローン',
          description: 'あなたが寝ている間に投稿します',
          icon: '✍️',
        },
        customerLens: {
          title: '顧客レンズ',
          description: '会う前にすでに勝っている',
          icon: '🔍',
        },
        proposalMachine: {
          title: '提案マシン',
          description: '3分でカスタム提案を作成',
          icon: '📄',
        },
        followUp: {
          title: 'フォローアップエンジン',
          description: '顧客を逃さない',
          icon: '🔄',
        },
      },
      enter: '入る',
      enterModule: 'モジュールに入る',
      completeProfile: '先にプロフィールを完成させてください',
      comingSoon: '近日公開',
      stats: {
        aiPrompts: 'AI Prompts',
        gems: 'Gems',
        modules: 'モジュール',
        status: 'ステータス',
        ready: '準備完了',
        pending: '保留中',
      },
    },
    contentClone: {
      title: 'Content Clone',
      subtitle: 'あなたの分身営業マン',
      steps: {
        basics: '基本情報',
        product: '商品',
        target: 'ターゲット',
        style: 'スタイル',
        preference: '設定',
      },
      step1: {
        title: '基本情報',
        description: 'あなたについて教えてください',
        name: 'お名前',
        namePlaceholder: '例：山田太郎',
        industry: '業界',
        industryPlaceholder: '業界を選択',
        jobTitle: '役職',
        jobTitlePlaceholder: '例：シニアセールスマネージャー',
        experience: '経験年数',
        experiencePlaceholder: '選択してください',
      },
      step2: {
        title: '商品・サービス',
        description: '何を販売していますか？',
        product: '主な商品・サービス',
        productPlaceholder: '例：法人保険、高級不動産...',
        advantage: 'あなたの強み',
        advantagePlaceholder: '例：10年の経験、専門チームのサポート...',
        price: '価格帯',
        pricePlaceholder: '選択してください',
      },
      step3: {
        title: 'ターゲット顧客',
        description: '理想的な顧客は誰ですか？',
        idealCustomer: '理想的な顧客の説明',
        idealCustomerPlaceholder: '例：30〜50歳の経営者、年収2000万円以上...',
        painPoints: '顧客の悩み（複数選択可）',
        commonQuestions: 'よくある質問',
        questionPlaceholder: '質問を入力',
      },
      step4: {
        title: 'コミュニケーションスタイル',
        description: 'AIにあなたの話し方を学ばせましょう',
        tone: 'トーン',
        catchphrases: '口癖・決まり文句',
        catchphrasesPlaceholder: '例：「ポイントは...」「正直に言うと...」',
        avoidWords: '避けたい言葉',
        avoidWordsPlaceholder: '例：「安い」ではなく「お得」と言う',
        sampleWriting: '参考文章（任意）',
        sampleWritingPlaceholder: '過去に書いた文章を貼り付けて、AIにスタイルを学ばせましょう...',
      },
      step5: {
        title: 'コンテンツ設定',
        description: 'どこで発信しますか？',
        platforms: '主なプラットフォーム',
        contentLength: '文章の長さ',
        cta: 'コールトゥアクション（CTA）',
        ctaPlaceholder: '例：詳しく知りたい方はDMください',
      },
    },
    customerLens: {
      title: '顧客レンズ',
      subtitle: 'NotebookLMを使って顧客を分析し、インテルカードを生成',
      tabs: {
        infoCard: '顧客インテルカード',
        painPoints: '課題マップ',
        meetingPrep: '会議準備',
      },
      infoCard: {
        title: '顧客インテルカード',
        description: '顧客情報を入力すると、AIが包括的なインテルを生成します',
        customerName: '顧客名',
        customerNamePlaceholder: '例：山田太郎',
        company: '会社名',
        companyPlaceholder: '例：トヨタ自動車',
        position: '役職',
        positionPlaceholder: '例：購買マネージャー',
        linkedinUrl: 'LinkedIn URL（任意）',
        linkedinUrlPlaceholder: 'https://linkedin.com/in/...',
        otherInfo: 'その他の既知情報',
        otherInfoPlaceholder: '例：セミナーに参加、サステナビリティに興味あり...',
        websiteUrl: '顧客ウェブサイトURL',
        websiteUrlPlaceholder: '顧客のウェブサイトURLを入力',
        newsUrl: '年次報告書/ニュースURL',
        newsUrlOptional: '（任意）',
        meetingTime: '予定会議時間',
        generate: 'インテルカードを生成',
        generating: '分析中...',
      },
      painPoints: {
        title: '課題マップ',
        description: '業界と役割に基づいて潜在的な課題を分析',
        industry: '顧客の業界',
        industryPlaceholder: '業界を選択',
        role: '顧客の役割',
        rolePlaceholder: '例：購買、IT、財務、マーケティング',
        companySize: '会社規模',
        companySizePlaceholder: '例：50人、500人、5000人以上',
        generate: '課題を分析',
        generating: '分析中...',
      },
      meetingPrep: {
        title: '会議準備',
        description: '会議資料を素早く準備',
        meetingType: '会議タイプ',
        meetingTypePlaceholder: '例：初回訪問、提案、交渉、アフターサービス',
        duration: '予定時間',
        durationPlaceholder: '例：30分、1時間',
        objectives: '会議目標',
        objectivesPlaceholder: '例：ニーズ把握、見積もり、成約...',
        generate: '会議準備を生成',
        generating: '準備中...',
      },
      result: {
        title: '分析結果',
        copyResult: '結果をコピー',
        regenerate: '再生成',
        openNotebookLM: 'NotebookLMで開く',
      },
      usage: {
        title: '使い方：',
        step1: 'NotebookLMで新しいノートブックを作成',
        step2: '顧客資料をアップロード（ウェブサイトのスクリーンショット、年次報告書、LinkedInプロフィールなど）',
        step3: '下のPromptをコピーしてNotebookLMに貼り付け',
        step4: 'AIがアップロードした資料を分析して結果を生成します',
      },
      uploadGuide: {
        title: '最初にNotebookLMに以下をアップロードしてください',
        website: '顧客ウェブサイトURL',
        annualReport: '顧客年次報告書 / ニュースURL（任意）',
        linkedin: '意思決定者のLinkedInページ（任意）',
      },
      profileWarning: 'より正確なAI分析のため、まずContent Cloneで製品/サービスプロフィールを完成させることをお勧めします。',
    },
    proposalMachine: {
      title: '提案マシン',
      subtitle: 'Manusを使ってカスタム提案を自動生成',
      tabs: {
        fullProposal: '完全な提案',
        quickProposal: 'クイック提案',
        presentation: 'プレゼン概要',
      },
      fullProposal: {
        title: '完全な提案',
        description: '完全なカスタム提案書を生成',
        customerName: '顧客名',
        customerNamePlaceholder: '例：トヨタ自動車',
        customerIndustry: '顧客の業界',
        customerIndustryPlaceholder: '例：半導体、金融、小売',
        companySize: '会社規模',
        companySizePlaceholder: '例：500人、上場企業',
        companySizeOptional: '（任意）',
        customerNeeds: '顧客ニーズ',
        customerNeedsPlaceholder: '主な顧客ニーズと期待を説明...',
        budget: '予算範囲',
        budgetPlaceholder: '例：1000万〜2000万円',
        timeline: '予定スケジュール',
        timelinePlaceholder: '例：3ヶ月以内に導入',
        competitors: '競合（任意）',
        competitorsPlaceholder: '例：A社、B社を検討中',
        generate: '提案を生成',
        generating: '生成中...',
      },
      quickProposal: {
        title: 'クイック提案',
        description: '3分で簡易提案を生成',
        scenario: '提案シナリオ',
        scenarioPlaceholder: '例：顧客が従業員の生産性向上を希望',
        keyPoints: 'キーセールスポイント',
        keyPointsPlaceholder: '例：時間50%削減、コスト30%削減',
        generate: 'クイック生成',
        generating: '生成中...',
      },
      presentation: {
        title: 'プレゼン概要',
        description: 'プレゼンの構造と要点を生成',
        topic: 'プレゼントピック',
        topicPlaceholder: '例：AI導入ROI分析',
        audience: 'ターゲットオーディエンス',
        audiencePlaceholder: '例：役員、IT部門',
        duration: 'プレゼン時間',
        durationPlaceholder: '例：15分、30分',
        style: 'プレゼンスタイル',
        stylePlaceholder: '例：プロフェッショナル、カジュアルで魅力的',
        generate: '概要を生成',
        generating: '生成中...',
      },
      result: {
        title: '提案結果',
        copyResult: '提案をコピー',
        regenerate: '再生成',
        openManus: 'Manusで編集',
        downloadPdf: 'PDFダウンロード',
      },
      usage: {
        title: '使用方法',
        step1: '「提案をコピー」ボタンをクリックして上のPromptをコピー',
        step2: 'Manus.imにアクセスしてPromptを貼り付け',
        step3: 'Manusが自動的に顧客情報を検索して完全な提案を作成します',
        step4: '2〜5分待ってWord/PDF形式で提案をダウンロード',
      },
      profileWarning: 'システムが会社情報を自動入力できるよう、まずContent Cloneプロフィールを完成させてください',
    },
    followUp: {
      title: 'フォローアップエンジン',
      subtitle: 'AIでパーソナライズされたフォローアップメッセージを生成',
      scenarios: {
        postMeeting: '会議後フォローアップ',
        silentCustomer: '沈黙顧客の再活性化',
        holiday: '祝日の挨拶',
        birthday: '誕生日のお祝い',
        valueShare: '価値の共有',
        referral: '紹介依頼',
      },
      scenarioDescriptions: {
        postMeeting: '会議直後、当日または翌日にお礼メッセージを送り、重要ポイントをまとめて次のステップを進める',
        silentCustomer: '1〜3ヶ月連絡のない顧客に、セールス感を出さずに再接触',
        holiday: '新年、中秋、クリスマスの挨拶で関係を維持し、記憶に残る',
        birthday: '顧客の誕生日当日または前日に、パーソナライズされた気遣いで感情的なつながりを構築',
        valueShare: '顧客に役立つ情報を共有し、価値を提供して存在感を維持',
        referral: '顧客との関係が良好な時、紹介を依頼してビジネス範囲を拡大',
      },
      form: {
        selectScenario: 'フォローアップシナリオを選択',
        customerName: '顧客名',
        customerNamePlaceholder: '例：山田太郎',
        companyName: '会社名',
        companyNamePlaceholder: '例：ABCテクノロジー株式会社',
        lastContact: '最後の連絡',
        lastContactPlaceholder: '例：3日前に会った、1週間前に電話',
        relationship: '関係レベル',
        relationshipPlaceholder: '例：初回接触、親しい、長期顧客',
        relationshipOptions: {
          stranger: '初対面（初めての連絡）',
          normal: '普通（何度か会った）',
          familiar: '親しい（一緒に仕事をしたことがある）',
          close: '親密（長期顧客/友人）',
        },
        context: '背景情報',
        contextPlaceholder: '例：何を話し合ったか、進展はあったか...',
        tone: 'メッセージトーン',
        tonePlaceholder: '例：フレンドリー、プロフェッショナル、カジュアル',
        platform: '送信プラットフォーム',
        platformPlaceholder: '例：LINE、メール、WhatsApp',
        platformOptions: {
          email: 'メール',
          line: 'LINE',
          whatsapp: 'WhatsApp',
        },
        generate: 'フォローアップメッセージを生成',
        generating: '生成中...',
        startUsing: '使用開始',
        backToSelect: '選択に戻る',
        generateFollowUp: 'フォローアッププロンプトを生成',
        // Post Meeting fields
        meetingDate: '会議日',
        meetingTopic: '会議トピック',
        meetingTopicPlaceholder: '例：AI導入計画の議論',
        meetingPoints: '会議の要点（1行に1つ）',
        meetingPointsPlaceholder: '1. 第一のポイント\n2. 第二のポイント\n3. 第三のポイント',
        customerQuestions: '顧客の質問/懸念',
        customerQuestionsPlaceholder: '例：研修時間の調整は可能？予算の分割払いは？',
        nextStep: '合意した次のステップ',
        nextStepPlaceholder: '例：金曜日までに正式見積もりを提出',
        // Silent Customer fields
        lastContactDate: '最終連絡日',
        noCloseReason: '成約しなかった理由',
        noCloseReasonPlaceholder: '例：予算不足 / タイミングが悪い / 検討が必要',
        lastContentLabel: '前回の話し合い',
        lastContentPlaceholder: '例：AI研修プランを議論、顧客はQ2以降に再検討と回答',
        approachType: 'アプローチ方法',
        approachOptions: {
          value: '有益な情報を共有',
          trend: '業界トレンド/ニュース',
          greeting: 'シンプルな挨拶',
          newService: '新サービス/特典',
          other: 'その他',
        },
        approachOtherPlaceholder: 'アプローチ方法を説明してください',
        // Holiday fields
        holidayName: '祝日名',
        holidayNamePlaceholder: '例：正月 / クリスマス / ゴールデンウィーク',
        lastInteraction: '最後の交流',
        lastInteractionPlaceholder: '例：先月会った / 半年前に協力',
        feelingLabel: 'トーン/雰囲気',
        feelingOptions: {
          formal: 'フォーマルな祝福',
          warm: '温かく思いやりのある',
          humor: '軽くユーモラス',
          simple: 'シンプル＆クリーン',
        },
        mentionBusiness: 'ビジネスに言及？',
        mentionBusinessOptions: {
          none: '全く言及しない',
          light: '軽く触れる',
          clear: 'はっきり言及',
        },
        // Birthday fields
        birthdayFeelingOptions: {
          formal: 'フォーマルな祝福',
          personal: '温かく個人的',
          humor: '軽くユーモラス',
        },
        customerInterests: '顧客の興味/特徴（任意、パーソナライズ用）',
        customerInterestsPlaceholder: '例：コーヒー好き / ゴルフをする / 子供が2人',
        // Value Share fields
        customerIndustry: '顧客の業界',
        customerIndustryPlaceholder: '例：製造業 / 金融業',
        customerTopics: '関心のあるトピック',
        customerTopicsPlaceholder: '例：デジタル変革 / AI活用 / 効率化',
        shareTypeLabel: 'コンテンツタイプ',
        shareTypeOptions: {
          article: '記事',
          report: 'レポート',
          news: 'ニュース',
          tool: 'ツール',
          event: 'イベント',
        },
        shareTitle: 'タイトルまたはトピック',
        shareTitlePlaceholder: '例：2026年製造業AIトレンドレポート',
        shareReason: '役立つ理由',
        shareReasonPlaceholder: '例：ROIデータが以前の質問に関連している',
        shareLink: 'リンク（任意）',
        shareLinkPlaceholder: 'https://...',
        // Referral fields
        cooperationDuration: '協力期間',
        cooperationDurationPlaceholder: '例：6ヶ月 / 1年 / 3年',
        cooperationResult: '協力成果',
        cooperationResultPlaceholder: '例：効率30%向上 / 売上20%増加',
        referralTarget: '理想的な紹介先の説明',
        referralTargetPlaceholder: '例：AI研修を検討中の経営者 / チーム効率を高めたいマネージャー',
        referralIndustry: '希望業界（任意）',
        referralIndustryPlaceholder: '例：IT業界 / 製造業',
        referralPosition: '希望役職（任意）',
        referralPositionPlaceholder: '例：人事部長 / 営業部長',
        hasReward: '紹介報酬を提供します',
        rewardContentPlaceholder: '例：成約時10%コミッション / 無料コンサルセッション',
      },
      result: {
        title: 'フォローアップメッセージ',
        copyMessage: 'メッセージをコピー',
        regenerate: '別バージョンを試す',
        variations: '他のバージョン',
        openGemini: 'Geminiを開く',
      },
      usage: {
        title: '使い方：',
        step1: '下のプロンプトをコピー',
        step2: 'Geminiまたはお好みのAIツールへ',
        step3: 'プロンプトを貼り付け、AIが3バージョンのフォローアップメッセージを生成',
        step4: '適切なバージョンを選び、調整して送信',
      },
      profileWarning: 'あなたのスタイルに合ったAIメッセージのため、まずContent Cloneで基本情報と話し方のスタイルを完成させることをお勧めします。',
    },
    industries: [
      '保険', '不動産', 'B2B営業', '金融サービス', '自動車販売',
      '高級品', 'IT/テック', '製造業', 'コンサルティング', '教育',
      'ヘルスケア', 'その他',
    ],
    experienceOptions: ['1〜3年', '3〜5年', '5〜10年', '10年以上'],
    priceOptions: ['100万円未満', '100〜500万円', '500〜1000万円', '1000万円以上'],
    painPointOptions: [
      '選び方がわからない', '間違いが怖い', '予算が限られている', '調べる時間がない',
      '営業マンを信用できない', '選択肢が多すぎる', '売り込まれたくない',
    ],
    toneOptions: ['プロフェッショナル', '親しみやすい', 'ユーモラス', 'ストレート', '知的'],
    platformOptions: ['Facebook', 'LINE', 'Instagram', 'LinkedIn', 'WhatsApp', 'メール'],
    lengthOptions: ['短め（200〜300文字）', '普通（500〜600文字）', '長め（800〜1000文字）'],
    results: {
      title: 'あなた専用AIアシスタント',
      subtitle: 'あなた専用の5つのGem AIアシスタントです。Geminiにコピーしてすぐに使えます。',
      tabs: {
        content: 'コンテンツ作成',
        presentation: 'プレゼン資料',
        qa: '顧客Q&A',
        sales: '営業トーク',
        email: 'メール作成',
      },
      usageTips: '使い方のヒント',
      copyPrompt: 'Promptをコピー',
      copyGemPrompt: 'Gemプロンプトをコピー',
      editProfile: 'プロフィール編集',
      expand: '展開',
      collapse: '折りたたむ',
      howToUse: 'Gem AIアシスタントの設定方法',
      steps: [
        '上の「Gemプロンプト」をコピー',
        'Gemini（gemini.google.com）を開く',
        '左側の「Gems」→「Gemを作成」をクリック',
        '「説明」欄にプロンプトを貼り付け',
        '保存していつでもアシスタントを呼び出せます',
      ],
      gemName: 'Gem名',
      gemDescription: 'Gem説明',
      howToSetup: 'このGemの設定方法',
      examplePrompts: '使用例',
      levelLabels: {
        beginner: '基礎',
        intermediate: '中級',
        advanced: '上級',
        expert: 'マスター',
        all: '汎用',
      },
      promptLevel: 'Promptレベル',
      levelFramework: {
        beginner: '基礎フレームワーク',
        intermediate: '中級フレームワーク',
        advanced: '上級フレームワーク',
        expert: 'マスターフレームワーク',
      },
      systemPromptTitle: 'Gem システムプロンプト',
      noProfileTitle: 'データ未入力',
      noProfileDescription: '「コンテンツクローン」のデータ入力を完了してから、専用Gemを生成してください。',
      goToContentClone: 'データ入力へ',
    },
    profile: {
      title: 'マイプロフィール',
      subtitle: 'プロフィール情報を編集して、AIにあなたをより理解させましょう',
      saveChanges: '変更を保存',
      saving: '保存中...',
      saveError: '保存に失敗しました。もう一度お試しください。',
      expandAll: 'すべて展開',
      collapseAll: 'すべて折りたたむ',
    },
    register: {
      inviteCode: '招待コード',
      inviteCodePlaceholder: '6桁の招待コードを入力',
      inviteCodeRequired: '招待コードを入力してください',
      invalidCode: '招待コードが無効またはメールアドレスが一致しません',
      name: '氏名',
      namePlaceholder: '氏名を入力してください',
      passwordHint: 'パスワードは6文字以上',
      signingUp: '登録中...',
      signUp: '登録',
      nameRequired: '氏名を入力してください',
    },
    admin: {
      title: '管理パネル',
      inviteCodes: '招待コード管理',
      addStudent: '受講者を追加',
      studentName: '受講者名',
      studentEmail: '受講者メール',
      generateCode: 'コードを生成',
      copyCode: 'コピー',
      status: 'ステータス',
      used: '使用済み',
      unused: '未使用',
      // コースバッチ管理
      uploadExcel: 'Excel をアップロード',
      dragDropHint: 'Excel ファイルをここにドラッグ＆ドロップするか、クリックして選択',
      supportedFormats: '対応形式：.xlsx, .xls',
      courseList: 'コース一覧',
      studentList: '受講者一覧',
      selectCourse: 'コースを選択して受講者を表示',
      importing: 'インポート中...',
      importSuccess: '{count} 名の受講者をインポートしました',
      importError: 'インポート失敗',
      noCourses: 'コースがありません',
      noStudents: 'このコースには受講者がいません',
      students: '名',
      excelFormat: 'Excel 形式：コース日付/名前、氏名、メール',
      downloadTemplate: 'テンプレートをダウンロード',
      adminWarning: 'これは管理者専用ページです。すべての操作は記録されます。データを保護するために Firestore Security Rules が正しく設定されていることを確認してください。',
    },
    footer: {
      text: 'CLOSER 業績自動倍増 by Afeng Huang',
      email: 'ai@autolab.cloud',
    },
    validation: {
      industryRequired: '業種を選択してください',
      productRequired: '製品/サービスを入力してください',
    },
    followUpPromptMaps: {
      approach: {
        value: '役立つ情報を共有',
        trend: '業界トレンドやニュースに言及',
        greeting: 'シンプルな挨拶と気遣い',
        newService: '新サービス/特典に言及',
        other: 'その他',
      },
      tone: {
        formal: 'フォーマルな祝福',
        warm: '温かく思いやりのある',
        humor: '軽くユーモラス',
        simple: 'シンプル＆クリーン',
      },
      birthdayTone: {
        formal: 'フォーマルな祝福',
        personal: '温かく個人的',
        humor: '軽くユーモラス',
      },
      business: {
        none: '全く言及しない（純粋な挨拶）',
        light: '軽く触れる（休暇後にお会いしましょう）',
        clear: 'はっきり言及（新年、新プラン）',
      },
      shareType: {
        article: '記事',
        report: 'レポート',
        news: 'ニュース',
        tool: 'ツール',
        event: 'イベント',
      },
    },
  },

  // ============ 한국어 ============
  'ko': {
    common: {
      save: '저장',
      saved: '저장됨',
      next: '다음',
      previous: '이전',
      submit: 'Prompts 생성',
      copy: '복사',
      copied: '복사됨!',
      edit: '편집',
      cancel: '취소',
      loading: '로딩 중...',
      step: '단계',
      tip: '팁',
      back: '돌아가기',
    },
    login: {
      title: 'CLOSER',
      subtitle: '매출 자동 2배',
      tagline: 'Close More, Work Less',
      email: '이메일',
      password: '비밀번호',
      loginButton: '로그인',
      loggingIn: '로그인 중...',
      wrongPassword: '비밀번호가 틀렸습니다. 다시 시도해 주세요',
      noAccount: '계정이 없으신가요? Afeng에게 연락하세요',
      signUpTitle: '수강생 등록',
      signInTitle: '수강생 로그인',
      hasAccount: '이미 계정이 있으신가요?',
      signIn: '로그인',
    },
    sidebar: {
      dashboard: '대시보드',
      contentClone: '콘텐츠 클론',
      customerLens: '고객 렌즈',
      proposalMachine: '제안 머신',
      followUp: '후속 엔진',
      myProfile: '내 프로필',
      logout: '로그아웃',
      defaultUser: '사용자',
    },
    dashboard: {
      welcome: '돌아오신 것을 환영합니다',
      title: '모듈을 선택하여 AI 어시스턴트 사용을 시작하세요',
      subtitle: '모듈을 선택하여 AI 어시스턴트 사용을 시작하세요',
      profileComplete: '프로필 완성도',
      modules: {
        contentClone: {
          title: '콘텐츠 클론',
          description: '당신이 자는 동안 게시합니다',
          icon: '✍️',
        },
        customerLens: {
          title: '고객 렌즈',
          description: '만나기 전에 이미 승리',
          icon: '🔍',
        },
        proposalMachine: {
          title: '제안 머신',
          description: '3분 만에 맞춤 제안서',
          icon: '📄',
        },
        followUp: {
          title: '후속 엔진',
          description: '고객을 놓치지 마세요',
          icon: '🔄',
        },
      },
      enter: '입장',
      enterModule: '모듈 입장',
      completeProfile: '먼저 프로필을 완성해 주세요',
      comingSoon: '출시 예정',
      stats: {
        aiPrompts: 'AI Prompts',
        gems: 'Gems',
        modules: '모듈',
        status: '상태',
        ready: '준비 완료',
        pending: '대기 중',
      },
    },
    contentClone: {
      title: 'Content Clone',
      subtitle: '당신의 디지털 영업 분신',
      steps: {
        basics: '기본 정보',
        product: '제품',
        target: '타겟',
        style: '스타일',
        preference: '설정',
      },
      step1: {
        title: '기본 정보',
        description: '자신에 대해 알려주세요',
        name: '이름',
        namePlaceholder: '예: 김영수',
        industry: '업종',
        industryPlaceholder: '업종 선택',
        jobTitle: '직책',
        jobTitlePlaceholder: '예: 시니어 영업 매니저',
        experience: '경력',
        experiencePlaceholder: '선택하세요',
      },
      step2: {
        title: '제품/서비스',
        description: '무엇을 판매하시나요?',
        product: '주요 제품/서비스',
        productPlaceholder: '예: 기업 보험, 고급 부동산...',
        advantage: '핵심 강점',
        advantagePlaceholder: '예: 10년 경력, 전문 팀 지원...',
        price: '가격대',
        pricePlaceholder: '선택하세요',
      },
      step3: {
        title: '타겟 고객',
        description: '이상적인 고객은 누구인가요?',
        idealCustomer: '이상적인 고객 설명',
        idealCustomerPlaceholder: '예: 30-50세 사업주, 연수입 2억 이상...',
        painPoints: '고객의 고민 (다중 선택)',
        commonQuestions: '자주 묻는 질문',
        questionPlaceholder: '질문을 입력하세요',
      },
      step4: {
        title: '커뮤니케이션 스타일',
        description: 'AI가 당신의 말투를 배우게 하세요',
        tone: '톤',
        catchphrases: '자주 쓰는 표현',
        catchphrasesPlaceholder: '예: "핵심은...", "솔직히 말하면..."',
        avoidWords: '피해야 할 단어',
        avoidWordsPlaceholder: '예: "싸다" 대신 "가성비 좋다"',
        sampleWriting: '샘플 글 (선택)',
        sampleWritingPlaceholder: '이전에 작성한 글을 붙여넣어 AI가 스타일을 배우게 하세요...',
      },
      step5: {
        title: '콘텐츠 설정',
        description: '어디에 게시하시나요?',
        platforms: '주요 플랫폼',
        contentLength: '선호하는 글 길이',
        cta: '콜투액션 (CTA)',
        ctaPlaceholder: '예: 더 알고 싶으시면 DM 주세요',
      },
    },
    customerLens: {
      title: '고객 렌즈',
      subtitle: 'NotebookLM을 사용하여 고객을 분석하고 인텔 카드 생성',
      tabs: {
        infoCard: '고객 인텔 카드',
        painPoints: '문제점 맵',
        meetingPrep: '미팅 준비',
      },
      infoCard: {
        title: '고객 인텔 카드',
        description: '고객 정보를 입력하면 AI가 종합적인 인텔을 생성합니다',
        customerName: '고객 이름',
        customerNamePlaceholder: '예: 김영수',
        company: '회사명',
        companyPlaceholder: '예: 삼성전자',
        position: '직책',
        positionPlaceholder: '예: 구매 매니저',
        linkedinUrl: 'LinkedIn URL (선택)',
        linkedinUrlPlaceholder: 'https://linkedin.com/in/...',
        otherInfo: '기타 알려진 정보',
        otherInfoPlaceholder: '예: 세미나 참석, 지속가능성에 관심...',
        websiteUrl: '고객 웹사이트 URL',
        websiteUrlPlaceholder: '고객 웹사이트 URL 입력',
        newsUrl: '연차보고서/뉴스 URL',
        newsUrlOptional: '(선택)',
        meetingTime: '예상 미팅 시간',
        generate: '인텔 카드 생성',
        generating: '분석 중...',
      },
      painPoints: {
        title: '문제점 맵',
        description: '산업과 역할에 따른 잠재적 문제점 분석',
        industry: '고객 산업',
        industryPlaceholder: '산업 선택',
        role: '고객 역할',
        rolePlaceholder: '예: 구매, IT, 재무, 마케팅',
        companySize: '회사 규모',
        companySizePlaceholder: '예: 50명, 500명, 5000명 이상',
        generate: '문제점 분석',
        generating: '분석 중...',
      },
      meetingPrep: {
        title: '미팅 준비',
        description: '미팅 자료를 빠르게 준비',
        meetingType: '미팅 유형',
        meetingTypePlaceholder: '예: 첫 방문, 제안, 협상, 사후 서비스',
        duration: '예상 시간',
        durationPlaceholder: '예: 30분, 1시간',
        objectives: '미팅 목표',
        objectivesPlaceholder: '예: 니즈 파악, 견적, 계약 체결...',
        generate: '미팅 준비 생성',
        generating: '준비 중...',
      },
      result: {
        title: '분석 결과',
        copyResult: '결과 복사',
        regenerate: '다시 생성',
        openNotebookLM: 'NotebookLM에서 열기',
      },
      usage: {
        title: '사용 방법:',
        step1: 'NotebookLM에서 새 노트북 만들기',
        step2: '고객 자료 업로드 (웹사이트 스크린샷, 연간 보고서, LinkedIn 프로필 등)',
        step3: '아래 Prompt를 복사하여 NotebookLM에 붙여넣기',
        step4: 'AI가 업로드된 자료를 분석하여 결과를 생성합니다',
      },
      uploadGuide: {
        title: '먼저 NotebookLM에 다음을 업로드하세요',
        website: '고객 웹사이트 URL',
        annualReport: '고객 연간 보고서 / 뉴스 URL (선택)',
        linkedin: '의사결정자 LinkedIn 페이지 (선택)',
      },
      profileWarning: '더 정확한 AI 분석을 위해 먼저 Content Clone에서 제품/서비스 프로필을 완성하는 것을 권장합니다.',
    },
    proposalMachine: {
      title: '제안 머신',
      subtitle: 'Manus를 사용하여 맞춤 제안서 자동 생성',
      tabs: {
        fullProposal: '전체 제안서',
        quickProposal: '빠른 제안',
        presentation: '프레젠테이션 개요',
      },
      fullProposal: {
        title: '전체 제안서',
        description: '완전한 맞춤 제안서 생성',
        customerName: '고객 이름',
        customerNamePlaceholder: '예: 삼성전자',
        customerIndustry: '고객 산업',
        customerIndustryPlaceholder: '예: 반도체, 금융, 소매',
        companySize: '회사 규모',
        companySizePlaceholder: '예: 500명, 상장 기업',
        companySizeOptional: '(선택)',
        customerNeeds: '고객 니즈',
        customerNeedsPlaceholder: '주요 고객 니즈와 기대를 설명...',
        budget: '예산 범위',
        budgetPlaceholder: '예: 1억-2억원',
        timeline: '예상 일정',
        timelinePlaceholder: '예: 3개월 내 도입',
        competitors: '경쟁사 (선택)',
        competitorsPlaceholder: '예: A사, B사 검토 중',
        generate: '제안서 생성',
        generating: '생성 중...',
      },
      quickProposal: {
        title: '빠른 제안',
        description: '3분 만에 간단한 제안서 생성',
        scenario: '제안 시나리오',
        scenarioPlaceholder: '예: 고객이 직원 생산성 향상을 원함',
        keyPoints: '핵심 셀링 포인트',
        keyPointsPlaceholder: '예: 시간 50% 절약, 비용 30% 절감',
        generate: '빠른 생성',
        generating: '생성 중...',
      },
      presentation: {
        title: '프레젠테이션 개요',
        description: '프레젠테이션 구조와 핵심 포인트 생성',
        topic: '프레젠테이션 주제',
        topicPlaceholder: '예: AI 도입 ROI 분석',
        audience: '대상 청중',
        audiencePlaceholder: '예: 임원, IT 부서',
        duration: '프레젠테이션 시간',
        durationPlaceholder: '예: 15분, 30분',
        style: '프레젠테이션 스타일',
        stylePlaceholder: '예: 전문적, 캐주얼하고 매력적',
        generate: '개요 생성',
        generating: '생성 중...',
      },
      result: {
        title: '제안서 결과',
        copyResult: '제안서 복사',
        regenerate: '다시 생성',
        openManus: 'Manus에서 편집',
        downloadPdf: 'PDF 다운로드',
      },
      usage: {
        title: '사용 방법',
        step1: '"제안서 복사" 버튼을 클릭하여 위의 Prompt 복사',
        step2: 'Manus.im으로 이동하여 Prompt 붙여넣기',
        step3: 'Manus가 자동으로 고객 정보를 검색하고 완전한 제안서를 생성합니다',
        step4: '2-5분 후 Word/PDF 형식으로 제안서 다운로드',
      },
      profileWarning: '시스템이 회사 정보를 자동으로 입력할 수 있도록 먼저 Content Clone 프로필을 완성해 주세요',
    },
    followUp: {
      title: '후속 엔진',
      subtitle: 'AI를 사용하여 개인화된 후속 메시지 생성',
      scenarios: {
        postMeeting: '미팅 후 후속',
        silentCustomer: '침묵 고객 재활성화',
        holiday: '명절 인사',
        birthday: '생일 축하',
        valueShare: '가치 공유',
        referral: '소개 요청',
      },
      scenarioDescriptions: {
        postMeeting: '회의 직후, 당일 또는 다음 날 감사 메시지를 보내 주요 사항을 요약하고 다음 단계 진행',
        silentCustomer: '1-3개월 동안 연락이 없는 고객에게 판매 느낌 없이 재연결',
        holiday: '새해, 추석, 크리스마스 인사로 관계를 유지하고 기억에 남기',
        birthday: '고객 생일 당일 또는 전날, 개인화된 배려로 감정적 연결 구축',
        valueShare: '고객에게 유용한 정보를 공유하여 가치를 제공하고 존재감 유지',
        referral: '고객 관계가 좋을 때 추천을 요청하여 비즈니스 범위 확대',
      },
      form: {
        selectScenario: '후속 시나리오 선택',
        customerName: '고객 이름',
        customerNamePlaceholder: '예: 김영수',
        companyName: '회사명',
        companyNamePlaceholder: '예: ABC 테크놀로지',
        lastContact: '마지막 연락',
        lastContactPlaceholder: '예: 3일 전 만남, 1주 전 통화',
        relationship: '관계 수준',
        relationshipPlaceholder: '예: 첫 접촉, 친함, 오래된 고객',
        relationshipOptions: {
          stranger: '처음 (첫 연락)',
          normal: '보통 (몇 번 만남)',
          familiar: '친숙함 (함께 일한 적 있음)',
          close: '친밀함 (오래된 고객/친구)',
        },
        context: '배경 정보',
        contextPlaceholder: '예: 무엇을 논의했는지, 진전이 있었는지...',
        tone: '메시지 톤',
        tonePlaceholder: '예: 친근한, 전문적인, 캐주얼한',
        platform: '발송 플랫폼',
        platformPlaceholder: '예: 카카오톡, 이메일, WhatsApp',
        platformOptions: {
          email: '이메일',
          line: 'LINE',
          whatsapp: 'WhatsApp',
        },
        generate: '후속 메시지 생성',
        generating: '생성 중...',
        startUsing: '사용 시작',
        backToSelect: '선택으로 돌아가기',
        generateFollowUp: '후속 프롬프트 생성',
        // Post Meeting fields
        meetingDate: '회의 날짜',
        meetingTopic: '회의 주제',
        meetingTopicPlaceholder: '예: AI 도입 계획 논의',
        meetingPoints: '회의 핵심 포인트 (한 줄에 하나)',
        meetingPointsPlaceholder: '1. 첫 번째 포인트\n2. 두 번째 포인트\n3. 세 번째 포인트',
        customerQuestions: '고객 질문/우려사항',
        customerQuestionsPlaceholder: '예: 교육 시간 조정 가능? 예산 분할 납부 가능?',
        nextStep: '합의된 다음 단계',
        nextStepPlaceholder: '예: 금요일까지 정식 견적 제출',
        // Silent Customer fields
        lastContactDate: '마지막 연락 날짜',
        noCloseReason: '성사되지 않은 이유',
        noCloseReasonPlaceholder: '예: 예산 부족 / 타이밍 안 맞음 / 고려 필요',
        lastContentLabel: '이전 논의 내용',
        lastContentPlaceholder: '예: AI 교육 계획 논의, 고객이 Q2 이후 재고려한다고 함',
        approachType: '접근 방식',
        approachOptions: {
          value: '유용한 정보 공유',
          trend: '업계 트렌드/뉴스',
          greeting: '간단한 인사',
          newService: '신규 서비스/혜택',
          other: '기타',
        },
        approachOtherPlaceholder: '접근 방식을 설명해주세요',
        // Holiday fields
        holidayName: '명절 이름',
        holidayNamePlaceholder: '예: 설날 / 추석 / 크리스마스',
        lastInteraction: '마지막 교류',
        lastInteractionPlaceholder: '예: 지난달 만남 / 6개월 전 협력',
        feelingLabel: '톤/느낌',
        feelingOptions: {
          formal: '격식 있는 축하',
          warm: '따뜻하고 배려하는',
          humor: '가볍고 유머러스',
          simple: '심플 & 깔끔',
        },
        mentionBusiness: '비즈니스 언급?',
        mentionBusinessOptions: {
          none: '전혀 안 함',
          light: '가볍게 언급',
          clear: '명확히 언급',
        },
        // Birthday fields
        birthdayFeelingOptions: {
          formal: '격식 있는 축하',
          personal: '따뜻하고 개인적',
          humor: '가볍고 유머러스',
        },
        customerInterests: '고객 관심사/특징 (선택, 개인화용)',
        customerInterestsPlaceholder: '예: 커피를 좋아함 / 골프 침 / 자녀 2명',
        // Value Share fields
        customerIndustry: '고객 업계',
        customerIndustryPlaceholder: '예: 제조업 / 금융업',
        customerTopics: '관심 있는 주제',
        customerTopicsPlaceholder: '예: 디지털 전환 / AI 활용 / 효율성',
        shareTypeLabel: '콘텐츠 유형',
        shareTypeOptions: {
          article: '기사',
          report: '리포트',
          news: '뉴스',
          tool: '도구',
          event: '이벤트',
        },
        shareTitle: '제목 또는 주제',
        shareTitlePlaceholder: '예: 2026 제조업 AI 트렌드 리포트',
        shareReason: '유용한 이유',
        shareReasonPlaceholder: '예: ROI 데이터가 이전 질문과 관련됨',
        shareLink: '링크 (선택)',
        shareLinkPlaceholder: 'https://...',
        // Referral fields
        cooperationDuration: '협력 기간',
        cooperationDurationPlaceholder: '예: 6개월 / 1년 / 3년',
        cooperationResult: '협력 성과',
        cooperationResultPlaceholder: '예: 효율성 30% 향상 / 매출 20% 성장',
        referralTarget: '이상적인 소개 대상 설명',
        referralTargetPlaceholder: '예: AI 교육을 고려 중인 사업주 / 팀 효율성을 높이려는 관리자',
        referralIndustry: '선호 업계 (선택)',
        referralIndustryPlaceholder: '예: IT / 제조업',
        referralPosition: '선호 직책 (선택)',
        referralPositionPlaceholder: '예: HR 매니저 / 영업 이사',
        hasReward: '추천 보상 제공',
        rewardContentPlaceholder: '예: 성사 시 10% 커미션 / 무료 상담 세션',
      },
      result: {
        title: '후속 메시지',
        copyMessage: '메시지 복사',
        regenerate: '다른 버전 시도',
        variations: '다른 버전',
        openGemini: 'Gemini 열기',
      },
      usage: {
        title: '사용 방법:',
        step1: '아래 프롬프트 복사',
        step2: 'Gemini 또는 선호하는 AI 도구로 이동',
        step3: '프롬프트 붙여넣기, AI가 3가지 버전의 후속 메시지 생성',
        step4: '적합한 버전 선택, 조정 후 발송',
      },
      profileWarning: '당신의 스타일에 맞는 AI 메시지를 위해 먼저 Content Clone에서 기본 정보와 말하기 스타일을 완성하는 것을 권장합니다.',
    },
    industries: [
      '보험', '부동산', 'B2B 영업', '금융 서비스', '자동차 판매',
      '명품', 'IT/기술', '제조업', '컨설팅', '교육',
      '의료', '기타',
    ],
    experienceOptions: ['1-3년', '3-5년', '5-10년', '10년 이상'],
    priceOptions: ['3천만원 미만', '3천-1억5천만원', '1억5천-3억원', '3억원 이상'],
    painPointOptions: [
      '선택 방법을 모름', '실수가 두려움', '예산 제한', '조사할 시간 없음',
      '영업사원 불신', '선택지가 너무 많음', '판매 당하기 싫음',
    ],
    toneOptions: ['전문적', '따뜻하고 친근한', '유머러스', '직접적', '지적'],
    platformOptions: ['Facebook', 'LINE', 'Instagram', 'LinkedIn', 'WhatsApp', '이메일'],
    lengthOptions: ['짧음 (200-300자)', '보통 (500-600자)', '길게 (800-1000자)'],
    results: {
      title: '맞춤형 AI 어시스턴트',
      subtitle: '당신만을 위한 5개의 Gem AI 어시스턴트입니다. Gemini에 복사하여 바로 사용하세요.',
      tabs: {
        content: '콘텐츠 제작',
        presentation: '프레젠테이션',
        qa: '고객 Q&A',
        sales: '영업 스크립트',
        email: '이메일 작성',
      },
      usageTips: '사용 팁',
      copyPrompt: 'Prompt 복사',
      copyGemPrompt: 'Gem 프롬프트 복사',
      editProfile: '프로필 편집',
      expand: '펼치기',
      collapse: '접기',
      howToUse: 'Gem AI 어시스턴트 설정 방법',
      steps: [
        '위의 "Gem 프롬프트"를 복사하세요',
        'Gemini(gemini.google.com)를 엽니다',
        '왼쪽의 "Gems" → "Gem 만들기"를 클릭합니다',
        '"지침" 필드에 프롬프트를 붙여넣습니다',
        '저장하면 언제든지 어시스턴트를 호출할 수 있습니다',
      ],
      gemName: 'Gem 이름',
      gemDescription: 'Gem 설명',
      howToSetup: '이 Gem 설정 방법',
      examplePrompts: '사용 예시',
      levelLabels: {
        beginner: '기초',
        intermediate: '중급',
        advanced: '고급',
        expert: '마스터',
        all: '범용',
      },
      promptLevel: 'Prompt 레벨',
      levelFramework: {
        beginner: '기초 프레임워크',
        intermediate: '중급 프레임워크',
        advanced: '고급 프레임워크',
        expert: '마스터 프레임워크',
      },
      systemPromptTitle: 'Gem 시스템 프롬프트',
      noProfileTitle: '데이터 미입력',
      noProfileDescription: '맞춤형 Gem을 생성하려면 먼저 콘텐츠 클론 데이터를 완성해 주세요.',
      goToContentClone: '데이터 입력하러 가기',
    },
    profile: {
      title: '내 프로필',
      subtitle: 'AI가 당신을 더 잘 이해할 수 있도록 프로필 정보를 편집하세요',
      saveChanges: '변경 사항 저장',
      saving: '저장 중...',
      saveError: '저장에 실패했습니다. 다시 시도해 주세요.',
      expandAll: '모두 펼치기',
      collapseAll: '모두 접기',
    },
    register: {
      inviteCode: '초대 코드',
      inviteCodePlaceholder: '6자리 초대 코드 입력',
      inviteCodeRequired: '초대 코드를 입력하세요',
      invalidCode: '초대 코드가 유효하지 않거나 이메일이 일치하지 않습니다',
      name: '이름',
      namePlaceholder: '이름을 입력하세요',
      passwordHint: '비밀번호는 최소 6자 이상',
      signingUp: '등록 중...',
      signUp: '등록',
      nameRequired: '이름을 입력하세요',
    },
    admin: {
      title: '관리자 패널',
      inviteCodes: '초대 코드 관리',
      addStudent: '학생 추가',
      studentName: '학생 이름',
      studentEmail: '학생 이메일',
      generateCode: '코드 생성',
      copyCode: '복사',
      status: '상태',
      used: '사용됨',
      unused: '미사용',
      // 코스 일괄 관리
      uploadExcel: 'Excel 업로드',
      dragDropHint: 'Excel 파일을 여기에 드래그하거나 클릭하여 선택',
      supportedFormats: '지원 형식: .xlsx, .xls',
      courseList: '코스 목록',
      studentList: '학생 목록',
      selectCourse: '학생을 보려면 코스를 선택하세요',
      importing: '가져오는 중...',
      importSuccess: '{count}명의 학생을 성공적으로 가져왔습니다',
      importError: '가져오기 실패',
      noCourses: '아직 코스가 없습니다',
      noStudents: '이 코스에 학생이 없습니다',
      students: '명',
      excelFormat: 'Excel 형식: 코스 날짜/이름, 이름, 이메일',
      downloadTemplate: '템플릿 다운로드',
      adminWarning: '관리자 전용 페이지입니다. 모든 작업이 기록됩니다. 데이터를 보호하기 위해 Firestore Security Rules가 올바르게 설정되었는지 확인하세요.',
    },
    footer: {
      text: 'CLOSER 실적 자동 배증 by Afeng Huang',
      email: 'ai@autolab.cloud',
    },
    validation: {
      industryRequired: '업종을 선택하세요',
      productRequired: '제품/서비스를 입력하세요',
    },
    followUpPromptMaps: {
      approach: {
        value: '유용한 정보 공유',
        trend: '업계 트렌드나 뉴스 언급',
        greeting: '간단한 인사와 안부',
        newService: '신규 서비스/혜택 언급',
        other: '기타',
      },
      tone: {
        formal: '격식 있는 축하',
        warm: '따뜻하고 배려하는',
        humor: '가볍고 유머러스',
        simple: '심플 & 깔끔',
      },
      birthdayTone: {
        formal: '격식 있는 축하',
        personal: '따뜻하고 개인적',
        humor: '가볍고 유머러스',
      },
      business: {
        none: '전혀 안 함 (순수 인사)',
        light: '가볍게 언급 (연휴 후 만나요)',
        clear: '명확히 언급 (새해, 새 계획)',
      },
      shareType: {
        article: '기사',
        report: '보고서',
        news: '뉴스',
        tool: '도구',
        event: '이벤트',
      },
    },
  },
};
