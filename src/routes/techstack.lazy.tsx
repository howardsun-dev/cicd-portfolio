/*
 * Pseudo-code: Lazy route definition for the tech stack page ("/techstack").
 * - Uses TanStack Router's `createLazyFileRoute` to code-split this route.
 * - Renders the <TechStackPage> component (the rotating cube + skill slides).
 * Why added: The Three.js cube and IntersectionObserver logic is only needed on this
 * page, so lazy loading keeps it out of the initial bundle entirely.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import TechStackPage from '../Components/TechStackPage';

export const Route = createLazyFileRoute('/techstack')({
  // Pseudo-code: Render the TechStackPage as the /techstack route component.
  // Why added: Displays the rotating Three.js cube alongside categorized skill slides,
  // giving a visual overview of the full technology stack.
  component: TechStackPage,
});
