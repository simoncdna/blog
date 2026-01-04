import readingTime from "reading-time";

/**
 * Calculates estimated reading time for article content.
 * @param body - Article body text
 * @returns Reading time string prefixed with "~", or "-" if no content
 */
export function getReadingTime(body: string | undefined): string {
  if (body) {
    return `~${readingTime(body).text}`;
  }

  return "-";
}
