import React, { useState } from 'react';
import './ProfilePage.css';
import { Link } from '@tanstack/react-router';

// add collapsable list for the 3 columns

function CollapsibleListItem({ title, children }: { title: string; children?: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div onClick={toggleExpand} style={{ cursor: 'pointer' }}>
        <h3>
          {title} {isExpanded ? '▲' : '▼'}
        </h3>
      </div>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}
export default function TechStackPage() {
  return (
    <div className="profile-container">
      <div className="title">Tech Stack</div>
      <div className="tech-container">
        <div className="column">
          <CollapsibleListItem title="Fontend">
            <ul>
              <li>React</li>
              <li>Redux</li>
              <li>Typescript</li>
              <li>Solid.js</li>
            </ul>
          </CollapsibleListItem>
        </div>
        <div className="column">
          <CollapsibleListItem title="Backend">
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>Electron.js</li>
              <li>Python</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>Vite</li>
              <li>webpack</li>
              <li>Jest</li>
              <li>Vitest</li>
              <li>Jest</li>
              <li>Mocha</li>
              <li>chai</li>
            </ul>
          </CollapsibleListItem>
        </div>
        <div className="column">
          <CollapsibleListItem title="Cloud & Containerization">
            <ul>
              <li>AWS</li>
              <li>Terraform</li>
              <li>Docker</li>
              <li>Kubernetes</li>
            </ul>
          </CollapsibleListItem>
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
