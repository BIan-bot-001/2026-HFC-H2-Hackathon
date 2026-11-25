# 資料模型與介面契約

## 集中設定模型

`assets/data.js` 預計提供唯讀設定物件：

- `event`：名稱、日期、時間、場地、地址、主辦單位。
- `assets`：Logo、DM、Excel 議程、面對舞台座位圖、背對舞台座位圖。
- `links`：報到 Forms、需求回饋 Forms、Teams 直播、地圖。
- `agendaSource`：Excel 工作表名稱與公開讀取列範圍。
- `agenda`：Excel 讀取失敗時使用的備援議程。
- `transport`：交通方式、說明、選用連結。
- `publishing`：內容更新日期與是否顯示待更新提示。

## 輸入、輸出與錯誤狀態

| 功能 | 輸入 | 輸出 | 錯誤／空白狀態 |
|---|---|---|---|
| 導覽 | 使用者點擊／鍵盤操作 | 對應頁面 | 404 頁與回首頁連結 |
| Forms | 核准的 HTTPS URL | iframe 或新視窗 | 未提供、iframe 被阻擋、登入限制時顯示備援按鈕 |
| Teams | 核准的 HTTPS URL | 新視窗開啟 | 未提供時停用並顯示待更新 |
| 座位切換 | `front`／`back` | 對應圖片、按鈕狀態與說明 | 圖片缺失時顯示空狀態，不顯示破圖 |
| DM／座位圖圖片 | 圖片路徑與 alt | 響應式圖片 | 缺失時顯示文字活動資料 |
| Excel 議程 | `黑客松議程.xlsx` 第 3–20 列 | 時間、單位、簡報者、題目、講評人 | HTTP 下即時讀取；直接開檔或讀取失敗時顯示完整同步備援議程與狀態提示 |

## API 契約

本站不提供後端 API，也不直接呼叫 Microsoft API。Forms 以 Microsoft 提供的 iframe／公開頁面 URL 呈現，Teams 以一般 HTTPS 外部連結開啟。任何表單提交、登入、權限與回覆資料均由 Microsoft 服務處理，不宣稱由本站保護或保存。

## 授權矩陣

| 角色 | 讀取公開頁面 | 開啟外部連結 | 修改內容 | 部署／下架 |
|---|---:|---:|---:|---:|
| 一般訪客 | 允許 | 允許，仍受 Microsoft 權限控制 | 不允許 | 不允許 |
| 內容維護者 | 允許 | 允許 | 透過 Git 修改並審查 | 不一定 |
| GitHub repository 管理者 | 允許 | 允許 | 允許 | 允許，但須遵循 G4／下架 runbook |

目前沒有網站身分驗證或角色授權；此狀態明確標記為 **NOT_ENFORCED**。

## 依賴清單

- 瀏覽器原生 HTML、CSS、JavaScript。
- SheetJS Community Edition 0.20.3：以專案內固定版本讀取 XLSX，使用 Apache-2.0 授權，不從外部 CDN 執行程式。
- Git 與 GitHub Pages：版本控制與靜態託管。
- Microsoft Forms／Teams：外部服務，可用性與存取權由公司與 Microsoft 設定決定。
- 地圖服務：僅在使用者點擊時開啟外部連結，供應商待確認。
