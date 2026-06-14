import json
import os
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

DB_FILE = 'database.json'

def load_db():
    if not os.path.exists(DB_FILE):
        return {"users": {}}
    with open(DB_FILE, 'r') as f:
        return json.load(f)

def save_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME types
    return send_from_directory('.', path)

@app.route('/api/user/<user_id>', methods=['GET'])
def get_user(user_id):
    db = load_db()
    user = db.get("users", {}).get(user_id)
    if user:
        return jsonify({"status": "success", "data": user})
    return jsonify({"status": "error", "message": "User not found"}), 404

@app.route('/api/user', methods=['POST'])
def save_user():
    data = request.json
    user_id = data.get("id", "default_user")
    
    db = load_db()
    if "users" not in db:
        db["users"] = {}
        
    db["users"][user_id] = data
    save_db(db)
    return jsonify({"status": "success", "message": "User profile saved"})

from ml_engine import get_recommendation

@app.route('/api/generate', methods=['POST'])
def generate_plan():
    user_data = request.json
    
    # Run the ML model
    ml_output = get_recommendation(user_data)
    
    # Format the ML output into the expected frontend JSON structure
    plan = {
        "workout": [
            {"id": "w1", "name": ml_output["workout_title"], "desc": "AI Model Prediction", "done": False}
        ] + [{"id": f"e{i}", "name": ex, "desc": "Standard rep range", "done": False} for i, ex in enumerate(ml_output["exercises"])],
        "diet": {
            "breakfast": {"title": "AI Selected: " + ml_output["diet_focus"], "calories": 400, "protein": 15},
            "lunch": {"title": "Standard Balanced Meal", "calories": 600, "protein": 25},
            "dinner": {"title": "Recovery Meal", "calories": 300, "protein": 30}
        }
    }
    
    return jsonify({"status": "success", "data": plan})

if __name__ == '__main__':
    # Start the server on port 8080
    app.run(port=8080, debug=True)
