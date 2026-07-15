"use client";

import { useEffect, useState } from "react";

import HeroBanner from "./hero-banner";
import HeroTrailer from "./hero-trailer";

interface Props {
  movie: any;
  trailerKey: string | null;
}

export default function Hero({
  movie,
  trailerKey,
}: Props) {
  const [playTrailer, setPlayTrailer] = useState(false);

  useEffect(() => {
    if (!trailerKey) return;

    const timer = setTimeout(() => {
      setPlayTrailer(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [trailerKey]);

  return playTrailer && trailerKey ? (
    <HeroTrailer trailerKey={trailerKey} />
  ) : (
    <HeroBanner movie={movie} />
  );
}