export function getArticlePath(id: number): string {
  return `blog/posts/${String(id).padStart(3, "0")}`;
}
