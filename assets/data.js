window.HACKATHON_CONFIG = Object.freeze({
  event: {
    name: "和潤企業 2026年 H2黑客松",
    date: "2026/11/27（五）",
    time: "13:00–17:00",
    venue: "IEAT 一樓會議室",
    address: "台北市松江路350號",
    organizers: ["資訊部", "人發室"],
    updatedAt: "2026/11/25"
  },
  assets: {
    logo: "assets/images/hotai-finance-logo.png",
    dm: "2026 H2黑客松EDM.png",
    agendaWorkbook: "黑客松議程.xlsx",
    seatingFront: "",
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
    lastRow: 20
  },
  agenda: [
    { time: "13:00", title: "活動開始", detail: "詳細議程待更新", type: "opening" },
    { time: "—", title: "黑客松進行", detail: "流程與各階段時間待更新", type: "session" },
    { time: "17:00", title: "活動結束", detail: "詳細議程待更新", type: "closing" }
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
      note: "IEAT 官網提供周邊停車地圖；場館未保證館內車位，請預留尋找停車位的時間。",
      linkLabel: "查看 IEAT 周邊停車",
      link: "https://www.ieatpe.org.tw/meeting/Traffic.aspx"
    }
  ]
});
