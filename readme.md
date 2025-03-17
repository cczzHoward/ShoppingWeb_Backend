# ShoppingWeb Backend

這是一個使用 Node.js 和 Express 框架開發的購物網站後端 API 服務。

## 功能特點

- 使用者管理系統
  - 註冊新用戶
  - 用戶登入
  - 用戶資料更新
  - 支援多重角色（顧客、賣家、管理員）

- 商品管理系統
  - 瀏覽所有商品
  - 查看單一商品詳情
  - 新增商品（限賣家）
  - 商品分類（食品、飲料、其他）

- API 文件
  - 整合 Swagger UI
  - RESTful API 設計
  - 完整的 API 文件

## 專案結構

ShoppingWeb_Backend/
├── config/
│ └── passport.js # Passport JWT 設定
│
├── models/
│ ├── db.js # 資料庫連線設定
│ ├── index.js # 模型導出設定
│ ├── products.js # 商品模型
│ └── users.js # 使用者模型
│
├── router/
│ ├── index.js # 路由導出設定
│ ├── products.js # 商品相關路由
│ └── users.js # 使用者相關路由
│
├── utils/
│ └── validator.js # 資料驗證工具
│
├── .env # 環境變數設定
├── .gitignore # Git 忽略檔案設定
├── index.js # 應用程式入口
├── package.json # 專案設定與依賴
├── README.md # 專案說明文件
├── swagger.js # Swagger 設定
└── swagger-config.json # Swagger API 文件

## 技術架構

- **後端框架**: Express.js
- **資料庫**: MongoDB
- **認證機制**: JWT (JSON Web Token)
- **密碼加密**: bcrypt
- **API 文件**: Swagger UI
- **資料驗證**: Joi
- **身份驗證**: Passport.js

## 環境需求

- Node.js
- MongoDB
- npm 或 yarn

## 安裝步驟

1. 複製專案
```bash
git clone git@github.com:cczzHoward/ShoppingWeb_Backend.git
```

2. 安裝依賴套件
```bash
npm install
```

3. 設定環境變數
建立 `.env` 檔案並設定以下變數：
TOKEN_SECRET=your_jwt_secret

4. 啟動 MongoDB
```bash
mongod --dbpath /path/to/data/db
```

5. 啟動服務
```bash
node index.js
```

## API 端點

### 使用者相關

- `GET /api/v1/users` - 取得所有使用者
- `POST /api/v1/users/register` - 註冊新使用者
- `POST /api/v1/users/login` - 使用者登入
- `PATCH /api/v1/users/:id` - 更新使用者資料

### 商品相關

- `GET /api/v1/products` - 取得所有商品
- `GET /api/v1/products/:id` - 取得特定商品
- `POST /api/v1/products` - 新增商品（需要賣家權限）

## API 文件

啟動服務後，可以在以下網址查看完整的 API 文件：
```
http://localhost:8080/api-docs
```

## 資料模型

### 使用者 (User)
- username: 使用者名稱
- email: 電子郵件
- password: 密碼
- role: 角色（customer/seller/admin）
- date: 建立日期

### 商品 (Product)
- title: 商品名稱
- price: 價格
- category: 分類（food/drink/others）
- description: 商品描述
- image: 商品圖片
- seller: 賣家資訊
- date: 建立日期

## 開發工具

- 產生 Swagger 文件：
```bash
npm run swagger
```

## 授權條款

ISC License

