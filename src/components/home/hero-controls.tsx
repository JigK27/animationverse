"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function HeroControls({
  current,
  total,
  onPrev,
  onNext,
}: Props) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur"
      >
        <ChevronRight />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              current === i
                ? "w-8 bg-white"
                : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </>
  );
}