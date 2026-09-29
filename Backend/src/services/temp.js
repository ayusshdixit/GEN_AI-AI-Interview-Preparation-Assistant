const resume = `Manas Sharma
Full Stack Developer (Entry-Level)
Email: manas.dev@example.com | Location: Lucknow, India

EDUCATION
B.Tech in Computer Science, ABC Institute of Technology — 2023–2027 (Pursuing)
CGPA: 8.2/10

TECHNICAL SKILLS
Languages: JavaScript, HTML, CSS
Backend: Node.js, Express.js, MongoDB, Mongoose
Frontend: React, React Router, SCSS
Tools: Git, GitHub, Postman, VS Code
Concepts: REST APIs, JWT Authentication, bcrypt password hashing, CORS, MVC architecture

PROJECTS
1. Full-Stack Authentication System (Personal Project)
   - Built a Node.js/Express/MongoDB backend with JWT-based authentication
   - Implemented secure password hashing (bcrypt), cookie-based sessions, and a token 
     blacklist system for logout
   - Built a React frontend with Context API for global auth state, custom hooks, and 
     a layered architecture (UI, hooks, state, API)
   - Integrated CORS and credentialed cross-origin requests between frontend and backend

2. GenAI Interview Assistant (In Progress)
   - Integrating Google Gemini API to generate AI-powered feedback reports
   - Designed REST API endpoints to process resume and job description data

EXPERIENCE
No formal work experience yet — actively building personal projects and preparing for 
internship applications.

CERTIFICATIONS
- Completed self-paced coursework in Node.js and React (online, non-formal)`

const selfDescription = `I'm a final-year Computer Science student with a strong interest in full-stack web 
development. Over the past few months, I've been building real projects from scratch 
rather than just following tutorials passively — including a complete authentication 
system with JWT, bcrypt, and MongoDB on the backend, and a React frontend using Context 
API and custom hooks for state management.

I learn best by building something, breaking it, and debugging it myself rather than 
just reading theory. I'm comfortable with Git/GitHub workflows and have started 
exploring how to integrate third-party APIs, like Google's Gemini API, into my projects.

I don't have professional work experience yet, but I'm looking for an internship or 
entry-level role where I can apply what I've learned, work with a real team, and keep 
growing as a developer. I'm particularly interested in backend development and API 
design, though I'm comfortable across the full stack.`


const jobDescription = `Job Title: Junior Full Stack Developer (Internship/Entry-Level)
Company: TechNova Solutions

We're looking for a motivated Junior Full Stack Developer to join our small engineering 
team. You'll work on our core product's backend services and occasionally contribute to 
frontend features.

Responsibilities:
- Build and maintain RESTful APIs using Node.js and Express
- Work with MongoDB for data modeling and queries
- Implement authentication and authorization flows
- Collaborate with frontend developers to integrate APIs into React applications
- Write clean, maintainable code and participate in code reviews
- Debug and fix issues across the stack

Requirements:
- Solid understanding of JavaScript fundamentals
- Familiarity with Node.js, Express, and MongoDB (or similar)
- Basic understanding of React and modern frontend concepts
- Understanding of REST API design principles
- Familiarity with Git version control
- Strong problem-solving skills and willingness to learn
- No prior professional experience required — we value strong fundamentals and a 
  genuine eagerness to grow

Nice to have:
- Experience with JWT authentication
- Exposure to cloud/deployment platforms
- Personal projects demonstrating full-stack capability`

module.exports = {
    resume, selfDescription, jobDescription
}