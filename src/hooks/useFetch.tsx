import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
  data?: T;
  isLoading: boolean;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

interface UseFetchOptions extends RequestInit {
  search?: string;
}

function useFetch<T = unknown>(url?: string, options?: UseFetchOptions, wait = false): State<T> {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const { search = '' } = options || {};
  const searchParts = search.split('=');
  const fullUrl =
    searchParts.length == 2 && searchParts[1].trim().length > 0 ? `${url}?${search}` : url;

  const initialState: State<T> = {
    isLoading: false,
    error: undefined,
    data: undefined
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...state, isLoading: true };
      case 'fetched':
        return { ...state, isLoading: false, data: action.payload };
      case 'error':
        return { ...state, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!fullUrl || wait) {
      return;
    }

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      if (cache.current[fullUrl]) {
        dispatch({ type: 'fetched', payload: cache.current[fullUrl] });
        return;
      }

      try {
        const response = await fetch(fullUrl, options);

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[fullUrl] = data;

        if (cancelRequest.current) {
          return;
        }

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) {
          return;
        }

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [fullUrl]);

  return state;
}

export default useFetch;
