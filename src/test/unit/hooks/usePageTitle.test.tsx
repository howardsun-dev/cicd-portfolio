import { render, waitFor } from '@testing-library/react';
import { usePageTitle } from '../../../hooks/usePageTitle';

function TitleHarness({ title }: { title: string }) {
  usePageTitle(title);
  return null;
}

describe('usePageTitle', () => {
  it('sets the document title and updates it when the title changes', async () => {
    const { rerender } = render(<TitleHarness title="Home" />);

    await waitFor(() => expect(document.title).toBe('Home'));

    rerender(<TitleHarness title="Projects" />);

    await waitFor(() => expect(document.title).toBe('Projects'));
  });
});
