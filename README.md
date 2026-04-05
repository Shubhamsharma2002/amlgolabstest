# 💰 FinanceApp - Full Stack Expense Management System

A high-performance MERN stack application featuring **Role-Based Access Control (RBAC)**, **AI-powered Analysis**, and **Automated SQL Reporting**. This project was built as part of the Amlgo Labs assessment to demonstrate full-stack proficiency.

---

## 🏗️ Architecture Overview

The project is divided into three main micro-services:

* **`/client`**: Next.js 14 frontend with Tailwind CSS and Framer Motion.
* **`/server`**: Node.js & Express backend with MongoDB (Mongoose).
* **`/python_services`**: Python-based AI features and data processing.

---

## 🌟 Key Features

### 👤 User Dashboard
* **Expense Tracking:** Add, edit, and delete personal expenses.
* **Budget Management:** Set monthly limits and track spending progress.
* **Visual Insights:** Interactive charts for category-wise spending.

### 👑 Admin Command Center (RBAC)
* **Platform Stats:** Real-time monitoring of total users and global spending.
* **User Management:** Administrative control to view and delete users.
* **SQL Data Sync:** (Assessment Point 6) Capability to aggregate MongoDB data and sync/export to SQL for structured reporting.

### 🐍 Python Integration
* Advanced data analysis and AI-driven spending suggestions.

---
---

## 🚀 Live Demo

🔗 [View Live App](https://dashboard1-byshubham.vercel.app/)

---
## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js, Tailwind CSS, Axios, Context API |
| **Backend** | Node.js, Express.js, JWT (Authentication) |
| **Primary Database** | MongoDB (NoSQL) |
| **Reporting DB** | SQLite/PostgreSQL (SQL Integration) |
| **Services** | Python (Flask/FastAPI) |

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd server
npm install
# Create .env with MONGO_URI, ACCESS_TOKEN_SECRET, etc.
npm run dev
```
### 2. Frontend Setup
```bash 
cd client
npm install
npm run dev

```

### 3. Python Services
```bash
cd python_services
pip install -r requirements.txt
python main.py

```
## 🌟 Assessment Highlights & Compliance

### ✅ Point 4: Role-Based Dashboards (RBAC)
- **User Side:** Personal expense tracking, budget progress bars, and category-wise spending charts.
- **Admin Side:** Exclusive access to **Platform Stats** (Total Users, Global Spending) and **User Management** (Delete/Monitor users).

### ✅ Point 5: Expense & Budget CRUD
- Full Create, Read, Update, and Delete capabilities for Expenses.
- Smart Budgeting: Users can set limits and receive visual warnings when approaching budget thresholds.

### ✅ Point 6: Admin SQL Reporting
- **Data Synchronization:** Capability to aggregate unstructured MongoDB data and sync it into a structured **SQL database (SQLite/PostgreSQL)** for long-term audit and reporting.
- **Monthly Reports:** Admin can trigger a background process to generate system-wide financial summaries.

### ✅ Point 7: Python Integration (AI & Analysis)
- **Data Processing:** Integrated Python service that analyzes user spending patterns.
- **Automated Insights:** Uses Python's data libraries to provide predictive spending suggestions and outlier detection for better financial planning.

---


## 👤 Developer: Shubham Sharma

Feel free to connect with me:

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shubhamsharma2002)  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubhamsharma2026/)   [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shubhamjii2002@gmail.com)