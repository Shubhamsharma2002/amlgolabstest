from flask import Flask, request, jsonify
from flask_cors import CORS
from analysis_engine import get_smart_suggestions # Import engine

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json # Frontend se expenses milenge [cite: 35, 41]
    expenses = data.get('expenses', [])
    
    # Engine se suggestions lena
    suggestions = get_smart_suggestions(expenses)
    
    return jsonify({"suggestions": suggestions})

if __name__ == '__main__':
    app.run(port=8000, debug=True)