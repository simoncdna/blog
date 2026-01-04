import readingTime from "reading-time";

/**
 * Calculates estimated reading time for post content.
 * @param body - Post body text
 * @returns Reading time string prefixed with "~", or "-" if no content
 */
export function getReadingTime(body: string | undefined): string {
  if (body) {
    return `~${readingTime(body).text}`;
  }

  return "-";
}
