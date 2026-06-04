/*
 * Pseudo-code: File App.tsx defines the App component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File App.tsx defines the App component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

function App() {
    // Pseudo-code: Main App component that renders the UI.
    // Added to document the function's purpose in the CI/CD portfolio.
  return <RouterProvider router={router} />;
}

export default App;
