import { Link } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

const ProjectConstellation = lazy(() => import('./ProjectConstellation'));

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
  media?: Array<{ type: 'gif' | 'image'; url: string; alt: string }>;
  badges?: Array<{ type: 'build' | 'release' | 'deployed' | 'pipeline'; label: string; url: string; href: string }>;
};

const projects: Project[] = [
  {
    id: 'lanshare',
    name: 'LANShare',
    description:
      'A tiny TypeScript app for sharing a local folder across a trusted LAN through either a browser control UI or a direct CLI command.',
    role: 'Solo builder',
    outcome:
      'Demonstrates CLI/product design, Express file streaming, secure path handling, browser-based controls, and CI-backed test coverage across unit, integration, and functional layers.',
    tech: ['TypeScript', 'Node.js', 'Express', 'Playwright', 'Vitest', 'GitHub Actions'],
    links: [
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/LANShare', kind: 'primary' },
      { label: 'View Workflow', href: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml' },
    ],
    status: 'live',
    proofPoints: [
      'Local control UI + direct CLI mode',
      'Traversal-safe file serving',
      'CI quality gate with lint, tests, and build',
    ],
    media: [],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://img.shields.io/badge/CI-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml',
      },
      {
        type: 'release',
        label: 'v1.2.0',
        url: 'https://img.shields.io/badge/release-v1.2.0-blue',
        href: 'https://github.com/howardsun-dev/LANShare/releases',
      },
      {
        type: 'pipeline',
        label: 'Test/Lint/Build',
        url: 'https://img.shields.io/badge/tests%2Flint%2Fbuild-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml',
      },
    ],
  },
  {
    id: 'lanshare-electron-desktop-app',
    name: 'LANShare — Electron Desktop App',
    description:
      'A cross-platform Electron wrapper around LANShare that launches the local control server and presents it as a desktop app.',
    role: 'Desktop app + release pipeline owner',
    outcome:
      'Ships signed-release-ready desktop packages through GitHub Actions, with Windows, macOS, and Linux artifacts published from a tagged release workflow.',
    tech: ['Electron', 'TypeScript', 'Node.js', 'Express', 'electron-builder', 'GitHub Actions'],
    links: [
      {
        label: 'View Repository',
        href: 'https://github.com/howardsun-dev/LANShare-electron',
        kind: 'primary',
      },
      {
        label: 'View Release',
        href: 'https://github.com/howardsun-dev/LANShare-electron/releases/tag/v1.0.0',
      },
      {
        label: 'View Workflow',
        href: 'https://github.com/howardsun-dev/LANShare-electron/actions/workflows/release.yml',
      },
    ],
    status: 'live',
    proofPoints: [
      'Windows/macOS/Linux release artifacts',
      'Electron-hosted local control UI',
      'Tagged release pipeline',
    ],
    media: [],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://img.shields.io/badge/CI-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/LANShare-electron/actions/workflows/ci.yml',
      },
      {
        type: 'release',
        label: 'v1.0.0',
        url: 'https://img.shields.io/badge/release-v1.0.0-blue',
        href: 'https://github.com/howardsun-dev/LANShare-electron/releases',
      },
      {
        type: 'deployed',
        label: 'Cross-platform',
        url: 'https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue',
        href: 'https://github.com/howardsun-dev/LANShare-electron/releases',
      },
    ],
  },
  {
    id: 'quickchat-real-time-chat-app',
    name: 'QuickChat — Real-Time Chat App',
    description:
      'A deployed real-time chat app with authentication, Socket.io messaging, Zustand state management, and a polished Tailwind UI.',
    role: 'Full-stack builder',
    outcome: 'Demonstrates realtime client/server behavior, auth flow, persistent chat data, and production deployment.',
    tech: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Zustand', 'Tailwind CSS'],
    links: [
      { label: 'Open Live Demo', href: 'https://quickchat-v72jh.sevalla.app/login', kind: 'primary' },
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/quickchat' },
    ],
    status: 'live',
    proofPoints: [
      'Live deployed app',
      'JWT auth + realtime messaging',
      'Frontend/backend integration',
    ],
    media: [],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://img.shields.io/badge/CI-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/quickchat/actions/workflows/ci.yml',
      },
      {
        type: 'deployed',
        label: 'Live Demo',
        url: 'https://img.shields.io/badge/demo-live-brightgreen',
        href: 'https://quickchat-v72jh.sevalla.app/login',
      },
      {
        type: 'pipeline',
        label: 'Test/Lint/Build',
        url: 'https://img.shields.io/badge/tests%2Flint%2Fbuild-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/quickchat/actions/workflows/ci.yml',
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
    media: [],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://img.shields.io/badge/CI-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/discord-job-scraper/actions/workflows/ci.yml',
      },
      {
        type: 'pipeline',
        label: 'Test/Lint/Build',
        url: 'https://img.shields.io/badge/tests%2Flint%2Fbuild-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/discord-job-scraper/actions/workflows/ci.yml',
      },
    ],
  },
  {
    id: 'swell-open-source-contribution',
    name: 'Swell — Open Source Contribution',
    description:
      'Open-source contribution experience in Swell, an Electron/React API testing tool from Open Source Labs.',
    role: 'Contributor in existing codebase',
    outcome: 'Shows ability to navigate a mature codebase, understand product workflows, and contribute in a team-owned repository.',
    tech: ['Electron.js', 'React', 'Node.js'],
    links: [
      {
        label: 'View Project Repository',
        href: 'https://github.com/open-source-labs/Swell',
        kind: 'primary',
      },
      {
        label: 'View Co-authored Commit',
        href: 'https://github.com/open-source-labs/Swell/commit/964142802b6a09362bd16c968501d511c3f42858',
      },
    ],
    status: 'contribution',
    proofPoints: [
      'Co-authored commit credited to Howard S.',
      'Existing production-scale codebase',
      'Electron desktop app experience',
    ],
    media: [],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://img.shields.io/badge/CI-passing-brightgreen',
        href: 'https://github.com/open-source-labs/Swell/actions/workflows/unit-tests.yml',
      },
      {
        type: 'release',
        label: 'v1.19.0',
        url: 'https://img.shields.io/badge/release-v1.19.0-blue',
        href: 'https://github.com/open-source-labs/Swell/releases',
      },
      {
        type: 'pipeline',
        label: 'Test/Lint/Build',
        url: 'https://img.shields.io/badge/tests%2Flint%2Fbuild-passing-brightgreen',
        href: 'https://github.com/open-source-labs/Swell/actions/workflows/unit-tests.yml',
      },
    ],
  },
  {
    id: 'ci-cd-portfolio-site',
    name: 'CI/CD Portfolio Site',
    description:
      'This portfolio is itself a deployable artifact: React 19, TypeScript, Vite, TanStack Router, and AWS deployment through GitHub Actions.',
    role: 'Frontend + DevOps owner',
    outcome:
      'Validated CI/CD pipeline with dependency audit, linting, production build, S3 deploy, SPA route support, and optional CloudFront invalidation.',
    tech: ['React 19', 'TypeScript', 'Vite', 'TanStack Router', 'AWS S3', 'CloudFront', 'GitHub Actions'],
    links: [],
    status: 'live',
    proofPoints: [
      'GitHub Actions deploy pipeline',
      'S3/CloudFront hosting',
      'Direct route fallback support',
    ],
    media: [],
    badges: [
      {
        type: 'build',
        label: 'CI Passing',
        url: 'https://img.shields.io/badge/CI-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml',
      },
      {
        type: 'deployed',
        label: 'Live Site',
        url: 'https://img.shields.io/badge/Deployed-Howardsun.me-brightgreen',
        href: 'https://howardsun.me',
      },
      {
        type: 'pipeline',
        label: 'Test/Lint/Build',
        url: 'https://img.shields.io/badge/tests%2Flint%2Fbuild-passing-brightgreen',
        href: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml',
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
              {media.type === 'gif' ? (
                <img src={media.url} alt={media.alt} className="project-gif" />
              ) : (
                <img src={media.url} alt={media.alt} className="project-image" />
              )}
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
              href={badge.href}
              target="_blank"
              rel="noreferrer"
              className={`project-badge project-badge--${badge.type}`}
            >
              <img src={badge.url} alt={`${badge.label} badge`} className="badge-image" />
              {badge.label}
            </a>
          ))}
        </div>
      )}
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
          A focused set of projects showing full-stack product work, open-source contribution, and deployment ownership.
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