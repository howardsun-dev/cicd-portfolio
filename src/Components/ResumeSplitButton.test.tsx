import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResumeSplitButton from './ResumeSplitButton';
import { RESUME_DOCX_PATH, RESUME_PDF_PATH } from '../links';

describe('ResumeSplitButton', () => {
  it('opens the resume format menu with PDF and DOCX links', async () => {
    const user = userEvent.setup();
    render(<ResumeSplitButton />);

    const trigger = screen.getByRole('button', { name: /resume/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'PDF' })).toHaveAttribute('href', RESUME_PDF_PATH);
    expect(screen.getByRole('menuitem', { name: 'DOCX' })).toHaveAttribute('href', RESUME_DOCX_PATH);
  });

  it('closes the menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<ResumeSplitButton />);

    const trigger = screen.getByRole('button', { name: /resume/i });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu after selecting a resume format', async () => {
    const user = userEvent.setup();
    render(<ResumeSplitButton />);

    const trigger = screen.getByRole('button', { name: /resume/i });
    await user.click(trigger);
    await user.click(screen.getByRole('menuitem', { name: 'PDF' }));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
