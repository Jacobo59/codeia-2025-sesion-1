import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_SIZES, TMDB_CONFIG } from '../../lib/constants';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import type { Movie, TVShow, Media } from '../../types/tmdb.types';

interface HeroSliderProps {
  items: (Movie | TVShow | Media)[] | null | undefined;
  loading?: boolean;
  itemCount?: number;
}

export const HeroSlider = ({
  items,
  loading = false,
  itemCount = 5,
}: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const sliderItems = items && items.length > 0 ? items.slice(0, itemCount) : null;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !sliderItems || sliderItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderItems!.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sliderItems]);

  // Reset auto-play when user manually navigates
  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % (sliderItems?.length || 1));
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + (sliderItems?.length || 1)) % (sliderItems?.length || 1));
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  if (loading || !sliderItems || sliderItems.length === 0) {
    return (
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  const currentItem = sliderItems[currentIndex];
  const title = 'title' in currentItem ? currentItem.title : currentItem.name;
  const overview = currentItem.overview;
  const date = 'release_date' in currentItem ? currentItem.release_date : currentItem.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const hasMediaType = 'media_type' in currentItem && currentItem.media_type;
  const type = hasMediaType ? currentItem.media_type : ('title' in currentItem ? 'movie' : 'tv');
  const linkUrl = type === 'movie' ? `/movie/${currentItem.id}` : `/tv/${currentItem.id}`;

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black">
      {/* Background Image with smooth transition */}
      <div className="absolute inset-0 h-full w-full">
        {sliderItems.map((item, index) => {
          const url = item.backdrop_path
            ? `${TMDB_CONFIG.IMAGE_BASE_URL}/${IMAGE_SIZES.BACKDROP_LARGE}${item.backdrop_path}`
            : null;

          return (
            <div
              key={`${item.id}-${index}`}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {url && (
                <img
                  src={url}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {sliderItems.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12 md:pb-20 z-10">
        <div className="max-w-2xl space-y-4">
          {/* Type Badge */}
          <Badge variant="secondary" className="mb-2">
            {type === 'movie' ? 'Película' : 'Serie'}
          </Badge>

          {/* Title with fade animation */}
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-slideUp">
              {title}
            </h1>
          </div>

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
              {currentItem.vote_average.toFixed(1)}
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

      {/* Dots Indicator */}
      {sliderItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {sliderItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
