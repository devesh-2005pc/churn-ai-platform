# AI Customer Churn Predictor

A production-style full-stack SaaS platform to predict and prevent customer churn.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Recharts, Lucide Icons, Axios.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer.
- **Machine Learning**: Python, Scikit-Learn, Pandas, Flask.

## Quick Start
1. **Clone & Setup Environment**
   - Create `.env` in `backend/` with standard mongo and jwt keys.
2. **Train & Start ML Service**
   - `cd ml-service`
   - `pip install pandas scikit-learn flask flask-cors joblib`
   - `python train_model.py`
   - `python app.py` (Port 8000)
3. **Start Backend**
   - `cd backend`
   - `npm install`
   - `npm start` (Port 5000)
4. **Start Frontend**
   - `cd frontend`
   - `npm install`
   - `npm run dev` (Port 5173)

## Key Features
- **Multi-Tenant Support**: Isolated data for different companies.
- **Explainable Predictions**: Know why a customer is at risk.
- **Retention Actions**: Contextual suggestions based on risk.
- **CSV Reports**: Export audit logs instantly.
