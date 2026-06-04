/*
 * Pseudo-code: Vite build configuration for the portfolio.
 * - Registers the TanStack Router plugin for file-based routing and auto code-splitting.
 * - Registers the React plugin with the React Compiler (babel-plugin-react-compiler)
 *   for automatic memoization and render optimization.
 * Why added: Defines how the app is bundled — code-splitting keeps each route lazy-loadable,
 * and the React Compiler reduces unnecessary re-renders without manual useMemo/useCallback.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
