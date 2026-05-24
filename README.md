# 🌐 Howard Sun — Full-Stack Engineer & Builder

Welcome to my portfolio. I'm a full-stack engineer with backend and infrastructure roots, currently building full-stack, desktop, CI/CD, and AI-adjacent projects end to end.

Live site: [howardsun.me](https://howardsun.me)

## 🎯 What I'm About

I build practical software from the system layer up: APIs, realtime services, local tooling, desktop wrappers, cloud deployment, and polished frontend experiences. My infrastructure background means I don't just write code — I care about how it runs, ships, and fails.

**Currently focused on:**
- Building full-stack projects with TypeScript, React, and Node.js
- Shipping CI/CD-backed projects with automated lint/build/test gates
- Building desktop and local-first tooling with Electron, CLI workflows, and release pipelines
- Learning AI/ML engineering — RAG systems, LLM integrations, embeddings, and AI-assisted workflows
- Contributing to open source

## 🧠 Tech Stack

- **Languages:** TypeScript, JavaScript (ES6), Python, C++
- **Frontend:** React, Redux Toolkit, Zustand, TanStack Router, React Router, HTML5, CSS3/Sass, Tailwind CSS, Material UI, DaisyUI, Chart.js, webpack, Vite
- **Backend & APIs:** Node.js, Express, WebSocket, Socket.IO, REST APIs, JWT/Auth, Cloudinary, Arcjet
- **Desktop & Tooling:** Electron, electron-builder, CLI tools, Git, Figma
- **Databases:** PostgreSQL, MongoDB, Amazon Aurora
- **Infrastructure & Cloud:** AWS EC2, AWS S3, AWS Elastic Beanstalk, AWS VPC, CloudFront, ELB/ALB, Docker, Kubernetes, GitHub Actions
- **Testing:** Jest, Playwright, Mocha, Chai, Vitest

## 🚀 Featured Projects

### Discord Job Scraper Bot
A Discord bot that turns job search into a programmable feed: slash commands now, scheduled scraping, persistence, filtering, and AI-assisted matching next.
- **Role:** Solo builder
- **Tech:** Node.js, TypeScript, discord.js, Puppeteer, PostgreSQL, Docker, AWS
- **Status:** In Progress — slash-command architecture is in place; scraping, persistence, and filtering are next
- **GitHub:** [howardsun-dev/discord-job-scraper](https://github.com/howardsun-dev/discord-job-scraper)

### LANShare
A tiny TypeScript app for sharing a local folder across a trusted LAN through either a browser control UI or a direct CLI command.
- **Role:** Solo builder
- **Tech:** TypeScript, Node.js, Express, Playwright, Vitest, GitHub Actions
- **Proof:** Local control UI + direct CLI mode, traversal-safe file serving, CI quality gate with lint/tests/build
- **GitHub:** [howardsun-dev/LANShare](https://github.com/howardsun-dev/LANShare)
- **Workflow:** [LANShare CI](https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml)

### LANShare — Electron Desktop App
A cross-platform Electron wrapper around LANShare that launches the local control server and presents it as a desktop app.
- **Role:** Desktop app + release pipeline owner
- **Tech:** Electron, TypeScript, Node.js, Express, electron-builder, GitHub Actions
- **Proof:** Windows/macOS/Linux release artifacts, Electron-hosted local control UI, tagged release pipeline
- **GitHub:** [howardsun-dev/LANShare-electron](https://github.com/howardsun-dev/LANShare-electron)
- **Release:** [v1.0.0](https://github.com/howardsun-dev/LANShare-electron/releases/tag/v1.0.0)
- **Workflow:** [Release workflow](https://github.com/howardsun-dev/LANShare-electron/actions/workflows/release.yml)

### QuickChat — Real-Time Chat App
A deployed full-stack realtime chat app with authentication, Socket.IO messaging, Zustand state management, and a polished Tailwind CSS UI.
- **Role:** Full-stack builder
- **Tech:** React, Node.js, Express, Socket.IO, MongoDB, Zustand, Tailwind CSS
- **Live Demo:** [quickchat-v72jh.sevalla.app](https://quickchat-v72jh.sevalla.app/login)
- **GitHub:** [howardsun-dev/quickchat](https://github.com/howardsun-dev/quickchat)

### Swell — Open Source Contribution
Open-source contribution experience in Swell, an Electron/React API testing tool from Open Source Labs.
- **Role:** Contributor in existing codebase
- **Tech:** Electron.js, React, Node.js
- **Repo:** [open-source-labs/Swell](https://github.com/open-source-labs/Swell)
- **Commit:** [Co-authored contribution](https://github.com/open-source-labs/Swell/commit/964142802b6a09362bd16c968501d511c3f42858)

### CI/CD Portfolio Site
This portfolio is itself a deployable artifact: React 19, TypeScript, Vite, TanStack Router, and AWS deployment through GitHub Actions.
- **Role:** Frontend + DevOps owner
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

I'm currently learning AI/ML engineering — building RAG systems, experimenting with LLM integrations, and looking for ways to add useful AI behavior to practical products rather than chasing demos.
