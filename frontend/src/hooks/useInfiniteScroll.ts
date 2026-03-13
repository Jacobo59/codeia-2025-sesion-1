import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = (
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 100, rootMargin = '0px' } = options;
  const [isFetching, setIsFetching] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching) {
        setIsFetching(true);
      }
    },
    [isFetching]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      rootMargin,
      threshold,
    });

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleScroll, rootMargin, threshold]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      try {
        await callback();
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [isFetching, callback]);

  return { isFetching, observerTarget };
};

// Hook for infinite pagination
interface InfinitePaginationOptions<T> {
  fetchPage: (page: number) => Promise<T[]>;
  initialPage?: number;
  pageSize?: number;
}

export const useInfinitePagination = <T,>({
  fetchPage,
  initialPage = 1,
  pageSize = 20,
}: InfinitePaginationOptions<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const newData = await fetchPage(page);

      if (newData.length < pageSize) {
        setHasMore(false);
      }

      setData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more data'));
    } finally {
      setLoading(false);
    }
  }, [fetchPage, page, pageSize, loading, hasMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
    setLoading(true);
  }, [initialPage]);

  useEffect(() => {
    loadMore();
  }, []);

  return { data, loading, error, hasMore, loadMore, reset };
};
