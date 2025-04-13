import { afterAll, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';

import RootPage from '../app/(root)/page';

type Fetch = typeof window.fetch;

const mockFetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => [],
  }),
);

window.fetch = mockFetch as Fetch;

describe('Root page', () => {
  const { container, unmount } = render(<RootPage />);

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('should have the correct tree parent', () => {
    expect(container).toBeInstanceOf(HTMLDivElement);
  });

  afterAll(() => {
    unmount();
  });
});
