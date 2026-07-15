import { count, and, eq } from "drizzle-orm";

import { db } from "@/db";
import { watchlists } from "@/db/schema";

export async function getUserWatchlist(userId: string) {
  return db
    .select()
    .from(watchlists)
    .where(eq(watchlists.userId, userId));
}

export async function getWatchlistMovie(
  userId: string,
  movieId: number
) {
  const [movie] = await db
    .select()
    .from(watchlists)
    .where(
      and(
        eq(watchlists.userId, userId),
        eq(watchlists.movieId, movieId)
      )
    );

  return movie;
}

export async function getWatchlistCount(userId: string) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(watchlists)
    .where(eq(watchlists.userId, userId));

  return result.count;
}