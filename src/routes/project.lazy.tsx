import { createLazyFileRoute } from '@tanstack/react-router';
import ProjectPage from '../Components/ProjectPage';

export const Route = createLazyFileRoute('/project')({
  component: ProjectPage,
});
