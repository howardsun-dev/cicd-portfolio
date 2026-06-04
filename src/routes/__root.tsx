/*
 * Pseudo-code: Root layout route for TanStack Router.
 * - Renders a skip-to-content link for keyboard/screen-reader users.
 * - Renders the <SiteNav> navigation bar on every page.
 * - Renders the <Outlet> which is where child routes (Home, Projects, etc.) appear.
 * Why added: Defines the shared layout shell so every page gets consistent navigation
 * and accessibility features without repeating them in each route component.
 */

import { Outlet, createRootRoute } from '@tanstack/react-router';
import SiteNav from '../Components/SiteNav';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  // Pseudo-code: Render the shared layout (skip link + nav + child route outlet).
  // Why added: The root route wraps all child routes, providing a consistent shell.
  // The skip-link lets keyboard users jump past navigation to the main content.
  component: () => {
    return (
      <>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteNav />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </>
    );
  },
});
