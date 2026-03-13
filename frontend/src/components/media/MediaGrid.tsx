import { MediaCard, MediaCardSkeleton } from './MediaCard';
import type { Movie, TVShow, Media } from '../../types/tmdb.types';

interface MediaGridProps {
  items: Movie[] | TVShow[] | Media[] | null | undefined;
  loading?: boolean;
  skeletonCount?: number;
  title?: string;
}

export const MediaGrid = ({
  items,
  loading = false,
  skeletonCount = 8,
  title,
}: MediaGridProps) => {
  if (loading) {
    return (
      <div>
        {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <MediaCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">No results found</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
};
