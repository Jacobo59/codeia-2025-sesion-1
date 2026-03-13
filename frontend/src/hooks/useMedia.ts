import { useState, useEffect } from 'react';
import {
  getTrendingAll,
  getTrendingMovies,
  getTrendingTV,
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getTopRatedTVShows,
  getUpcomingMovies,
  getOnTheAirTVShows,
  getMovieDetails,
  getTVShowDetails,
  getSimilarMovies,
  getSimilarTVShows,
  getRecommendedMovies,
  getRecommendedTVShows,
  getMovieCredits,
  getTVShowCredits,
  getMovieVideos,
  getTVShowVideos,
} from '../services/tmdb.service';
import type {
  Movie,
  TVShow,
  Media,
  MovieDetails,
  TVShowDetails,
  CreditsResponse,
  VideosResponse,
  TimeWindow,
} from '../types/tmdb.types';

// Hook for trending all content
export const useTrendingAll = (timeWindow: TimeWindow = 'day') => {
  const [data, setData] = useState<Media[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTrendingAll(timeWindow);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch trending'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeWindow]);

  return { data, loading, error };
};

// Hook for trending movies
export const useTrendingMovies = (timeWindow: TimeWindow = 'day') => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTrendingMovies(timeWindow);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch trending movies'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeWindow]);

  return { data, loading, error };
};

// Hook for trending TV shows
export const useTrendingTV = (timeWindow: TimeWindow = 'day') => {
  const [data, setData] = useState<TVShow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTrendingTV(timeWindow);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch trending TV shows'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeWindow]);

  return { data, loading, error };
};

// Hook for popular movies
export const usePopularMovies = (page: number = 1) => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPopularMovies(page);
        setData(response.results);
        setTotalPages(response.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch popular movies'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error, totalPages };
};

// Hook for popular TV shows
export const usePopularTVShows = (page: number = 1) => {
  const [data, setData] = useState<TVShow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPopularTVShows(page);
        setData(response.results);
        setTotalPages(response.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch popular TV shows'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error, totalPages };
};

// Hook for top rated movies
export const useTopRatedMovies = (page: number = 1) => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTopRatedMovies(page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch top rated movies'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error };
};

// Hook for top rated TV shows
export const useTopRatedTVShows = (page: number = 1) => {
  const [data, setData] = useState<TVShow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTopRatedTVShows(page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch top rated TV shows'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error };
};

// Hook for upcoming movies
export const useUpcomingMovies = (page: number = 1) => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUpcomingMovies(page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch upcoming movies'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error };
};

// Hook for on the air TV shows
export const useOnTheAirTVShows = (page: number = 1) => {
  const [data, setData] = useState<TVShow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getOnTheAirTVShows(page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch on the air TV shows'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, loading, error };
};

// Hook for movie details
export const useMovieDetails = (id: number | null) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMovieDetails(id);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch movie details'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};

// Hook for TV show details
export const useTVShowDetails = (id: number | null) => {
  const [data, setData] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTVShowDetails(id);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch TV show details'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};

// Hook for similar content
export const useSimilarMovies = (id: number | null, page: number = 1) => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSimilarMovies(id, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch similar movies'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  return { data, loading, error };
};

export const useSimilarTVShows = (id: number | null, page: number = 1) => {
  const [data, setData] = useState<TVShow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSimilarTVShows(id, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch similar TV shows'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  return { data, loading, error };
};

// Hook for recommended content
export const useRecommendedMovies = (id: number | null, page: number = 1) => {
  const [data, setData] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRecommendedMovies(id, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch recommended movies'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  return { data, loading, error };
};

export const useRecommendedTVShows = (id: number | null, page: number = 1) => {
  const [data, setData] = useState<TVShow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRecommendedTVShows(id, page);
        setData(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch recommended TV shows'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  return { data, loading, error };
};

// Hook for credits
export const useCredits = (type: 'movie' | 'tv', id: number | null) => {
  const [data, setData] = useState<CreditsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = type === 'movie'
          ? await getMovieCredits(id)
          : await getTVShowCredits(id);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch credits'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  return { data, loading, error };
};

// Hook for videos
export const useVideos = (type: 'movie' | 'tv', id: number | null) => {
  const [data, setData] = useState<VideosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = type === 'movie'
          ? await getMovieVideos(id)
          : await getTVShowVideos(id);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch videos'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  return { data, loading, error };
};
