/*
 * Pseudo-code: Lazy route definition for the contact page ("/contact").
 * - Uses TanStack Router's `createLazyFileRoute` to code-split this route.
 * - Renders the <ContactPage> component (email, LinkedIn, GitHub links).
 * Why added: The contact page has no heavy dependencies, but lazy loading it keeps
 * the route consistent with the others and ensures zero cost if never visited.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import ContactPage from './contact';

export const Route = createLazyFileRoute('/contact')({
  // Pseudo-code: Render the ContactPage as the /contact route component.
  // Why added: Provides contact methods (email, LinkedIn, GitHub) for recruiters
  // and collaborators to reach out.
  component: ContactPage,
});
