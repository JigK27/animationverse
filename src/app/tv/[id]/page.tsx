import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Play } from "lucide-react";

import MovieCarousel from "@/components/movie/movie-carousel";
import { getTVDetails } from "@/lib/tmdb";
import { getImageUrl } from "@/lib/image";

interface TVPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TVDetailsPage({
  params,
}: TVPageProps) {
  const { id } = await params;

  const tv = await getTVDetails(id);

  const trailer = tv.videos?.results?.find(
    (video: any) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  return (
    <main className="pb-20">
      {/* Hero */}
      <section className="relative h-[70vh] w-full">
        <Image
          src={getImageUrl(tv.backdrop_path, "original")}
          alt={tv.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="absolute bottom-10 left-10 max-w-3xl">
          <h1 className="mb-4 text-5xl font-bold">
            {tv.name}
          </h1>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              {tv.vote_average.toFixed(1)}
            </span>

            <span className="flex items-center gap-1">
              <Calendar size={18} />
              {tv.first_air_date}
            </span>

            <span>
              {tv.number_of_seasons} Seasons
            </span>

            <span>
              {tv.number_of_episodes} Episodes
            </span>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {tv.genres.map((genre: any) => (
              <span
                key={genre.id}
                className="rounded-full bg-primary/20 px-3 py-1 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="max-w-2xl text-lg text-gray-300">
            {tv.overview}
          </p>

          {trailer && (
            <Link
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground"
            >
              <Play size={20} />
              Watch Trailer
            </Link>
          )}
        </div>
      </section>

      {/* Cast */}
      <section className="mx-auto mt-12 max-w-7xl px-6">
        <h2 className="mb-6 text-3xl font-bold">
          Cast
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {tv.credits.cast.slice(0, 12).map((actor: any) => (
            <div key={actor.id} className="text-center">
              <Image
                src={
                  actor.profile_path
                    ? getImageUrl(actor.profile_path)
                    : "/placeholder-person.png"
                }
                alt={actor.name}
                width={150}
                height={220}
                className="mx-auto rounded-xl"
              />

              <p className="mt-2 font-semibold">
                {actor.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Shows */}
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <MovieCarousel
          title="Similar TV Shows"
          movies={tv.similar.results.map((item: any) => ({
            ...item,
            media_type: "tv",
          }))}
        />
      </section>
    </main>
  );
}