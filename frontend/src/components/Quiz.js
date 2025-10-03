import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/quiz/submit", { answers });
      navigate("/result", { state: res.data });
    } catch (err) {
      console.error(err);
    }
  }, [answers, navigate]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/quiz")
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const handleAnswer = (index) => {
    setAnswers({ ...answers, [questions[current]._id]: index });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerClass = () => {
    if (timeLeft <= 30) return "timer danger";
    if (timeLeft <= 60) return "timer warning";
    return "timer";
  };

  const progress = questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  if (loading) {
    return (
      <div className="container">
        <div className="quiz-card">
          <div className="loading">Loading quiz questions...</div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="quiz-card">
          <div className="loading">No questions available. Please try again later.</div>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="container">
      <div className="quiz-card">
        <div className={getTimerClass()}>
          Time Remaining: {formatTime(timeLeft)}
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="question-header">
          <h2>Question {current + 1} of {questions.length}</h2>
        </div>

        <div className="question-text">{q.text}</div>

        <div className="options-container">
          {q.options.map((opt, idx) => (
            <div 
              key={idx} 
              className={`option ${answers[q._id] === idx ? 'selected' : ''}`}
              onClick={() => handleAnswer(idx)}
            >
              <input
                type="radio"
                name={q._id}
                checked={answers[q._id] === idx}
                onChange={() => handleAnswer(idx)}
                readOnly
              />
              {opt}
            </div>
          ))}
        </div>

        <div className="navigation-buttons">
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0}
          >
            Previous
          </button>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {current < questions.length - 1 ? (
              <button 
                className="btn btn-primary"
                onClick={() => setCurrent(current + 1)}
              >
                Next
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
