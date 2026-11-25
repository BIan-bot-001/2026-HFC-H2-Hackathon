# 測試報告

- 測試日期：2026/11/25
- 測試環境：Windows、Microsoft Edge（headless）、本機 HTTP 伺服器
- 測試基準 revision：`81c4a9f` 加本次待提交變更
- 受測資料：正式 EDM、Excel 議程、背對舞台座位圖、Forms 與 Teams URL、IEAT 官方交通資訊

## 結果

| 項目 | 狀態 | 證據／備註 |
|---|---|---|
| 專案 schema | PASS | `validate_project.py config/project.json` |
| JavaScript 語法 | PASS | Node `--check`：`assets/data.js`、`assets/app.js` |
| 公開輸出掃描 | REVIEWED | 第一方內容 PASS；SheetJS 內建密碼保護函式造成一筆已人工確認的誤報；不等於完整安全稽核 |
| 本地 HTML 連結 | PASS | 七頁、404 與內部頁面連結存在 |
| 瀏覽器頁面載入 | PASS | 8 頁 × 375／768／1440px，HTTP 與 console 無錯誤 |
| Excel 議程讀取 | PASS | 「時間表」第 3–20 列共 18 筆正確顯示，第 35 列後草稿未公開 |
| Excel 直接開檔備援 | PASS | `file://` 模式不發送受限制的 Excel 請求，改為顯示與 Excel 同步的 18 筆完整議程 |
| Excel 讀取依賴 | PASS | SheetJS CE 0.20.3 固定於專案內，無執行時 CDN 依賴；授權檔已保留 |
| 響應式與水平溢位 | PASS | 三種 viewport 均無水平捲動 |
| 行動導覽 | PASS | 選單展開狀態與可見性正常 |
| 固定頂部導覽 | PASS | 三種 viewport 均為 fixed，捲動時持續顯示 |
| 35% 區塊定位 | PASS | 首頁主視覺超過 35% 後正確定位至活動導覽 |
| 首頁內容順序 | PASS | 主視覺 → 活動導覽 → 活動 DM，日期摘要已移除 |
| 活動 DM 定位 | PASS | 區塊改名為「活動 DM」、移除說明文字，頂部內距縮小為桌機 32px／手機 24px |
| 首頁日期／時間／地點 | PASS | 資料值由 14px 放大至 28px，手機與桌機截圖已人工檢查 |
| 緊湊活動導覽 | PASS | 六項橫向資訊列於 375／768／1440px 均無溢位 |
| 手機區塊指示器 | PASS | 三段圓點／長條、目前段落與總段數狀態正確 |
| 滑動狀態淡出 | PASS | 滑動時顯示段落名稱，停止 1 秒後隱藏 |
| 座位方向切換 | PASS | 點擊與左右方向鍵皆可切換，ARIA 狀態正確 |
| 觸控目標 | PASS | 可見連結與按鈕均至少 44×44 CSS px |
| 減少動態偏好 | PASS | `prefers-reduced-motion: reduce` 下內容保持可見 |
| 圖片載入 | PASS | Logo、首頁背景、EDM、背對舞台座位圖與 favicon 無破圖 |
| 目視檢查 | PASS | 首頁、議程、座位圖與交通頁桌面／手機截圖已人工檢查 |
| 交通資訊 | PASS | 行天宮站 4 號出口、100 公尺、步行約 2 分鐘及 IEAT 周邊停車連結已顯示 |
| Forms 正式 iframe／登入 | NOT_RUN | URL 已置入；公司帳號登入與實際送出需由使用者驗收 |
| Teams 正式連結／登入 | NOT_RUN | URL 已置入；公司帳號進入會議需由使用者驗收 |
| 面對舞台座位圖 | BLOCKED | 素材尚未提供；背對舞台版已設為預設視角 |
| GitHub Pages 正式部署 smoke test | NOT_RUN | G4 尚未核准，且 repository 尚未提供 |
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


## G3 狀態

功能、正式素材與安全基線的本機測試已完成，但使用者 UAT、公司 Microsoft 帳號登入／送出與面對舞台圖尚未完成，因此 G3 **尚未核准**。
