/*
 * Pseudo-code: Lazy route definition for the projects page ("/project").
 * - Uses TanStack Router's `createLazyFileRoute` to code-split this route.
 * - Renders the <ProjectPage> component (the full project showcase).
 * Why added: Code-splitting the projects page means its component data (project
 * definitions, constellation canvas logic) is only loaded when the user visits /project.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import ProjectPage from '../Components/ProjectPage';

export const Route = createLazyFileRoute('/project')({
  // Pseudo-code: Render the ProjectPage as the /project route component.
  // Why added: This is the core portfolio page showing all projects with the
  // interactive constellation map, project cards, status badges, and proof points.
  component: ProjectPage,
});
