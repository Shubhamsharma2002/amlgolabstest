from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
CORS(app)

def generate_insights(df, recent_df):
    suggestions = []
    total_spent = int(recent_df['amount'].sum())
    
    if total_spent == 0:
        return ["Bhai, abhi koi kharcha record nahi hua hai. Data add karo!"], 0

    # Category totals nikalna
    category_totals = recent_df.groupby('category')['amount'].sum()
    
    # 1. Top Spending Insight
    max_cat = category_totals.idxmax()
    max_amt = int(category_totals.max())
    suggestions.append(f"Oye! Sabse zyada kharcha '{max_cat}' par hua hai (₹{max_amt}).")

    # 2. Food & Dining Logic (Threshold 30%)
    food_spent = category_totals.get('Food', 0)
    if food_spent > (total_spent * 0.30):
        percent = int((food_spent / total_spent) * 100)
        suggestions.append(f"Food par total ka {percent}% kharch ho raha hai. Thoda ghar ka khana khao! 🍱")

    # 3. Monthly Budget Alert
    if total_spent > 15000:
        suggestions.append("Budget Alert: Is mahine 15k cross ho gaye hain. Hath thoda tight rakho! 💸")

    # 4. Week-over-Week Comparison
    # Aaj se 7 din pehle vs usse 7 din pehle
    today = datetime.now(timezone.utc)
    last_week_start = today - timedelta(days=7)
    prev_week_start = today - timedelta(days=14)

    last_week_sum = recent_df[recent_df['date'] >= last_week_start]['amount'].sum()
    prev_week_sum = recent_df[(recent_df['date'] >= prev_week_start) & (recent_df['date'] < last_week_start)]['amount'].sum()

    if last_week_sum > prev_week_sum and prev_week_sum > 0:
        increase = int(((last_week_sum - prev_week_sum) / prev_week_sum) * 100)
        suggestions.append(f"Pichle hafte ke muqable kharcha {increase}% badh gaya hai. Sambhal jao! ⚠️")

    return suggestions, total_spent

@app.route('/analyze', methods=['POST'])
def analyze_expenses():
    try:
        raw_data = request.json.get('expenses', [])
        
        if not raw_data or len(raw_data) == 0:
            return jsonify({
                "success": True,
                "suggestions": ["Bhai, dashboard khali hai! Pehle kuch khrache add karo tabhi analysis milega."],
                "total_analyzed": 0
            })

        # DataFrame Creation
        df = pd.DataFrame(raw_data)
        
        # Data Cleaning: Date column ko proper format mein lana
        # errors='coerce' se invalid dates NaT ban jayengi, jinhe hum drop kar denge
        df['date'] = pd.to_datetime(df['date'], errors='coerce')
        df['amount'] = pd.to_numeric(df['amount'], errors='coerce').fillna(0)
        df = df.dropna(subset=['date'])

        # Filter: Last 30 Days
        # Use timezone-aware comparison to avoid errors
        now = datetime.now(timezone.utc)
        thirty_days_ago = now - timedelta(days=30)
        
        # Ensure df['date'] is also UTC if it's not
        if df['date'].dt.tz is None:
            df['date'] = df['date'].dt.tz_localize('UTC')

        recent_df = df[df['date'] >= thirty_days_ago]

        if recent_df.empty:
            return jsonify({
                "success": True,
                "suggestions": ["Pichle 30 din mein koi data nahi mila. Purane kharche analyze nahi ho rahe."],
                "total_analyzed": 0
            })

        # Generate Insights
        suggestions, total_spent = generate_insights(df, recent_df)

        return jsonify({
            "success": True,
            "suggestions": suggestions,
            "total_analyzed": total_spent
        })

    except Exception as e:
        print(f"DEBUG ERROR: {str(e)}") # Python console mein error dikhega
        return jsonify({
            "success": False, 
            "error": "Analysis failed",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)