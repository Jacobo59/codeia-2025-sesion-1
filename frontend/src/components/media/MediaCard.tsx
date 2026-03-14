import { Link } from 'react-router-dom';
import { IMAGE_SIZES, TMDB_CONFIG } from '../../lib/constants';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import type { Movie, TVShow, Media } from '../../types/tmdb.types';

interface MediaCardProps {
  media: Movie | TVShow | Media;
  size?: 'small' | 'medium' | 'large';
}

export const MediaCard = ({
  media,
  size = 'medium',
}: MediaCardProps) => {
  const title = 'title' in media ? media.title : media.name;
  const isMovie = 'title' in media;
  const type = isMovie ? 'movie' : 'tv';
  const linkUrl = `/${type}/${media.id}`;

  const imageSize = size === 'small' ? IMAGE_SIZES.POSTER_SMALL : size === 'large' ? IMAGE_SIZES.POSTER_XLARGE : IMAGE_SIZES.POSTER_MEDIUM;
  const posterUrl = media.poster_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${imageSize}${media.poster_path}`
    : null;

  return (
    <Link to={linkUrl} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="aspect-[2/3] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="aspect-[2/3] w-full flex items-center justify-center bg-muted text-muted-foreground">
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
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <path d="m7 7 10 10" />
              <path d="m17 7 10 10" />
            </svg>
          </div>
        )}

        {/* Rating Badge */}
        {media.vote_average > 0 && (
          <div className="absolute right-2 top-2 rounded-full px-2 py-1 text-xs font-semibold text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            {media.vote_average.toFixed(1)}
          </div>
        )}

        {/* Type Badge - Solo para resultados de búsqueda con media_type explícito */}
        {type && (
          <Badge variant="secondary" className="absolute left-2 top-2 text-xs">
            {type}
          </Badge>
        )}
      </div>
    </Link>
  );
};

// Skeleton component for loading state
export const MediaCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};
