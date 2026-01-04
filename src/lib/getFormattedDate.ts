/**
 * Formats a date in French locale with dashes.
 * @param date - Date to format
 * @returns Formatted date string (DD-MM-YYYY)
 */
export function getFormattedDate(date: Date): string {
  return date.toLocaleDateString("fr-FR").replaceAll("/", "-");
}
