"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { watchlists } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addToWatchlist(movie: {
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  rating: number;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db.insert(watchlists).values({
    userId: session.user.id,
    movieId: movie.movieId,
    title: movie.title,
    posterPath: movie.posterPath,
    releaseDate: movie.releaseDate,
    rating: movie.rating,
  });

  return {
    success: true,
  };
}

export async function removeMovie(movieId: number) {
  const session = await auth();

  if (!session?.user?.id) return;

  await db
    .delete(watchlists)
    .where(
      and(
        eq(watchlists.movieId, movieId),
        eq(watchlists.userId, session.user.id)
      )
    );

  revalidatePath("/watchlists");
}

export async function isInWatchlist(
  movieId: number
) {
  const session = await auth();

  if (!session?.user?.id) return false;

  const [result] = await db.select()
  .from(watchlists)
  .where(
    and(
      eq(watchlists.movieId, movieId),
      eq(watchlists.userId, session.user.id)
    )
  )

  return !!result;
}

export async function toggleWatchlist(movie: {
  movieId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  rating: number;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Please sign in first.");
  }

  const [existing] = await db
    .select()
    .from(watchlists)
    .where(
      and(
        eq(watchlists.userId, session.user.id),
        eq(watchlists.movieId, movie.movieId)
      )
    );

  if (existing) {
    await db
      .delete(watchlists)
      .where(eq(watchlists.id, existing.id));
  } else {
    await db.insert(watchlists).values({
      userId: session.user.id,
      movieId: movie.movieId,
      title: movie.title,
      posterPath: movie.posterPath,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
    });
  }

  revalidatePath("/watchlists");
  revalidatePath(`/movie/${movie.movieId}`);

  return !existing;
}