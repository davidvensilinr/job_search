# Job Search Platform

A comprehensive platform where candidates can apply for jobs and receive personalized job recommendations powered by a Machine Learning model.

## 🚀 Features

- **Job Recommendation Engine:** Uses a K-Nearest Neighbors (KNN) model to recommend jobs based on user skills and experience.
- **User Authentication:** Secure signup and login functionality using Supabase.
- **Job Listings:** Explore and apply for various job opportunities.
- **Interactive UI:** A modern, responsive frontend built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** TypeScript
- **State Management:** React Hooks
- **Authentication:** Supabase Auth (via `@supabase/auth-helpers-nextjs`)

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Machine Learning:** Scikit-learn (K-Nearest Neighbors), Pandas, NumPy
- **Model Serialization:** Joblib

### Database & Infrastructure
- **Database:** PostgreSQL (managed by Supabase)
- **ORM:** Prisma (Frontend)
- **Cloud Provider:** Supabase

## 📂 Project Structure

```bash
├── backend/            # FastAPI backend and ML model
│   ├── dataset/        # Job dataset (CSV)
│   ├── app.py          # Main FastAPI application
│   ├── train.py        # Script to train the KNN model
│   └── knn_model.pkl   # Pre-trained KNN model
├── frontend/           # Next.js frontend application
│   ├── app/            # App router pages and API routes
│   ├── lib/            # Supabase and utility functions
│   ├── prisma/         # Prisma schema and migrations
│   └── public/         # Static assets
└── README.md           # Project documentation
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js & npm installed
- Python 3.8+ installed
- Supabase account and project setup

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment (optional but recommended):
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install fastapi uvicorn pandas scikit-learn joblib
```

Run the backend server:
```bash
uvicorn app:app --reload
```
The backend API will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Set up environment variables:
Create a `.env` file in the `frontend` directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server:
```bash
npm run dev
```
The frontend application will be running at `http://localhost:3000`.

## 🤖 API Documentation

### POST `/recommend`
Get job recommendations based on skills and experience.

**Request Body:**
```json
{
  "skills": "python, sql, react",
  "experience": 3.5
}
```

**Response:**
```json
{
  "skills": "python, sql, react",
  "experience": 3.5,
  "recommendations": [
    {
      "company": "Tech Corp",
      "lpa": "12 LPA"
    },
    {
      "company": "Innovate Ltd",
      "lpa": "10 LPA"
    }
  ]
}
```