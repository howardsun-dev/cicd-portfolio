import { Link } from '@tanstack/react-router';
import { usePageTitle } from '../hooks/usePageTitle';

type Badge = {
  label: string;
  imageUrl: string;
  linkUrl: string;
  kind: 'build' | 'release' | 'pipeline' | 'deployed';
};

type Media = {
  type: 'gif' | 'image';
  src: string;
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
  badges: Badge[];
  media: Media[];
  constellationLabel: string;
  constellationTech: string;
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
    badges: [
      {
        label: 'CI Passing',
        imageUrl: 'https://github.com/open-source-labs/Swell/actions/workflows/unit-tests.yml/badge.svg',
        linkUrl: 'https://github.com/open-source-labs/Swell/actions/workflows/unit-tests.yml',
        kind: 'build',
      },
      {
        label: 'v1.19.0',
        imageUrl: 'https://img.shields.io/github/v/release/open-source-labs/Swell',
        linkUrl: 'https://github.com/open-source-labs/Swell/releases',
        kind: 'release',
      },
      {
        label: '~984 Stars',
        imageUrl: 'https://img.shields.io/github/stars/open-source-labs/Swell',
        linkUrl: 'https://github.com/open-source-labs/Swell/stargazers',
        kind: 'pipeline',
      },
    ],
    media: [
      {
        type: 'gif',
        src: 'https://raw.githubusercontent.com/open-source-labs/Swell/main/ReadMeGifs/Gifs/HttpTesting.gif',
        alt: 'Swell HTTP/2 testing demo',
      },
      {
        type: 'image',
        src: 'https://raw.githubusercontent.com/open-source-labs/Swell/main/src/assets/img/horizontal-logo-lockup.png',
        alt: 'Swell logo',
      },
    ],
    constellationLabel: 'Swell OSS',
    constellationTech: 'Open-source contribution',
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
    badges: [
      {
        label: 'Live Demo',
        imageUrl: 'https://img.shields.io/badge/demo-live-brightgreen',
        linkUrl: 'https://quickchat-v72jh.sevalla.app/login',
        kind: 'deployed',
      },
      {
        label: 'Full-Stack',
        imageUrl: 'https://img.shields.io/badge/stack-frontend%20%2B%20backend-blue',
        linkUrl: 'https://github.com/howardsun-dev/quickchat',
        kind: 'build',
      },
    ],
    media: [
      {
        type: 'gif',
        src: 'https://raw.githubusercontent.com/howardsun-dev/quickchat/main/docs/chat-demo.gif',
        alt: 'QuickChat real-time messaging demo',
      },
      {
        type: 'image',
        src: 'https://raw.githubusercontent.com/howardsun-dev/quickchat/main/docs/auth-flow.png',
        alt: 'QuickChat authentication flow diagram',
      },
    ],
    constellationLabel: 'QuickChat',
    constellationTech: 'Realtime auth + Socket.io',
  },
  {
    id: 'lanshare',
    name: 'LANShare + LANShare Desktop — Local File Sharing Tool',
    description:
      'A tiny TypeScript app for sharing a local folder across a trusted LAN through either a browser control UI or a direct CLI command. Ships a cross-platform Electron desktop wrapper.',
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
    badges: [
      {
        label: 'CI Passing',
        imageUrl: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml/badge.svg',
        linkUrl: 'https://github.com/howardsun-dev/LANShare/actions/workflows/ci.yml',
        kind: 'build',
      },
      {
        label: 'v1.2.0',
        imageUrl: 'https://img.shields.io/github/v/release/howardsun-dev/LANShare',
        linkUrl: 'https://github.com/howardsun-dev/LANShare/releases',
        kind: 'release',
      },
      {
        label: 'Cross-platform',
        imageUrl: 'https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue',
        linkUrl: 'https://github.com/howardsun-dev/LANShare-electron/releases',
        kind: 'deployed',
      },
    ],
    media: [
      {
        type: 'gif',
        src: 'https://raw.githubusercontent.com/howardsun-dev/LANShare/main/docs/demo.gif',
        alt: 'LANShare demo showing CLI and browser UI',
      },
      {
        type: 'image',
        src: 'https://raw.githubusercontent.com/howardsun-dev/LANShare-electron/main/docs/desktop-demo.gif',
        alt: 'LANShare Desktop app running on Windows/macOS/Linux',
      },
    ],
    constellationLabel: 'LANShare',
    constellationTech: 'CLI + Express + testing',
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
    badges: [
      {
        label: 'In Progress',
        imageUrl: 'https://img.shields.io/badge/status-in%20progress-yellowgreen',
        linkUrl: 'https://github.com/howardsun-dev/discord-job-scraper',
        kind: 'build',
      },
      {
        label: 'Discord.js',
        imageUrl: 'https://img.shields.io/badge/built%20with-discord.js-blue',
        linkUrl: 'https://discord.js.org',
        kind: 'pipeline',
      },
    ],
    media: [
      {
        type: 'gif',
        src: 'https://raw.githubusercontent.com/howardsun-dev/discord-job-scraper/main/docs/bot-demo.gif',
        alt: 'Discord Job Scraper bot in action',
      },
      {
        type: 'image',
        src: 'https://raw.githubusercontent.com/howardsun-dev/discord-job-scraper/main/docs/architecture.png',
        alt: 'Discord Job Scraper architecture',
      },
    ],
    constellationLabel: 'Job Bot',
    constellationTech: 'Discord + scraping roadmap',
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
    badges: [
      {
        label: 'CI Passing',
        imageUrl: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml/badge.svg',
        linkUrl: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml',
        kind: 'build',
      },
      {
        label: 'Live Site',
        imageUrl: 'https://img.shields.io/badge/Deployed-Howardsun.me-brightgreen',
        linkUrl: 'https://howardsun.me',
        kind: 'deployed',
      },
      {
        label: 'React 19',
        imageUrl: 'https://img.shields.io/badge/React-19-61DAFB?logo=react',
        linkUrl: 'https://react.dev',
        kind: 'release',
      },
    ],
    media: [
      {
        type: 'image',
        src: 'https://howardsun.me/docs/screenshots/homepage.png',
        alt: 'Portfolio homepage showing project constellation',
      },
      {
        type: 'image',
        src: 'https://howardsun.me/docs/screenshots/mobile.png',
        alt: 'Portfolio mobile view',
      },
    ],
    constellationLabel: 'CI/CD Portfolio',
    constellationTech: 'AWS + GitHub Actions',
  },
];

