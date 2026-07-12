import { tmdbFetch } from "@/lib/tmdb";

export async function GET() {
  const data = await tmdbFetch("/trending/movie/week");

  return Response.json(data);
}