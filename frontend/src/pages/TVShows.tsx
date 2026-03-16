import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MediaGrid } from '../components/media/MediaGrid';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { FilterBar, type FilterOptions } from '../components/media/FilterBar';
import { usePopularTVShows, useTopRatedTVShows, useOnTheAirTVShows, useAiringTodayTVShows, useDiscoverTVShows } from '../hooks/useMedia';

// Genre mapping for TV shows
const TV_GENRE_NAMES: Record<string, string> = {
  '10759': 'Acción',
  '16': 'Animación',
  '35': 'Comedia',
  '80': 'Crimen',
  '99': 'Documental',
  '18': 'Drama',
  '10751': 'Familia',
  '10762': 'Infantil',
  '9648': 'Misterio',
  '10763': 'Noticias',
  '10764': 'Reality',
  '10765': 'Telenovela',
  '10766': 'Talk Show',
  '10767': 'Concursos',
  '10768': 'Película',
  '10769': 'Ciencia Ficción',
  '10770': 'Thriller',
  '37': 'Western'
};

export const TVShows = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'popular');
  const genre = searchParams.get('genre') || undefined;
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({ genre });

  // Get genre name for title
  const genreName = useMemo(() => {
    return genre ? TV_GENRE_NAMES[genre] : null;
  }, [genre]);

  // Get title and description based on active tab
  const getTitle = () => {
    if (genreName) return `Series de ${genreName}`;
    switch (activeTab) {
      case 'popular': return 'Series Populares';
      case 'top-rated': return 'Series Mejor Valoradas';
      case 'on-the-air': return 'Series En Emisión';
      case 'airing-today': return 'Series Hoy en Día';
      default: return 'Series';
    }
  };

  const getDescription = () => {
    if (genreName) return `Descubre y explora las mejores series de ${genreName}`;
    switch (activeTab) {
      case 'popular': return 'Descubre las series más populares del momento';
      case 'top-rated': return 'Explora las series mejor valoradas por el público';
      case 'on-the-air': return 'Las series que se están emitiendo actualmente';
      case 'airing-today': return 'Series que se emiten hoy';
      default: return 'Descubre y explora las mejores series';
    }
  };

  // Sync activeTab with URL query parameter
  useEffect(() => {
    const tab = searchParams.get('tab') || 'popular';
    setActiveTab(tab);
  }, [searchParams]);

  const { data: popularTVShows, loading: popularLoading } = usePopularTVShows(page);
  const { data: topRatedTVShows, loading: topRatedLoading } = useTopRatedTVShows(page);
  const { data: onTheAirTVShows, loading: onTheAirLoading } = useOnTheAirTVShows(page);
  const { data: airingTodayTVShows, loading: airingTodayLoading } = useAiringTodayTVShows(page);

  // Use discover endpoint when genre is selected
  const { data: discoverTVShows, loading: discoverLoading } = useDiscoverTVShows(genre, page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFilters({});
    setPage(1);
  };

  // Note: In production, you would use the filters with the discover endpoint
  const applyFilters = (items: any[] | null) => {
    if (!items) return items;

    let filtered = [...items];

    if (filters.genre) {
      filtered = filtered.filter(item => item.genre_ids?.includes(parseInt(filters.genre!, 10)));
    }

    if (filters.year) {
      filtered = filtered.filter(item => {
        const year = new Date(item.first_air_date).getFullYear();
        return year === parseInt(filters.year!, 10);
      });
    }

    if (filters.rating) {
      filtered = filtered.filter(item => item.vote_average >= parseFloat(filters.rating!));
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const [sortField, sortOrder] = filters.sortBy!.split('.');
        const multiplier = sortOrder === 'desc' ? -1 : 1;

        switch (sortField) {
          case 'popularity':
            return (a.popularity - b.popularity) * multiplier;
          case 'vote_average':
            return (a.vote_average - b.vote_average) * multiplier;
          case 'release_date':
            return (new Date(a.first_air_date).getTime() - new Date(b.first_air_date).getTime()) * multiplier;
          case 'title':
            return (a.name.localeCompare(b.name)) * multiplier;
          default:
            return 0;
        }
      });
    }

    return filtered;
  };

  const filteredPopularTVShows = applyFilters(popularTVShows);
  const filteredTopRatedTVShows = applyFilters(topRatedTVShows);
  const filteredOnTheAirTVShows = applyFilters(onTheAirTVShows);
  const filteredAiringTodayTVShows = applyFilters(airingTodayTVShows);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{getTitle()}</h1>
          <p className="text-muted-foreground">{getDescription()}</p>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleReset}
          type="tv"
        />

        {/* Show genre-specific TV shows when genre is selected */}
        {genre ? (
          <>
            <MediaGrid items={discoverTVShows} loading={discoverLoading} />
            {discoverTVShows && discoverTVShows.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={500}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setPage(1); }}>
            <TabsList className="mb-6">
              <TabsTrigger value="popular">Populares</TabsTrigger>
              <TabsTrigger value="top-rated">Mejor valoradas</TabsTrigger>
              <TabsTrigger value="on-the-air">En emisión</TabsTrigger>
              <TabsTrigger value="airing-today">Hoy en día</TabsTrigger>
            </TabsList>

            <TabsContent value="popular">
              <MediaGrid items={filteredPopularTVShows} loading={popularLoading} />
              {filteredPopularTVShows && filteredPopularTVShows.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(10000 / 20)}
                  onPageChange={handlePageChange}
                />
              )}
            </TabsContent>

            <TabsContent value="top-rated">
              <MediaGrid items={filteredTopRatedTVShows} loading={topRatedLoading} />
              {filteredTopRatedTVShows && filteredTopRatedTVShows.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(10000 / 20)}
                  onPageChange={handlePageChange}
                />
              )}
            </TabsContent>

            <TabsContent value="on-the-air">
              <MediaGrid items={filteredOnTheAirTVShows} loading={onTheAirLoading} />
              {filteredOnTheAirTVShows && filteredOnTheAirTVShows.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(500 / 20)}
                  onPageChange={handlePageChange}
                />
              )}
            </TabsContent>

            <TabsContent value="airing-today">
              <MediaGrid items={filteredAiringTodayTVShows} loading={airingTodayLoading} />
              {filteredAiringTodayTVShows && filteredAiringTodayTVShows.length > 0 && (
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(500 / 20)}
                  onPageChange={handlePageChange}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
  const pages = getVisiblePages(currentPage, totalPages, 5);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md border border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      {pages.map((page, i) => (
        <span key={i}>
          {page === '...' ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 rounded-md border ${
                currentPage === page
                  ? 'bg-primary text-primary-foreground'
                  : 'border-input hover:bg-accent'
              }`}
            >
              {page}
            </button>
          )}
        </span>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md border border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>
  );
};

const getVisiblePages = (currentPage: number, totalPages: number, maxVisible: number) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const half = Math.floor(maxVisible / 2);

  if (currentPage <= half) {
    for (let i = 1; i <= maxVisible; i++) pages.push(i);
    pages.push('...');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - half) {
    pages.push(1);
    pages.push('...');
    for (let i = totalPages - maxVisible + 2; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push('...');
    for (let i = currentPage - half + 1; i <= currentPage + half - 1; i++) pages.push(i);
    pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};
