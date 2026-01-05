import type { Locale } from "../i18n/config";

/**
 * Determines if a navigation link should be marked as active.
 * Uses exact match for home page, startsWith for other pages.
 * @param currentPath - Current URL pathname
 * @param href - Navigation link href
 * @param locale - Current locale
 * @returns Whether the link is active
 */
export const handleIsActive = (
  currentPath: string,
  href: string,
  locale: Locale,
) => {
  if (href === "/" || href === `/${locale}/`) {
    return currentPath === href;
  }
  return currentPath.startsWith(href);
};
