import pandas as pd

def get_smart_suggestions(expenses_data):
    # Check if data exists and is a list
    if not expenses_data or len(expenses_data) == 0:
        return ["No data available to analyze. Start adding expenses!"]

    try:
        df = pd.DataFrame(expenses_data)
        
        # 1. Critical Fix: Convert amount to numeric (In case it's a string)
        df['amount'] = pd.to_numeric(df['amount'], errors='coerce')
        
        # 2. Date formatting
        df['date'] = pd.to_datetime(df['date'])
        
        suggestions = []

        # Category-wise Analysis
        category_totals = df.groupby('category')['amount'].sum()
        
        if not category_totals.empty:
            top_category = category_totals.idxmax()
            top_amount = float(category_totals.max()) # Convert to float for JSON
            suggestions.append(f"You're spending a lot on {top_category} (₹{top_amount}). Try to reduce it by 15% next month.")

        # Total Spend Analysis
        total_spent = float(df['amount'].sum())
        if total_spent > 10000:
            suggestions.append(f"Your total monthly spend is high (₹{total_spent}). Consider reviewing your notes.")

        # Payment Method Insight
        if 'paymentMethod' in df.columns:
            top_payment = df['paymentMethod'].mode()
            if not top_payment.empty:
                suggestions.append(f"You prefer using {top_payment[0]} for most transactions.")

        return suggestions
    except Exception as e:
        return [f"Analysis Error: {str(e)}"]