/*
 * Pseudo-code: Centralized URL constants for external resources.
 * - RESUME_PDF_PATH: Direct link to the PDF resume hosted on the CDN.
 * - RESUME_DOCX_PATH: Direct link to the DOCX resume hosted on the CDN.
 * Why added: Keeps resume URLs in one place so the ResumeSplitButton and any
 * future download links stay in sync without hard-coding paths in multiple components.
 */

export const RESUME_PDF_PATH = 'https://howardsun.me/resume/Howard_Sun-Resume-2026.pdf';
export const RESUME_DOCX_PATH = 'https://howardsun.me/resume/Howard_Sun-Resume-2026.docx';
