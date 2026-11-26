# GitHub Pages 部署、回復與下架手冊

## 前置條件

- 正式 repository 與管理權限。
- 正式內容已更新並通過 G3。
- G4 核准必須明確指定 repository、commit SHA、環境 `PROD` 與發布動作。
- 再次確認一般 GitHub Pages 是公開網站；`noindex` 與 `robots.txt` 不是存取控制。

## 代為上架所需最小權限

- 若 repository 屬於組織：提供該單一 repository 的 **Maintain** 權限即可設定 GitHub Pages；不需要組織擁有者或全域管理員權限。
- 若只需要代為推送程式碼：可使用只限定該 repository、`Contents: Read and write` 的 fine-grained personal access token，並設定短效期限；Pages 發布來源仍由具 Maintain／Admin 權限者設定。
- 不要在對話中貼上密碼或長效 token。優先使用 GitHub CLI 的瀏覽器登入，工作完成後撤銷授權或移除協作者。

## 建議部署方式

本專案不需要建置流程。將 `main` 分支根目錄設為 GitHub Pages 發布來源：

1. 將本機 repository push 到核准的 GitHub repository。
2. GitHub repository → **Settings** → **Pages**。
3. Source 選擇 **Deploy from a branch**。
4. Branch 選擇 `main`，folder 選擇 `/ (root)`。
5. 儲存並等待 GitHub 顯示正式網址。
6. 強制使用 HTTPS（GitHub `github.io` 網域通常自動提供）。

## 部署後 smoke test

- 首頁與六個導覽頁皆回應成功。
- 行動版導覽可展開。
- Forms 內嵌與另開視窗可用。
- Teams 連結可開啟並通過公司帳號權限。
- 兩張座位圖切換正確。
- DM、議程、交通資訊與活動資料為正式版本。
- `robots.txt` 與各頁 `noindex` 存在。

## 回復

1. 找出上一個通過驗收的 commit SHA。
2. 優先以 `git revert <problem-commit>` 建立可追溯的反向提交；不要改寫已發布歷史。
3. Push `main`，等待 Pages 重新發布。
4. 重跑部署後 smoke test並記錄結果。

若錯誤涉及未核准公開資料，先取消發布，再執行回復與重新驗收。

## 活動後下架

1. Repository → **Settings** → **Pages**。
2. 在目前部署旁選擇 **Unpublish site**；若使用 branch 發布，也可將發布來源改為 `None`。
3. 以無痕視窗確認網址已無法存取。
4. 保留 repository 與 Git 歷史供稽核；若圖片含需刪除的資料，另依公司資料保存政策處理，不能只依賴 GitHub Pages 下架。

## 監控與責任

- 網站／內容／發布負責人：使用者指定之 GitHub repository 管理者。
- 外部服務負責人：Microsoft Forms／Teams 建立者。
- 事故通報窗口：待使用者指定。
- 正式秘密：本專案不應包含秘密；若未來出現 token／密碼，必須移出前端並立即撤銷。
