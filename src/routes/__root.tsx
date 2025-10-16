import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <Outlet />
        </div>
        {/* <TanStackRouterDevtools /> */} // uncomment to add dev tools
      </>
    );
  },
});
