import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectConstellation from '../../../Components/ProjectConstellation';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: vi.fn(),
}));

describe('ProjectConstellation', () => {
  it('renders project controls and scrolls to the selected project', async () => {
    const user = userEvent.setup();
    const project = document.createElement('article');
    project.id = 'lanshare';
    document.body.append(project);
    const scrollIntoView = vi.spyOn(project, 'scrollIntoView');

    render(<ProjectConstellation />);

    expect(screen.getByRole('heading', { name: 'Project Constellation' })).toBeInTheDocument();
    expect(screen.getByTestId('canvas')).toBeInTheDocument();

    const lanshare = screen.getByRole('button', { name: /LANShare.*CLI.*Express.*testing/i });
    await user.hover(lanshare);
    expect(lanshare).toHaveClass('is-active');

    await user.click(lanshare);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    await user.unhover(lanshare);
    expect(lanshare).not.toHaveClass('is-active');
  });

  it('does not render animation when reduced motion is preferred', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList,
    );

    const { container } = render(<ProjectConstellation />);

    expect(container).toBeEmptyDOMElement();
  });
});
