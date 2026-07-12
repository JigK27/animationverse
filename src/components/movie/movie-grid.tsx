"use client";

import { motion } from "framer-motion";
import MovieCard from "./movie-card";
import { Movie } from "@/types/movie";

export default function MovieGrid({
  movies,
}: {
  movies: Movie[];
}) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </motion.div>
  );
}