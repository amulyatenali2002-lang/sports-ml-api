import { useState } from "react";
import "./App.css";

function App() {
  // ---------------- PLAYER PERFORMANCE ----------------
  const [formData, setFormData] = useState({
    age: "",
    sport_type: "",
    position: "",
    experience_years: "",
    height_cm: "",
    weight_kg: "",
    strength_score: "",
    matches_played: "",
    goals_scored: "",
    assists: "",
    training_hours_per_week: "",
    gym_sessions_per_week: "",
    injury_history_count: "",
    leadership_score: "",
    decision_making_score: "",
    teamwork_score: "",
    team_ranking: "",
    player_performance_score: "",
    player_rating: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const predictPerformance = async (e) => {
    e.preventDefault();

    setResult("Predicting...");

    try {
      const response = await fetch(
        "https://sports-ml-api-backend.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            age: Number(formData.age),
            sport_type: Number(formData.sport_type),
            position: Number(formData.position),
            experience_years: Number(formData.experience_years),
            height_cm: Number(formData.height_cm),
            weight_kg: Number(formData.weight_kg),
            strength_score: Number(formData.strength_score),
            matches_played: Number(formData.matches_played),
            goals_scored: Number(formData.goals_scored),
            assists: Number(formData.assists),
            training_hours_per_week: Number(
              formData.training_hours_per_week
            ),
            gym_sessions_per_week: Number(
              formData.gym_sessions_per_week
            ),
            injury_history_count: Number(
              formData.injury_history_count
            ),
            leadership_score: Number(formData.leadership_score),
            decision_making_score: Number(
              formData.decision_making_score
            ),
            teamwork_score: Number(formData.teamwork_score),
            team_ranking: Number(formData.team_ranking),
            player_performance_score: Number(
              formData.player_performance_score
            ),
            player_rating: Number(formData.player_rating)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed");
      }

      setResult(
        "Predicted Performance Score: " +
          data.predicted_performance_score
      );
    } catch (error) {
      setResult("Error: " + error.message);
    }
  };

  // ---------------- INJURY PREDICTION ----------------

  const [injuryData, setInjuryData] = useState({
    age: "",
    sport_type: "",
    position: "",
    experience_years: "",
    height_cm: "",
    weight_kg: "",
    strength_score: "",
    matches_played: "",
    goals_scored: "",
    assists: "",
    training_hours_per_week: "",
    gym_sessions_per_week: "",
    leadership_score: "",
    decision_making_score: "",
    teamwork_score: "",
    team_ranking: "",
    player_performance_score: "",
    player_rating: ""
  });

  const [injuryResult, setInjuryResult] = useState("");

  const handleInjuryChange = (e) => {
    setInjuryData({
      ...injuryData,
      [e.target.name]: e.target.value
    });
  };

  const predictInjury = async (e) => {
    e.preventDefault();

    setInjuryResult("Predicting Injury Risk...");

    try {
      const response = await fetch(
        "https://sports-ml-api-backend.onrender.com/predict-injury",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            age: Number(injuryData.age),
            sport_type: Number(injuryData.sport_type),
            position: Number(injuryData.position),
            experience_years: Number(injuryData.experience_years),
            height_cm: Number(injuryData.height_cm),
            weight_kg: Number(injuryData.weight_kg),
            strength_score: Number(injuryData.strength_score),
            matches_played: Number(injuryData.matches_played),
            goals_scored: Number(injuryData.goals_scored),
            assists: Number(injuryData.assists),
            training_hours_per_week: Number(
              injuryData.training_hours_per_week
            ),
            gym_sessions_per_week: Number(
              injuryData.gym_sessions_per_week
            ),
            leadership_score: Number(injuryData.leadership_score),
            decision_making_score: Number(
              injuryData.decision_making_score
            ),
            teamwork_score: Number(injuryData.teamwork_score),
            team_ranking: Number(injuryData.team_ranking),
            player_performance_score: Number(
              injuryData.player_performance_score
            ),
            player_rating: Number(injuryData.player_rating)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Injury prediction failed");
      }

      setInjuryResult(
        "Predicted Injury Risk: " +
          data.predicted_injury_risk
      );
    } catch (error) {
      setInjuryResult("Error: " + error.message);
    }
  };

  return (
    <div className="app">

      <h1>Sports ML Prediction System</h1>

      {/* ================= PLAYER PERFORMANCE ================= */}

      <h2>Player Performance Prediction</h2>

      <form onSubmit={predictPerformance}>

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Sport</label>
        <select
          name="sport_type"
          value={formData.sport_type}
          onChange={handleChange}
          required
        >
          <option value="">Select Sport</option>
          <option value="1">Cricket</option>
          <option value="2">Football</option>
          <option value="3">Basketball</option>
          <option value="4">Hockey</option>
        </select>

        <label>Position</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        >
          <option value="">Select Position</option>
          <option value="1">Batsman</option>
          <option value="2">Bowler</option>
          <option value="3">Forward</option>
          <option value="4">All-Rounder</option>
        </select>

        <label>Experience Years</label>
        <input
          type="number"
          name="experience_years"
          value={formData.experience_years}
          onChange={handleChange}
          required
        />

        <label>Height (cm)</label>
        <input
          type="number"
          name="height_cm"
          value={formData.height_cm}
          onChange={handleChange}
          required
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight_kg"
          value={formData.weight_kg}
          onChange={handleChange}
          required
        />

        <label>Strength Score</label>
        <input
          type="number"
          name="strength_score"
          value={formData.strength_score}
          onChange={handleChange}
          required
        />

        <label>Matches Played</label>
        <input
          type="number"
          name="matches_played"
          value={formData.matches_played}
          onChange={handleChange}
          required
        />

        <label>Goals Scored</label>
        <input
          type="number"
          name="goals_scored"
          value={formData.goals_scored}
          onChange={handleChange}
          required
        />

        <label>Assists</label>
        <input
          type="number"
          name="assists"
          value={formData.assists}
          onChange={handleChange}
          required
        />

        <label>Training Hours Per Week</label>
        <input
          type="number"
          name="training_hours_per_week"
          value={formData.training_hours_per_week}
          onChange={handleChange}
          required
        />

        <label>Gym Sessions Per Week</label>
        <input
          type="number"
          name="gym_sessions_per_week"
          value={formData.gym_sessions_per_week}
          onChange={handleChange}
          required
        />

        <label>Injury History Count</label>
        <input
          type="number"
          name="injury_history_count"
          value={formData.injury_history_count}
          onChange={handleChange}
          required
        />

        <label>Leadership Score</label>
        <input
          type="number"
          name="leadership_score"
          value={formData.leadership_score}
          onChange={handleChange}
          required
        />

        <label>Decision Making Score</label>
        <input
          type="number"
          name="decision_making_score"
          value={formData.decision_making_score}
          onChange={handleChange}
          required
        />

        <label>Teamwork Score</label>
        <input
          type="number"
          name="teamwork_score"
          value={formData.teamwork_score}
          onChange={handleChange}
          required
        />

        <label>Team Ranking</label>
        <input
          type="number"
          name="team_ranking"
          value={formData.team_ranking}
          onChange={handleChange}
          required
        />

        <label>Player Performance Score</label>
        <input
          type="number"
          name="player_performance_score"
          value={formData.player_performance_score}
          onChange={handleChange}
          required
        />

        <label>Player Rating</label>
        <input
          type="number"
          name="player_rating"
          value={formData.player_rating}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Predict Performance
        </button>
      </form>

      {result && (
        <div className="result">
          {result}
        </div>
      )}

      {/* ================= INJURY RISK ================= */}

      <hr />

      <h2>Injury Risk Prediction</h2>

      <form onSubmit={predictInjury}>

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={injuryData.age}
          onChange={handleInjuryChange}
          required
        />

        <label>Sport</label>
        <select
          name="sport_type"
          value={injuryData.sport_type}
          onChange={handleInjuryChange}
          required
        >
          <option value="">Select Sport</option>
          <option value="1">Cricket</option>
          <option value="2">Football</option>
          <option value="3">Basketball</option>
          <option value="4">Hockey</option>
        </select>

        <label>Position</label>
        <select
          name="position"
          value={injuryData.position}
          onChange={handleInjuryChange}
          required
        >
          <option value="">Select Position</option>
          <option value="1">Batsman</option>
          <option value="2">Bowler</option>
          <option value="3">Forward</option>
          <option value="4">All-Rounder</option>
        </select>

        <label>Experience Years</label>
        <input
          type="number"
          name="experience_years"
          value={injuryData.experience_years}
          onChange={handleInjuryChange}
          required
        />

        <label>Height (cm)</label>
        <input
          type="number"
          name="height_cm"
          value={injuryData.height_cm}
          onChange={handleInjuryChange}
          required
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight_kg"
          value={injuryData.weight_kg}
          onChange={handleInjuryChange}
          required
        />

        <label>Strength Score</label>
        <input
          type="number"
          name="strength_score"
          value={injuryData.strength_score}
          onChange={handleInjuryChange}
          required
        />

        <label>Matches Played</label>
        <input
          type="number"
          name="matches_played"
          value={injuryData.matches_played}
          onChange={handleInjuryChange}
          required
        />

        <label>Goals Scored</label>
        <input
          type="number"
          name="goals_scored"
          value={injuryData.goals_scored}
          onChange={handleInjuryChange}
          required
        />

        <label>Assists</label>
        <input
          type="number"
          name="assists"
          value={injuryData.assists}
          onChange={handleInjuryChange}
          required
        />

        <label>Training Hours Per Week</label>
        <input
          type="number"
          name="training_hours_per_week"
          value={injuryData.training_hours_per_week}
          onChange={handleInjuryChange}
          required
        />

        <label>Gym Sessions Per Week</label>
        <input
          type="number"
          name="gym_sessions_per_week"
          value={injuryData.gym_sessions_per_week}
          onChange={handleInjuryChange}
          required
        />

        <label>Leadership Score</label>
        <input
          type="number"
          name="leadership_score"
          value={injuryData.leadership_score}
          onChange={handleInjuryChange}
          required
        />

        <label>Decision Making Score</label>
        <input
          type="number"
          name="decision_making_score"
          value={injuryData.decision_making_score}
          onChange={handleInjuryChange}
          required
        />

        <label>Teamwork Score</label>
        <input
          type="number"
          name="teamwork_score"
          value={injuryData.teamwork_score}
          onChange={handleInjuryChange}
          required
        />

        <label>Team Ranking</label>
        <input
          type="number"
          name="team_ranking"
          value={injuryData.team_ranking}
          onChange={handleInjuryChange}
          required
        />

        <label>Player Performance Score</label>
        <input
          type="number"
          name="player_performance_score"
          value={injuryData.player_performance_score}
          onChange={handleInjuryChange}
          required
        />

        <label>Player Rating</label>
        <input
          type="number"
          name="player_rating"
          value={injuryData.player_rating}
          onChange={handleInjuryChange}
          required
        />

        <button type="submit">
          Predict Injury
        </button>
      </form>

      {injuryResult && (
        <div className="result">
          {injuryResult}
        </div>
      )}

    </div>
  );
}

export default App;