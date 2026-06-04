/*
 * Pseudo-code: File usePageTitle.ts defines the usePageTitle component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

/*
 * Pseudo-code: File usePageTitle.ts defines the usePageTitle component/module.
 * Why added: Added to provide pseudo-code documentation for the CI/CD portfolio.
 */

import { useEffect } from 'react';

export function usePageTitle(title: string) {
    // Pseudo-code: Function logic describes the behavior of this function.
    // Added to explain the function's role in the CI/CD portfolio.
  useEffect(() => {
    document.title = title;
  }, [title]);
}
