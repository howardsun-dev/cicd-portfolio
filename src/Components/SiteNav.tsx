import { Link } from '@tanstack/react-router';
import { RESUME_PDF_PATH } from '../links';

const externalLinks = [
  { href: 'https://github.com/howardsun-dev', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/howardsun-swe', label: 'LinkedIn' },
];

export default function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <Link className="nav-brand" to="/" aria-label="Howard Sun home">
        HS
      </Link>
      <div className="nav-links">
        <Link className="nav-link" to="/project" activeProps={{ 'aria-current': 'page' }}>
          Projects
        </Link>
        <Link className="nav-link" to="/techstack" activeProps={{ 'aria-current': 'page' }}>
          Tech Stack
        </Link>
        <a className="nav-link" href={RESUME_PDF_PATH}>
          Resume
        </a>
        {externalLinks.map((link) => (
          <a key={link.href} className="nav-link" href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
