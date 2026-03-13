// TMDB Configuration
export const TMDB_CONFIG = {
  BASE_URL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
} as const;

// Image sizes for TMDB
export const IMAGE_SIZES = {
  POSTER_SMALL: 'w92',
  POSTER_MEDIUM: 'w154',
  POSTER_LARGE: 'w342',
  POSTER_XLARGE: 'w500',
  POSTER_ORIGINAL: 'original',
  BACKDROP_SMALL: 'w300',
  BACKDROP_MEDIUM: 'w780',
  BACKDROP_LARGE: 'w1280',
  BACKDROP_ORIGINAL: 'original',
} as const;

// Media types
export const MEDIA_TYPE = {
  MOVIE: 'movie',
  TV: 'tv',
  PERSON: 'person',
} as const;

// Time windows for trending
export const TIME_WINDOW = {
  DAY: 'day',
  WEEK: 'week',
} as const;

// Default pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
} as const;
