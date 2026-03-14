import { useState } from 'react';
import { Select, type SelectOption } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, Filter } from 'lucide-react';

export interface FilterOptions {
  genre?: string;
  year?: string;
  sortBy?: string;
  rating?: string;
}

export interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  type: 'movie' | 'tv';
}

const SORT_OPTIONS: SelectOption[] = [
  { value: 'popularity.desc', label: 'Popularity (High to Low)' },
  { value: 'popularity.asc', label: 'Popularity (Low to High)' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'vote_average.asc', label: 'Rating (Low to High)' },
  { value: 'release_date.desc', label: 'Release Date (Newest)' },
  { value: 'release_date.asc', label: 'Release Date (Oldest)' },
  { value: 'title.asc', label: 'Title (A-Z)' },
  { value: 'title.desc', label: 'Title (Z-A)' },
];

const MOVIE_GENRES: SelectOption[] = [
  { value: '', label: 'All Genres' },
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '10770', label: 'TV Movie' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

const TV_GENRES: SelectOption[] = [
  { value: '', label: 'All Genres' },
  { value: '10759', label: 'Action & Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '10762', label: 'Kids' },
  { value: '9648', label: 'Mystery' },
  { value: '10763', label: 'News' },
  { value: '10764', label: 'Reality' },
  { value: '10765', label: 'Sci-Fi & Fantasy' },
  { value: '10766', label: 'Soap' },
  { value: '10767', label: 'Talk' },
  { value: '10768', label: 'War & Politics' },
  { value: '37', label: 'Western' },
];

const RATING_OPTIONS: SelectOption[] = [
  { value: '', label: 'All Ratings' },
  { value: '9', label: '9+ Stars' },
  { value: '8', label: '8+ Stars' },
  { value: '7', label: '7+ Stars' },
  { value: '6', label: '6+ Stars' },
  { value: '5', label: '5+ Stars' },
];

const YEARS = Array.from({ length: 50 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
}).map((item) => ({ value: item.value, label: item.value }));

export const FilterBar = ({ filters, onFilterChange, onReset, type }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.genre && (
            <Badge variant="outline" className="gap-1">
              Genre: {MOVIE_GENRES.find(g => g.value === filters.genre)?.label || TV_GENRES.find(g => g.value === filters.genre)?.label}
              <button onClick={() => handleFilterChange('genre', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.year && (
            <Badge variant="outline" className="gap-1">
              Year: {filters.year}
              <button onClick={() => handleFilterChange('year', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.rating && (
            <Badge variant="outline" className="gap-1">
              Rating: {filters.rating}+
              <button onClick={() => handleFilterChange('rating', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.sortBy && (
            <Badge variant="outline" className="gap-1">
              Sort: {SORT_OPTIONS.find(s => s.value === filters.sortBy)?.label}
              <button onClick={() => handleFilterChange('sortBy', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Filter Options */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/30">
          {/* Genre Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Genre</label>
            <Select
              options={type === 'movie' ? MOVIE_GENRES : TV_GENRES}
              placeholder="All Genres"
              value={filters.genre || ''}
              onChange={(value) => handleFilterChange('genre', value)}
            />
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <Select
              options={[{ value: '', label: 'All Years' }, ...YEARS]}
              placeholder="All Years"
              value={filters.year || ''}
              onChange={(value) => handleFilterChange('year', value)}
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Rating</label>
            <Select
              options={RATING_OPTIONS}
              placeholder="All Ratings"
              value={filters.rating || ''}
              onChange={(value) => handleFilterChange('rating', value)}
            />
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select
              options={[{ value: '', label: 'Default' }, ...SORT_OPTIONS]}
              placeholder="Default"
              value={filters.sortBy || ''}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
