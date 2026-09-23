// ==========================================================
// SPORTS ML PREDICTION SYSTEM
// ==========================================================

// Backend API URL
// Use this while testing on your computer
const API_URL = "https://sports-ml-api-amulya.onrender.com";


// ==========================================================
// 1. PLAYER PERFORMANCE DATA
// ==========================================================

function getPerformanceData() {

    const data = {

        age: Number(
            document.getElementById("age").value
        ),

        sport_type: Number(
            document.getElementById("sport_type").value
        ),

        position: Number(
            document.getElementById("position").value
        ),

        experience_years: Number(
            document.getElementById("experience_years").value
        ),

        height_cm: Number(
            document.getElementById("height_cm").value
        ),

        weight_kg: Number(
            document.getElementById("weight_kg").value
        ),

        strength_score: Number(
            document.getElementById("strength_score").value
        ),

        matches_played: Number(
            document.getElementById("matches_played").value
        ),

        goals_scored: Number(
            document.getElementById("goals_scored").value
        ),

        assists: Number(
            document.getElementById("assists").value
        ),

        training_hours_per_week: Number(
            document.getElementById("training_hours_per_week").value
        ),

        gym_sessions_per_week: Number(
            document.getElementById("gym_sessions_per_week").value
        ),

        injury_history_count: Number(
            document.getElementById("injury_history_count").value
        ),

        leadership_score: Number(
            document.getElementById("leadership_score").value
        ),

        decision_making_score: Number(
            document.getElementById("decision_making_score").value
        ),

        teamwork_score: Number(
            document.getElementById("teamwork_score").value
        ),

        team_ranking: Number(
            document.getElementById("team_ranking").value
        ),

        player_rating: Number(
            document.getElementById("player_rating").value
        )
    };

    return data;
}


// ==========================================================
// 2. PLAYER PERFORMANCE PREDICTION
// ==========================================================

async function predictPerformance() {

    const resultBox =
        document.getElementById("performanceResult");

    // Show message while prediction is running
    resultBox.innerText = "Predicting...";

    try {

        // Get all Player Performance input values
        const data = getPerformanceData();

        // Send data to FastAPI
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

        // Convert server response to JSON
        const result = await response.json();

        // Check whether API returned an error
        if (!response.ok) {

            throw new Error(
                result.detail ||
                "Player Performance prediction failed"
            );
        }

        // Get predicted performance score
        const score =
            result.predicted_performance_score;

        // Display prediction
        resultBox.innerText =
            "Predicted Performance Score: " + score;

        // ==================================================
        // AUTOMATICALLY SEND PERFORMANCE SCORE
        // TO INJURY RISK SECTION
        // ==================================================

        const injuryPerformanceField =
            document.getElementById(
                "injury_player_performance_score"
            );

        if (injuryPerformanceField) {

            injuryPerformanceField.value = score;
        }

    }
    catch (error) {

        console.error(error);

        resultBox.innerText =
            "Error: " + error.message;
    }
}


// ==========================================================
// 3. INJURY RISK DATA
// ==========================================================

function getInjuryData() {

    const data = {

        age: Number(
            document.getElementById("injury_age").value
        ),

        sport_type: Number(
            document.getElementById("injury_sport_type").value
        ),

        position: Number(
            document.getElementById("injury_position").value
        ),

        experience_years: Number(
            document.getElementById(
                "injury_experience_years"
            ).value
        ),

        height_cm: Number(
            document.getElementById(
                "injury_height_cm"
            ).value
        ),

        weight_kg: Number(
            document.getElementById(
                "injury_weight_kg"
            ).value
        ),

        strength_score: Number(
            document.getElementById(
                "injury_strength_score"
            ).value
        ),

        matches_played: Number(
            document.getElementById(
                "injury_matches_played"
            ).value
        ),

        goals_scored: Number(
            document.getElementById(
                "injury_goals_scored"
            ).value
        ),

        assists: Number(
            document.getElementById(
                "injury_assists"
            ).value
        ),

        training_hours_per_week: Number(
            document.getElementById(
                "injury_training_hours_per_week"
            ).value
        ),

        gym_sessions_per_week: Number(
            document.getElementById(
                "injury_gym_sessions_per_week"
            ).value
        ),

        leadership_score: Number(
            document.getElementById(
                "injury_leadership_score"
            ).value
        ),

        decision_making_score: Number(
            document.getElementById(
                "injury_decision_making_score"
            ).value
        ),

        teamwork_score: Number(
            document.getElementById(
                "injury_teamwork_score"
            ).value
        ),

        team_ranking: Number(
            document.getElementById(
                "injury_team_ranking"
            ).value
        ),

        player_performance_score: Number(
            document.getElementById(
                "injury_player_performance_score"
            ).value
        ),

        player_rating: Number(
            document.getElementById(
                "injury_player_rating"
            ).value
        )
    };

    return data;
}


// ==========================================================
// 4. INJURY RISK PREDICTION
// ==========================================================

async function predictInjury() {

    const resultBox =
        document.getElementById("injuryResult");

    // Show message while prediction is running
    resultBox.innerText = "Predicting...";

    try {

        // Get all Injury Risk input values
        const data = getInjuryData();

        // Send data to FastAPI
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

        // Convert server response to JSON
        const result = await response.json();

        // Check whether API returned an error
        if (!response.ok) {

            throw new Error(
                result.detail ||
                "Injury prediction failed"
            );
        }

        // Get numeric injury prediction
        const risk =
            result.predicted_injury_risk;

        let riskText = "";

        // Convert numeric class to readable text
        if (risk === 0) {

            riskText = "Low Risk";

        }
        else if (risk === 1) {

            riskText = "Medium Risk";

        }
        else if (risk === 2) {

            riskText = "High Risk";

        }
        else {

            riskText = "Unknown Risk";
        }

        // Display injury prediction
        resultBox.innerText =
            "Predicted Injury Risk: " + riskText;
    }
    catch (error) {

        console.error(error);

        resultBox.innerText =
            "Error: " + error.message;
    }
}


// ==========================================================
// 5. MAKE FUNCTIONS AVAILABLE TO HTML
// ==========================================================

window.getPerformanceData =
    getPerformanceData;

window.predictPerformance =
    predictPerformance;

window.getInjuryData =
    getInjuryData;

window.predictInjury =
    predictInjury;