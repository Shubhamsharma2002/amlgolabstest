import pandas as pd

def get_smart_suggestions(expenses_data):
    if not expenses_data:
        return ["No data available to analyze. Start adding expenses!"]

    # Data ko Pandas DataFrame mein convert karna [cite: 40]
    df = pd.DataFrame(expenses_data)
    
    # Date column ko datetime format mein lana
    df['date'] = pd.to_datetime(df['date'])
    
    suggestions = []

    # 1. Category-wise Analysis [cite: 30]
    category_totals = df.groupby('category')['amount'].sum()
    
    # Sabse zyada kharche wali category dhundna [cite: 28]
    if not category_totals.empty:
        top_category = category_totals.idxmax()
        top_amount = category_totals.max()
        suggestions.append(f"You're spending a lot on {top_category} (₹{top_amount}). Try to reduce it by 15% next month. [cite: 39]")

    # 2. Total Spend Analysis [cite: 27]
    total_spent = df['amount'].sum()
    if total_spent > 10000:
        suggestions.append("Your total monthly spend is quite high. Consider reviewing your 'Notes' for unnecessary expenses.")

    # 3. Payment Method Insight [cite: 29]
    top_payment = df['paymentMethod'].mode()
    if not top_payment.empty:
        suggestions.append(f"You prefer using {top_payment[0]} for most transactions. Keep track of digital receipts!")

    return suggestions