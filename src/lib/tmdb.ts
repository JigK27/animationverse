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
  return tmdbFetch("/trending/movie/week");
}

export async function getPopularAnimation() {
  return tmdbFetch(
    "/discover/movie?with_genres=16&sort_by=popularity.desc"
  );
}

export async function getTopRatedAnimation() {
  return tmdbFetch(
    "/discover/movie?with_genres=16&sort_by=vote_average.desc"
  );
}

export async function getTrendingAnimation() {
  return tmdbFetch(
    "/discover/movie?with_genres=16&sort_by=popularity.desc"
  );
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