/*
 * Pseudo-code: Custom React hook that sets the browser tab title.
 * - Accepts a `title` string and assigns it to `document.title`.
 * - Re-runs whenever `title` changes so each route can set its own tab label.
 * Why added: Provides a reusable, declarative way to manage page titles across
 * routes without duplicating `document.title = ...` in every component.
 */

import { useEffect } from 'react';

export function usePageTitle(title: string) {
  // Pseudo-code: Set the browser tab title to the given string.
  // Why added: Ensures each page (Home, Projects, Tech Stack, Contact) shows a
  // distinct, SEO-friendly title in the browser tab.
  useEffect(() => {
    document.title = title;
  }, [title]);
}
