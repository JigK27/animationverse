"use client";

export default function HeroTrailer({
  trailerKey,
}: {
  trailerKey: string;
}) {
  return (
    <iframe
      className="h-screen w-full"
      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
      allow="autoplay"
      allowFullScreen
    />
  );
}