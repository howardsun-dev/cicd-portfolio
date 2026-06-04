/*
 * Pseudo-code: Site-wide navigation bar component.
 * - Renders the "HS" brand link that navigates to the home page.
 * - Renders internal navigation links (Home, Projects, Tech Stack, Contact) using
 *   TanStack Router's <Link> with `activeProps` for current-page highlighting.
 * - Renders the ResumeSplitButton for downloading the resume.
 * - Renders external links (GitHub, LinkedIn) that open in new tabs.
 * Why added: Provides consistent navigation across all pages. Using TanStack Router's
 * <Link> enables client-side navigation (no full page reload) and automatic
 * active-state styling via `activeProps`.
 */

import { Link } from '@tanstack/react-router';
import ResumeSplitButton from './ResumeSplitButton';

const externalLinks = [
  { href: 'https://github.com/howardsun-dev', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/howardsun-swe', label: 'LinkedIn' },
];

// Pseudo-code: Render the navigation bar with brand, internal links, resume button, and external links.
// Why added: The nav bar is the primary way users move between sections of the portfolio.
// It appears on every page via the root route layout.
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
