from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model
MODEL_PATH = 'models/churn_model.pkl'
FEATURES_PATH = 'models/features.pkl'

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    features = joblib.load(FEATURES_PATH)
else:
    model = None
    features = None

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ML Service is running',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not trained'}), 500
    
    data = request.json
    try:
        # Extract features in correct order
        input_data = pd.DataFrame([data])[features]
        
        # Get probability
        prob = model.predict_proba(input_data)[0][1]
        
        # Risk level
        risk_level = 'Low'
        if prob > 0.6:
            risk_level = 'High'
        elif prob > 0.3:
            risk_level = 'Medium'
            
        return jsonify({
            'probability': float(prob),
            'risk_level': risk_level,
            'factors': {
                'supportTickets': data.get('supportTickets'),
                'usageFrequency': data.get('usageFrequency'),
                'lastLoginDays': data.get('lastLoginDays')
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=8000, debug=True)
