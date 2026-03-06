import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

def generate_synthetic_data(n_samples=1000):
    np.random.seed(42)
    data = {
        'monthlySpend': np.random.uniform(20, 200, n_samples),
        'usageFrequency': np.random.uniform(1, 30, n_samples),
        'supportTickets': np.random.randint(0, 10, n_samples),
        'lastLoginDays': np.random.randint(0, 30, n_samples),
        'subscriptionLength': np.random.randint(1, 24, n_samples),
        'engagementScore': np.random.uniform(0, 100, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Logic for churn (ground truth)
    # High support tickets, low usage, high last login days, low engagement -> high churn
    churn_prob = (
        0.3 * (df['supportTickets'] / 10) +
        0.2 * (1 - df['usageFrequency'] / 30) +
        0.2 * (df['lastLoginDays'] / 30) +
        0.3 * (1 - df['engagementScore'] / 100)
    )
    
    df['churn'] = (churn_prob > 0.5).astype(int)
    return df

def train_model():
    print("Generating synthetic data...")
    df = generate_synthetic_data(2000)
    
    X = df.drop('churn', axis=1)
    y = df['churn']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print(f"Model Accuracy: {model.score(X_test, y_test):.2f}")
    
    # Save model and features
    if not os.path.exists('models'):
        os.makedirs('models')
        
    joblib.dump(model, 'models/churn_model.pkl')
    joblib.dump(list(X.columns), 'models/features.pkl')
    print("Model saved to models/churn_model.pkl")

if __name__ == "__main__":
    train_model()
