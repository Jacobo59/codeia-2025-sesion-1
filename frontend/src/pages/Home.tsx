import { HeroBanner } from '../components/media/HeroBanner';
import { MediaRow } from '../components/media/MediaRow';
import { useTrendingAll, usePopularMovies, usePopularTVShows, useTopRatedMovies, useTopRatedTVShows } from '../hooks/useMedia';

export const Home = () => {
  const { data: trendingData, loading: trendingLoading } = useTrendingAll('day');
  const { data: popularMovies, loading: popularMoviesLoading } = usePopularMovies();
  const { data: popularTVShows, loading: popularTVShowsLoading } = usePopularTVShows();
  const { data: topRatedMovies, loading: topRatedMoviesLoading } = useTopRatedMovies();
  const { data: topRatedTVShows, loading: topRatedTVShowsLoading } = useTopRatedTVShows();

  // Get first trending item for hero banner
  const heroMedia = trendingData && trendingData.length > 0 ? trendingData[0] : null;

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner media={heroMedia} loading={trendingLoading} />

      {/* Content Rows */}
      <div className="container mx-auto px-4 pb-8">
        <MediaRow
          title="Trending Today"
          items={trendingData}
          loading={trendingLoading}
        />
        <MediaRow
          title="Popular Movies"
          items={popularMovies}
          loading={popularMoviesLoading}
        />
        <MediaRow
          title="Popular TV Shows"
          items={popularTVShows}
          loading={popularTVShowsLoading}
        />
        <MediaRow
          title="Top Rated Movies"
          items={topRatedMovies}
          loading={topRatedMoviesLoading}
        />
        <MediaRow
          title="Top Rated TV Shows"
          items={topRatedTVShows}
          loading={topRatedTVShowsLoading}
        />
      </div>
    </div>
  );
};
