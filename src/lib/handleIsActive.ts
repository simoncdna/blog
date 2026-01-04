import type { Lang } from "../i18n/config";

export const handleIsActive = (
  currentPath: string,
  href: string,
  lang: Lang,
) => {
  if (href === "/" || href === `/${lang}/`) {
    return currentPath === href;
  }
  return currentPath.startsWith(href);
};
