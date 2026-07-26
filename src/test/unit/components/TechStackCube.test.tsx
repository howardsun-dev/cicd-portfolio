import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TechStackCube from '../../../Components/TechStackCube';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: vi.fn(),
}));

const slides = [
  { id: 'languages', title: 'Languages' },
  { id: 'frontend', title: 'Frontend' },
];

describe('TechStackCube', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      clearRect: vi.fn(),
      strokeText: vi.fn(),
      fillText: vi.fn(),
      font: '',
      textAlign: 'start',
      textBaseline: 'alphabetic',
      lineWidth: 1,
      strokeStyle: '',
      fillStyle: '',
      shadowColor: '',
      shadowBlur: 0,
      shadowOffsetY: 0,
    } as unknown as CanvasRenderingContext2D);
  });

  it('renders stack controls and selects a slide', async () => {
    const user = userEvent.setup();
    const onSelectSlide = vi.fn();

    const { container } = render(
      <TechStackCube slides={slides} activeIndex={0} onSelectSlide={onSelectSlide} />,
    );

    expect(screen.getByRole('heading', { name: 'Rotating capability cube' })).toBeInTheDocument();
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Languages' })).toHaveAttribute(
      'aria-current',
      'true',
    );

    await user.click(screen.getByRole('button', { name: 'Frontend' }));
    expect(onSelectSlide).toHaveBeenCalledWith(1);

    const stage = container.querySelector('.tech-cube-stage');
    expect(stage).not.toBeNull();
    fireEvent.pointerMove(stage!, { clientX: 20, clientY: 30 });
    fireEvent.pointerMove(stage!, { clientX: 35, clientY: 10 });
    fireEvent.pointerLeave(stage!);
  });

  it('still renders its controls in reduced-motion mode', () => {
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

    render(<TechStackCube slides={slides} activeIndex={1} onSelectSlide={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Frontend' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });
});
