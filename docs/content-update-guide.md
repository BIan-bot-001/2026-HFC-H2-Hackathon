# 內容更新指南

網站主要內容集中在 `assets/data.js`。修改前請先建立 Git 分支或確保目前變更已提交，修改後以本機 HTTP 伺服器預覽。

## 尚待提供的內容

- 首頁正式 DM
- 完整黑客松議程
- 線上報到 Microsoft Forms URL
- 需求回饋 Microsoft Forms URL
- Teams 直播 URL
- 面對舞台座位圖
- 背對舞台座位圖
- 大眾運輸、停車與入口資訊

## 更新外部連結

在 `links` 區塊填入完整 `https://` 網址：

```js
links: {
  checkinForm: "https://...",
  feedbackForm: "https://...",
  teamsLive: "https://...",
  map: "https://..."
}
```

網站只接受 HTTPS 網址。空白或格式錯誤時會顯示「待提供」狀態。

Microsoft Forms 頁面會同時提供內嵌表單與另開視窗按鈕。正式驗收時需使用實際公司帳號確認 iframe、登入與網路政策；若 iframe 無法載入，另開視窗仍可使用。

## 更新圖片

1. 將圖片複製到 `assets/images/`。
2. 使用英文、數字、連字號或底線命名，例如 `event-dm.png`。
3. 在 `assets` 區塊更新相對路徑：

```js
assets: {
  logo: "assets/images/hotai-finance-logo.png",
  dm: "assets/images/event-dm.png",
  seatingFront: "assets/images/seating-front.png",
  seatingBack: "assets/images/seating-back.png"
}
```

請勿填入電腦磁碟路徑。正式上傳前人工檢查圖片是否包含姓名、員編、聯絡方式或其他未核准公開資訊。

## 更新議程

每一筆議程包含四個欄位：

```js
{ time: "13:00", title: "活動開始", detail: "活動說明", type: "opening" }
```

依時間順序增刪即可。`type` 是英文短標籤，僅用於輔助分類顯示。

## 更新後檢查

1. 開啟七個頁面，確認沒有破圖或待更新文字。
2. 以手機寬度確認導覽選單與座位切換。
3. 實際登入公司 Microsoft 帳號測試兩個 Forms 與 Teams。
4. 確認所有公開內容均為 PUBLIC。
5. 建立清楚的 Git commit，例如 `content: add final agenda and event links`。

