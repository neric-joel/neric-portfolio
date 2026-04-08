# neric-portfolio

> Personal portfolio for Neric Joel — AI/ML Engineer & MS CS student at ASU

[![Live Site](https://img.shields.io/badge/Live-neric--portfolio.vercel.app-blue?style=flat-square&logo=vercel)](https://neric-portfolio.vercel.app)
[![Deploy Status](https://img.shields.io/github/deployments/neric-joel/neric-portfolio/production?label=deploy&logo=vercel&style=flat-square)](https://neric-portfolio.vercel.app)

---

<!-- Add screenshot here: ![Portfolio Screenshot](./docs/screenshot.png) -->
> 📸 *Screenshots coming soon — visit the [live site](https://neric-portfolio.vercel.app) to see it in action*

---

## What This Site Shows

- **ML/AI Projects** — Hand Gesture Recognition (MediaPipe + OpenCV), RAG-based LLM pipelines, Computer Vision systems, and more — each with live demos or source links
- **IEEE Publications** — Two peer-reviewed conference papers in Machine Learning, Computer Vision, and LLM-adjacent research (2024)
- **Education & Skills** — MS Computer Science @ ASU (GPA 3.89/4.0), B.Tech EEE @ Amrita Vishwa Vidyapeetham; Python, PyTorch, TensorFlow, LangChain, OpenCV, HuggingFace, and more
- **Contact & Links** — Direct email, LinkedIn, GitHub, and a downloadable resume — everything a recruiter needs in one place

---

## Tech Stack

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

---

## Architecture

- Single-page React app with a component-based layout — each section is an isolated JSX component
- Tailwind CSS for utility-first, responsive styling with a custom theme config
- Vite for a fast dev server (HMR) and optimized, tree-shaken production builds
- Deployed via Vercel with auto-deploy on every push to `main`

---

## Local Setup

```bash
git clone https://github.com/neric-joel/neric-portfolio.git
cd neric-portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build & Deploy

```bash
npm run build    # outputs to dist/
npm run preview  # preview production build locally
```

> Auto-deploys to Vercel on every push to `main`. No manual deploy step needed.

---

## Project Structure

```
src/
├── App.css
├── App.jsx
├── assets/
│   ├── final_signature.png
│   ├── new_signature.png
│   ├── profile.png
│   ├── project1.jpg
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   ├── react.svg
│   ├── resume_ref.png
│   ├── sidebar_issue.png
│   └── signature.png
├── components/
│   ├── About.jsx
│   ├── Achievements.jsx
│   ├── ChatMail.jsx
│   ├── Contact.jsx
│   ├── EducationGlobe.jsx
│   ├── Experience.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProjectCarousel.jsx
│   ├── Projects.jsx
│   ├── ProjectsCarousel.jsx
│   ├── Publications.jsx
│   ├── Resume.jsx
│   ├── RevealOnScroll.jsx
│   ├── ScrollCarousel.jsx
│   ├── Sidebar.jsx
│   ├── Skills.jsx
│   ├── ThemeSwitcher.jsx
│   └── TryMe.jsx
├── index.css
└── main.jsx
```

---

## Why It Matters

This portfolio was built to give recruiters and engineers a fast, visual summary of Neric Joel's work in AI/ML, computer vision, and NLP. Rather than a static PDF resume, it provides live project links, published research, and a direct line to connect.

---

## License

[MIT](./LICENSE)
