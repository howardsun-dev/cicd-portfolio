import { useState, useRef, useEffect, useCallback } from 'react';
import { RESUME_PDF_PATH, RESUME_DOCX_PATH } from '../links';
import './ResumeSplitButton.css';

interface ResumeSplitButtonProps {
  /** Extra className applied to the wrapper */
  className?: string;
  /** Size variant */
  size?: 'nav' | 'hero';
}

export default function ResumeSplitButton({ className = '', size = 'hero' }: ResumeSplitButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const sizeClass = size === 'nav' ? 'resume-split--nav' : 'resume-split--hero';

  const handleClose = useCallback(() => setOpen(false), []);
  const handleToggle = useCallback(() => setOpen((v) => !v), []);

  // Close on outside click
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

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`resume-split ${sizeClass} ${open ? 'is-open' : ''} ${className}`}
      role="group"
      aria-label="Download resume"
    >
      {/* Main button */}
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

      {/* Sub-buttons */}
      <div className={`resume-split__options ${open ? 'is-visible' : ''}`} role="menu">
        <a
          className="resume-split__option resume-split__option--pdf"
          href={RESUME_PDF_PATH}
          role="menuitem"
          onClick={handleClose}
          onKeyDown={(e) => e.key === 'Tab' && handleClose()}
        >
          PDF
        </a>
        <a
          className="resume-split__option resume-split__option--docx"
          href={RESUME_DOCX_PATH}
          role="menuitem"
          onClick={handleClose}
          onKeyDown={(e) => e.key === 'Tab' && handleClose()}
        >
          DOCX
        </a>
      </div>
    </div>
  );
}
