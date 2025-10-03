# Online Quiz Application (MERN Stack)

A full-stack quiz app built with the MERN stack (MongoDB, Express, React, Node.js). Users can take a quiz, navigate questions, submit answers, and see their score—with bonus features like a timer and per-question feedback.

---

## Features

- **Backend (Node.js + Express + MongoDB)**
  - Stores quiz questions with options and correct answers.
  - API endpoint to fetch questions (without correct answers).
  - API endpoint to submit answers and get score + feedback.

- **Frontend (React)**
  - Start page to begin the quiz.
  - One question at a time, with "Next" and "Previous" navigation.
  - "Submit" button on the final question to send answers.
  - Results page showing score and per-question correctness.
  - **Bonus:** Quiz timer, detailed feedback.

- **Testing**
  - Backend test cases for scoring logic.

---

## 🗂️ Project Structure

```
online-quiz-app/
  backend/
    models/
    controllers/
    routes/
    app.js
    seed.js
    tests/
  frontend/
    src/
      components/
      pages/
      App.js
```

---

## ⚙️ Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/online-quiz-app.git
cd online-quiz-app
```

### 2. **Backend Setup**

#### a. Install dependencies
```bash
cd backend
npm install
```

#### b. Configure MongoDB
- Ensure MongoDB is running locally (`mongodb://localhost:27017/quizdb`) or update `app.js` with your MongoDB URI.

#### c. Seed the database with sample questions
```bash
node seed.js
```

#### d. Start the backend server
```bash
npm run dev
# or
node app.js
```
Server runs at `http://localhost:5000`

### 3. **Frontend Setup**

#### a. Install dependencies
```bash
cd ../frontend
npm install
```

#### b. Start the frontend
```bash
npm start
```
App runs at `http://localhost:3000`

---

## 📝 API Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `/api/questions`    | Get all quiz questions          |
| POST   | `/api/score`        | Submit answers, get score/feedback |

---

## 🎯 Quiz Flow

1. **Start Quiz:** Click "Start" to begin.
2. **Questions:** View one question at a time, select answers, use Next/Previous.
3. **Submit:** On last question, click "Submit".
4. **Results:** See your score and which questions you got right/wrong.
5. **Bonus:** Timer auto-submits when time runs out.

---

## 🧪 Testing

- Backend tests for scoring logic are in `backend/tests/`.
- Run tests:
  ```bash
  cd backend
  npm test
  ```

---

## 📦 Technologies Used

- **MongoDB**: NoSQL database for questions
- **Express**: API server
- **Node.js**: Backend runtime
- **React**: Frontend UI
- **Axios**: HTTP client for React
- **Jest / Mocha**: Backend testing

---

## 👨‍💻 Contributing

Feel free to open issues or pull requests!

---

## 📄 License

MIT

---

## 💡 Credits  
Developed by Rakesh Kumar
