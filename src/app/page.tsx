import HeroCarousel from "@/components/home/hero-carousel";
import MovieCarousel from "@/components/movie/movie-carousel";

import {
  getHeroMovies,
  getTrendingAnimation,
  getPopularAnimation,
  getTrendingAnime,
  getNowPlaying,
  getTrendingTV,
} from "@/lib/tmdb";

export default async function Home() {
  const [
    hero,
    trending,
    popular,
    anime,
    nowPlaying,
    tv,
  ] = await Promise.all([
    getHeroMovies(),
    getTrendingAnimation(),
    getPopularAnimation(),
    getTrendingAnime(),
    getNowPlaying(),
    getTrendingTV(),
  ]);

  return (
    <main className="min-h-screen space-y-12 bg-background pb-16">

      <HeroCarousel
        movies={hero.results.slice(0, 5)}
      />

      <div className="space-y-12 px-6 md:px-8">

        <MovieCarousel
          title="🔥 Trending Animation"
          movies={trending.results}
        />

        <MovieCarousel
          title="⭐ Popular Animation"
          movies={popular.results}
        />

        <MovieCarousel
          title="🎬 Now Playing"
          movies={nowPlaying.results}
        />

        <MovieCarousel
          title="📺 Trending TV"
          movies={tv.results}
        />

        <MovieCarousel
          title="🎌 Trending Anime"
          movies={anime.results}
        />

      </div>

    </main>
  );
}