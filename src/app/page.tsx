import HeroBanner from "@/components/home/hero-banner";
import MovieCarousel from "@/components/movie/movie-carousel";

import {
  getFeaturedAnimation,
  getPopularAnimation,
  getTrendingAnimation,
} from "@/lib/tmdb";

export default async function Home() {
  const hero = await getFeaturedAnimation();
  const trending = await getTrendingAnimation();
  const popular = await getPopularAnimation();

  return (
    <main className="min-h-screen space-y-12 bg-background px-8 pt-24">

      <HeroBanner movie={hero} />

      <MovieCarousel
        title="🔥 Trending Animation"
        movies={trending.results}
      />

      <MovieCarousel
        title="⭐ Popular Animation"
        movies={popular.results}
      />

    </main>
  );
}