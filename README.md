# AI Resume Analyzer

A full-stack PHP web application that uses the **Groq AI API** (LLaMA 3) to analyze resumes and provide ATS compatibility scores, skill gap analysis, and job recommendations.

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Backend    | PHP 8.1+ (MVC architecture)             |
| Database   | MySQL 8.0+                              |
| Frontend   | Bootstrap 5.3, HTML5, CSS3, JavaScript  |
| AI Engine  | Groq API (llama-3.3-70b-versatile)              |
| File Types | PDF, DOCX                               |

---

## Project Structure

```
ai-resume-analyzer/
├── index.php              # App bootstrap & router
├── schema.sql             # Database schema
├── .env.example           # Environment template
├── .htaccess              # Apache config
│
├── config/
│   └── database.php       # DB connection + env loader
│
├── controllers/
│   ├── AuthController.php    # Login, register, logout
│   ├── ResumeController.php  # Upload + text extraction
│   ├── AnalysisController.php # Groq AI analysis + report
│   └── AdminController.php   # Admin panel
│
├── models/
│   ├── User.php
│   ├── Resume.php
│   └── Analysis.php
│
├── views/
│   ├── auth/
│   │   ├── login.php
│   │   └── register.php
│   ├── dashboard/
│   │   ├── index.php       # Dashboard + upload
│   │   ├── analyzing.php   # AI loading screen
│   │   ├── report.php      # Full analysis report
│   │   └── history.php     # Past analyses
│   ├── admin/
│   │   └── index.php
│   └── partials/
│       ├── header.php
│       └── footer.php
│
├── api/
│   └── GroqAPI.php         # Standalone Groq wrapper
│
├── assets/
│   ├── css/style.css
│   └── js/app.js
│
└── uploads/                # Resume files (gitignored)
    └── .htaccess
```

---

## Setup Instructions

### 1. Requirements

- PHP 8.1+ with extensions: `pdo_mysql`, `zip`, `curl`, `fileinfo`
- MySQL 8.0+
- Apache with `mod_rewrite` (or Nginx equivalent)
- A free [Groq API key](https://console.groq.com)

### 2. Database Setup

```sql
-- In MySQL:
source /path/to/ai-resume-analyzer/schema.sql;
```

Or run the SQL file contents directly in phpMyAdmin / MySQL Workbench.

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_HOST=localhost
DB_NAME=ai_resume_analyzer
DB_USER=root
DB_PASS=your_db_password

GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=llama-3.3-70b-versatile

APP_URL=http://localhost/ai-resume-analyzer
```

### 4. Set Permissions

```bash
chmod 755 uploads/
chmod 644 .env
```

### 5. Deploy

Place the project folder in your web server root (e.g., `htdocs/` or `www/`), then open:

```
http://localhost/ai-resume-analyzer/
```

---

## Default Admin Credentials

| Field    | Value                |
|----------|----------------------|
| Email    | admin@resumeai.com   |
| Password | admin123             |

> Change this immediately after setup.

---

## Features

| Feature                   | Details                                      |
|---------------------------|----------------------------------------------|
| User Auth                 | Register, login, logout; `password_hash()`   |
| Resume Upload             | PDF + DOCX, 5MB limit, MIME validation       |
| Text Extraction           | Pure PHP PDF parser + ZipArchive DOCX reader |
| AI Analysis               | Groq LLaMA 3 via cURL, JSON structured output|
| ATS Score                 | 0–100 score with animated ring               |
| Job Readiness Score       | 0–100 with color-coded rating                |
| Strengths / Weaknesses    | Itemized lists                               |
| Skills Gap                | Detected vs. missing skills                  |
| Recommendations           | Numbered action items                        |
| Recommended Roles         | AI-matched job titles                        |
| Resume History            | All past analyses with scores                |
| Admin Panel               | User list, all resumes, delete capability    |
| CSRF Protection           | On all POST forms                            |
| Drag & Drop Upload        | With file preview                            |
| Responsive UI             | Mobile-first Bootstrap 5                     |

---

## PDF Text Extraction Note

The built-in PHP PDF extractor works for **text-based PDFs** (not scanned images).
For better extraction coverage, install `poppler-utils` on your server:

```bash
# Ubuntu/Debian
sudo apt install poppler-utils

# macOS
brew install poppler
```

The app automatically uses `pdftotext` if available.

---

## Groq API Models

| Model                  | Context | Speed    |
|------------------------|---------|----------|
| `llama-3.3-70b-versatile`      | 8K      | Fast ⚡   |
| `llama3-8b-8192`       | 8K      | Fastest ⚡⚡|
| `mixtral-8x7b-32768`   | 32K     | Moderate |

Change `GROQ_MODEL` in `.env` to switch models.

---

## Security Features

- CSRF tokens on all forms
- Password hashing with `PASSWORD_BCRYPT` (cost 12)
- MIME type validation (not just extension)
- PHP execution blocked in `/uploads/`
- Session regeneration on login
- `.env` blocked via `.htaccess`
- Input sanitized with `htmlspecialchars`
- Prepared statements (PDO) throughout

---

## License

MIT — Free to use and modify for personal or commercial projects.
