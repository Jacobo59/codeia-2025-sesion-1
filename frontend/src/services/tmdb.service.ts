import { apiClient } from './api.client';
import type {
  PaginatedResponse,
  Movie,
  TVShow,
  Media,
  MovieDetails,
  TVShowDetails,
  CreditsResponse,
  VideosResponse,
  Genre,
  DiscoverOptions,
  SimilarMoviesResponse,
  SimilarTVShowsResponse,
} from '../types/tmdb.types';

// ============ Trending ============
export const getTrendingAll = async (timeWindow: 'day' | 'week' = 'day') => {
  return apiClient.get<PaginatedResponse<Media>>(`/trending/all/${timeWindow}`);
};

export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'day') => {
  return apiClient.get<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`);
};

export const getTrendingTV = async (timeWindow: 'day' | 'week' = 'day') => {
  return apiClient.get<PaginatedResponse<TVShow>>(`/trending/tv/${timeWindow}`);
};

// ============ Popular ============
export const getPopularMovies = async (page: number = 1) => {
  return apiClient.get<PaginatedResponse<Movie>>('/movie/popular', { page });
};

export const getPopularTVShows = async (page: number = 1) => {
  return apiClient.get<PaginatedResponse<TVShow>>('/tv/popular', { page });
};

// ============ Top Rated ============
export const getTopRatedMovies = async (page: number = 1) => {
  return apiClient.get<PaginatedResponse<Movie>>('/movie/top_rated', { page });
};

export const getTopRatedTVShows = async (page: number = 1) => {
  return apiClient.get<PaginatedResponse<TVShow>>('/tv/top_rated', { page });
};

// ============ Upcoming / On The Air ============
export const getUpcomingMovies = async (page: number = 1) => {
  return apiClient.get<PaginatedResponse<Movie>>('/movie/upcoming', { page });
};

export const getOnTheAirTVShows = async (page: number = 1) => {
  return apiClient.get<PaginatedResponse<TVShow>>('/tv/on_the_air', { page });
};

// ============ Discover ============
export const discoverMovies = async (options: DiscoverOptions = {}) => {
  return apiClient.get<PaginatedResponse<Movie>>(
    '/discover/movie',
    options as Record<string, string | number | boolean | undefined>
  );
};

export const discoverTVShows = async (options: DiscoverOptions = {}) => {
  return apiClient.get<PaginatedResponse<TVShow>>(
    '/discover/tv',
    options as Record<string, string | number | boolean | undefined>
  );
};

// ============ Details ============
export const getMovieDetails = async (id: number) => {
  return apiClient.get<MovieDetails>(`/movie/${id}`, {
    append_to_response: 'videos,credits,similar,recommendations',
  });
};

export const getTVShowDetails = async (id: number) => {
  return apiClient.get<TVShowDetails>(`/tv/${id}`, {
    append_to_response: 'videos,credits,similar,recommendations',
  });
};

// ============ Credits ============
export const getMovieCredits = async (id: number) => {
  return apiClient.get<CreditsResponse>(`/movie/${id}/credits`);
};

export const getTVShowCredits = async (id: number) => {
  return apiClient.get<CreditsResponse>(`/tv/${id}/credits`);
};

// ============ Videos ============
export const getMovieVideos = async (id: number) => {
  return apiClient.get<VideosResponse>(`/movie/${id}/videos`);
};

export const getTVShowVideos = async (id: number) => {
  return apiClient.get<VideosResponse>(`/tv/${id}/videos`);
};

// ============ Similar ============
export const getSimilarMovies = async (id: number, page: number = 1) => {
  return apiClient.get<SimilarMoviesResponse>(`/movie/${id}/similar`, { page });
};

export const getSimilarTVShows = async (id: number, page: number = 1) => {
  return apiClient.get<SimilarTVShowsResponse>(`/tv/${id}/similar`, { page });
};

// ============ Recommendations ============
export const getRecommendedMovies = async (id: number, page: number = 1) => {
  return apiClient.get<PaginatedResponse<Movie>>(`/movie/${id}/recommendations`, { page });
};

export const getRecommendedTVShows = async (id: number, page: number = 1) => {
  return apiClient.get<PaginatedResponse<TVShow>>(`/tv/${id}/recommendations`, { page });
};

// ============ Search ============
export const searchMulti = async (query: string, page: number = 1) => {
  return apiClient.get<PaginatedResponse<Media>>('/search/multi', { query, page });
};

export const searchMovies = async (query: string, page: number = 1) => {
  return apiClient.get<PaginatedResponse<Movie>>('/search/movie', { query, page });
};

export const searchTVShows = async (query: string, page: number = 1) => {
  return apiClient.get<PaginatedResponse<TVShow>>('/search/tv', { query, page });
};

export const searchPeople = async (query: string, page: number = 1) => {
  return apiClient.get<PaginatedResponse<Media>>('/search/person', { query, page });
};

// ============ Genres ============
export const getMovieGenres = async () => {
  return apiClient.get<{ genres: Genre[] }>('/genre/movie/list');
};

export const getTVGenres = async () => {
  return apiClient.get<{ genres: Genre[] }>('/genre/tv/list');
};

// Export all as a single service object for convenience
export const tmdbService = {
  // Trending
  getTrendingAll,
  getTrendingMovies,
  getTrendingTV,

  // Popular
  getPopularMovies,
  getPopularTVShows,

  // Top Rated
  getTopRatedMovies,
  getTopRatedTVShows,

  // Upcoming / On The Air
  getUpcomingMovies,
  getOnTheAirTVShows,

  // Discover
  discoverMovies,
  discoverTVShows,

  // Details
  getMovieDetails,
  getTVShowDetails,

  // Credits
  getMovieCredits,
  getTVShowCredits,

  // Videos
  getMovieVideos,
  getTVShowVideos,

  // Similar
  getSimilarMovies,
  getSimilarTVShows,

  // Recommendations
  getRecommendedMovies,
  getRecommendedTVShows,

  // Search
  searchMulti,
  searchMovies,
  searchTVShows,
  searchPeople,

  // Genres
  getMovieGenres,
  getTVGenres,
};
