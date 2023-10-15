/// <reference types="node" />

import { renderHook } from '@testing-library/react-hooks';
import useFetch from '../useFetch';

describe('useFetch', () => {
  const url = 'https://q-posts.com/api/posts';
  const posts = [{ username: 'john.doe', body: 'Hello World!' }];

  it('should fetche data successfully', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: posts })
      } as Response)
    );
    global.fetch = mockFetch;

    const { result, waitForNextUpdate } = renderHook(() => useFetch(url));

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ data: posts });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(url, undefined);
  });

  it('should throw fetch error', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: '404'
      } as Response)
    );
    global.fetch = mockFetch;

    const { result, waitForNextUpdate } = renderHook(() => useFetch(url));

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(new Error('404'));
    expect(mockFetch).toHaveBeenCalledWith(url, undefined);
  });
});
