import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserWatchlist } from "@/db/queries/watchlist";
import MovieCard from "@/components/movie/movie-card";

export default async function WatchlistPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const movies = await getUserWatchlist(session.user.id);

    return (
        <main className="w-full px-6 py-24">
            <h1 className="mb-8 text-4xl font-bold font-display">
                My Watchlist
            </h1>

            {movies.length === 0 ? (
                <p className="text-muted-foreground">
                    Your watchlist is empty.
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={{
                                id: movie.movieId,
                                title: movie.title,
                                poster_path: movie.posterPath,
                                release_date: movie.releaseDate ?? undefined,
                                vote_average: movie.rating ?? 0,
                            }}
                            showRemoveButton={true}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}