import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../../Components/ProjectConstellation', () => ({
  default: () => <div data-testid="project-constellation">Project map</div>,
}));

vi.mock('../../Components/TechStackCube', () => ({
  default: () => <div data-testid="tech-stack-cube">Tech stack cube</div>,
}));

describe('website navigation', () => {
  it('navigates between the main pages and updates their content and titles', async () => {
    window.history.replaceState({}, '', '/');
    const { default: App } = await import('../../App');
    const user = userEvent.setup();

    render(<App />);

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Howard Sun' }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Howard Sun — Portfolio');
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#main-content',
    );

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });

    await user.click(within(navigation).getByRole('link', { name: 'Contact' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /howardsun@pm\.me/i })).toHaveAttribute(
      'href',
      'mailto:howardsun@pm.me',
    );
    expect(document.title).toBe('Howard Sun — Contact');

    await user.click(within(navigation).getByRole('link', { name: 'Projects' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'LANShare' })).toBeInTheDocument();
    expect(await screen.findByTestId('project-constellation')).toBeInTheDocument();
    expect(document.title).toBe('Howard Sun — Projects');

    await user.click(within(navigation).getByRole('link', { name: 'Tech Stack' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Tech Stack' })).toBeInTheDocument();
    expect(await screen.findByTestId('tech-stack-cube')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Languages' })).toBeInTheDocument();
    expect(document.title).toBe('Howard Sun — Tech Stack');

    await user.click(within(navigation).getByRole('link', { name: 'Home' }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Howard Sun' }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Howard Sun — Portfolio');
  });
});
