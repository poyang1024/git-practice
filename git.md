# Git 概述

## 1. Git 核心概念深入解析

### 1.1 Blob (Binary Large Object)

Blob 是 Git 中最基本的數據單位,用於儲存文件的內容。

- 特點:
  - 每個 blob 都由其內容的 SHA-1  Hash 值唯一標識
  - blob 不包含任何元數據 (Metadata),如文件名或權限
  - 相同內容的文件,無論在哪裡,都共享同一個 blob

- 技術細節:
  - blob 的格式: `blob ${content.length}\0${content}`
  - 可以使用 `git hash-object` 命令創建 blob

範例:
```bash
echo "Hello, Git!" | git hash-object --stdin -w
```

### 1.2 Tree

Tree 對象代表一個目錄結構,是 Git 中的核心概念之一。

- 組成:
  - 包含指向 blob（文件）或其他 tree（子目錄）的指針
  - 每個指針都有相應的模式（文件權限）、類型（blob 或 tree）、文件名或目錄名

- 功能:
  - 允許 Git 高效地儲存和重建完整的目錄結構
  - 支援快照 (Snapshot) 功能,使得分支和版本控制成為可能

- 技術細節:
  - tree 的格式: `tree ${content.length}\0${content}`
  - content 包含多個條目,每個條目格式為: `${mode} ${name}\0${sha1}`

範例:
```bash
git ls-tree HEAD
```

### 1.3 Commit

Commit 對象代表項目在特定時間點的完整快照 (Snapshot)。

- 組成:
  - 指向 top-level tree 的指針
  - 父 commit 的引用（合併提交可能有多個父 commit）
  - 作者和提交者資訊
  - 提交消息
  - 時間戳記

- 特點:
  - 通過 SHA-1  Hash 值唯一標識
  - 形成有向無環圖（DAG）結構,支援分支和合併操作

- 技術細節:
  - commit 的格式:
    ```
    commit ${content.length}\0tree ${tree-sha1}
    parent ${parent-sha1}
    author ${author-name} <${author-email}> ${author-timestamp}
    committer ${committer-name} <${committer-email}> ${committer-timestamp}

    ${commit-message}
    ```

範例:
```bash
git cat-file -p HEAD
```

### 1.4 Branch

Branch 是指向特定 commit 的輕量級移動指針。

- 特點:
  - 支援並行開發和特性隔離
  - 可以輕易創建、合併和刪除
  - 本質上是一個指向 commit 對象的引用

- 實現:
  - 在 .git/refs/heads/ 目錄下儲存為文件
  - 文件內容是它指向的 commit 的 SHA-1  Hash 值

- 操作:
  - 創建: `git branch <branch-name>`
  - 切換: `git checkout <branch-name>` 或 `git switch <branch-name>`
  - 合併: `git merge <branch-name>`

### 1.5 HEAD

HEAD 是當前檢出分支的符號引用。

- 功能:
  - 指示當前工作的位置
  - 決定下一個 commit 的父節點

- 特點:
  - 通常指向一個分支引用
  - 可以直接指向一個 commit（稱為 "detached HEAD" 狀態）

- 實現:
  - 儲存在 .git/HEAD 文件中
  - 內容通常是 `ref: refs/heads/<branch-name>`

- 操作:
  - 移動 HEAD: `git checkout` 或 `git switch`
  - 查看 HEAD: `cat .git/HEAD`

## 2. .git 目錄結構和變化觀察

.git 目錄是 Git 儲存庫的核心,包含了所有版本控制相關的資訊。

### 2.1 主要組成部分

1. objects/: 儲存所有數據內容
   - 格式: `objects/ab/cdef...` (前兩個字符為子目錄名,餘下為文件名)
   - 包含 blob、tree、commit 對象

2. refs/: 儲存指向數據（分支、遠程分支、標籤等）的指針
   - refs/heads/: 本地分支
   - refs/remotes/: 遠程分支
   - refs/tags/: 標籤

3. HEAD: 指向當前分支的引用

4. config: 倉庫的配置文件

5. index: 暫存區資訊

### 2.2 Git 操作與 .git 目錄變化

1. 初始化倉庫:
   - 創建 .git 目錄及其基本結構

2. 添加文件到暫存區 (git add):
   - 在 objects/ 中創建新的 blob 對象
   - 更新 index 文件

3. 提交更改 (git commit):
   - 創建新的 tree 對象和 commit 對象
   - 更新當前分支引用 (refs/heads/<branch>)
   - 更新 HEAD (如果在分支上)

4. 創建新分支 (git branch):
   - 在 refs/heads/ 中創建新文件

