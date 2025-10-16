import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <Outlet />
        </div>
      </>
    );
  },
});
