import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/search/SearchBar';
import { SearchResults } from '../components/search/SearchResults';
import { useSearchMulti, useSearchHistory } from '../hooks/useSearch';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: results, loading } = useSearchMulti(query);
  const { history, addToHistory, removeFromHistory } = useSearchHistory();

  useEffect(() => {
    if (query && !history.includes(query)) {
      addToHistory(query);
    }
  }, [query, history, addToHistory]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Search</h1>
          <p className="text-muted-foreground">
            Find your favorite movies, TV shows, and people
          </p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        {!query && history.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {history.map((item) => (
                <button
                  key={item}
                  onClick={() => (window.location.href = `/search?q=${encodeURIComponent(item)}`)}
                  className="px-3 py-1.5 rounded-full bg-muted hover:bg-accent text-sm transition-colors flex items-center gap-2"
                >
                  {item}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(item);
                    }}
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        <SearchResults query={query} results={results} loading={loading} />
      </div>
    </div>
  );
};