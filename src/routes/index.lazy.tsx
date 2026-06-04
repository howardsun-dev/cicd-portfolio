/*
 * Pseudo-code: Lazy route definition for the home page ("/").
 * - Uses TanStack Router's `createLazyFileRoute` to code-split this route.
 * - Renders the <ProfilePage> component (the hero/profile landing view).
 * Why added: Lazy loading means the home page JS is only fetched when the user
 * navigates to "/", keeping the initial bundle smaller and the app faster to load.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import ProfilePage from '../Components/ProfilePage';

export const Route = createLazyFileRoute('/')({
  // Pseudo-code: Render the ProfilePage as the home route component.
  // Why added: The home route is the first thing visitors see — it shows the
  // animated name, bio, social links, and resume download button.
  component: ProfilePage,
});