5. 切換分支 (git checkout/switch):
   - 更新 HEAD 文件
   - 可能更新 index 和工作目錄

6. 合併分支 (git merge):
   - 創建新的 commit 對象 (如果不是快進合併)
   - 更新當前分支引用
   - 可能創建 MERGE_HEAD (合併衝突時)

7. 拉取更新 (git pull):
   - 更新 refs/remotes/
   - 創建新的 commit 對象 (如果有新的更改)
   - 更新當前分支引用

### 2.3 觀察變化的方法

1. 使用 `git cat-file` 命令查看對象內容:
   ```bash
   git cat-file -p <object-hash>
   ```

2. 使用 `git ls-files` 查看索引內容:
   ```bash
   git ls-files --stage
   ```

3. 直接查看 .git 目錄中的文件:
   ```bash
   cat .git/HEAD
   cat .git/refs/heads/master
   ```

4. 使用 `git log` 查看提交歷史:
   ```bash
   git log --graph --oneline --all
   ```

5. 使用 `git reflog` 查看引用日誌:
   ```bash
   git reflog
   ```

6. 使用 `git status` 查看工作區和暫存區的狀態:
   ```bash
   git status
   ```

7. 使用 `git diff` 比較工作區、暫存區和提交之間的差異:
   ```bash
   git diff  # 工作區 vs 暫存區
   git diff --staged  # 暫存區 vs 最近一次提交
   ```

8. 使用 `git ls-tree` 查看特定提交或分支的目錄結構:
   ```bash
   git ls-tree -r HEAD
   ```

9. 使用 `git show` 查看特定提交的詳細資訊:
   ```bash
   git show <commit-hash>
   ```

### 2.4 Git 操作及其對應的 .git 目錄變化

以下是一些常見 Git 操作及其導致的 .git 目錄變化的具體例子:

1. 初始化新的 Git 倉庫 (`git init`):
   - 創建 .git 目錄及其基本結構
   - 變化:
     ```
     .git/
     ├── HEAD  # 內容: ref: refs/heads/master
     ├── config
     ├── description
     ├── hooks/
     ├── info/
     ├── objects/
     └── refs/
     ```

2. 添加新文件到暫存區 (`git add file.txt`):
   - 在 objects/ 中創建新的 blob 對象
   - 更新 index 文件
   - 變化:
     ```
     .git/
     ├── index  # 更新
     └── objects/
         └── aa/
             └── 1234...  # 新的 blob 對象
     ```

3. 提交更改 (`git commit -m "Add file.txt"`):
   - 創建新的 tree 對象和 commit 對象
   - 更新當前分支引用
   - 變化:
     ```
     .git/
     ├── HEAD  # 如果是第一次提交,內容會變為具體的 commit hash
     ├── logs/
     │   └── refs/
     │       └── heads/
     │           └── master  # 更新
     ├── objects/
     │   ├── aa/
     │   │   └── 1234...  # blob 對象 (之前的文件內容)
     │   ├── bb/
     │   │   └── 5678...  # 新的 tree 對象
     │   └── cc/
     │       └── 9012...  # 新的 commit 對象
     └── refs/
         └── heads/
             └── master  # 更新,指向新的 commit 對象
     ```

4. 創建新分支 (`git branch feature`):
   - 在 refs/heads/ 中創建新文件
   - 變化:
     ```
     .git/refs/heads/
     ├── master
     └── feature  # 新文件,內容與 master 相同
     ```

5. 切換分支 (`git checkout feature`):
   - 更新 HEAD 文件
   - 變化:
     ```
     .git/HEAD  # 內容變為: ref: refs/heads/feature
     ```

6. 合併分支 (`git merge feature`):
   - 可能創建新的 commit 對象 (如果不是快進合併)
   - 更新當前分支引用
   - 變化:
     ```
     .git/
     ├── MERGE_HEAD  # 臨時文件,合併完成後刪除
     ├── objects/
     │   └── dd/
     │       └── 3456...  # 新的合併 commit 對象
     └── refs/heads/master  # 更新,指向新的合併 commit
     ```

7. 拉取遠程更新 (`git pull origin master`):
   - 更新 refs/remotes/
   - 可能創建新的 commit 對象
   - 變化:
     ```
     .git/
     ├── FETCH_HEAD  # 更新
     ├── objects/  # 可能有新對象
     └── refs/
         ├── heads/master  # 可能更新
         └── remotes/origin/master  # 更新
     ```

8. 推送到遠程 (`git push origin master`):
   - 主要影響遠程倉庫,本地 .git 目錄變化不大
   - 可能更新 refs/remotes/
   - 變化:
     ```
     .git/refs/remotes/origin/master  # 可能更新
     ```

