export function getImageUrl(
  path: string | null,
  size = "w500"
) {
  if (!path) {
    return "/placeholder.svg";
  }

  return `https://image.tmdb.org/t/p/${size}${path}`;
}