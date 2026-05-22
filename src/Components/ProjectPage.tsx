import { Link } from '@tanstack/react-router';
import { usePageTitle } from '../hooks/usePageTitle';

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
    name: 'Discord Job Scraper Bot',
    description:
      'A Discord bot that turns job search into a programmable feed: slash commands now, scheduled scraping, persistence, filtering, and AI-assisted matching next.',
    role: 'Solo builder',
    outcome: 'Current milestone: Discord bot skeleton with /ping and /jobs commands; next milestone adds scraping and PostgreSQL.',
    tech: ['Node.js', 'TypeScript', 'discord.js', 'Puppeteer', 'PostgreSQL', 'Docker', 'AWS'],
    links: [
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/discord-job-scraper', kind: 'primary' },
    ],
    status: 'in-progress',
    proofPoints: ['Slash-command architecture', 'Docker-ready Node.js service', 'Roadmap toward AI/RAG job matching'],
  },
  {
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
    proofPoints: ['Live deployed app', 'JWT auth + realtime messaging', 'Frontend/backend integration'],
  },
  {
    name: 'Swell — Open Source Contribution',
    description:
      'Open-source contribution experience in Swell, an Electron/React API testing tool from Open Source Labs.',
    role: 'Contributor in existing codebase',
    outcome: 'Shows ability to navigate a mature codebase, understand product workflows, and contribute in a team-owned repository.',
    tech: ['Electron.js', 'React', 'Node.js'],
    links: [
      { label: 'View Project Repository', href: 'https://github.com/open-source-labs/Swell', kind: 'primary' },
      {
        label: 'View Co-authored Commit',
        href: 'https://github.com/open-source-labs/Swell/commit/964142802b6a09362bd16c968501d511c3f42858',
      },
    ],
    status: 'contribution',
    proofPoints: ['Co-authored commit credited to Howard S.', 'Existing production-scale codebase', 'Electron desktop app experience'],
  },
  {
    name: 'CI/CD Portfolio Site',
    description:
      'This portfolio is itself a deployable artifact: React 19, TypeScript, Vite, TanStack Router, and AWS deployment through GitHub Actions.',
    role: 'Frontend + DevOps owner',
    outcome: 'Validated CI/CD pipeline with dependency audit, linting, production build, S3 deploy, SPA route support, and optional CloudFront invalidation.',
    tech: ['React 19', 'TypeScript', 'Vite', 'TanStack Router', 'AWS S3', 'CloudFront', 'GitHub Actions'],
    links: [
      { label: 'View Repository', href: 'https://github.com/howardsun-dev/cicd-portfolio', kind: 'primary' },
      { label: 'View Workflow', href: 'https://github.com/howardsun-dev/cicd-portfolio/actions/workflows/main.yml' },
    ],
    status: 'live',
    proofPoints: ['GitHub Actions deploy pipeline', 'S3/CloudFront hosting', 'Direct route fallback support'],
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
    <article className="project-card" aria-labelledby={`${project.name}-title`}>
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
