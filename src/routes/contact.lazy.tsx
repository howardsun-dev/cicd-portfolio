/*
 * Pseudo-code: File contact.lazy.tsx defines the contact.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File contact.lazy.tsx defines the contact.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import ContactPage from './contact';

export const Route = createLazyFileRoute('/contact')({
  component: ContactPage,
});
