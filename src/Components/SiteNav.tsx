import { Link } from '@tanstack/react-router';
import ResumeSplitButton from './ResumeSplitButton';

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
        <Link className="nav-link" to="/contact" activeProps={{ 'aria-current': 'page' }}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
