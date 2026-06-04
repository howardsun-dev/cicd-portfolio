/*
 * Pseudo-code: File techstack.lazy.tsx defines the techstack.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File techstack.lazy.tsx defines the techstack.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import TechStackPage from '../Components/TechStackPage';

export const Route = createLazyFileRoute('/techstack')({
  component: TechStackPage,
});
