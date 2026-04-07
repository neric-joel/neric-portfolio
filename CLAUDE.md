# Project goal
This repository is a premium personal portfolio for Neric Joel, positioned for AI/ML, software engineering, research, and general CS roles.

# Candidate positioning
- Primary: Software Engineer / AI-ML Engineer with strong CS fundamentals
- Secondary differentiator: embedded systems and hardware-software background
- Do NOT lead with embedded — keep the narrative broad enough for all CS roles
- Target: internships, new-grad SWE/AI roles, research positions (Summer 2026, F-1 OPT)

# Product priorities
- Clarity, credibility, and conversion over visual gimmicks
- Showcase strongest work only — quality over quantity
- Every featured project communicates: problem, approach, measurable outcome
- Copy must be sharp, specific, and professional — no buzzwords, no juvenile phrasing
- Preserve personality, remove cheesy or low-trust phrasing

# Technical standards
- Stack: React 19 + Vite 7 + Tailwind v4 + Framer Motion + Lenis + GSAP
- Tailwind v4 syntax — do not use v3 patterns (no tailwind.config.js, use @theme in CSS)
- Keep codebase clean, modular, and maintainable
- Remove dead code and unused experiments
- One coherent motion approach — reduce overlap between Framer Motion / GSAP
- Responsive at 375px, 768px, 1024px, 1440px
- Respect prefers-reduced-motion
- Semantic HTML + good heading hierarchy

# Content rules
- Use existing repo/resume/publication facts as source of truth
- Do not invent achievements, metrics, or links
- Mark missing facts/assets as TODO
- Publications: 2 IEEE papers (CMOS/VLSI adder analysis, Solar PV optimization)
- Contact: naruljoe@asu.edu | linkedin.com/in/neric-joel | github.com/neric-joel

# Trust-killers to remove
- "code ninja", "just enough magic", "wow that works", "friendly neighborhood"
- Any filler phrases that read as junior or unprofessional
- Decorative widgets that don't improve conversion

# Workflow
- Audit first, plan, then implement
- After code changes: run build and lint
- Flag anything that weakens trust, speed, accessibility, or maintainability

# Commands
- npm run dev
- npm run build
- npm run lint
