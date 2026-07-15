import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { MediaCardData } from "@/types/movie";
import RemoveButton from "./remove-button";

interface MovieCardProps {
  movie: MediaCardData;
  showRemoveButton?: boolean;
}
export default function MovieCard({
  movie,
  showRemoveButton = false,
}: MovieCardProps) {

  const title = movie.title ?? movie.name;
  const date = movie.release_date ?? movie.first_air_date;
  const mediaType = movie.media_type ?? "movie";

  return (
    <Link
      href={`/${mediaType}/${movie.id}`}
      className="group block overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder-poster.png"
          }
          alt={title || "Movie poster"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 20vw"
        />
        {showRemoveButton && (<RemoveButton movie={movie} />)}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{date ? new Date(date).getFullYear() : "N/A"}</span>

          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}