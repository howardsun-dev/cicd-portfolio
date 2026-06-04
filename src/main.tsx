/*
 * Pseudo-code: File main.tsx defines the main component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File main.tsx defines the main component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './Components/ProfilePage.css';
import App from './App.tsx';

const container = document.getElementById('root');
if (!container) {
    // Pseudo-code: Performs if.
    // Added to document the function's purpose in the CI/CD portfolio.
  throw new Error(
    "Root element with id 'root' not found. Make sure index.html contains <div id='root'></div>.",
  );
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
