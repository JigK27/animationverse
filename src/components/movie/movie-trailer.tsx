interface TrailerProps {
  videos: {
    results: {
      id: string;
      key: string;
      site: string;
      type: string;
      official: boolean;
      name: string;
    }[];
  };
}

export default function MovieTrailer({ videos }: TrailerProps) {
  const trailer = videos.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  if (!trailer) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold">
        Trailer
      </h2>

      <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-2xl border shadow-xl">
        <iframe
          className="h-full w-full rounded-2xl"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}