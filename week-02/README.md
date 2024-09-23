# NodeJS 安裝筆記

## 安裝 NodeJS

### 推薦版本

- 推薦安裝 NodeJS 的長期支持版本（LTS）。截至2024年9月，最新的 LTS 版本是 20.x.x。
- (但我因為之前就有安裝過 Node.js 所以我的版本是 ```18.20.2``` )

### 為什麼選擇 LTS 版本？

1. **穩定性**：LTS 版本經過長期測試，bug 較少。
2. **安全性**：獲得長期的安全更新支持。
3. **兼容性**：大多數 npm package 和工具都支持 LTS 版本。

## 安裝的 NodeJS 版本

```script
node --version
v20.x.x  # 實際版本號可能略有不同
```

## nvm 與 npm

### nvm (Node Version Manager)

nvm 是一個 NodeJS 版本管理工具。

- 允許在同一台電腦上安裝和切換不同版本的 NodeJS
- 便於測試不同 NodeJS 版本下的應用兼容性
- 可以輕鬆升級或降級 NodeJS 版本

使用範例：

```script
nvm install 20    # 安裝 NodeJS 20.x.x
nvm use 20        # 切換到 NodeJS 20.x.x
```

### npm (Node Package Manager)

npm 是 NodeJS 的 package 管理器。

- 用於安裝、共享和管理 JavaScript 包
- 隨 NodeJS 一起安裝，無需單獨安裝
- 管理專案的 package 環境設定，便於共享和複製開發環境

使用範例：
```script
npm install express  # 安裝 express 包
npm init             # 初始化新的 npm 項目
```

npm 和 nvm 是兩個不同的工具，但都對 NodeJS 開發非常重要。nvm 管理 NodeJS 本身的版本，而 npm 管理 NodeJS 項目中使用的包。