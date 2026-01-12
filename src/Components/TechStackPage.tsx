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
          <CollapsibleListItem title="Frontend">
            <ul>
              <ul>
                {[
                  'React',
                  'Redux',
                  'Typescript',
                  'Solid.js',
                  'Zustand',
                  'Vite',
                  'Vitest',
                  'Tailwind CSS',
                  'DaisyUI',
                ].map((tech) => (
                  <li
                    key={tech}
                    className={`frontend-${tech.toLowerCase().replace('.', '').replace(' ', '-')}`}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </ul>
          </CollapsibleListItem>
        </div>
        <div className="column">
          <CollapsibleListItem title="Backend">
            <ul>
              {[
                'Node.js',
                'Express',
                'Electron.js',
                'Python',
                'PostgreSQL',
                'MongoDB',
                'Socket.IO',
                'Vite',
                'webpack',
                'Jest',
                'Mocha',
                'Chai',
              ].map((tech) => (
                <li
                  key={tech}
                  className={`backend-${tech.toLowerCase().replace('.', '').replace(' ', '-')}`}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </CollapsibleListItem>
        </div>
        <div className="column">
          <CollapsibleListItem title="Cloud & Containerization">
            <ul>
              {[
                'AWS (EC2, S3, Aurora, Elastic Beanstalk, VPC)',
                'Terraform',
                'Docker',
                'Kubernetes',
              ].map((tech) => (
                <li
                  key={tech}
                  className={`cloud-${tech.toLowerCase().replace('.', '').replace(' ', '-')}`}
                >
                  {tech}
                </li>
              ))}
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
