import { useParams } from 'react-router-dom';
import { IMAGE_SIZES, TMDB_CONFIG } from '../lib/constants';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { CastSection } from '../components/detail/CastSection';
import { SimilarMedia } from '../components/detail/SimilarMedia';
import { VideoPlayer } from '../components/detail/VideoPlayer';
import { useMovieDetails, useTVShowDetails, useCredits, useVideos } from '../hooks/useMedia';
import type { MovieDetails, TVShowDetails } from '../types/tmdb.types';

export const MediaDetail = () => {
  const { type, id } = useParams<{ type: 'movie' | 'tv'; id: string }>();
  const mediaId = id ? parseInt(id, 10) : null;

  const { data: movieDetails, loading: movieLoading } = useMovieDetails(mediaId);
  const { data: tvDetails, loading: tvLoading } = useTVShowDetails(mediaId);
  const { data: credits, loading: creditsLoading } = useCredits(type as 'movie' | 'tv', mediaId);
  const { data: videos, loading: videosLoading } = useVideos(type as 'movie' | 'tv', mediaId);

  const isMovie = type === 'movie';
  const details = isMovie ? movieDetails : tvDetails;
  const loading = movieLoading || tvLoading;

  if (!mediaId || !type) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Invalid media ID or type</p>
      </div>
    );
  }

  if (loading || !details) {
    return <DetailSkeleton />;
  }

  const title = isMovie ? (details as MovieDetails).title : (details as TVShowDetails).name;
  const backdropUrl = details.backdrop_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.BACKDROP_LARGE}${details.backdrop_path}`
    : null;
  const posterUrl = details.poster_path
    ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.POSTER_XLARGE}${details.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="relative h-[50vh] md:h-[60vh]">
          <img
            src={backdropUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="hidden md:block">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={title}
                className="w-full rounded-lg shadow-2xl"
              />
            ) : (
              <div className="aspect-[2/3] w-full rounded-lg bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No poster available</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {details.vote_average.toFixed(1)}
                </span>
                <span>•</span>
                <span>
                  {isMovie
                    ? (details as MovieDetails).release_date?.split('-')[0] || 'N/A'
                    : (details as TVShowDetails).first_air_date?.split('-')[0] || 'N/A'}
                </span>
                <span>•</span>
                {isMovie && (
                  <span>{(details as MovieDetails).runtime} min</span>
                )}
                {!isMovie && (details as TVShowDetails).number_of_seasons > 0 && (
                  <span>
                    {(details as TVShowDetails).number_of_seasons} Season
                    {(details as TVShowDetails).number_of_seasons > 1 && 's'}
                  </span>
                )}
              </div>
            </div>

            {/* Genres */}
            {details.genres && details.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {details.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Overview */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {details.overview || 'No overview available.'}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              {isMovie && (details as MovieDetails).budget > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-semibold">${(details as MovieDetails).budget.toLocaleString()}</p>
                </div>
              )}
              {isMovie && (details as MovieDetails).revenue > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="font-semibold">${(details as MovieDetails).revenue.toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button size="lg">
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
                Play Now
              </Button>
              <Button size="lg" variant="outline">
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
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Watchlist
              </Button>
            </div>
          </div>
        </div>

        {/* Videos */}
        <VideoPlayer videos={videos?.results || []} loading={videosLoading} />

        {/* Cast */}
        <CastSection cast={credits?.cast || []} loading={creditsLoading} />

        {/* Similar */}
        {isMovie ? (
          <SimilarMedia
            title="Similar Movies"
            items={(movieDetails as MovieDetails)?.similar?.results || []}
            loading={movieLoading}
          />
        ) : (
          <SimilarMedia
            title="Similar TV Shows"
            items={(tvDetails as TVShowDetails)?.similar?.results || []}
            loading={tvLoading}
          />
        )}
      </div>
    </div>
  );
};

const DetailSkeleton = () => (
  <div className="min-h-screen bg-background pb-8">
    <div className="h-[60vh] bg-muted animate-pulse" />
    <div className="container mx-auto px-4 -mt-32 relative">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="aspect-[2/3] w-full rounded-lg bg-muted animate-pulse hidden md:block" />
        <div className="space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-32 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
