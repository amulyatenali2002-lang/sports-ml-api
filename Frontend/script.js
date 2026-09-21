const API_URL = "https://sports-ml-api-amulya.onrender.com";


function getData() {

    return {
        age: Number(document.getElementById("age").value),
        sport_type: Number(document.getElementById("sport_type").value),
        position: Number(document.getElementById("position").value),
        experience_years: Number(document.getElementById("experience_years").value),
        height_cm: Number(document.getElementById("height_cm").value),
        weight_kg: Number(document.getElementById("weight_kg").value),
        strength_score: Number(document.getElementById("strength_score").value),
        matches_played: Number(document.getElementById("matches_played").value),
        goals_scored: Number(document.getElementById("goals_scored").value),
        assists: Number(document.getElementById("assists").value),
        training_hours_per_week: Number(document.getElementById("training_hours_per_week").value),
        gym_sessions_per_week: Number(document.getElementById("gym_sessions_per_week").value),
        injury_history_count: Number(document.getElementById("injury_history_count").value),
        leadership_score: Number(document.getElementById("leadership_score").value),
        decision_making_score: Number(document.getElementById("decision_making_score").value),
        teamwork_score: Number(document.getElementById("teamwork_score").value),
        team_ranking: Number(document.getElementById("team_ranking").value),
        player_performance_score: Number(document.getElementById("player_performance_score").value),
        player_rating: Number(document.getElementById("player_rating").value)
    };
}


async function predictPerformance() {

    const data = getData();

    document.getElementById("result").innerText =
        "Predicting performance...";

    try {

        const response = await fetch(
            API_URL + "/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        document.getElementById("result").innerText =
            "Predicted Performance Score: " +
            result.predicted_performance_score;

    } catch (error) {

        document.getElementById("result").innerText =
            "Error connecting to API";

    }
}


async function predictInjury() {

    const data = getData();

    delete data.injury_history_count;

    document.getElementById("result").innerText =
        "Predicting injury risk...";

    try {

        const response = await fetch(
            API_URL + "/predict-injury",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        document.getElementById("result").innerText =
            "Predicted Injury Risk: " +
            result.predicted_injury_risk;

    } catch (error) {

        document.getElementById("result").innerText =
            "Error connecting to API";

    }
}