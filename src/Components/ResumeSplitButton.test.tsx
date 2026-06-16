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

  it('does not render the menu before the button is clicked', () => {
    render(<ResumeSplitButton />);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resume/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the menu after selecting the DOCX format', async () => {
    const user = userEvent.setup();
    render(<ResumeSplitButton />);

    const trigger = screen.getByRole('button', { name: /resume/i });
    await user.click(trigger);
    await user.click(screen.getByRole('menuitem', { name: 'DOCX' }));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu when clicking outside the component', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <ResumeSplitButton />
        <button type="button">outside</button>
      </div>,
    );

    const trigger = screen.getByRole('button', { name: /resume/i });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.pointer({ target: screen.getByRole('button', { name: /outside/i }), keys: '[MouseLeft]' });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('can reopen the menu after it has been closed', async () => {
    const user = userEvent.setup();
    render(<ResumeSplitButton />);

    const trigger = screen.getByRole('button', { name: /resume/i });
    await user.click(trigger);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('has accessible group label on the wrapper', () => {
    render(<ResumeSplitButton />);

    expect(screen.getByRole('group', { name: /download resume/i })).toBeInTheDocument();
  });

  it('has aria-haspopup set on the trigger button', () => {
    render(<ResumeSplitButton />);

    expect(screen.getByRole('button', { name: /resume/i })).toHaveAttribute('aria-haspopup', 'true');
  });

  it('opens links in a new tab with noreferrer', async () => {
    const user = userEvent.setup();
    render(<ResumeSplitButton />);

    await user.click(screen.getByRole('button', { name: /resume/i }));

    const pdfLink = screen.getByRole('menuitem', { name: 'PDF' });
    const docxLink = screen.getByRole('menuitem', { name: 'DOCX' });

    expect(pdfLink).toHaveAttribute('target', '_blank');
    expect(pdfLink).toHaveAttribute('rel', 'noreferrer');
    expect(docxLink).toHaveAttribute('target', '_blank');
    expect(docxLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('applies the nav size class when size="nav"', () => {
    render(<ResumeSplitButton size="nav" />);

    const group = screen.getByRole('group', { name: /download resume/i });
    expect(group).toHaveClass('resume-split--nav');
    expect(group).not.toHaveClass('resume-split--hero');
  });

  it('applies the hero size class by default', () => {
    render(<ResumeSplitButton />);

    const group = screen.getByRole('group', { name: /download resume/i });
    expect(group).toHaveClass('resume-split--hero');
    expect(group).not.toHaveClass('resume-split--nav');
  });

  it('forwards a custom className to the wrapper', () => {
    render(<ResumeSplitButton className="custom-class" />);

    expect(screen.getByRole('group', { name: /download resume/i })).toHaveClass('custom-class');
  });

  it('applies is-open class to wrapper while menu is open', async () => {
    const user = userEvent.setup();
    render(<ResumeSplitButton />);

    const group = screen.getByRole('group', { name: /download resume/i });
    expect(group).not.toHaveClass('is-open');

    await user.click(screen.getByRole('button', { name: /resume/i }));
    expect(group).toHaveClass('is-open');

    await user.keyboard('{Escape}');
    expect(group).not.toHaveClass('is-open');
  });
});
