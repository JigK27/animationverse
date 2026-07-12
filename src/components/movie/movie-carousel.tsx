"use client";

import { Movie } from "@/types/movie";
import MovieCard from "./movie-card";

interface MovieCarouselProps {
  title?: string;
  movies: Movie[];
}

export default function MovieCarousel({
  title,
  movies,
}: MovieCarouselProps) {
  return (
    <section className="space-y-5">
      {title && (
        <h2 className="text-3xl font-bold">
          {title}
        </h2>
      )}

      <div className="flex gap-5 overflow-x-auto pb-5 scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[180px] md:min-w-[220px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}