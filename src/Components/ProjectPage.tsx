import { Link } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

const ProjectConstellation = lazy(() => import('./ProjectConstellation'));

type Badge = {
  type: 'build' | 'release' | 'deployed' | 'pipeline';
  label: string;
  url: string;
};

type Media = {
  type: 'gif' | 'image';
  url: string;
  alt: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  role: string;
  outcome: string;
  tech: string[];
  links: { label: string; href: string; kind?: 'primary' | 'secondary' }[];
  status: 'live' | 'in-progress' | 'contribution';
  proofPoints: string[];
  media?: Media[];
  badges?: Badge[];
};

const projects: Project[] = [
  {
    id: 'swell-open-source-contribution',
    name: 'Swell — Open Source API Testing Tool',
    description:
      'Open-source API development tool for testing modern and streaming APIs across HTTP/2, SSE, WebSockets, GraphQL, gRPC, tRPC, WebRTC, and OpenAPI.',
    role: 'Open-source contributor',
    outcome:
      'Contributed to the 1.18 release cycle: refactored Redux-connected components to typed hooks, improved CSP/Webpack security handling, stabilized gRPC/WebRTC/OpenAPI/SSE integration tests, and contributed release/version updates.',
    tech: ['Electron', 'React', 'Redux Toolkit', 'TypeScript', 'Node.js', 'Webpack', 'Jest', 'Mocha'],
    links: [
      { label: 'View Project Repository', href: 'https://github.com/open-source-labs/Swell', kind: 'primary' },
      {
        label: 'View Co-authored Commit',
        href: 'https://github.com/open-source-labs/Swell/commit/964142802b6a09362bd16c968501d511c3f42858',
      },
    ],
    status: 'contribution',
    proofPoints: [
      'Redux connect() → typed hooks refactoring',
      'CSP/Webpack security hardening',
      'Stabilized gRPC, WebRTC, OpenAPI, SSE integration tests',
    ],
    media: [
      {
        type: 'gif',
        url: 'https://raw.githubusercontent.com/open-source-labs/Swell/main/ReadMeGifs/Gifs/HttpTesting.gif',
        alt: 'Swell HTTP/2 testing demo',
      },
      {
        type: 'image',
        url: 'https://raw.githubusercontent.com/open-source-labs/Swell/main/src/assets/img/horizontal-logo-lockup.png',
        alt: 'Swell logo',
      },
    ],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://github.com/open-source-labs/Swell/actions/workflows/unit-tests.yml/badge.svg',
      },
      {
        type: 'release',
        label: 'v1.19.0',
        url: 'https://img.shields.io/github/v/release/open-source-labs/Swell',
      },
      {
        type: 'pipeline',
        label: '~984 Stars',
        url: 'https://img.shields.io/github/stars/open-source-labs/Swell',
      },
    ],
  },
  {
    id: 'quickchat-real-time-chat-app',
    name: 'QuickChat — Full-Stack Real-Time Chat',
    description:
      'A deployed real-time chat app with authentication, Socket.io messaging, Zustand state management, and a polished Tailwind UI.',
    role: 'Full-stack builder',
    outcome:
      'Demonstrates realtime client/server behavior, auth flow, persistent chat data, and production deployment.',
    tech: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Zustand', 'Tailwind CSS'],
    links: [
      { label: 'Open Live Demo', href: 'https://quickchat-v72jh.sevalla.app/login', kind: 'primary' },
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/quickchat' },
    ],
    status: 'live',
    proofPoints: ['Live deployed app', 'JWT auth + realtime messaging', 'Frontend/backend integration'],
    media: [
      {
        type: 'gif',
        url: 'https://raw.githubusercontent.com/howardsun-dev/quickchat/main/docs/chat-demo.gif',
        alt: 'QuickChat real-time messaging demo',
      },
      {
        type: 'image',
        url: 'https://raw.githubusercontent.com/howardsun-dev/quickchat/main/docs/auth-flow.png',
        alt: 'QuickChat authentication flow diagram',
      },
    ],
    badges: [
      {
        type: 'deployed',
        label: 'Live Demo',
        url: 'https://img.shields.io/badge/demo-live-brightgreen',
      },
      {
        type: 'build',
        label: 'Full-Stack',
        url: 'https://img.shields.io/badge/stack-frontend%20%2B%20backend-blue',
      },
    ],
  },
  {
    id: 'lanshare',
    name: 'LANShare + LANShare Desktop — Local File Sharing Tool',
    description:
      'A tiny TypeScript app for sharing a local folder across a trusted LAN through either a browser control UI or a direct CLI command. Ships a cross-platform Electron desktop wrapper with signed release artifacts.',
    role: 'Solo builder + release pipeline owner',
    outcome:
      'Demonstrates CLI/product design, Express file streaming, secure path handling, browser-based controls, CI-backed test coverage, and signed cross-platform release artifacts through GitHub Actions.',
    tech: ['TypeScript', 'Node.js', 'Express', 'Electron', 'Playwright', 'Vitest', 'electron-builder', 'GitHub Actions'],
    links: [
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/LANShare', kind: 'primary' },
      { label: 'View Desktop Repository', href: 'https://github.com/howardsun-dev/LANShare-electron' },
      { label: 'View Workflow', href: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml' },
    ],
    status: 'live',
    proofPoints: [
      'Local control UI + direct CLI mode',
      'Traversal-safe file serving',
      'Windows/macOS/Linux release artifacts',
    ],
    media: [
      {
        type: 'gif',
        url: 'https://raw.githubusercontent.com/howardsun-dev/LANShare/main/docs/demo.gif',
        alt: 'LANShare demo showing CLI and browser UI',
      },
      {
        type: 'image',
        url: 'https://raw.githubusercontent.com/howardsun-dev/LANShare-electron/main/docs/desktop-demo.gif',
        alt: 'LANShare Desktop app running on Windows/macOS/Linux',
      },
    ],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml/badge.svg',
      },
      {
        type: 'release',
        label: 'v1.2.0',
        url: 'https://img.shields.io/github/v/release/howardsun-dev/LANShare',
      },
      {
        type: 'deployed',
        label: 'Cross-platform',
        url: 'https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue',
      },
    ],
  },
  {
    id: 'discord-job-scraper-bot',
    name: 'Discord Job Scraper Bot',
    description:
      'A Discord bot that turns job search into a programmable feed: slash commands now, scheduled scraping, persistence, filtering, and AI-assisted matching next.',
    role: 'Solo builder',
    outcome:
      'Current milestone: Discord bot skeleton with /ping and /jobs commands; next milestone adds scraping and PostgreSQL.',
    tech: ['Node.js', 'TypeScript', 'discord.js', 'Puppeteer', 'PostgreSQL', 'Docker', 'AWS'],
    links: [
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/discord-job-scraper', kind: 'primary' },
    ],
    status: 'in-progress',
    proofPoints: [
      'Slash-command architecture',
      'Docker-ready Node.js service',
      'Roadmap toward AI/RAG job matching',
    ],
    media: [
      {
        type: 'gif',
        url: 'https://raw.githubusercontent.com/howardsun-dev/discord-job-scraper/main/docs/bot-demo.gif',
        alt: 'Discord Job Scraper bot in action',
      },
      {
        type: 'image',
        url: 'https://raw.githubusercontent.com/howardsun-dev/discord-job-scraper/main/docs/architecture.png',
        alt: 'Discord Job Scraper architecture',
      },
    ],
    badges: [
      {
        type: 'build',
        label: 'In Progress',
        url: 'https://img.shields.io/badge/status-in%20progress-yellowgreen',
      },
      {
        type: 'pipeline',
        label: 'Discord.js',
        url: 'https://img.shields.io/badge/built%20with-discord.js-blue',
      },
    ],
  },
  {
    id: 'ci-cd-portfolio-site',
    name: 'Portfolio CI/CD — AWS S3/CloudFront Deployment',
    description:
      'This portfolio is itself a deployable artifact: React 19, TypeScript, Vite, TanStack Router, and AWS deployment through GitHub Actions.',
    role: 'Frontend + DevOps owner',
    outcome:
      'Validated CI/CD pipeline with dependency audit, linting, production build, S3 deploy, SPA route support, and optional CloudFront invalidation.',
    tech: ['React 19', 'TypeScript', 'Vite', 'TanStack Router', 'AWS S3', 'CloudFront', 'GitHub Actions'],
    links: [
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/cicd-portfolio', kind: 'primary' },
      { label: 'View Workflow', href: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml' },
    ],
    status: 'live',
    proofPoints: [
      'GitHub Actions deploy pipeline',
      'S3/CloudFront hosting',
      'Direct route fallback support',
    ],
    media: [
      {
        type: 'image',
        url: '/docs/screenshots/homepage.png',
        alt: 'Portfolio homepage showing project constellation',
      },
      {
        type: 'image',
        url: '/docs/screenshots/mobile.png',
        alt: 'Portfolio mobile view',
      },
    ],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml/badge.svg',
      },
      {
        type: 'deployed',
        label: 'Live Site',
        url: 'https://img.shields.io/badge/Deployed-Howardsun.me-brightgreen',
      },
      {
        type: 'pipeline',
        label: 'React 19',
        url: 'https://img.shields.io/badge/React-19-61DAFB?logo=react',
      },
    ],
  },
];

