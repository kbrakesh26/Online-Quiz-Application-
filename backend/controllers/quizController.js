import Question from "../models/Question.js";
import { fallbackQuestions } from "../fallbackData.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().select('-correctOption');
    
    if (questions.length === 0) {
      const sanitized = fallbackQuestions.map(q => ({
        _id: q._id,
        text: q.text,
        options: q.options
      }));
      return res.json(sanitized);
    }
    
    res.json(questions);
  } catch (error) {
    const sanitized = fallbackQuestions.map(q => ({
      _id: q._id,
      text: q.text,
      options: q.options
    }));
    res.json(sanitized);
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    let questions;
    let useFallback = false;
    
    try {
      questions = await Question.find();
      if (questions.length === 0) {
        questions = fallbackQuestions;
        useFallback = true;
      }
    } catch (dbErr) {
      questions = fallbackQuestions;
      useFallback = true;
    }

    let score = 0;
    const results = [];

    for (const question of questions) {
      const userAnswerIndex = answers[question._id];
      const isCorrect = userAnswerIndex !== undefined && 
                       userAnswerIndex === question.correctOption;
      
      if (isCorrect) score++;

      results.push({
        question: question.text,
        correctAnswer: question.options[question.correctOption],
        userAnswer: userAnswerIndex !== undefined ? 
                   question.options[userAnswerIndex] : null,
        isCorrect
      });
    }

    const result = {
      score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      results,
      usingFallback: useFallback
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to process quiz submission" });
  }
};
