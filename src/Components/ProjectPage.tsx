import { Link } from '@tanstack/react-router';
import './ProfilePage.css';

export default function ProjectPage() {
  return (
    <div className="profile-container">
      <div className="name-container"></div>
      <div className="title">Projects</div>
      <div className="bio">Work in Progress</div>
      <div style={{ marginTop: '1.5rem' }}>
        <br></br>
        <Link className="social-link" to="/">
          Home
        </Link>
      </div>
    </div>
  );
}
