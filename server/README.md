# 🚀 Personal Finance Tracker - Backend API

A robust **Node.js & Express.js backend service** for a Personal Finance Tracker application. Built with a scalable **MVC architecture** and **multi-database integration** to support real-time expense tracking and structured monthly reporting.

---

## 📁 Project Structure
```
src/
│── config/ # Database connections (MongoDB & SQLite)
│── controllers/ # Business logic (auth, expenses, budgets, admin)
│── middleware/ # JWT auth, RBAC, error handling
│── models/ # MongoDB schemas (User, Expense, Budget)
│── routes/ # API routes (feature-based)
│── utils/ # Helper classes (ApiError, ApiResponse)
```

---

## 🛠️ Key Features

### 🔐 Secure Authentication
- User registration & login with BcryptJS password hashing  
- JWT-based authentication (Access & Refresh tokens)  
- Protected routes for user-specific data access  

---

### 💰 Expense & Budget Management
- Full CRUD operations for expenses  
  - Amount  
  - Category  
  - Date  
  - Payment Method  
- Budget Alerts System  
  - ⚠️ Warning at 80% usage  
  - 🚨 Alert at 100% usage  

---

### 🧑‍💼 Admin Command Center
- Admin-only dashboard  
- View total users & platform spending  
- User management (including deletion)  

---

### 🧾 SQL Reporting Module
- Monthly summary stored in SQLite  
- Stores:
  - User ID  
  - Month  
  - Total Spending  
  - Top Category  
- Useful for auditing & analytics  

---

## ⚙️ Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB (Primary), SQLite (Reporting)  
- Authentication: JWT, BcryptJS  
- Architecture: MVC  

---

## 🚀 Installation & Setup

### Clone Repository
```bash
cd server
npm install
npm run dev
```
## 🛣️ API Endpoints

### 🔐 Authentication
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | /api/v1/auth/login     | User login & token generation   |

---

### 💰 Expenses
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /api/v1/expenses       | Fetch user expenses             |

---

### 📊 Budgets
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | /api/v1/budgets        | Set monthly category limits     |

---

### 🧑‍💼 Admin (Protected)
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /api/v1/admin/stats    | Get platform analytics          |

---

### 🧾 Reports
| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | /api/v1/report/sync    | Trigger monthly SQL sync        |


## 👤 Developer: Shubham Sharma

Feel free to connect with me:

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shubhamsharma2002)  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubhamsharma2026/)   [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shubhamjii2002@gmail.com)