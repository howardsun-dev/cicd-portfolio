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

export default function ResumeSplitButton({ className = '', size = 'hero' }: ResumeSplitButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const sizeClass = size === 'nav' ? 'resume-split--nav' : 'resume-split--hero';
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX + rect.width / 2,
    });
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((v) => {
      if (!v) updatePosition();
      return !v;
    });
  }, [updatePosition]);

  const handleClose = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: PointerEvent) {
      const target = e.target as Node;
      if (
        rootRef.current && !rootRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
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

  // Update position on scroll/resize while open
  useEffect(() => {
    if (!open) return;
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, updatePosition]);

  const dropdown = open ? (
    <div
      ref={menuRef}
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
        target="_blank"
        rel="noreferrer"
        onClick={handleClose}
      >
        PDF
      </a>
      <a
        className="resume-split__option resume-split__option--docx"
        href={RESUME_DOCX_PATH}
        role="menuitem"
        target="_blank"
        rel="noreferrer"
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
