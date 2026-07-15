export interface MediaCardData {
  id: number;

  media_type?: "movie" | "tv";

  title?: string;

  name?: string;

  poster_path: string | null;

  backdrop_path?: string | null;

  release_date?: string;

  first_air_date?: string;

  vote_average: number;

  overview?: string;
}