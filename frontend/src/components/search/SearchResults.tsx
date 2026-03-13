import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { MediaCard } from '../media/MediaCard';
import { MediaGrid } from '../media/MediaGrid';
import { Badge } from '../ui/badge';
import type { Media } from '../../types/tmdb.types';

interface SearchResultsProps {
  query: string;
  results: Media[] | null;
  loading: boolean;
}

export const SearchResults = ({ query, results, loading }: SearchResultsProps) => {
  const [activeTab, setActiveTab] = useState('all');

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Searching...</p>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground text-lg">
          Start typing to search for movies, TV shows, and people
        </p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground text-lg">
          No results found for "{query}"
        </p>
      </div>
    );
  }

  const movies = results.filter((item) => item.media_type === 'movie');
  const tvShows = results.filter((item) => item.media_type === 'tv');
  const people = results.filter((item) => item.media_type === 'person');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4">
        <TabsTrigger value="all">All ({results.length})</TabsTrigger>
        <TabsTrigger value="movies">Movies ({movies.length})</TabsTrigger>
        <TabsTrigger value="tv">TV ({tvShows.length})</TabsTrigger>
        <TabsTrigger value="people">People ({people.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {results.map((item) => (
            <div key={`${item.media_type}-${item.id}`} className="relative">
              <MediaCard media={item} showYear={false} />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  {item.media_type === 'movie'
                    ? 'Movie'
                    : item.media_type === 'tv'
                    ? 'TV'
                    : 'Person'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="movies" className="mt-6">
        <MediaGrid items={movies} loading={false} />
      </TabsContent>

      <TabsContent value="tv" className="mt-6">
        <MediaGrid items={tvShows} loading={false} />
      </TabsContent>

      <TabsContent value="people" className="mt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {people.map((person) => (
            <div
              key={`person-${person.id}`}
              className="relative group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-muted">
                {person.profile_path ? (
                  <img
                    src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w185${person.profile_path}`}
                    alt={person.name}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-square w-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="mt-2 font-medium text-sm truncate group-hover:text-primary transition-colors">
                {person.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {person.known_for_department}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};