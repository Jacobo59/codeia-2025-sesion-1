import { Skeleton } from '../ui/skeleton';

// Skeleton for Media Card
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

// Skeleton for Hero Banner
export const HeroBannerSkeleton = () => {
  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <Skeleton className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="container mx-auto px-4 h-full flex items-end pb-12 md:pb-20">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-12 w-1/2 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/6" />
          </div>
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for Media Row (horizontal scroll)
export const MediaRowSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="py-4">
      <Skeleton className="h-7 w-48 mb-4" />
      <div className="flex gap-4 overflow-hidden pb-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-32">
            <MediaCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for Media Grid
export const MediaGridSkeleton = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </div>
  );
};

// Skeleton for Cast Section
export const CastSectionSkeleton = () => {
  return (
    <div className="py-8">
      <Skeleton className="h-7 w-24 mb-4" />
      <div className="flex gap-4 overflow-hidden pb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-32 space-y-2">
            <div className="w-32 h-32 rounded-full bg-muted animate-pulse" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for Media Detail Page
export const MediaDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Backdrop Skeleton */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Skeleton className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 -mt-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Poster Skeleton */}
          <div className="hidden md:block">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          </div>

          {/* Details Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 w-32 rounded-lg" />
              <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Cast Skeleton */}
        <CastSectionSkeleton />

        {/* Similar Skeleton */}
        <MediaGridSkeleton count={6} />
      </div>
    </div>
  );
};

// Skeleton for Search Results
export const SearchResultsSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
      <MediaGridSkeleton count={12} />
    </div>
  );
};

// Skeleton for Search History
export const SearchHistorySkeleton = () => {
  return (
    <div className="mb-8">
      <Skeleton className="h-7 w-32 mb-4" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
    </div>
  );
};

// Skeleton for Video Player
export const VideoPlayerSkeleton = () => {
  return (
    <div className="py-8">
      <Skeleton className="h-7 w-40 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg bg-muted">
            <Skeleton className="aspect-video w-full" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-6 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3',
  };

  return (
    <div
      className={`animate-spin rounded-full border-primary border-t-transparent ${sizeClasses[size]}`}
    />
  );
};

// Full Page Loading
export const FullPageLoading = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="large" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

// Inline Loading
export const InlineLoading = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="flex items-center gap-3 py-4">
      <LoadingSpinner />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
};
