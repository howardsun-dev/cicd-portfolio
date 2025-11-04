import './ProfilePage.css';
import { Link } from '@tanstack/react-router';

export default function TechStackPage() {
  return (
    <div className="profile-container">
      <div className="title">Tech Stack</div>
      <div className="tech-container">
        <div className="column">
          <li>Javascript</li>
        </div>
        <div className="column">
          <li>Postgres</li>
        </div>
        <div className="column">
          <li>AWS S3</li>
        </div>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <Link className="social-link" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}
