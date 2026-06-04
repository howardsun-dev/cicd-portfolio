/*
 * Pseudo-code: File project.lazy.tsx defines the project.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File project.lazy.tsx defines the project.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import ProjectPage from '../Components/ProjectPage';

export const Route = createLazyFileRoute('/project')({
  component: ProjectPage,
});