9. 重置提交 (`git reset --hard HEAD~1`):
   - 更新當前分支引用
   - 可能導致一些對象成為垃圾 (未被引用)
   - 變化:
     ```
     .git/
     ├── HEAD  # 可能更新
     ├── logs/refs/heads/master  # 更新
     └── refs/heads/master  # 更新,指向前一個 commit
     ```

通過觀察這些具體的變化,可以更深入地理解 Git 的內部工作機制,以及各種操作如何影響倉庫的狀態。這種理解對於解決複雜的版本控制問題和優化 Git 工作流程非常有幫助。

## 3. Commit Message 最佳實踐

編寫清晰、資訊豐富的 commit message 是保持專案歷史可讀性和可維護性的關鍵。以下是一些建議跟方法:

### 3.1 結構化 Commit Message

採用結構化的 commit message 格式可以提高可讀性和一致性:

```
<type>(<scope>): <subject>

<body>

<footer>
```

- `<type>`: 提交類型,如 feat (新功能), fix (錯誤修復), docs (文檔), style (格式), refactor, test, chore 等
- `<scope>`: 可選,表示 commit 影響的範圍,如組件名或文件名
- `<subject>`: 簡短描述,不超過 50 個字符
- `<body>`: 詳細描述,解釋修改程式碼的原因和前後差異
- `<footer>`: 可選,用於關閉 issue 或說明破壞性變更 (BREAKING CHANGE)

### 3.2 Commit Message 指南

1. 使用祈使句語氣:
   - 好: "Add feature" 而不是 "Added feature" 或 "Adds feature"

2. 首行概括,不用句號結尾:
   - 寫成: "Refactor user authentication module"
   - 避免: "Refactored user authentication module."

3. 主題行限制在 50 個字符以內:
   - 確保在各種 Git 工具中都能完整顯示

4. 主體內容每行控制在 72 個字符以內:
   - 提高在各種文本編輯器中的可讀性

5. 使用主體來解釋"什麼"和"為什麼",而不是"如何":
   - 程式碼已經說明了"如何",commit message 應該解釋更改的原因

6. 如果存在相關的 issue 或 bug 追蹤的票號,要引用它們:
   - "Closes #123" 或 "Fixes #456"

7. 對於重大更改,使用 "BREAKING CHANGE:" 前綴:
   - 清楚的標識可能破壞向後兼容性的更改

### 3.3 範例

一個好的 commit message 範例:

```
feat(auth): implement JWT-based authentication

- Add JWT token generation on successful login
- Implement middleware for token verification
- Update user routes to use new authentication method

This change improves the security of our authentication system
by replacing session-based auth with stateless JWT tokens.
It also lays the groundwork for future API-based integrations.

Closes #87
BREAKING CHANGE: This changes the authentication flow. Clients
need to be updated to handle JWT tokens instead of session cookies.
```

### 3.4 工具和自動化

1. 使用 commitlint 等工具來強制執行 commit message 規範
2. 設置 Git hooks (如 pre-commit) 來自動檢查 commit message
3. 使用 commitizen 等工具來協助生成規範化的 commit message

### 3.5 Commit Type 詳解

在撰寫 commit message 時,正確使用 type 是非常重要的。以下是更詳細的 type 分類及其使用介紹:

| Type     | 說明                                           | 程式碼改動 |
|----------|------------------------------------------------|------------|
| Feat     | 新功能                                         | 有         |
| Modify   | 既有功能需求調整的修改                         | 有         |
| Fix      | 錯誤修正                                       | 有         |
| Docs     | 更新文件，如 README.md                         | 沒有       |
| Style    | 程式碼格式調整(formatting)、缺少分號等         | 沒有       |
| Refactor | 重構，針對已上線功能程式碼調整與優化，不改變邏輯 | 有         |
| Test     | 測試，新增測試、重構測試等                     | 沒有       |
| Chore    | 更新專案建置設定、更新版本號等瑣事             | 沒有       |
| Revert   | 撤銷之前的 commit                              | 有         |

注意事項:
1. Type 必須包含在 commit 標題中。
2. 使用 Revert 類型時,格式應為: `revert: type(scope): subject (回覆版本：xxxx)`
3. 根據改動的性質選擇適當的 type,這有助於後續的程式碼審查和版本控制。

範例:
```
feat(auth): add OAuth2 support for social login
```
```
fix(api): resolve race condition in user data fetch
```
```
docs(readme): update installation instructions for v2.0
```
```
refactor(performance): optimize database queries for user listing
```

備註：
1. 3.5 資料來源：https://hackmd.io/@dh46tw/S1NPMsy5L
2. 上述內容部分藉由 Claude 3.5 Sonnet LLM 整理
