/*
 * Pseudo-code: File ProjectPage.tsx defines the ProjectPage component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File ProjectPage.tsx defines the ProjectPage component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { usePageTitle } from '../hooks/usePageTitle';
import ProjectConstellation from './ProjectConstellation';

type Project = {
  name: string;
  description: string;
  role: string;
  outcome: string;
  tech: string[];
  links: { label: string; href: string; kind?: 'primary' | 'secondary' }[];
  status: 'live' | 'in-progress' | 'contribution';
  proofPoints: string[];
};

const projects: Project[] = [
  {
    name: 'Swell — Open Source Contribution',
    description:
      'Open-source contribution to Swell (Electron/React API testing tool).',
    role: 'Contributor in existing codebase',
    outcome:
      'Shows ability to navigate a mature codebase, understand product workflows, and contribute in a team-owned repository.',
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
  },
  {
    name: 'QuickChat — Real-Time Chat App',
    description:
      'Real-time chat app with React, Node.js, Socket.io, MongoDB, and Tailwind CSS.',
    role: 'Full-stack builder',
    outcome:
      'Demonstrates realtime client/server behavior, auth flow, persistent chat data, and production deployment.',
    tech: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Zustand', 'Tailwind CSS'],
    links: [
      {
        label: 'Open Live Demo',
        href: 'https://quickchat-v72jh.sevalla.app/login',
        kind: 'primary',
      },
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/quickchat' },
    ],
    status: 'live',
    proofPoints: [
      'Live deployed app',
      'JWT auth + realtime messaging',
      'Frontend/backend integration',
    ],
  },
  {
    name: 'LANShare',
    description:
      'TypeScript LAN file-sharing tool with browser UI, CLI, and security protections.',
    role: 'Solo builder',
    outcome:
      'Demonstrates CLI/product design, Express file streaming, secure path handling, browser-based controls, and CI-backed test coverage across unit, integration, and functional layers.',
    tech: ['TypeScript', 'Node.js', 'Express', 'Playwright', 'Vitest', 'GitHub Actions'],
    links: [
      {
        label: 'View Repository',
        href: 'https://github.com/howardsun-dev/LANShare',
        kind: 'primary',
      },
      {
        label: 'View Workflow',
        href: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml',
      },
    ],
    status: 'live',
    proofPoints: [
      'Local control UI + direct CLI mode',
      'Traversal-safe file serving',
      'CI quality gate with lint, tests, and build',
    ],
  },
  {
    name: 'LANShare — Electron Desktop App',
    description:
      'Cross-platform Electron desktop app for LANShare with GitHub Actions releases.',
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
  },
  {
    name: 'Discord Job Scraper Bot',
    description:
      'Discord bot for automated job scraping with scheduled execution and filtering.',
    role: 'Solo builder',
    outcome:
      'Current milestone: Discord bot skeleton with /ping and /jobs commands; next milestone adds scraping and PostgreSQL.',
    tech: ['Node.js', 'TypeScript', 'discord.js', 'Puppeteer', 'PostgreSQL', 'Docker', 'AWS'],
    links: [
      {
        label: 'View Repository',
        href: 'https://github.com/howardsun-dev/discord-job-scraper',
        kind: 'primary',
      },
    ],
    status: 'in-progress',
    proofPoints: [
      'Slash-command architecture',
      'Docker-ready Node.js service',
      'Roadmap toward AI/RAG job matching',
    ],
  },
  {
    name: 'CI/CD Portfolio Site',
    description:
      'This portfolio site - React 19 + TypeScript deployed to AWS via GitHub Actions.',
    role: 'Frontend + DevOps owner',
    outcome:
      'Validated CI/CD pipeline with dependency audit, linting, production build, S3 deploy, SPA route support, and optional CloudFront invalidation.',
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Router',
      'AWS S3',
      'CloudFront',
      'GitHub Actions',
    ],
    links: [
      {
        label: 'View Repository',
        href: 'https://github.com/howardsun-dev/cicd-portfolio',
        kind: 'primary',
      },
      {
        label: 'View Workflow',
        href: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml',
      },
    ],
    status: 'live',
    proofPoints: [
      'GitHub Actions deploy pipeline',
      'S3/CloudFront hosting',
      'Direct route fallback support',
    ],
  },
];

function StatusBadge({ status }: { status: Project['status'] }) {
    // Pseudo-code: Function logic describes the behavior of this function.
    // Added to explain the function's role in the CI/CD portfolio.
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
    // Pseudo-code: Function logic describes the behavior of this function.
    // Added to explain the function's role in the CI/CD portfolio.
  return (
    <article className="project-card" id={project.name} tabIndex={-1} aria-labelledby={`${project.name}-title`}>
      <div className="project-header">
        <div>
          <h2 id={`${project.name}-title`} className="project-name">
            {project.name}
          </h2>
          <p className="project-role">{project.role}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <p className="project-description">{project.description}</p>
      <p className="project-outcome">{project.outcome}</p>
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
    // Pseudo-code: Function logic describes the behavior of this function.
    // Added to explain the function's role in the CI/CD portfolio.
  usePageTitle('Howard Sun — Projects');
  const listRef = useRef<HTMLDivElement>(null);

  // Re-init constellation canvas on mount
  useEffect(() => {
    // Small delay to ensure layout is settled
    const timer = window.setTimeout(() => {
        // Pseudo-code: Function logic describes the behavior of this function.
        // Added to explain the function's role in the CI/CD portfolio.
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

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

      <ProjectConstellation />

      <div className="projects-list" ref={listRef}>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <div className="back-link-row">
        <Link className="social-link" to="/">
          &larr; Home
        </Link>
      </div>
    </main>
  );
}
