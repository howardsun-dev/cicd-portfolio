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
