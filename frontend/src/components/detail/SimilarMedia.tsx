import { MediaCard } from '../media/MediaCard';
import type { Movie, TVShow } from '../../types/tmdb.types';

interface SimilarMediaProps {
  title: string;
  items: Movie[] | TVShow[] | null;
  loading?: boolean;
}

export const SimilarMedia = ({ title, items, loading }: SimilarMediaProps) => {
  if (loading) {
    return (
      <div className="py-8">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[2/3] w-full rounded-lg bg-muted animate-pulse" />
              <div className="mt-2 space-y-2">
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
};
