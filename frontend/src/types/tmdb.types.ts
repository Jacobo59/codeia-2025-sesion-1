// Media Types
export type MediaType = 'movie' | 'tv' | 'person';
export type TimeWindow = 'day' | 'week';

// Movie Interface
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}

// TV Show Interface
export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
}

// Person Interface
export interface Person {
  id: number;
  name: string;
  known_for_department: string;
  known_for: Movie[];
  profile_path: string | null;
  popularity: number;
  adult: boolean;
}

// Unified Media Interface
export interface Media {
  id: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
}

// Detailed Movie Interface
export interface MovieDetails extends Movie {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  videos: VideosResponse;
  credits: CreditsResponse;
  similar: SimilarMoviesResponse;
}

// Detailed TV Show Interface
export interface TVShowDetails extends TVShow {
  created_by: Creator[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  production_companies: ProductionCompany[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  videos: VideosResponse;
  credits: CreditsResponse;
  similar: SimilarTVShowsResponse;
}

// Collection Interface
export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Genre Interface
export interface Genre {
  id: number;
  name: string;
}

// Production Company Interface
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// Production Country Interface
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Spoken Language Interface
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Creator Interface
export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
  credit_id: string;
}

// Network Interface
export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// Season Interface
export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

// Paginated Response Interface
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Cast Interface
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  cast_id: number;
  credit_id: string;
}

// Crew Interface
export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  credit_id: string;
}

// Credits Response Interface
export interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// Video Interface
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

// Videos Response Interface
export interface VideosResponse {
  id: number;
  results: Video[];
}

// Similar Movies Response
export interface SimilarMoviesResponse extends PaginatedResponse<Movie> {}

// Similar TV Shows Response
export interface SimilarTVShowsResponse extends PaginatedResponse<TVShow> {}

// Discover Options Interface
export interface DiscoverOptions {
  page?: number;
  with_genres?: string;
  sort_by?: string;
  with_original_language?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
}
