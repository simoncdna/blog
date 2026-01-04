/**
 * Generates the content collection path for an article.
 * @param id - Article numeric ID
 * @returns Path formatted as "blog/posts/XXX" (zero-padded)
 * @example getArticlePath(1) // "blog/posts/001"
 */
export function getArticlePath(id: number): string {
  return `blog/posts/${String(id).padStart(3, "0")}`;
}
