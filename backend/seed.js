import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/quizdb";

const questions = [
  {
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctOption: 2
  },
  {
    text: "Which language is primarily used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correctOption: 1
  },
  {
    text: "Who developed the theory of relativity?",
    options: ["Newton", "Einstein", "Galileo", "Tesla"],
    correctOption: 1
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctOption: 2
  },
  {
    text: "What data structure works on the FIFO (First In, First Out) principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctOption: 1
  },
  {
    text: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctOption: 2
  },
  {
    text: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correctOption: 0
  },
  {
    text: "Which HTTP method is used to update a resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctOption: 2
  },
  {
    text: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctOption: 1
  },
  {
    text: "Which of the following is NOT a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correctOption: 3
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log(`Database seeded with ${questions.length} questions`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
