import { createLazyFileRoute } from '@tanstack/react-router';
import ProfilePage from '../Components/ProfilePage';

export const Route = createLazyFileRoute('/')({
  component: ProfilePage,
});
