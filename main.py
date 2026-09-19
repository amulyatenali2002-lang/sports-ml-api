from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib


# Create FastAPI application
app = FastAPI(
    title="Sports Player Performance Prediction API",
    description="API for predicting player performance score",
    version="1.0"
)


# Load trained model
model = joblib.load("player_performance_model.pkl")

# Load scaler
scaler = joblib.load("player_performance_scaler.pkl")

# Load injury model
injury_model = joblib.load("injury_classification_model.pkl")

# Load injury scaler
injury_scaler = joblib.load("injury_classification_scaler.pkl")


# Input data structure
class PlayerData(BaseModel):

    age: float
    sport_type: float
    position: float
    experience_years: float
    height_cm: float
    weight_kg: float
    strength_score: float
    matches_played: float
    goals_scored: float
    assists: float
    training_hours_per_week: float
    gym_sessions_per_week: float
    injury_history_count: float
    leadership_score: float
    decision_making_score: float
    teamwork_score: float
    team_ranking: float
    player_rating: float
    injury_risk: float


# Injury Classification input data
class InjuryData(BaseModel):

    age: float
    sport_type: float
    position: float
    experience_years: float
    height_cm: float
    weight_kg: float
    strength_score: float
    matches_played: float
    goals_scored: float
    assists: float
    training_hours_per_week: float
    gym_sessions_per_week: float
    leadership_score: float
    decision_making_score: float
    teamwork_score: float
    team_ranking: float
    player_performance_score: float
    player_rating: float

# Home page
@app.get("/")
def home():

    return {
        "message": "Sports Player Performance Prediction API is running"
    }


# Prediction API
@app.post("/predict")
def predict_player(data: PlayerData):

    input_data = pd.DataFrame([{
        "age": data.age,
        "sport_type": data.sport_type,
        "position": data.position,
        "experience_years": data.experience_years,
        "height_cm": data.height_cm,
        "weight_kg": data.weight_kg,
        "strength_score": data.strength_score,
        "matches_played": data.matches_played,
        "goals_scored": data.goals_scored,
        "assists": data.assists,
        "training_hours_per_week": data.training_hours_per_week,
        "gym_sessions_per_week": data.gym_sessions_per_week,
        "injury_history_count": data.injury_history_count,
        "leadership_score": data.leadership_score,
        "decision_making_score": data.decision_making_score,
        "teamwork_score": data.teamwork_score,
        "team_ranking": data.team_ranking,
        "player_rating": data.player_rating,
        "injury_risk": data.injury_risk
    }])


    # Scale input
    input_scaled = scaler.transform(input_data)


    # Make prediction
    prediction = model.predict(input_scaled)


    return {
        "predicted_performance_score": round(float(prediction[0]), 2)
    }

    
# Injury Classification prediction API
@app.post("/predict-injury")
def predict_injury(data: InjuryData):

    input_data = pd.DataFrame([{
        "age": data.age,
        "sport_type": data.sport_type,
        "position": data.position,
        "experience_years": data.experience_years,
        "height_cm": data.height_cm,
        "weight_kg": data.weight_kg,
        "strength_score": data.strength_score,
        "matches_played": data.matches_played,
        "goals_scored": data.goals_scored,
        "assists": data.assists,
        "training_hours_per_week": data.training_hours_per_week,
        "gym_sessions_per_week": data.gym_sessions_per_week,
        "leadership_score": data.leadership_score,
        "decision_making_score": data.decision_making_score,
        "teamwork_score": data.teamwork_score,
        "team_ranking": data.team_ranking,
        "player_performance_score": data.player_performance_score,
        "player_rating": data.player_rating
    }])

    input_scaled = injury_scaler.transform(input_data)

    prediction = injury_model.predict(input_scaled)

    return {
        "predicted_injury_risk": int(prediction[0])
    }

