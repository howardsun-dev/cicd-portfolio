/*
 * Pseudo-code: Resume download split-button dropdown component.
 * - Renders a "Resume" button that toggles a dropdown with PDF and DOCX download links.
 * - Positions the dropdown using a portal so it's not clipped by overflow-hidden parents.
 * - Supports two size variants: 'hero' (large, for the profile page) and 'nav' (compact, for the nav bar).
 * - Closes on outside click, Escape key, scroll, and resize.
 * Why added: Gives visitors two resume format options (PDF for viewing, DOCX for editing)
 * in a compact UI that doesn't take up permanent screen real estate.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { RESUME_PDF_PATH, RESUME_DOCX_PATH } from '../links';
import './ResumeSplitButton.css';

interface ResumeSplitButtonProps {
  /** Extra className applied to the wrapper */
  className?: string;
  /** Size variant */
  size?: 'nav' | 'hero';
}

// Pseudo-code: Render the resume split-button with a dropdown for PDF/DOCX download options.
// Why added: Consolidates resume downloads into a single interactive element with a
// portal-based dropdown that escapes overflow clipping in any parent container.
export default function ResumeSplitButton({ className = '', size = 'hero' }: ResumeSplitButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const sizeClass = size === 'nav' ? 'resume-split--nav' : 'resume-split--hero';
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  // Pseudo-code: Calculate the dropdown position relative to the button's bounding rect.
  // Why added: The dropdown is portaled to <body>, so it needs absolute coordinates
  // based on the button's position + scroll offset to align correctly.
  const updatePosition = useCallback(() => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX + rect.width / 2,
    });
  }, []);

  // Pseudo-code: Toggle the dropdown open/closed, recalculating position on open.
  // Why added: Updating position on open ensures the dropdown appears in the right
  // place even if the layout shifted while it was closed.
  const handleToggle = useCallback(() => {
    setOpen((v) => {
      if (!v) updatePosition();
      return !v;
    });
  }, [updatePosition]);

  // Pseudo-code: Close the dropdown menu.
  // Why added: Used as a callback for after the user clicks a download link so the
  // menu doesn't stay open after navigating away.
  const handleClose = useCallback(() => setOpen(false), []);

  // Pseudo-code: Close the dropdown when the user clicks outside the button.
  // Why added: Standard dropdown behavior — clicking anywhere else on the page
  // should dismiss the menu.
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [open]);

  // Pseudo-code: Close the dropdown when the user presses the Escape key.
  // Why added: Keyboard accessibility — Escape is the standard key for dismissing
  // popups and dropdowns.
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  // Pseudo-code: Reposition the dropdown on scroll and resize while it's open.
  // Why added: Because the dropdown is absolutely positioned at <body> level,
  // it must track the button's position as the user scrolls or resizes the window.
  useEffect(() => {
    if (!open) return;
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  // Pseudo-code: Build the dropdown element with PDF and DOCX download links.
  // Why added: Uses createPortal to render at <body> level so the dropdown is never
  // clipped by overflow: hidden on parent containers (like the nav bar).
  const dropdown = open ? (
    <div
      className={`resume-split__options is-visible ${sizeClass}`}
      style={{
        position: 'absolute',
        top: dropdownPos.top,
        left: dropdownPos.left,
        transform: 'translateX(-50%)',
      }}
      role="menu"
    >
      <a
        className="resume-split__option resume-split__option--pdf"
        href={RESUME_PDF_PATH}
        role="menuitem"
        onClick={handleClose}
      >
        PDF
      </a>
      <a
        className="resume-split__option resume-split__option--docx"
        href={RESUME_DOCX_PATH}
        role="menuitem"
        onClick={handleClose}
      >
        DOCX
      </a>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={rootRef}
        className={`resume-split ${sizeClass} ${open ? 'is-open' : ''} ${className}`}
        role="group"
        aria-label="Download resume"
      >
        <button
          className="resume-split__main"
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          aria-haspopup="true"
        >
          Resume
          <svg
            className="resume-split__chevron"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>
      </div>
      {createPortal(dropdown, document.body)}
    </>
  );
}
