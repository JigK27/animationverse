"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { toggleWatchlist } from "@/actions/watchlist";

interface Props {
  movie: {
    movieId: number;
    title: string;
    posterPath: string | null;
    releaseDate: string | null;
    rating: number;
  };
}

export default function WatchlistButton({
  movie,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          try {
            const added = await toggleWatchlist(movie);

            toast.success(
              added
                ? "Added to watchlist"
                : "Removed from watchlist"
            );
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Something went wrong"
            );
          }
        })
      }
      className="flex items-center gap-2 rounded-lg bg-primary py-2 text-primary-foreground disabled:opacity-60"
    >
      <Heart size={18} />

      {pending ? "Saving..." : "Watchlist"}
    </button>
  );
}