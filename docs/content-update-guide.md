# 內容更新指南

網站主要內容集中在 `assets/data.js`。修改前請先建立 Git 分支或確保目前變更已提交，修改後以本機 HTTP 伺服器預覽。

## 最簡單的修改流程

如果只要更換活動文字、連結或圖片，不需要修改 HTML、CSS 或程式功能：

1. 用文字編輯器開啟 `assets/data.js`。
2. 找到想修改的欄位，只更改雙引號內的文字，不要刪除欄位名稱、冒號或逗號。
3. 儲存檔案。
4. 回到本機預覽頁面按 `Ctrl + F5` 強制重新整理。
5. 逐頁確認後建立 Git commit；如果不熟 Git，可以把修改需求交給 Codex 處理。

常用欄位對照：

| 要修改的內容 | `assets/data.js` 位置 |
|---|---|
| 活動名稱 | `event.name` |
| 日期 | `event.date` |
| 時間 | `event.time` |
| 會議室 | `event.venue` |
| 地址 | `event.address` |
| 主辦單位 | `event.organizers` |
| DM 圖片 | `assets.dm` |
| 面對舞台座位圖 | `assets.seatingFront` |
| 背對舞台座位圖 | `assets.seatingBack` |
| 報到表單 | `links.checkinForm` |
| 回饋表單 | `links.feedbackForm` |
| Teams 直播 | `links.teamsLive` |
| 地圖 | `links.map` |
| 議程資料區間 | `agendaSource` |
| 交通方式 | `transport` 清單 |

請不要自行修改 `assets/app.js` 或 `assets/styles.css`，除非要改網站功能或版面。這兩個檔案改錯可能讓所有頁面同時失效。

## 尚待提供的內容

- 面對舞台座位圖

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

目前最簡單的更新方式，是保留檔名並直接替換專案根目錄的 `2026 H2黑客松EDM.png` 或 `座位圖-背對舞台.png`，再將新檔案提交與推送到 GitHub。

如果要新增不同檔名的圖片：

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

## 更新 Excel 議程

網站會在開啟「黑客松議程」頁面時，直接讀取專案根目錄的 `黑客松議程.xlsx`。

1. 使用 Excel 開啟 `黑客松議程.xlsx`。
2. 在「時間表」工作表編輯第 3–20 列。
3. 保留目前欄位位置：E 欄項次、F 欄時間、G 欄簡報單位、H 欄簡報者、I 欄題目、J–K 欄講評人。
4. 儲存後將同一個 Excel 檔案提交並推送到 GitHub。
5. GitHub Pages 更新後，使用者重新開啟頁面就會看到新議程。

第 35 列以後的備註與草稿不會公開顯示。如果日後正式議程超過第 20 列，請同步修改 `assets/data.js` 中的 `agendaSource.lastRow`。網站仍保留 `agenda` 備援清單，僅在 Excel 無法讀取時顯示。

請注意：直接雙擊 `agenda.html` 時，瀏覽器不允許網頁自動讀取電腦上的相鄰 Excel，因此會顯示上次與 Excel 同步的完整備援議程。GitHub Pages 與本機 HTTP 預覽會優先即時讀取 Excel。若要在上線前確認最新 Excel，請用 README 的本機 HTTP 預覽方式，或請 Codex 更新同步備援資料。

## 更新後檢查

1. 開啟七個頁面，確認沒有破圖或待更新文字。
2. 以手機寬度確認導覽選單與座位切換。
3. 實際登入公司 Microsoft 帳號測試兩個 Forms 與 Teams。
4. 確認所有公開內容均為 PUBLIC。
5. 建立清楚的 Git commit，例如 `content: add final agenda and event links`。

## 常見錯誤復原

- 頁面完全空白：通常是 `assets/data.js` 少了逗號、引號或括號。使用 Git 查看變更，撤回最後一小段修改再重試。
- 圖片顯示「待更新」：確認圖片位於 `assets/images/`，且檔名與 `assets` 路徑完全一致。
- 外部按鈕仍顯示待提供：確認網址以 `https://` 開頭，且雙引號內沒有多餘空白。
- Forms 無法內嵌：先測試「另開表單」；公司登入或 Microsoft 設定可能禁止 iframe，但不代表網址錯誤。
