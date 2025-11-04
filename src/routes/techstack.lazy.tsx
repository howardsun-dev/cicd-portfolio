import { createLazyFileRoute } from '@tanstack/react-router';
import TechStackPage from '../Components/TechStackPage';

export const Route = createLazyFileRoute('/techstack')({
  component: TechStackPage,
});
