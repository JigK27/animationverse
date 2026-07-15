"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { MediaCardData } from "@/types/movie";
import { getImageUrl } from "@/lib/image";

interface HeroBannerProps {
  movie: MediaCardData;
}

export default function HeroBanner({
  movie,
}: HeroBannerProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-2xl">

      <Image
        src={getImageUrl(movie.backdrop_path ?? "", "original")}
        alt={movie.title ?? "Movie title"}
        fill
        priority
        sizes="(max-width: 768px) 100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      <motion.div
        initial={{
          opacity: 0,
          x: -50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="absolute bottom-16 left-8 max-w-xl space-y-5"
      >

        <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
          {movie.title}
        </h1>

        <p className="line-clamp-3 text-gray-200">
          {movie.overview}
        </p>

        <div className="flex gap-4">

          <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:scale-105">
            <Play size={20} />
            Watch Trailer
          </button>

          <button className="flex items-center gap-2 rounded-lg bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/30">
            <Info size={20} />
            More Info
          </button>

        </div>

      </motion.div>

    </section>
  );
}