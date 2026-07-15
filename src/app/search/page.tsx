import MovieCard from "@/components/movie/movie-card";
import { searchMovies } from "@/lib/tmdb";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {

  const { q } = await searchParams;

  const query = q || "";

  const data = query
    ? await searchMovies(query)
    : { results: [] };

  return (
    <main className="px-8 pt-24">

      <h1 className="mb-8 text-3xl font-bold font-display">
        Search results for "{query}"
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {data.results.map((movie: any) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

    </main>
  );
}