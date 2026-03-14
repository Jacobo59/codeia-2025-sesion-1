# TMDB API Endpoints

## Base Configuration

```typescript
// Base URL
const BASE_URL = 'https://api.themoviedb.org/3';

// Image Base URL
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image Sizes
const IMAGE_SIZES = {
  POSTER_SMALL: 'w92',
  POSTER_MEDIUM: 'w154',
  POSTER_LARGE: 'w342',
  POSTER_XLARGE: 'w500',
  POSTER_ORIGINAL: 'original',
  BACKDROP_SMALL: 'w300',
  BACKDROP_MEDIUM: 'w780',
  BACKDROP_LARGE: 'w1280',
  BACKDROP_ORIGINAL: 'original',
};
```

## Authentication

Todos los endpoints requieren un `api_key` en los query parameters.

```typescript
// Example
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&page=1
```

---

## Trending

### Get Trending All
```typescript
GET /trending/all/{time_window}

// time_window: 'day' | 'week'

// Response
{
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}
```

### Get Trending Movies
```typescript
GET /trending/movie/{time_window}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Get Trending TV Shows
```typescript
GET /trending/tv/{time_window}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

---

## Popular

### Get Popular Movies
```typescript
GET /movie/popular?page={page}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Get Popular TV Shows
```typescript
GET /tv/popular?page={page}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

---

## Top Rated

### Get Top Rated Movies
```typescript
GET /movie/top_rated?page={page}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Get Top Rated TV Shows
```typescript
GET /tv/top_rated?page={page}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

---

## Upcoming / On The Air

### Get Upcoming Movies
```typescript
GET /movie/upcoming?page={page}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Get On The Air TV Shows
```typescript
GET /tv/on_the_air?page={page}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

---

## Discover

### Discover Movies
```typescript
GET /discover/movie?{params}

// Query Parameters
{
  page?: number;
  with_genres?: string;          // comma-separated genre IDs
  sort_by?: string;              // 'popularity.asc', 'vote_average.desc', etc.
  with_original_language?: string; // ISO 639-1 code (e.g., 'en', 'es')
  vote_average_gte?: number;     // minimum vote average
  vote_average_lte?: number;     // maximum vote average
  'primary_release_date.gte'?: string; // minimum release date (YYYY-MM-DD)
  'primary_release_date.lte'?: string; // maximum release date (YYYY-MM-DD)
}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Discover TV Shows
```typescript
GET /discover/tv?{params}

// Query Parameters
{
  page?: number;
  with_genres?: string;
  sort_by?: string;
  with_original_language?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

---

## Details

### Get Movie Details
```typescript
GET /movie/{id}?append_to_response={append}

// append_to_response: 'videos,credits,similar,recommendations'

// Response
{
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
  budget: number;
  revenue: number;
  runtime: number;
  genres: Genre[];
  videos: VideosResponse;
  credits: CreditsResponse;
  similar: SimilarMoviesResponse;
  recommendations: RecommendationsResponse;
}
```

### Get TV Show Details
```typescript
GET /tv/{id}?append_to_response={append}

// Response
{
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
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  videos: VideosResponse;
  credits: CreditsResponse;
  similar: SimilarTVShowsResponse;
  recommendations: RecommendationsResponse;
}
```

---

## Credits

### Get Movie Credits
```typescript
GET /movie/{id}/credits

// Response
{
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// Cast Item
{
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

// Crew Item
{
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}
```

### Get TV Show Credits
```typescript
GET /tv/{id}/credits

// Response
{
  id: number;
  cast: Cast[];
  crew: Crew[];
}
```

---

## Videos

### Get Movie Videos
```typescript
GET /movie/{id}/videos

// Response
{
  id: number;
  results: Video[];
}

// Video Item
{
  id: string;
  key: string;
  name: string;
  site: string; // 'YouTube'
  type: string; // 'Trailer', 'Teaser', 'Clip', 'Featurette'
  official: boolean;
  published_at: string;
}
```

### Get TV Show Videos
```typescript
GET /tv/{id}/videos

// Response
{
  id: number;
  results: Video[];
}
```

---

## Similar

### Get Similar Movies
```typescript
GET /movie/{id}/similar?page={page}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Get Similar TV Shows
```typescript
GET /tv/{id}/similar?page={page}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

---

## Recommendations

### Get Movie Recommendations
```typescript
GET /movie/{id}/recommendations?page={page}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Get TV Show Recommendations
```typescript
GET /tv/{id}/recommendations?page={page}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

---

## Search

### Multi Search
```typescript
GET /search/multi?query={query}&page={page}

// Response
{
  page: number;
  results: Media[]; // Can include movies, TV shows, and people
  total_pages: number;
  total_results: number;
}
```

### Search Movies
```typescript
GET /search/movie?query={query}&page={page}

// Response
{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### Search TV Shows
```typescript
GET /search/tv?query={query}&page={page}

// Response
{
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
```

### Search People
```typescript
GET /search/person?query={query}&page={page}

// Response
{
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}

// Person Item
{
  id: number;
  name: string;
  known_for_department: string;
  known_for: Movie[];
  profile_path: string | null;
  popularity: number;
}
```

---

## Genres

### Get Movie Genres
```typescript
GET /genre/movie/list

// Response
{
  genres: Genre[];
}

// Genre Item
{
  id: number;
  name: string;
}
```

### Get TV Genres
```typescript
GET /genre/tv/list

// Response
{
  genres: Genre[];
}
```

---

## Common Filter Options

### Sort By Values
- `popularity.asc` - Least popular first
- `popularity.desc` - Most popular first
- `vote_average.asc` - Lowest rated first
- `vote_average.desc` - Highest rated first
- `vote_count.asc` - Fewest votes first
- `vote_count.desc` - Most votes first
- `release_date.asc` - Oldest release first
- `release_date.desc` - Newest release first
- `original_title.asc` - Alphabetical A-Z
- `original_title.desc` - Alphabetical Z-A

### Genre IDs (Common)
- Action: 28
- Adventure: 12
- Animation: 16
- Comedy: 35
- Crime: 80
- Documentary: 99
- Drama: 18
- Family: 10751
- Fantasy: 14
- History: 36
- Horror: 27
- Music: 10402
- Mystery: 9648
- Romance: 10749
- Science Fiction: 878
- TV Movie: 10770
- Thriller: 53
- War: 10752
- Western: 37

### Language Codes
- `en` - English
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `ja` - Japanese
- `ko` - Korean
- `zh` - Chinese
- `pt` - Portuguese
- `ru` - Russian

---

## Rate Limiting

- **Request Limit**: 40 requests per 10 seconds per IP address
- **Recommended**: Implement debounce and caching to avoid rate limiting
- **Error Response**: When rate limited, you'll receive a 429 status code

---

## Error Responses

### 401 Unauthorized
```json
{
  "status_code": 7,
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false
}
```

### 404 Not Found
```json
{
  "status_code": 34,
  "status_message": "The resource you requested could not be found.",
  "success": false
}
```

### 429 Too Many Requests
```json
{
  "status_code": 25,
  "status_message": "Your request count (41) is over the allowed limit of (40).",
  "success": false
}
```

---

## Image URL Construction

```typescript
// Construct image URL
const posterUrl = `${IMAGE_BASE_URL}${IMAGE_SIZES.POSTER_XLARGE}${poster_path}`;

// Example
// https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg
```

---

## Notes

- All dates are in ISO 8601 format: `YYYY-MM-DD`
- All ratings are on a scale of 0 to 10
- Pagination starts at page 1
- Results per page: 20 (default), maximum 100 per request
- Images may be `null` if not available
