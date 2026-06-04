/*
 * Pseudo-code: File __root.tsx defines the __root component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File __root.tsx defines the __root component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { Outlet, createRootRoute } from '@tanstack/react-router';
import SiteNav from '../Components/SiteNav';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
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
