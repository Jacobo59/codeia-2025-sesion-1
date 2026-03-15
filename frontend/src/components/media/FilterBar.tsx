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
  { value: 'popularity.desc', label: 'Popularidad (mayor a menor)' },
  { value: 'popularity.asc', label: 'Popularidad (menor a mayor)' },
  { value: 'vote_average.desc', label: 'Valoración (mayor a menor)' },
  { value: 'vote_average.asc', label: 'Valoración (menor a mayor)' },
  { value: 'release_date.desc', label: 'Fecha de estreno (más recientes)' },
  { value: 'release_date.asc', label: 'Fecha de estreno (más antiguos)' },
  { value: 'title.asc', label: 'Título (A-Z)' },
  { value: 'title.desc', label: 'Título (Z-A)' },
];

const MOVIE_GENRES: SelectOption[] = [
  { value: '', label: 'Todos los géneros' },
  { value: '28', label: 'Acción' },
  { value: '12', label: 'Aventura' },
  { value: '16', label: 'Animación' },
  { value: '35', label: 'Comedia' },
  { value: '80', label: 'Crimen' },
  { value: '99', label: 'Documental' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Familia' },
  { value: '14', label: 'Fantasía' },
  { value: '36', label: 'Historia' },
  { value: '27', label: 'Terror' },
  { value: '10402', label: 'Música' },
  { value: '9648', label: 'Misterio' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Ciencia Ficción' },
  { value: '10770', label: 'Película de TV' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'Guerra' },
  { value: '37', label: 'Western' },
];

const TV_GENRES: SelectOption[] = [
  { value: '', label: 'Todos los géneros' },
  { value: '10759', label: 'Acción y Aventura' },
  { value: '16', label: 'Animación' },
  { value: '35', label: 'Comedia' },
  { value: '80', label: 'Crimen' },
  { value: '99', label: 'Documental' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Familia' },
  { value: '10762', label: 'Niños' },
  { value: '9648', label: 'Misterio' },
  { value: '10763', label: 'Noticias' },
  { value: '10764', label: 'Reality' },
  { value: '10765', label: 'Ciencia Ficción y Fantasía' },
  { value: '10766', label: 'Culebrón' },
  { value: '10767', label: 'Talk Show' },
  { value: '10768', label: 'Guerra y Política' },
  { value: '37', label: 'Western' },
];

const RATING_OPTIONS: SelectOption[] = [
  { value: '', label: 'Todas las valoraciones' },
  { value: '9', label: '9+ Estrellas' },
  { value: '8', label: '8+ Estrellas' },
  { value: '7', label: '7+ Estrellas' },
  { value: '6', label: '6+ Estrellas' },
  { value: '5', label: '5+ Estrellas' },
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
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Limpiar todo
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.genre && (
            <Badge variant="outline" className="gap-1">
              Género: {MOVIE_GENRES.find(g => g.value === filters.genre)?.label || TV_GENRES.find(g => g.value === filters.genre)?.label}
              <button onClick={() => handleFilterChange('genre', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.year && (
            <Badge variant="outline" className="gap-1">
              Año: {filters.year}
              <button onClick={() => handleFilterChange('year', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.rating && (
            <Badge variant="outline" className="gap-1">
              Valoración: {filters.rating}+
              <button onClick={() => handleFilterChange('rating', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.sortBy && (
            <Badge variant="outline" className="gap-1">
              Ordenar: {SORT_OPTIONS.find(s => s.value === filters.sortBy)?.label}
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
            <label className="text-sm font-medium">Género</label>
            <Select
              options={type === 'movie' ? MOVIE_GENRES : TV_GENRES}
              placeholder="Todos los géneros"
              value={filters.genre || ''}
              onChange={(value) => handleFilterChange('genre', value)}
            />
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Año</label>
            <Select
              options={[{ value: '', label: 'Todos los años' }, ...YEARS]}
              placeholder="Todos los años"
              value={filters.year || ''}
              onChange={(value) => handleFilterChange('year', value)}
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Valoración mínima</label>
            <Select
              options={RATING_OPTIONS}
              placeholder="Todas las valoraciones"
              value={filters.rating || ''}
              onChange={(value) => handleFilterChange('rating', value)}
            />
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ordenar por</label>
            <Select
              options={[{ value: '', label: 'Por defecto' }, ...SORT_OPTIONS]}
              placeholder="Por defecto"
              value={filters.sortBy || ''}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
