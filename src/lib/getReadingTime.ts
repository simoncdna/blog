import readingTime from "reading-time";

export function getReadingTime(body: string | undefined): string {
  if (body) {
    return `~${readingTime(body).text}`;
  }

  return "-";
}
