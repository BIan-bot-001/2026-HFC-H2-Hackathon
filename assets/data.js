window.HACKATHON_CONFIG = Object.freeze({
  event: {
    name: "和潤企業 2026年 H2黑客松",
    date: "2026/11/27（五）",
    time: "13:00–17:00",
    venue: "IEAT 一樓會議室",
    address: "台北市松江路350號",
    organizers: ["資訊部", "人發室"],
    updatedAt: "2026/11/27"
  },
  assets: {
    logo: "assets/images/hotai-finance-logo.png",
    dm: "2026 H2黑客松EDM.jpg",
    agendaWorkbook: "黑客松議程.xlsx",
    seatingFront: "座位圖-面對舞台.png",
    seatingBack: "座位圖-背對舞台.png"
  },
  links: {
    checkinForm: "https://forms.cloud.microsoft/r/ZNM1tjXrX9",
    feedbackForm: "https://forms.cloud.microsoft/r/KPpSm1gjmG",
    teamsLive: "https://teams.microsoft.com/meet/486508844550619?p=iW5u2UlYY8srfVZNzU",
    map: "https://www.google.com/maps/search/?api=1&query=台北市松江路350號",
    venueTraffic: "https://www.ieatpe.org.tw/meeting/Traffic.aspx"
  },
  agendaSource: {
    sheet: "時間表",
    firstRow: 3,
    lastRow: 21
  },
  agenda: [
    { time: "13:00-13:05", title: "開場 & AI小組成果報告", type: "活動流程" },
    { time: "13:05-13:15", title: "From AI to ROI - 和勁企業 李佳峯 執行副總", type: "活動流程" },
    { time: "13:15-13:35", title: "AI專題分享 - Steve", type: "活動流程" },
    { time: "13:35-13:47", title: "不讓客戶等，不讓商機跑：24 小時 AI 中結報價助手", type: "第 1 組", unit: "和勁", speaker: "鄭喬丰", reviewers: "Steve、周家宏" },
    { time: "13:47-13:59", title: "消費通路審查風險自動化判別", type: "第 2 組", unit: "勁榮", speaker: "劉靜萍", reviewers: "Steve、陳志偉" },
    { time: "13:59-14:11", title: "不動產鑑價自動化與智能算稅估值", type: "第 3 組", unit: "信用審查", speaker: "蔡佩芸", reviewers: "Steve、張正偉" },
    { time: "14:11-14:23", title: "車輛分期試算平台", type: "第 4 組", unit: "企劃", speaker: "莊姿婷", reviewers: "Steve、陳清龍" },
    { time: "14:23-14:43", title: "中場休息", type: "活動流程", isBreak: true },
    { time: "14:43-14:55", title: "管理部掌上通", type: "第 5 組", unit: "管理部", speaker: "廖本智、汪欣潔", reviewers: "Steve、陳煥文" },
    { time: "14:55-15:07", title: "售電營運流程優化暨出單自動化", type: "第 6 組", unit: "潤電", speaker: "黃建璋", reviewers: "Steve、陳仕騏" },
    { time: "15:07-15:19", title: "金流自駕-收款智能化｜從自動銷帳到資金預判", type: "第 7 組", unit: "資金部", speaker: "劉靖嫻", reviewers: "Steve、彭俊忠" },
    { time: "15:19-15:31", title: "企業風險智能守衛系統", type: "第 8 組", unit: "風控作改", speaker: "陸依琦", reviewers: "Steve、邢合榮" },
    { time: "15:31-15:51", title: "中場休息", type: "活動流程", isBreak: true },
    { time: "15:51-16:03", title: "新戶開發加速器｜新戶商機導航與開發成果管理平台", type: "第 9 組", unit: "興業", speaker: "吳旻燁", reviewers: "Steve、張偉鈞" },
    { time: "16:03-16:15", title: "家事法院死亡事件公告自動查詢與應用效能", type: "第 10 組", unit: "債權管理", speaker: "陳吉宏", reviewers: "Steve、蔡東原" },
    { time: "16:15-16:27", title: "讓公文自己跑，別讓同仁一直跑", type: "第 11 組", unit: "經企公關部", speaker: "劉于慈", reviewers: "Steve、林瑜文" },
    { time: "16:27-16:39", title: "公文雷達DocRadar", type: "第 12 組", unit: "作業服務部", speaker: "施佳莉、胡藏轅", reviewers: "Steve、李秋慧" },
    { time: "16:39-16:49", title: "和運國際AI成果分享 - 方秋生", type: "活動流程" },
    { time: "16:49-17:00", title: "董事長致詞+頒獎", type: "活動流程" }
  ],
  transport: [
    {
      title: "活動地點",
      detail: "IEAT 一樓會議室",
      note: "台北市松江路350號"
    },
    {
      title: "大眾運輸",
      detail: "捷運中和新蘆線・行天宮站",
      note: "由 4 號出口出站後左轉，約 100 公尺，步行約 2 分鐘。"
    },
    {
      title: "開車前往",
      detail: "導航至台北市松江路 350 號",
      note: "提供IEAT 官網周邊停車資訊，請預留尋找停車位的時間",
      linkLabel: "查看 IEAT 周邊停車",
      link: "https://www.google.com.tw/maps/search/%E5%81%9C%E8%BB%8A%E5%A0%B4/@25.0616453,121.5307149,17z?hl=zh-TW&authuser=0&entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D"
    }
  ]
});
