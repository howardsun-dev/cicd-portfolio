import { Link } from '@tanstack/react-router';
import { RESUME_DOCX_PATH, RESUME_PDF_PATH } from '../links';

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
        <Link className="nav-link" to="/" activeProps={{ 'aria-current': 'page' }}>
          Home
        </Link>
        <Link className="nav-link" to="/project" activeProps={{ 'aria-current': 'page' }}>
          Projects
        </Link>
        <Link className="nav-link" to="/techstack" activeProps={{ 'aria-current': 'page' }}>
          Tech Stack
        </Link>
        <details className="nav-resume-group" aria-label="Resume downloads">
          <summary className="nav-link nav-resume-toggle" aria-haspopup="menu">
            Resume (PDF/DOCX)
          </summary>
          <div className="nav-resume-menu" role="menu">
            <a className="nav-link" href={RESUME_PDF_PATH} role="menuitem">
              Resume PDF
            </a>
            <a className="nav-link" href={RESUME_DOCX_PATH} role="menuitem">
              Resume DOCX
            </a>
          </div>
        </details>
        {externalLinks.map((link) => (
          <a key={link.href} className="nav-link" href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
        <Link className="nav-link" to="/contact" activeProps={{ 'aria-current': 'page' }}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
