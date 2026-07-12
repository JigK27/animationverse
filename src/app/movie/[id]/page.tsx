import Image from "next/image";
import { getMovieDetails } from "@/lib/tmdb";
import { getImageUrl } from "@/lib/image";
import { Star, Calendar, Clock } from "lucide-react";
import MovieTrailer from "@/components/movie/movie-trailer";
import MovieCast from "@/components/movie/movie-cast";
import MovieCrew from "@/components/movie/movie-crew";
import MovieCarousel from "@/components/movie/movie-carousel";
import MovieFacts from "@/components/movie/movie-facts";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function MoviePage({
    params,
}: Props) {
    const { id } = await params;

    const movie = await getMovieDetails(id);
    console.log('movie-data', movie)

    return (
        <main className="min-h-screen pt-20">

            <section className="relative h-[55vh]">

                <Image
                    src={getImageUrl(movie.backdrop_path, "original")}
                    alt={movie.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                    className="object-cover brightness-50"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            </section>

            <section className="relative z-10 mx-auto -mt-40 flex max-w-7xl flex-col gap-10 px-8 md:flex-row">

                <div className="space-y-6 md:sticky md:top-24 md:w-[300px] md:self-start">

                    <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">

                        <Image
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            fill
                            className="object-cover"
                        />

                    </div>

                    <MovieFacts movie={movie} />

                </div>


                <div className="relative flex-1 space-y-6">

                    <h1 className="font-display text-5xl font-bold text-foreground pb-3">
                        {movie.title}
                    </h1>

                    <div className="flex flex-wrap gap-2">

                        {movie.genres.map((genre: any) => (
                            <span
                                key={genre.id}
                                className="rounded-full bg-primary pe-4 py-4 text-sm text-primary-foreground"
                            >
                                {genre.name}
                            </span>
                        ))}

                    </div>

                    <p className="max-w-3xl text-lg leading-8 text-foreground">
                        {movie.overview}
                    </p>

                    <MovieTrailer videos={movie.videos} />

                    <MovieCast
                        cast={movie.credits.cast}
                    />

                    <MovieCrew
                        crew={movie.credits.crew}
                    />

                </div>

            </section>

            <section className="mx-auto mt-20 max-w-7xl px-8">
                <MovieCarousel
                    title="Similar Movies"
                    movies={movie.similar.results}
                />
            </section>

        </main>
    );
}