/*
 * Pseudo-code: Contact page component.
 * - Sets the page title to "Howard Sun — Contact" via the usePageTitle hook.
 * - Renders a list of contact methods (email, LinkedIn, GitHub) as clickable links.
 * - Includes a "← Home" back link for easy navigation.
 * Why added: Gives recruiters and collaborators a dedicated page with all contact
 * methods in one place, each opening in a new tab with proper accessibility labels.
 */

import { usePageTitle } from '../hooks/usePageTitle';
import { Link } from '@tanstack/react-router';

const contactMethods = [
  {
    icon: '✉',
    label: 'Email',
    value: 'howardsun@pm.me',
    href: 'mailto:howardsun@pm.me',
  },
  {
    icon: '💬',
    label: 'LinkedIn',
    value: 'linkedin.com/in/howardsun-swe',
    href: 'https://www.linkedin.com/in/howardsun-swe',
  },
  {
    icon: '⌨',
    label: 'GitHub',
    value: 'github.com/howardsun-dev',
    href: 'https://github.com/howardsun-dev',
  },
];

// Pseudo-code: Render the contact page with all contact methods and a back-to-home link.
// Why added: This is the dedicated contact route — it centralizes all ways to reach
// the developer so recruiters don't have to hunt through the profile page.
export default function ContactPage() {
  usePageTitle('Howard Sun — Contact');

  return (
    <main id="main-content" className="profile-container" tabIndex={-1}>
      <header className="page-header">
        <p className="eyebrow">Get in touch</p>
        <h1 className="title">Contact</h1>
        <p className="page-intro">
          I'm open to full-time roles, contract work, and collaboration. The fastest way to reach
          me is email or LinkedIn.
        </p>
      </header>
      <div className="contact-page">
        <div className="contact-list" aria-label="Contact methods">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              className="contact-item"
              href={method.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-icon" aria-hidden="true">
                {method.icon}
              </span>
              <div>
                <div className="contact-label">{method.label}</div>
                <div className="contact-value">{method.value}</div>
              </div>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
      <div className="back-link-row">
        <Link className="social-link" to="/">
          ← Home
        </Link>
      </div>
    </main>
  );
}
