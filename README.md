# Online Quiz Application

A full-stack quiz application with React frontend and Node.js/Express backend.

## Features
- Interactive quiz with timer
- Question navigation (Previous/Next)
- Score calculation with detailed results
- Responsive design
- Fallback questions (works without database)

## Setup

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Database (Optional)
To use MongoDB, update `backend/.env` with your connection string and run:
```bash
cd backend
npm run seed
```