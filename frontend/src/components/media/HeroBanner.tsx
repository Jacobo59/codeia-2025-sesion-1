import { Link } from 'react-router-dom';
import { IMAGE_SIZES, TMDB_CONFIG } from '../../lib/constants';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import type { Movie, TVShow, Media } from '../../types/tmdb.types';

interface HeroBannerProps {
  media: Movie | TVShow | Media | null | undefined;
  loading?: boolean;
}

export const HeroBanner = ({ media, loading = false }: HeroBannerProps) => {
  if (loading || !media) {
    return (
      <div className="relative h-[60vh] md:h-[70vh] w-full bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  const title = 'title' in media ? media.title : media.name;
  const overview = media.overview;
  const date = 'release_date' in media ? media.release_date : media.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const hasMediaType = 'media_type' in media && media.media_type;
  const type = hasMediaType ? media.media_type : ('title' in media ? 'movie' : 'tv');
  const linkUrl = type === 'movie' ? `/movie/${media.id}` : `/tv/${media.id}`;

  const backdropUrl = media.backdrop_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.BACKDROP_LARGE}${media.backdrop_path}`
    : null;

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black">
      {/* Background Image */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12 md:pb-20">
        <div className="max-w-2xl space-y-4">
          {/* Type Badge */}
          <Badge variant="secondary" className="mb-2">
            {type === 'movie' ? 'Película' : 'Serie'}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {media.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-300">{year}</span>
          </div>

          {/* Overview */}
          <p className="text-gray-200 text-base md:text-lg line-clamp-3">
            {overview || 'No hay descripción disponible.'}
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link to={linkUrl}>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Reproducir
              </Button>
            </Link>
            <Link to={linkUrl}>
              <Button size="lg" variant="outline" className="text-white border-gray-400 hover:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Más información
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
