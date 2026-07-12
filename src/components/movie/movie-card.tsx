import Image from "next/image";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/lib/image";
import MotionCard from "../animation/motion-card";
import Link from "next/link";

export default function MovieCard({
  movie,
}: {
  movie: Movie;
}) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <MotionCard>
        <div className="group cursor-pointer overflow-hidden rounded-xl m-2">
          <div className="relative aspect-[2/3]">
            <Image
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-105"
            />
          </div>

          <div className="mt-3">
            <h3 className="font-semibold">
              {movie.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </MotionCard>
    </Link>
  );
}