function StatusBadge({ status }: { status: Project['status'] }) {
  const styles: Record<Project['status'], string> = {
    live: 'status-completed',
    'in-progress': 'status-in-progress',
    contribution: 'status-planned',
  };
  const labels: Record<Project['status'], string> = {
    live: '● Live',
    'in-progress': '● In Progress',
    contribution: '● Open Source',
  };
  return <span className={`status-badge ${styles[status]}`}>{labels[status]}</span>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.id} className="project-card" aria-labelledby={`${project.id}-title`}>
      <div className="project-header">
        <div>
          <h2 id={`${project.id}-title`} className="project-name">
            {project.name}
          </h2>
          <p className="project-role">{project.role}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <p className="project-description">{project.description}</p>
      <p className="project-outcome">{project.outcome}</p>

      {/* Media section */}
      {project.media && project.media.length > 0 && (
        <div className="project-media">
          {project.media.map((media, index) => (
            <figure key={index} className={`project-media-item ${media.type}`}>
              <img
                src={media.url}
                alt={media.alt}
                className={media.type === 'gif' ? 'project-gif' : 'project-image'}
                onError={(e) => {
                  const img = e.currentTarget;
                  const figure = img.closest('figure');
                  if (figure) figure.style.display = 'none';
                }}
              />
              <figcaption>{media.alt}</figcaption>
            </figure>
          ))}
        </div>
      )}

      <ul className="project-proof" aria-label={`${project.name} proof points`}>
        {project.proofPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="project-tech" aria-label={`${project.name} technology stack`}>
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">
            {t}
          </span>
        ))}
      </div>

      {/* Badges section */}
      {project.badges && project.badges.length > 0 && (
        <div className="project-badges" aria-label={`${project.name} badges`}>
          {project.badges.map((badge, index) => (
            <a
              key={index}
              href={badge.url}
              target="_blank"
              rel="noreferrer"
              className={`project-badge project-badge--${badge.type}`}
            >
              {badge.label}
              <img
                src={badge.url}
                alt={`${badge.label} badge`}
                className="badge-image"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = 'none';
                }}
              />
            </a>
          ))}
        </div>
      )}

      <div className="project-links">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`project-link ${link.kind === 'primary' ? 'primary' : ''}`}
          >
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </article>
  );
}

export default function ProjectPage() {
  usePageTitle('Howard Sun — Projects');

  return (
    <main id="main-content" className="profile-container" tabIndex={-1}>
      <header className="page-header">
        <p className="eyebrow">Selected work</p>
        <h1 className="title">Projects</h1>
        <p className="page-intro">
          A focused set of projects showing full-stack product work, open-source contribution, and
          deployment ownership.
        </p>
      </header>
      <Suspense fallback={null}>
        <ProjectConstellation />
      </Suspense>
      <div className="projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <div className="back-link-row">
        <Link className="social-link" to="/">
          ← Home
        </Link>
      </div>
    </main>
  );
}
