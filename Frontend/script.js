import { useState } from "react";
import "./App.css";

function App() {
  const [age, setAge] = useState("");
  const [sport, setSport] = useState("");
  const [position, setPosition] = useState("");
  const [result, setResult] = useState("");

  const predictPerformance = async (e) => {
    e.preventDefault();

    setResult("Predicting...");

    try {
      const response = await fetch(
        "https://sports-ml-api-amulya.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: Number(age),
            sport_type: sport,
            position: position,
          }),
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

  return (
    <div className="app">
      <h1>Sports ML Prediction System</h1>

      <p>Player Performance Prediction</p>

      <form onSubmit={predictPerformance}>
        <label>Age</label>

        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label>Sport</label>

        <select
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          required
        >
          <option value="">Select Sport</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Hockey">Hockey</option>
        </select>

        <label>Position</label>

        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        >
          <option value="">Select Position</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="Forward">Forward</option>
          <option value="All-Rounder">All-Rounder</option>
        </select>

        <button type="submit">
          Predict Performance
        </button>
      </form>

      {result && (
        <div className="result">
          {result}
        </div>
      )}
    </div>
  );
}

export default App;