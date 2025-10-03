import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="quiz-card">
        <div className="home-container">
          <h1 className="home-title">Quiz Master</h1>
          <p className="home-subtitle">
            Test your knowledge with our interactive quiz!<br/>
            You'll have 60 seconds to answer 5 questions.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate("/quiz")}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
