# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer that analyzes resumes and provides intelligent feedback on skills, ATS readiness, strengths, weaknesses, and improvement recommendations.

The application allows users to securely register, upload their resumes in PDF/DOCX format, and receive AI-generated resume analysis.

## 🚀 Live Demo

**Frontend:**  
https://ai-resume-analyzer-inky-pi.vercel.app/

**Backend:**  
https://ai-resume-analyzer-5qlz.onrender.com/

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure password handling

### 📄 Resume Upload
- Upload PDF and DOCX resumes
- File size validation
- File type validation
- Resume text extraction

### 🤖 AI Resume Analysis
- AI-powered resume evaluation
- Skills analysis
- ATS readiness analysis
- Strength identification
- Weakness identification
- Improvement recommendations
- Actionable feedback

### 📊 Dashboard
- Resume analysis overview
- Resume scores and insights
- Analysis history

### 📚 Analysis History
- View previous resume analyses
- Track resume improvement over time

### 🎨 Modern UI
- Responsive React interface
- Clean dashboard
- Interactive upload interface
- User-friendly navigation

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Axios
- React Router
- CSS

### Backend

- Node.js
- Express.js
- JWT
- Multer
- PDF/DOCX parsing
- Axios

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### AI

- Groq API
- OpenAI GPT-OSS 120B

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      React + Vite    │
                    │       Frontend       │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    │       Render         │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
       ┌──────────────────┐          ┌──────────────────┐
       │   MongoDB Atlas  │          │     Groq API     │
       │                  │          │                  │
       │ Users            │          │ AI Resume        │
       │ Resumes          │          │ Analysis         │
       │ Analysis History │          │                  │
       └──────────────────┘          └──────────────────┘
