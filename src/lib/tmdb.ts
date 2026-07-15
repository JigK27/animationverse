const BASE_URL = process.env.TMDB_BASE_URL;

export async function tmdbFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("TMDB request failed");
  }

  return response.json();
}

export async function getTrendingMovies() {
  const data = await tmdbFetch("/trending/movie/week");

  return {
  results: data.results.map((item:any)=>({
    ...item,
    media_type:"movie"
  }))
}
}

export async function getPopularAnimation() {
  const data = await tmdbFetch(
    "/discover/movie?with_genres=16&sort_by=popularity.desc"
  );

  return {
    results: data.results.map((item: any) => ({
      ...item,
      media_type: "movie",
    })),
  };
}

export async function getTopRatedAnimation() {
  const data = await tmdbFetch(
    "/discover/movie?with_genres=16&sort_by=vote_average.desc&vote_count.gte=1000"
  );

  return {
    results: data.results.map((item: any) => ({
      ...item,
      media_type: "movie",
    })),
  };
}

export async function getTrendingAnimation() {
  const data = await tmdbFetch(
    "/discover/movie?with_genres=16&sort_by=popularity.desc"
  );

  return {
    results: data.results.map((item: any) => ({
      ...item,
      media_type: "movie",
    })),
  };
}

export async function getFeaturedAnimation() {
  const data = await tmdbFetch(
    "/discover/movie?with_genres=16&sort_by=popularity.desc"
  );

  return data.results[0];
}

export async function searchMovies(query:string) {
  return tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
}

export async function getMovieDetails(id: string) {
  return tmdbFetch(
    `/movie/${id}?append_to_response=videos,credits,similar`
  );
}

export async function getTVDetails(id: string) {
  return tmdbFetch(
    `/tv/${id}?append_to_response=videos,credits,similar`
  );
}

export async function getHeroMovies() {
  return tmdbFetch("/trending/all/week");
}

export async function getVideos(
  id: number,
  mediaType: "movie" | "tv"
) {
  return tmdbFetch(`/${mediaType}/${id}/videos`);
}

export async function getTrendingAnime() {
  const data = await tmdbFetch(
    "/discover/tv?\
with_genres=16\
&with_origin_country=JP\
&include_adult=false\
&without_genres=10763,10764,10767\
&sort_by=popularity.desc\
&vote_count.gte=100"
  );

  return {
    results: data.results.map((item: any) => ({
      ...item,
      media_type: "tv",
    })),
  };
}

export async function getNowPlaying() {
  return tmdbFetch("/movie/now_playing");
}

export async function getTrendingTV() {
  const data = await tmdbFetch("/trending/tv/week");

  return {
    results: data.results.map((item: any) => ({
      ...item,
      media_type: "tv",
    })),
  };
}