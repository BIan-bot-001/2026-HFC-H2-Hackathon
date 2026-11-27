# 測試報告

- 測試日期：2026/11/27
- 測試環境：Windows、Microsoft Edge（headless）、本機 HTTP 伺服器
- 測試基準 revision：`accda8b` 加本次議程待提交變更
- 受測資料：新版 JPG 活動 DM、Excel 議程、兩種方向座位圖、Forms 與 Teams URL、Google Maps 周邊停車資訊

## 結果

| 項目 | 狀態 | 證據／備註 |
|---|---|---|
| 專案 schema | PASS | `validate_project.py config/project.json` |
| JavaScript 語法 | PASS | Node `--check`：`assets/data.js`、`assets/app.js` |
| 公開輸出掃描 | REVIEWED | 第一方內容 PASS；SheetJS 內建密碼保護函式造成一筆已人工確認的誤報；不等於完整安全稽核 |
| 本地 HTML 連結 | PASS | 七頁、404 與內部頁面連結存在 |
| 瀏覽器頁面載入 | PASS | 8 頁 × 375／768／1440px，HTTP 與 console 無錯誤 |
| Excel 議程讀取 | PASS | 「時間表」第 3–21 列共 19 筆正確顯示；新增「From AI to ROI - 和勁企業 李佳峯 執行副總」，其餘時間亦依 Excel 更新 |
| Excel 直接開檔備援 | PASS | `file://` 模式不發送受限制的 Excel 請求，改為顯示與 Excel 同步的 19 筆完整議程 |
| Excel 讀取依賴 | PASS | SheetJS CE 0.20.3 固定於專案內，無執行時 CDN 依賴；授權檔已保留 |
| 響應式與水平溢位 | PASS | 三種 viewport 均無水平捲動 |
| 行動導覽 | PASS | 選單展開狀態與可見性正常 |
| 固定頂部導覽 | PASS | 三種 viewport 均為 fixed，捲動時持續顯示 |
| 35% 區塊定位 | PASS | 首頁主視覺超過 35% 後正確定位至活動導覽 |
| 首頁內容順序 | PASS | 主視覺 → 活動導覽 → 活動 DM，日期摘要已移除 |
| 活動 DM 定位 | PASS | 區塊改名為「活動 DM」、移除說明文字，頂部內距縮小為桌機 32px／手機 24px |
| 活動 DM 版本 | PASS | 首頁載入新版 `2026 H2黑客松EDM.jpg`；舊版 PNG 已從公開輸出移除 |
| 回饋頁文案 | PASS | 顯示「請讓我們了解你在AI的使用情況與需求」，Forms 另開視窗與內嵌功能保留 |
| 首頁日期／時間／地點 | PASS | 資料值由 14px 放大至 28px，手機與桌機截圖已人工檢查 |
| 緊湊活動導覽 | PASS | 六項橫向資訊列於 375／768／1440px 均無溢位 |
| 手機區塊指示器 | PASS | 三段圓點／長條、目前段落與總段數狀態正確 |
| 滑動狀態淡出 | PASS | 滑動時顯示段落名稱，停止 1 秒後隱藏 |
| 座位方向切換 | PASS | 面對／背對舞台兩張圖片均載入；點擊與左右方向鍵可切換，ARIA 狀態正確 |
| 觸控目標 | PASS | 可見連結與按鈕均至少 44×44 CSS px |
| 減少動態偏好 | PASS | `prefers-reduced-motion: reduce` 下內容保持可見 |
| 圖片載入 | PASS | Logo、首頁背景、新版 EDM、最新面對／背對舞台座位圖與 favicon 無破圖 |
| 目視檢查 | PASS | 首頁、議程、座位圖與交通頁桌面／手機截圖已人工檢查 |
| 交通資訊 | PASS | 行天宮站 4 號出口、100 公尺、步行約 2 分鐘、指定停車說明與繁體中文 Google Maps 周邊停車連結已顯示 |
| Forms 正式 iframe／登入 | NOT_RUN | URL 已置入；公司帳號登入與實際送出需由使用者驗收 |
| Teams 正式連結／登入 | NOT_RUN | URL 已置入；公司帳號進入會議需由使用者驗收 |
| 面對舞台座位圖 | PASS | 素材已載入並設為預設視角，可切換至背對舞台版本 |
| GitHub Pages 正式部署 smoke test | PENDING | 已取得本次議程 revision 推送至指定 repository `main` 的 G4 核准；推送完成後執行 |
| 完整人工無障礙稽核 | NOT_RUN | 已驗證關鍵自動化項目，未宣稱完整 WCAG 認證 |

公開輸出掃描補充：全專案掃描會在第三方 `xlsx.mini.min.js` 的工作表密碼保護函式名稱命中 `PASSWORD_ASSIGNMENT`。人工檢視確認這是 SheetJS 原始程式碼，不是密碼或金鑰。排除未修改的第三方套件後，第一方內容掃描 PASS。

## 測試中修正

1. 擴大行動版 Logo 首頁連結的觸控高度至 48px。
2. 加入 favicon，消除瀏覽器自動要求 `/favicon.ico` 的 404。
3. 移除可能在快速捲動時讓內容維持隱藏的捲動顯示效果，確保活動資訊立即可見。
4. 行動版基礎字級調整為 16px，並加入 `touch-action: manipulation`。
5. 長內容區塊只在接近邊界時吸附，避免手機版活動導覽在尚未讀完時被跳過。
6. 手機區塊圓點保留可點擊的 44px 範圍，視覺圓點本身維持精簡。
7. 活動導覽定位後的頂部內距縮小為桌面 38px、手機 30px，避免內容被過度向下推移。
8. Microsoft Forms iframe 改以本站 DOM 完成作為測試條件，避免外部服務持續連線造成錯誤的 `networkidle` 逾時。
9. 移除議程資訊卡的 Excel／本機預覽狀態列，縮窄資訊卡並保留完整議程讀取與備援機制。
10. 根目錄圖片白名單新增 JPG／JPEG，讓新版活動 DM 可安全載入。


## G3／G4 狀態

本次變更僅更新公開議程資料。Excel 解析、備援同步、響應式瀏覽器測試與公開輸出掃描均已通過。使用者已於 2026/11/27 要求同步並發布至既有 GitHub Pages，視為本次議程 revision 的 G3／G4 核准；正式 Forms／Teams 公司帳號操作不在本次變更範圍。
