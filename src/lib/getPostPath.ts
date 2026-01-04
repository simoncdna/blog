/**
 * Generates the content collection path for a post.
 * @param id - Post numeric ID
 * @returns Path formatted as "blog/posts/XXX" (zero-padded)
 * @example getPostPath(1) // "blog/posts/001"
 */
export function getPostPath(id: number): string {
  return `blog/posts/${String(id).padStart(3, "0")}`;
}
