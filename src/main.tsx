/*
 * Pseudo-code: Application entry point.
 * - Grabs the `<div id="root">` element from index.html.
 * - Throws a clear error if the root element is missing (catches deployment misconfig).
 * - Renders the <App /> component inside React StrictMode to surface potential issues.
 * Why added: This is the bootstrap code that mounts the React tree into the DOM.
 * StrictMode double-renders in development to catch side-effect bugs early.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './Components/ProfilePage.css';
import App from './App.tsx';

// Pseudo-code: Find the root DOM element; fail fast with a clear message if missing.
// Why added: Prevents a silent blank page when index.html doesn't contain the expected
// <div id="root"> — common when the deploy pipeline serves the wrong artifact.
const container = document.getElementById('root');
if (!container) {
  throw new Error(
    "Root element with id 'root' not found. Make sure index.html contains <div id='root'></div>.",
  );
}

// Pseudo-code: Mount the React application into the root DOM node.
// Why added: createRoot is the React 18+ concurrent-mode API; StrictMode wraps the
// tree to warn about deprecated APIs, missing keys, and unexpected side effects.
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
