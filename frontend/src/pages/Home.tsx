import { HeroSlider } from '../components/media/HeroSlider';
import { MediaRow } from '../components/media/MediaRow';
import { useTrendingAll, usePopularMovies, usePopularTVShows, useTopRatedMovies, useTopRatedTVShows } from '../hooks/useMedia';

export const Home = () => {
  const { data: trendingData, loading: trendingLoading } = useTrendingAll('day');
  const { data: popularMovies, loading: popularMoviesLoading } = usePopularMovies();
  const { data: popularTVShows, loading: popularTVShowsLoading } = usePopularTVShows();
  const { data: topRatedMovies, loading: topRatedMoviesLoading } = useTopRatedMovies();
  const { data: topRatedTVShows, loading: topRatedTVShowsLoading } = useTopRatedTVShows();

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider items={trendingData} loading={trendingLoading} itemCount={5} />

      {/* Content Rows */}
      <div className="container mx-auto px-4 pb-8">
        <MediaRow
          title="Tendencias"
          items={trendingData}
          loading={trendingLoading}
        />
        <MediaRow
          title="Películas Populares"
          items={popularMovies}
          loading={popularMoviesLoading}
        />
        <MediaRow
          title="Series Populares"
          items={popularTVShows}
          loading={popularTVShowsLoading}
        />
        <MediaRow
          title="Mejor Valoradas Películas"
          items={topRatedMovies}
          loading={topRatedMoviesLoading}
        />
        <MediaRow
          title="Mejor Valoradas Series"
          items={topRatedTVShows}
          loading={topRatedTVShowsLoading}
        />
      </div>
    </div>
  );
};
