import { createLazyFileRoute } from '@tanstack/react-router';
import ContactPage from '../Components/ContactPage';

export const Route = createLazyFileRoute('/contact')({
  component: ContactPage,
});
