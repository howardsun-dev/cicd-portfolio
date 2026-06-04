/*
 * Pseudo-code: File SiteNav.tsx defines the SiteNav component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File SiteNav.tsx defines the SiteNav component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { Link } from '@tanstack/react-router';
import ResumeSplitButton from './ResumeSplitButton';

const externalLinks = [
  { href: 'https://github.com/howardsun-dev', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/howardsun-swe', label: 'LinkedIn' },
];

export default function SiteNav() {
    // Pseudo-code: Function logic describes the behavior of this function.
    // Added to explain the function's role in the CI/CD portfolio.
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
        <ResumeSplitButton size="nav" />
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
