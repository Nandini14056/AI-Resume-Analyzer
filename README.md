# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built using the **MERN Stack** that helps users evaluate their resumes with detailed ATS (Applicant Tracking System) analysis, skill recommendations, and AI-generated feedback.

The application allows users to upload resumes, automatically extract text from PDF/DOCX files, analyze the resume using Groq AI, and generate a professional report with ATS scores and improvement suggestions.

---

## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- 📄 Upload PDF & DOCX resumes
- 📝 Automatic resume text extraction
- 🤖 AI-powered resume analysis using Groq LLM
- 📊 ATS Score & Overall Resume Score
- 💡 AI-generated Recommendations
- 🛠 Technical Skills Detection
- ❌ Missing Skills Identification
- 📚 Education & Experience Feedback
- 🎯 Recommended Job Roles
- 📜 Resume Analysis History
- 🚪 Secure Logout
- 📱 Responsive Modern UI

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Framer Motion
- Lucide React
- HTML5
- CSS3

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- pdf-parse
- mammoth
- Groq SDK

---

## AI Model

- Llama 3.3 70B Versatile
- Groq API

---

# 📂 Project Structure

```
AI-Resume-Analyzer
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── prompts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── uploads/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Resume-Analyzer.git

cd AI-Resume-Analyzer
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file

```env
PORT=8000

MONGODB_URI=your_mongodb_connection

ACCESS_TOKEN_SECRET=your_secret

ACCESS_TOKEN_EXPIRY=7d

GROQ_API_KEY=your_groq_api_key
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:8000
```

---

# 🚀 Application Workflow

```text
User Registration/Login
            │
            ▼
      Upload Resume
            │
            ▼
 Resume Text Extraction
      (PDF/DOCX)
            │
            ▼
      Groq AI Analysis
            │
            ▼
 ATS Score + Resume Score
            │
            ▼
 Technical Skills
 Missing Skills
 Recommendations
            │
            ▼
     Report Generation
            │
            ▼
      Download PDF
```

---

# 📊 AI Analysis Includes

- ATS Score
- Overall Resume Score
- Strengths
- Weaknesses
- Technical Skills
- Missing Skills
- Project Feedback
- Education Feedback
- Experience Feedback
- AI Recommendations
- Recommended Job Roles

---

# 🔒 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Logout Functionality

---

# 📸 Screenshots

### Dashboard

_Add Screenshot_

---

### Upload Resume

_Add Screenshot_

---

### Analysis Report

_Add Screenshot_

---

### History

_Add Screenshot_

---

# 📦 API Endpoints

## Authentication

```
POST /api/v1/auth/register

POST /api/v1/auth/login
```

---

## Resume

```
POST /api/v1/resume/upload

GET /api/v1/resume

GET /api/v1/resume/:resumeId

DELETE /api/v1/resume/:resumeId
```

---

## Analysis

```
POST /api/v1/analysis/:resumeId

GET /api/v1/analysis

GET /api/v1/analysis/:analysisId

DELETE /api/v1/analysis/delete/:analysisId
```

---

# 🎯 Future Improvements

- Resume Version Comparison
- Dark Mode
- Resume Templates
- Keyword Heatmap
- AI Chat Assistant
- Cover Letter Generator
- Interview Question Generator
- Resume Sharing
- Cloud Storage Integration

---

# 👨‍💻 Author

**Nandini Raulji**

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

# 📄 License

This project is developed for educational and portfolio purposes.
