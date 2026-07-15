"use client";

interface HeroVideoProps {
  videoKey: string;
  muted: boolean;
  onReady?: () => void;
}

export default function HeroVideo({
  videoKey,
  muted,
  onReady,
}: HeroVideoProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        title="Movie Trailer"
        className="
          absolute
          left-1/2
          top-1/2
          h-[56.25vw]
          min-h-full
          w-[177.78vh]
          min-w-full
          -translate-x-1/2
          -translate-y-1/2
          pointer-events-none
        "
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${
          muted ? 1 : 0
        }&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${videoKey}&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1`}
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={onReady}
      />
    </div>
  );
}