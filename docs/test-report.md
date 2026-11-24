# 測試報告

- 測試日期：2026/11/24
- 測試環境：Windows、Microsoft Edge（headless）、本機 HTTP 伺服器
- 測試基準 revision：`f2aa5f2`
- 受測資料：合成／待更新活動內容；未使用 Forms、Teams 或座位圖正式資料

## 結果

| 項目 | 狀態 | 證據／備註 |
|---|---|---|
| 專案 schema | PASS | `validate_project.py config/project.json` |
| JavaScript 語法 | PASS | Node `--check`：`assets/data.js`、`assets/app.js` |
| 公開輸出掃描 | PASS | `scan_public_output.py .` 無啟發式發現；不等於完整安全稽核 |
| 本地 HTML 連結 | PASS | 七頁、404 與內部頁面連結存在 |
| 瀏覽器頁面載入 | PASS | 8 頁 × 375／768／1440px，HTTP 與 console 無錯誤 |
| 響應式與水平溢位 | PASS | 三種 viewport 均無水平捲動 |
| 行動導覽 | PASS | 選單展開狀態與可見性正常 |
| 座位方向切換 | PASS | 點擊與左右方向鍵皆可切換，ARIA 狀態正確 |
| 觸控目標 | PASS | 可見連結與按鈕均至少 44×44 CSS px |
| 減少動態偏好 | PASS | `prefers-reduced-motion: reduce` 下內容保持可見 |
| 圖片載入 | PASS | Logo、首頁背景與 favicon 無破圖 |
| 目視檢查 | PASS | 首頁與座位頁桌面／手機截圖已人工檢查 |
| Forms 正式 iframe／登入 | NOT_RUN | 正式 URL 尚未提供 |
| Teams 正式連結／登入 | NOT_RUN | 正式 URL 尚未提供 |
| DM、完整議程與兩張座位圖 | BLOCKED | 正式素材尚未提供，網站以明確空狀態呈現 |
| GitHub Pages 正式部署 smoke test | NOT_RUN | G4 尚未核准，且 repository 尚未提供 |
| 完整人工無障礙稽核 | NOT_RUN | 已驗證關鍵自動化項目，未宣稱完整 WCAG 認證 |

## 測試中修正

1. 擴大行動版 Logo 首頁連結的觸控高度至 48px。
2. 加入 favicon，消除瀏覽器自動要求 `/favicon.ico` 的 404。
3. 移除可能在快速捲動時讓內容維持隱藏的捲動顯示效果，確保活動資訊立即可見。
4. 行動版基礎字級調整為 16px，並加入 `touch-action: manipulation`。

## G3 狀態

功能骨架與安全基線測試已完成，但正式內容、外部連結與使用者 UAT 尚未完成，因此 G3 **尚未核准**。收到正式素材並完成實際 Microsoft 服務測試後，需更新本報告再進行 G3 驗收。

