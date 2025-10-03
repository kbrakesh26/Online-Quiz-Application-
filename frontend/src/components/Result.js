import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="container">
        <div className="quiz-card">
          <div className="loading">No results available. Please take the quiz first.</div>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((state.score / state.total) * 100);
  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 📚";
    return "Keep studying! 💪";
  };

  return (
    <div className="container">
      <div className="quiz-card">
        <div className="results-container">
          <div className="score-display">
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>
              {getScoreMessage()}
            </div>
            <div>
              Your Score: {state.score}/{state.total}
            </div>
            <div style={{ fontSize: '18px', opacity: 0.8 }}>
              ({percentage}%)
            </div>
          </div>

          <h3 style={{ marginBottom: '20px' }}>Detailed Results:</h3>
          
          <div className="results-list">
            {state.results.map((r, idx) => (
              <div 
                key={idx} 
                className={`result-item ${r.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="result-question">
                  Question {idx + 1}: {r.question}
                </div>
                <div className="result-answers">
                  <div>
                    <strong>Your Answer:</strong> {r.userAnswer || "Not Answered"}
                  </div>
                  <div>
                    <strong>Correct Answer:</strong> {r.correctAnswer}
                  </div>
                  <div style={{ marginTop: '5px', fontSize: '16px' }}>
                    {r.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate("/quiz")}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;