
# Work Flow Server - Enterprise Inventory Management API


A **scalable enterprise-level Inventory & Business Management API** built with Node.js, Express, TypeScript, and MongoDB.  
Designed for real-world business workflows including sales, purchases, returns, expenses, and analytics.

---
API LIVE LINK : https://work-flow-server-indol.vercel.app

# 🚀 Features

## 🔐 Authentication & Security
- JWT Authentication (Access Token)
- Password hashing with bcrypt
- Protected routes middleware
- User-based data isolation

## 📦 Inventory Management
- Product CRUD operations
- Category & Brand management
- Automatic stock handling

## 🛒 Purchase System
- Purchase tracking
- Supplier management
- Auto stock increment

## 💰 Sales System
- Sales tracking
- Customer management
- VAT, discount, shipping support
- Auto stock decrement

## 🔁 Return System
- Purchase return
- Sales return
- Stock adjustment automation

## 💸 Expense Management
- Expense categorization
- Business expense tracking

## 📊 Analytics & Reporting
- Dashboard summary
- Sales reports
- Purchase reports
- Expense reports
- Customer & supplier reports

---

# 🧰 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod (Validation)
- JWT Authentication
- Swagger (API Documentation)

---

# 📁 Project Structure

```bash
src/
│
├
│── modules/
│     ├── auth/
│     ├── product/
│     ├── category/
│     ├── brand/
│     ├── purchase/
│     ├── sell/
│     ├── purchaseReturn/
│     ├── sellReturn/
│     ├── supplier/
│     ├── customer/
│     ├── expense/
│     ├── expenseType/
│     └── report/
│   
│── middlewares/
│── routes/
│── utils/
│── config/
│── errors/
│
├
├── app.ts
└── server.ts

```

```bash
git clone https://github.com/7saffix/Work-Flow-server.git
```

```bash
npm install
```
### 📁.env
```bash
PORT=5000
DATABASE_URL=mongodb+srv://your_cluster_url
JWT_ACCESS_SECRET=your_secret_key
JWT_ACCESS_EXPIRES_IN=7d
NODE_ENV=development
```

# 🧠 Business Logic

### 🛒 Purchase Flow
- Creating purchase → stock increases automatically

### 💰 Sales Flow
- Creating sale → stock decreases automatically

### 🔁 Return Flow
- Sales return → stock increases
- Purchase return → stock decreases

### 🔒 Security
- JWT authentication middleware
- Password encryption (bcrypt)
- Protected routes
- User-based access control

### 📊 Dashboard Analytics
- Total Sales
- Total Purchases
- Total Expenses
- Total Profit
- Daily Sales Trends
- Product Performance Metrics

### 🚀 Future Enhancements
- Role-based access control (RBAC) 
- Invoice PDF generation 
- Barcode scanning system 
- Email notifications 
- Advanced analytics dashboard 
- Redis caching layer

## 👨‍💻 Author
Shah Aziz Chowdhury Safi
