import { Link } from '@tanstack/react-router';

export default function ProjectPage() {
  return (
    <div>
      <h1>My Project Page</h1>
      <p>Work in Progress</p>
      <Link className="social-link" to="/">
        Home
      </Link>
    </div>
  );
}
