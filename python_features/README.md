# 🐍 Smart Budgeting & Analysis Service (Python)

This microservice acts as the **"Intelligence Layer"** of the Personal Finance Tracker. It processes raw expense data to provide **actionable financial insights and smart budgeting suggestions** using data science techniques.

---

## 🛠️ Core Functionalities

### 📊 Data Analysis
- Analyzes spending patterns from the last **30 days**
- Detects category-wise expense trends
- Identifies unusual spending behavior

---

### 💡 Smart Suggestions
- Generates personalized insights like:
  - "Food expenses are up by 15%, try to cook at home"
  - "You are nearing your monthly budget limit"
- Helps users make better financial decisions

---

### ⚡ Pandas Integration
- Uses **Pandas DataFrames** for efficient data processing
- Calculates:
  - Category-wise totals
  - Spending trends
  - Budget overflows

---

### 🔗 JSON API
- Lightweight **Flask API**
- Sends processed insights directly to the **Next.js frontend**
- Seamless integration with frontend hooks (e.g., `useAnalysis.js`)

---

## 📂 Project Structure

```
python_services/
│── app.py / main.py # Flask API entry point
│── analysis_engine.py # Core logic for data analysis
│── requirements.txt # Python dependencies

```


---

## 🛠️ Tech Stack

| Tool      | Purpose                              |
|----------|--------------------------------------|
| Python 3.x | Core programming language           |
| Flask     | REST API for frontend communication |
| Pandas    | Data analysis & trend detection     |

---

## 🚀 How to Run

### 1️⃣ Navigate to Directory
```bash
cd python_services
python -m venv venv
venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
python app.py 
 ```

## 📡 API Integration

The service runs on **port 8000** (configurable).

### Endpoint

| Method | Endpoint        | Description                          |
|--------|----------------|--------------------------------------|
| POST   | /api/analyze   | Returns smart financial suggestions  |

## 👤 Developer: Shubham Sharma

Feel free to connect with me:

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shubhamsharma2002)  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shubhamsharma2026/)   [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shubhamjii2002@gmail.com)