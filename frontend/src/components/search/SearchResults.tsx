import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { MediaCard } from '../media/MediaCard';
import { Badge } from '../ui/badge';
import type { Media, Person } from '../../types/tmdb.types';

type SearchResultItem = Media | Person;

interface SearchResultsProps {
  query: string;
  results: SearchResultItem[] | null;
  loading: boolean;
}

// Type guard to check if item is a Person
const isPerson = (item: SearchResultItem): item is Person => {
  return 'profile_path' in item && 'known_for_department' in item;
};

// Type guard to get media_type
const getMediaType = (item: SearchResultItem): 'movie' | 'tv' | 'person' => {
  if (isPerson(item)) return 'person';
  return (item as Media).media_type || ('title' in item ? 'movie' : 'tv');
};

// Helper to render a person card
const PersonCard = ({ person }: { person: Person }) => {
  const imageUrl = person.profile_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w185${person.profile_path}`
    : null;

  return (
    <div className="relative group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
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
  );
};

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

  const movies = results.filter((item) => getMediaType(item) === 'movie');
  const tvShows = results.filter((item) => getMediaType(item) === 'tv');
  const people = results.filter((item) => getMediaType(item) === 'person');

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
            <div key={`${getMediaType(item)}-${item.id}`} className="relative">
              {isPerson(item) ? (
                <PersonCard person={item} />
              ) : (
                <>
                  <MediaCard media={item} />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {getMediaType(item) === 'movie'
                        ? 'Movie'
                        : getMediaType(item) === 'tv'
                        ? 'TV'
                        : 'Person'}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="movies" className="mt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((item) => (
            <div key={`${getMediaType(item)}-${item.id}`}>
              <MediaCard media={item as Media} />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="tv" className="mt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {tvShows.map((item) => (
            <div key={`${getMediaType(item)}-${item.id}`}>
              <MediaCard media={item as Media} />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="people" className="mt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {people.map((item) => (
            <div key={`${getMediaType(item)}-${item.id}`}>
              <PersonCard person={item as Person} />
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};