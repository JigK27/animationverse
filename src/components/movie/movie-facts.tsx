import { BadgeAlert, Calendar, Clock, Globe, Star } from "lucide-react";

interface Props {
  movie: {
    vote_average: number;
    release_date: string;
    runtime: number;
    original_language: string;
    status: string;
  };
}

export default function MovieFacts({ movie }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">
        Movie Facts
      </h3>

      <div className="space-y-4 text-sm">

        <div className="flex items-center gap-3">
          <Star size={18} />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar size={18} />
          <span>{movie.release_date}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} />
          <span>{movie.runtime} min</span>
        </div>

        <div className="flex items-center gap-3">
          <Globe size={18} />
          <span>{movie.original_language.toUpperCase()}</span>
        </div>

        <div className="flex items-center gap-3">
          <BadgeAlert size={18} />
          <span>
            {movie.status}
          </span>
        </div>

      </div>
    </div>
  );
}