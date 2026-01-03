export function getFormattedDate(date: Date): string {
  return date.toLocaleDateString("fr-FR").replaceAll("/", "-");
}
