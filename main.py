import pandas as pd
import numpy as np
import joblib

from fastapi import FastAPI
from pydantic import BaseModel


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Sports Player Performance Prediction API",
    description="API for Player Performance and Injury Risk Prediction"
)


# =========================================================
# LOAD PLAYER PERFORMANCE MODEL
# =========================================================

performance_model = joblib.load(
    "player_performance_model.pkl"
)

performance_scaler = joblib.load(
    "player_performance_scaler.pkl"
)


# =========================================================
# LOAD INJURY CLASSIFICATION MODEL
# =========================================================

injury_model = joblib.load(
    "injury_classification_model.pkl"
)

injury_scaler = joblib.load(
    "injury_classification_scaler.pkl"
)


# =========================================================
# PLAYER DATA
# =========================================================

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
    player_performance_score: float
    player_rating: float


# =========================================================
# INJURY DATA
# =========================================================

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


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "Sports ML API is running successfully"
    }


# =========================================================
# PLAYER PERFORMANCE PREDICTION
# =========================================================

@app.post("/predict")
def predict_player(data: PlayerData):

    input_data = np.array([[
        data.age,
        data.sport_type,
        data.position,
        data.experience_years,
        data.height_cm,
        data.weight_kg,
        data.strength_score,
        data.matches_played,
        data.goals_scored,
        data.assists,
        data.training_hours_per_week,
        data.gym_sessions_per_week,
        data.injury_history_count,
        data.leadership_score,
        data.decision_making_score,
        data.teamwork_score,
        data.team_ranking,
        data.player_performance_score,
        data.player_rating
    ]])

    input_scaled = performance_scaler.transform(input_data)

    prediction = performance_model.predict(input_scaled)

    return {
        "predicted_performance_score": round(
            float(prediction[0]), 2
        )
    }


# =========================================================
# INJURY RISK CLASSIFICATION
# =========================================================

@app.post("/predict-injury")
def predict_injury(data: InjuryData):

    input_data = np.array([[
        data.age,
        data.sport_type,
        data.position,
        data.experience_years,
        data.height_cm,
        data.weight_kg,
        data.strength_score,
        data.matches_played,
        data.goals_scored,
        data.assists,
        data.training_hours_per_week,
        data.gym_sessions_per_week,
        data.leadership_score,
        data.decision_making_score,
        data.teamwork_score,
        data.team_ranking,
        data.player_performance_score,
        data.player_rating
    ]])

    input_scaled = injury_scaler.transform(input_data)

    prediction = injury_model.predict(input_scaled)

    return {
        "predicted_injury_risk": int(prediction[0])
    }