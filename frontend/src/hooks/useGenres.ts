import { useState, useEffect } from 'react';
import { getMovieGenres, getTVGenres } from '../services/tmdb.service';
import type { Genre } from '../types/tmdb.types';

// Hook for movie genres
export const useMovieGenres = () => {
  const [data, setData] = useState<Genre[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMovieGenres();
        setData(response.genres);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch movie genres'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook for TV genres
export const useTVGenres = () => {
  const [data, setData] = useState<Genre[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTVGenres();
        setData(response.genres);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch TV genres'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook to get genre name by ID
export const useGenreName = (genres: Genre[] | null, genreId: number | undefined): string => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (genres && genreId !== undefined) {
      const genre = genres.find((g) => g.id === genreId);
      setName(genre?.name || '');
    }
  }, [genres, genreId]);

  return name;
};

// Hook for all genres (movies and TV)
export const useAllGenres = () => {
  const movieGenres = useMovieGenres();
  const tvGenres = useTVGenres();

  const loading = movieGenres.loading || tvGenres.loading;
  const error = movieGenres.error || tvGenres.error;

  // Combine unique genres
  const allGenres = movieGenres.data && tvGenres.data
    ? Array.from(
        new Map(
          [...movieGenres.data, ...tvGenres.data].map((genre) => [genre.id, genre])
        ).values()
      )
    : null;

  return { data: allGenres, loading, error };
};
