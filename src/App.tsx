/*
 * Pseudo-code: Root application component.
 * - Creates a TanStack Router instance bound to the auto-generated route tree.
 * - Sets `defaultPreload: 'intent'` so routes preload when the user hovers a link.
 * - Renders the <RouterProvider> which handles all route matching and rendering.
 * Why added: This is the top-level component that enables client-side routing.
 * The 'intent' preload strategy gives perceived instant navigation on link hover.
 */

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// Pseudo-code: Create the router with the generated route tree and intent-based preloading.
// Why added: 'intent' preloading starts fetching route code on hover, reducing perceived
// navigation latency without the bandwidth cost of preloading every route up front.
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Pseudo-code: Render the RouterProvider at the top of the React tree.
// Why added: RouterProvider wires the router into React context so every component
// can use <Link>, useNavigate(), and other TanStack Router APIs.
function App() {
  return <RouterProvider router={router} />;
}

export default App;
