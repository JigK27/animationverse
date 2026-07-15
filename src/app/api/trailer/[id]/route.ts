import { NextResponse } from "next/server";
import { getVideos } from "@/lib/tmdb";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const { searchParams } = new URL(request.url);

  const mediaType =
    searchParams.get("type") === "tv"
      ? "tv"
      : "movie";

  const data = await getVideos(
    Number(id),
    mediaType
  );

  const trailer =
    data.results.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) ??
    data.results.find(
      (video: any) =>
        video.site === "YouTube"
    );

  return NextResponse.json({
    key: trailer?.key ?? null,
  });
}