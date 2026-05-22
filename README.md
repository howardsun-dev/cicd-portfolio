# 🌐 Howard Sun — Full-Stack Engineer & Builder

Welcome to my portfolio. I'm a full-stack engineer with deep roots in backend and infrastructure, currently building my way into AI engineering.

Live site: [howardsun.me](https://howardsun.me)

## 🎯 What I'm About

I build things end-to-end — from infrastructure and APIs to polished frontends and now AI-powered systems. I've spent years in IT and cloud infrastructure, which means I don't just write code — I understand the systems it runs on.

**Currently focused on:**
- Building full-stack projects with TypeScript, React, and Node.js
- Learning AI/ML engineering — RAG systems, LLM integrations, embeddings
- Creating tech content through build-alongs and technical writeups
- Contributing to open source

## 🧠 Tech Stack

**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Zustand, TanStack Router
**Backend:** Node.js, Express, Socket.io, Python, FastAPI
**Databases:** PostgreSQL, MongoDB
**Cloud & Infra:** AWS, EC2, S3, CloudFront, Aurora, Elastic Beanstalk, VPC, Docker, Kubernetes, GitHub Actions
**Testing:** Jest, Playwright, Vitest
**Tools:** Git, VS Code, Figma, Obsidian

## 🚀 Featured Projects

### Discord Job Scraper Bot
A Discord bot that scrapes job sites on a schedule and posts matching listings to channels. Built with Node.js, discord.js, Puppeteer, PostgreSQL, Docker, and AWS.
- **Tech:** Node.js, TypeScript, discord.js, Puppeteer, PostgreSQL, Docker, AWS
- **Status:** In Progress — slash command skeleton complete; scraping, persistence, and filtering are next
- **GitHub:** [howardsun-dev/discord-job-scraper](https://github.com/howardsun-dev/discord-job-scraper)

### QuickChat — Real-Time Chat App
A full-stack real-time chat application built with the MERN stack and Socket.io. Features authentication, Zustand state management, and a polished Tailwind CSS UI with keyboard sound effects.
- **Tech:** React, Node.js, Express, Socket.io, MongoDB, Zustand, Tailwind CSS
- **Live Demo:** [quickchat-v72jh.sevalla.app](https://quickchat-v72jh.sevalla.app/login)
- **GitHub:** [howardsun-dev/quickchat](https://github.com/howardsun-dev/quickchat)

### Swell — Open Source Contribution
Contributed to Swell, an open-source API testing and development tool built by Open Source Labs. Worked in an existing Electron/React codebase on features and bug fixes for API prototyping workflows.
- **Tech:** Electron.js, React, Node.js
- **Repo:** [open-source-labs/Swell](https://github.com/open-source-labs/Swell)

### CI/CD Portfolio Site
This site itself is a portfolio piece — built with React 19, TypeScript, Vite, and TanStack Router, deployed to AWS S3/CloudFront via GitHub Actions CI/CD.
- **Tech:** React 19, TypeScript, Vite, TanStack Router, AWS S3, CloudFront, GitHub Actions
- **GitHub:** [howardsun-dev/cicd-portfolio](https://github.com/howardsun-dev/cicd-portfolio)
- **Workflow:** [Deploy Portfolio to AWS S3](https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml)

## 🔁 CI/CD

The deploy workflow validates the app before shipping:

1. Install dependencies with `npm ci`
2. Run `npm audit --audit-level=high`
3. Run ESLint
4. Build the React/Vite app
5. Deploy `dist/` to S3 on pushes to `main`
6. Upload SPA route fallbacks for direct `/project` and `/techstack` navigation
7. Optionally invalidate CloudFront if `CLOUDFRONT_DISTRIBUTION_ID` is configured as a repository variable

## 📬 Connect

- **Website:** [howardsun.me](https://howardsun.me)
- **LinkedIn:** [linkedin.com/in/howardsun-swe](https://linkedin.com/in/howardsun-swe)
- **GitHub:** [github.com/howardsun-dev](https://github.com/howardsun-dev)
- **Resume:** [PDF](https://howardsun.me/resume/Howard_Sun-Resume-2026.pdf) | [DOCX](https://howardsun.me/resume/Howard_Sun-Resume-2026.docx)

## 🌱 What's Next

I'm currently learning AI/ML engineering — building RAG systems, experimenting with LLM integrations, and working toward becoming an AI engineer. Every project I build from here will have an AI angle.
