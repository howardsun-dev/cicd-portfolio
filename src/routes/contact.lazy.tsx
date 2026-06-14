import { createLazyFileRoute } from '@tanstack/react-router';
import ContactPage from './contact';

export const Route = createLazyFileRoute('/contact')({
  component: ContactPage,
});
