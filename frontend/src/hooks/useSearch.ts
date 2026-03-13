import { useState, useEffect } from 'react';
import { searchMulti, searchMovies, searchTVShows, searchPeople } from '../services/tmdb.service';
import type { Media, Movie, TVShow } from '../types/tmdb.types';

// Debounce hook
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for multi search
export const useSearchMulti = (query: string, page: number = 1) => {
  const debouncedQuery = useDebounce(query);
  const [data, setData] = useState<Media[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await searchMulti(debouncedQuery, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to search'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, page]);

  return { data, loading, error };
};

// Hook for movie search
export const useSearchMovies = (query: string, page: number = 1) => {
  const debouncedQuery = useDebounce(query);
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await searchMovies(debouncedQuery, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to search movies'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, page]);

  return { data, loading, error };
};

// Hook for TV show search
export const useSearchTVShows = (query: string, page: number = 1) => {
  const debouncedQuery = useDebounce(query);
  const [data, setData] = useState<TVShow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await searchTVShows(debouncedQuery, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to search TV shows'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, page]);

  return { data, loading, error };
};

// Hook for people search
export const useSearchPeople = (query: string, page: number = 1) => {
  const debouncedQuery = useDebounce(query);
  const [data, setData] = useState<Media[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await searchPeople(debouncedQuery, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to search people'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, page]);

  return { data, loading, error };
};

// Hook for search history (local storage)
export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>(() => {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== query);
      return [query, ...filtered].slice(0, 10);
    });
  };

  const removeFromHistory = (query: string) => {
    setHistory((prev) => prev.filter((item) => item !== query));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addToHistory, removeFromHistory, clearHistory };
};