const constellationNodes = projects.map((p) => ({
  id: p.id,
  label: p.constellationLabel,
  tech: p.constellationTech,
}));

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

function BadgeImage({ badge }: { badge: Badge }) {
  return (
    <a
      href={badge.linkUrl}
      target="_blank"
      rel="noreferrer"
      className={`project-badge project-badge--${badge.kind}`}
    >
      {badge.label}
      <img
        alt={`${badge.label} badge`}
        className="badge-image"
        src={badge.imageUrl}
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = 'none';
        }}
      />
    </a>
  );
}

function ProjectMedia({ media }: { media: Media[] }) {
  const validMedia = media.filter((m) => m.src);
  if (validMedia.length === 0) return null;

  return (
    <div className="project-media">
      {validMedia.map((m) => (
        <figure key={m.src} className={`project-media-item ${m.type}`}>
          <img
            alt={m.alt}
            className={m.type === 'gif' ? 'project-gif' : 'project-image'}
            src={m.src}
            onError={(e) => {
              const img = e.currentTarget;
              const figure = img.closest('figure');
              if (figure) figure.style.display = 'none';
            }}
          />
          <figcaption>{m.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
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
      <ProjectMedia media={project.media} />
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
      {project.badges.length > 0 && (
        <div className="project-badges" aria-label={`${project.name} badges`}>
          {project.badges.map((badge) => (
            <BadgeImage key={badge.label + badge.kind} badge={badge} />
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

function ProjectConstellation() {
  const nodePositions: Record<string, { left: string; top: string }> = {
    'swell-open-source-contribution': { left: '18%', top: '69%' },
    'quickchat-real-time-chat-app': { left: '44%', top: '48%' },
    lanshare: { left: '17%', top: '31%' },
    'discord-job-scraper-bot': { left: '72%', top: '66%' },
    'ci-cd-portfolio-site': { left: '47%', top: '80%' },
  };

  return (
    <section className="project-constellation" aria-labelledby="project-constellation-title">
      <div className="constellation-copy">
        <p className="eyebrow">Interactive map</p>
        <h2 id="project-constellation-title">Project Constellation</h2>
        <p>
          A lightweight map connecting each project to the engineering signal it demonstrates.
          Select a node to jump to the matching case study.
        </p>
      </div>
      <div className="constellation-stage">
        <div className="constellation-controls" aria-label="Jump to project">
          {constellationNodes.map((node) => {
            const pos = nodePositions[node.id] || { left: '50%', top: '50%' };
            return (
              <button
                key={node.id}
                type="button"
                className="constellation-node-button"
                style={{ left: pos.left, top: pos.top }}
                onClick={() => {
                  document.getElementById(node.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>{node.label}</span>
                <small>{node.tech}</small>
              </button>
            );
          })}
        </div>
      </div>
    </section>
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
      <ProjectConstellation />
      <div className="projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
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
