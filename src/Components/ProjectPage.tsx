import { Link } from '@tanstack/react-router';
import './ProfilePage.css';

type Project = {
  name: string;
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
  status: 'completed' | 'in-progress' | 'planned';
};

const projects: Project[] = [
  {
    name: 'Discord Job Scraper Bot',
    description:
      'A Discord bot that scrapes job sites (LinkedIn, Indeed, Glassdoor) on a schedule and posts matching listings to configured channels. Built to automate job search and learn Discord API, web scraping, and eventually AI-powered job matching with RAG.',
    tech: ['Node.js', 'TypeScript', 'discord.js', 'Puppeteer', 'PostgreSQL', 'Docker', 'AWS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/howardsun-dev/discord-job-scraper' },
    ],
    status: 'in-progress',
  },
  {
    name: 'QuickChat — Real-Time Chat App',
    description:
      'A full-stack real-time chat application built with the MERN stack and Socket.io. Features JWT authentication, Zustand state management, and a polished Tailwind CSS UI with keyboard sound effects. Deployed on Sevalla.',
    tech: ['React', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'Zustand', 'Tailwind CSS'],
    links: [
      { label: 'Live Demo', href: 'https://quickchat-v72jh.sevalla.app/login' },
      { label: 'GitHub', href: 'https://github.com/howardsun-dev/quickchat' },
    ],
    status: 'completed',
  },
  {
    name: 'Swell — Open Source Contribution',
    description:
      'Contributed to Swell, an open-source API testing and development tool. Worked on features and bug fixes for the Electron-based desktop application used by developers for API prototyping and testing.',
    tech: ['Electron.js', 'React', 'Node.js'],
    links: [
      { label: 'GitHub', href: 'https://github.com/open-source-labs/Swell' },
    ],
    status: 'completed',
  },
  {
    name: 'CI/CD Portfolio Site',
    description:
      'This portfolio site is itself a portfolio piece. Built with React 19, TypeScript, Vite, and TanStack Router, featuring smooth animations with anime.js. Deployed to AWS S3 via a GitHub Actions CI/CD pipeline on every push to main.',
    tech: ['React 19', 'TypeScript', 'Vite', 'TanStack Router', 'AWS S3', 'GitHub Actions'],
    links: [
      { label: 'GitHub', href: 'https://github.com/howardsun-dev/cicd-portfolio' },
    ],
    status: 'completed',
  },
];

function StatusBadge({ status }: { status: Project['status'] }) {
  const styles: Record<Project['status'], string> = {
    completed: 'status-completed',
    'in-progress': 'status-in-progress',
    planned: 'status-planned',
  };
  const labels: Record<Project['status'], string> = {
    completed: '● Completed',
    'in-progress': '● In Progress',
    planned: '● Planned',
  };
  return <span className={`status-badge ${styles[status]}`}>{labels[status]}</span>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-name">{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-tech">
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
            className="project-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ProjectPage() {
  return (
    <div className="profile-container">
      <div className="title">Projects</div>
      <div className="projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Link className="social-link" to="/">
          ← Home
        </Link>
      </div>
    </div>
  );
}
