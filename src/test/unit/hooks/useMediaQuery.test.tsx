import { act, renderHook } from '@testing-library/react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

describe('useMediaQuery', () => {
  it('tracks media-query changes and removes its listener on unmount', () => {
    let matches = false;
    let changeListener: (() => void) | undefined;
    const addEventListener = vi.fn(
      (_event: string, listener: EventListenerOrEventListenerObject) => {
        changeListener = listener as () => void;
      },
    );
    const removeEventListener = vi.fn();

    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          get matches() {
            return matches;
          },
          media: query,
          onchange: null,
          addEventListener,
          removeEventListener,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as MediaQueryList,
    );

    const { result, unmount } = renderHook(() => useMediaQuery('(max-width: 700px)'));

    expect(result.current).toBe(false);
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    matches = true;
    act(() => changeListener?.());

    expect(result.current).toBe(true);

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('change', changeListener);
  });
});
