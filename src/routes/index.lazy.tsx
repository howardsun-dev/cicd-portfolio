/*
 * Pseudo-code: File index.lazy.tsx defines the index.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File index.lazy.tsx defines the index.lazy component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { createLazyFileRoute } from '@tanstack/react-router';
import ProfilePage from '../Components/ProfilePage';

export const Route = createLazyFileRoute('/')({
  component: ProfilePage,
});
