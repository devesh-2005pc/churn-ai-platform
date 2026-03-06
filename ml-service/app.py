from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# =========================
# Load Model
# =========================

MODEL_PATH = "models/churn_model.pkl"
FEATURES_PATH = "models/features.pkl"

model = None
features = None

try:
    if os.path.exists(MODEL_PATH) and os.path.exists(FEATURES_PATH):
        model = joblib.load(MODEL_PATH)
        features = joblib.load(FEATURES_PATH)
        print("✅ ML Model Loaded Successfully")
    else:
        print("❌ Model files not found")
except Exception as e:
    print("❌ Error loading model:", str(e))


# =========================
# Health Check API
# =========================

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ML Service Running",
        "model_loaded": model is not None
    })


# =========================
# Prediction API
# =========================

@app.route("/predict", methods=["POST"])
def predict():

    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.json

        # Convert input to dataframe
        input_df = pd.DataFrame([data])

        # Arrange features in correct order
        input_df = input_df[features]

        # Predict probability
        probability = model.predict_proba(input_df)[0][1]

        # Risk classification
        risk_level = "Low"

        if probability > 0.6:
            risk_level = "High"
        elif probability > 0.3:
            risk_level = "Medium"

        result = {
            "probability": float(probability),
            "risk_level": risk_level,
            "factors": {
                "supportTickets": data.get("supportTickets"),
                "usageFrequency": data.get("usageFrequency"),
                "lastLoginDays": data.get("lastLoginDays")
            }
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# =========================
# Run Flask Server
# =========================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 8000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )