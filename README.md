# 和潤企業 2026 年 H2 黑客松活動網站

本專案為活動當日使用的繁體中文響應式靜態網站，預計部署至 GitHub Pages。

目前狀態：G1、G2 已核准；網站功能、EDM、Excel 議程、兩種方向座位圖、外部連結與本機測試已完成。G3 使用者驗收及 G4 部署核准仍待完成。

## 重要公開性說明

一般 GitHub Pages 網站屬公開網站。「僅分享網址」及 `noindex` 只能降低被搜尋到的機率，不是身分驗證或存取控制。本網站只允許放置已核准公開的內容，活動結束後由網站負責人取消發布。

## 本機預覽

在專案根目錄執行：

```powershell
python -m http.server 4173
```

接著開啟 `http://127.0.0.1:4173/`。請使用 HTTP 預覽，不建議直接以 `file://` 開啟。

## 內容更新

- 活動文字與外部連結：`assets/data.js`
- 議程：編輯專案根目錄的 `黑客松議程.xlsx`，保留「時間表」第 3–21 列與原欄位位置
- DM：直接替換專案根目錄的 `2026 H2黑客松EDM.jpg`
- 面對／背對舞台座位圖：替換專案根目錄的同名圖片，或更新 `assets.seatingFront` 與 `assets.seatingBack`
- 詳細步驟：`docs/content-update-guide.md`

## 網站頁面

- `index.html`：首頁與活動導覽
- `agenda.html`：黑客松議程
- `checkin.html`：線上報到 Forms
- `seating.html`：兩種方向座位圖
- `live.html`：Teams 直播連結
- `feedback.html`：需求回饋 Forms
- `transport.html`：交通資訊
- `404.html`：找不到頁面

## 測試與維運

- 瀏覽器測試：`tests/browser-smoke.cjs`
- 測試報告：`docs/test-report.md`
- 部署、回復與下架：`docs/deployment-runbook.md`
- 公開產物雜湊：`docs/artifact-manifest.sha256`
