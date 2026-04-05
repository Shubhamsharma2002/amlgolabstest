from flask import Flask, request, jsonify
from flask_cors import CORS
from analysis_engine import get_smart_suggestions

app = Flask(__name__)
CORS(app) # Sabse zaroori frontend connection ke liye

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    # Frontend se 'expenses' key ke andar data aana chahiye
    expenses = data.get('expenses', [])
    
    # Debugging: Terminal mein check karo data aa raha hai ya nahi
    print(f"Received {len(expenses)} expenses for analysis.") 
    
    suggestions = get_smart_suggestions(expenses)
    return jsonify({"suggestions": suggestions})

if __name__ == '__main__':
    # Debug mode on rakho taaki changes turant reflect hon
    app.run(port=8000, debug=True)