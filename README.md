# 🎯 GEN_AI — AI Interview Preparation Assistant

> 🔗 **Live Demo:** _coming soon — will be added after deployment_

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

A full-stack MERN app that turns your **resume, self-description and a target job description** into a personalised interview-prep report using **Google Gemini** — and can even generate a tailored, ATS-friendly resume PDF.

## ✨ Features

- 🔐 **Authentication** — register / login / logout with JWT stored in cookies and a token blacklist on logout
- 📄 **Resume upload** — upload a PDF resume (max 3 MB), parsed server-side
- 🤖 **AI interview report** powered by Gemini, including:
  - Match score (1–100) between your profile and the job
  - Technical questions with interviewer intention + how to answer
  - Behavioural questions with intention + how to answer
  - Skill gaps with severity (low / medium / high)
  - Day-by-day preparation plan
- 🗂️ **Report history** — every report is saved and can be reopened later
- 📝 **Tailored resume PDF** — Gemini writes HTML, Puppeteer renders it to PDF

## 📸 Screenshots

_Add screenshots here, e.g. `![Home](docs/home.png)`, `![Report](docs/report.png)`_

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, React Router, Axios, SCSS |
| Backend | Node.js, Express 5, Mongoose (MongoDB) |
| AI | Google Gemini (`@google/genai`), Zod schemas for structured output |
| Other | Multer (uploads), pdf-parse, Puppeteer, bcryptjs, JWT |

## 📁 Project Structure

```
GEN_AI/
├── Backend/
│   ├── server.js                # Entry point
│   └── src/
│       ├── app.js               # Express app, CORS, routes
│       ├── config/              # MongoDB connection
│       ├── controllers/         # auth + interview logic
│       ├── middlewares/         # auth (JWT) + file upload
│       ├── models/              # User, Blacklist, InterviewReport
│       ├── routes/              # /api/auth, /api/interview
│       └── services/ai.service.js  # Gemini + Puppeteer
└── Frontend/
    └── src/
        ├── app.routes.jsx
        └── features/
            ├── auth/            # Login, Register, context, hooks
            └── interview/       # Home, report page, context, hooks
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### 1. Clone
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Backend
```bash
cd Backend
npm install
cp .env.example .env     # then fill in your values
npm run dev              # http://localhost:3000
```

`.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

### 3. Frontend
```bash
cd Frontend
npm install
npm run dev              # http://localhost:5173
```

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | – | Create an account |
| POST | `/api/auth/login` | – | Log in |
| GET | `/api/auth/logout` | – | Log out & blacklist token |
| GET | `/api/auth/get-me` | ✅ | Current user |
| POST | `/api/interview/` | ✅ | Generate report (`multipart/form-data`: `resume`, `selfDescription`, `jobDescription`) |
| GET | `/api/interview/` | ✅ | List your reports |
| GET | `/api/interview/report/:interviewId` | ✅ | Get one report |
| POST | `/api/interview/resume/pdf/:interviewReportId` | ✅ | Generate tailored resume PDF |

## 🌐 Deployment

- **Frontend** → GitHub Pages (static site) via the included GitHub Actions workflow
- **Backend** → needs a Node host (Render, Railway, Fly.io, etc.); GitHub Pages cannot run servers

Set the frontend's API URL with the `VITE_API_URL` environment variable.

## 🔒 Security Notes

- Never commit `.env` — it is git-ignored
- Use a strong `JWT_SECRET`
- Rotate any key that has ever been shared or committed

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

Made by **<your-name>** — [GitHub](https://github.com/<your-username>)