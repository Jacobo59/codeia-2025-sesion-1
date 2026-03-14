import { useRef, useState } from 'react';
import { MediaCard, MediaCardSkeleton } from './MediaCard';
import { Button } from '../ui/button';
import type { Movie, TVShow, Media } from '../../types/tmdb.types';

interface MediaRowProps {
  title: string;
  items: Movie[] | TVShow[] | Media[] | null | undefined;
  loading?: boolean;
  skeletonCount?: number;
}

export const MediaRow = ({
  title,
  items,
  loading = false,
  skeletonCount = 6,
}: MediaRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="py-4">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800 text-white hover:bg-gray-700 md:opacity-0"
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
          </Button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[160px]">
                  <MediaCardSkeleton />
                </div>
              ))
            : items?.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-[160px]">
                  <MediaCard media={item} />
                </div>
              ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && items && items.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800 text-white hover:bg-gray-700 md:opacity-0"
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
          </Button>
        )}
      </div>
    </div>
  );
};
