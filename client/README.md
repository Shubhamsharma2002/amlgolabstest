# 💻 FinanceApp Frontend (Next.js 14)

This is the interactive, user-facing frontend of the **Personal Finance Tracker**. Built with **Next.js 14 (App Router)**, it features a modern, responsive UI with real-time data visualization and role-based access control.

---

## 🚀 Key Features

### 📊 Modern Dashboard
- Visual spending insights using **Recharts / Chart.js**
- Monthly analytics and category breakdowns
- Clean UI with summary cards and charts

---

### 🧑‍💼 Role-Based UI
- Dynamic sidebar and routes
- Different views for:
  - 👤 User
  - 🛠️ Admin

---

### 💰 Expense Management
- Add, update, delete expenses
- Filter & search functionality
- Optimized forms with validation

---

### 📱 Responsive Design
- Built with **Tailwind CSS**


---

### 🔐 Secure Routing
- Protected dashboard routes
- JWT-based session validation
- Auth-aware navigation

---

## 📁 Folder Structure

```
src/
│── app/ # Next.js App Router (routes & layouts)
│ ├── (dashboard)/ # Protected dashboard routes
│ ├── login/ # Login page
│ ├── signup/ # Signup page
│ ├── admin/ # Admin routes
│
│── components/
│ ├── admin/ # Admin UI components
│ ├── dashboard/ # Charts & summary cards
│ ├── layout/ # Sidebar, Topbar, Layout wrappers
│
│── hooks/ # Custom hooks (useAuth, useAdmin, useExpenses)
│── lib/ # API & auth utilities

```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)  
- **Styling:** Tailwind CSS  
- **API Calls:** Axios / Fetch  
- **Charts:** Chart.js / Recharts  
- **Icons:** Lucide Icons  

---

## 🚀 Installation & Setup

### 1️⃣ Navigate to Client
```bash
cd client
npm run dev
```

## 🔑 Core Features Implemented

- ✅ Conditional rendering in Sidebar based on user roles  
- ✅ Full CRUD UI for Expenses & Budgets  
- ✅ Admin dashboard with SQL-based reporting insights  
- ✅ Protected routes using authentication logic  


## 👤 Developer: Shubham Sharma

Feel free to connect with me:

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shubhamsharma2002)  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubhamsharma2026/)   [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shubhamjii2002@gmail.com)