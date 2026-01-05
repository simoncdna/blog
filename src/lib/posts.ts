import { getCollection } from "astro:content";
import { defaultLocale, type Locale } from "../i18n/config";

type PostsOptions = {
  locale: Locale;
  withDraft?: boolean;
};

/**
 * @param options.locale - Current locale posts (default: defaultLocale)
 * @param options.withDraft - Include draft posts (default: false)
 */
export async function getAllPosts(
  options: PostsOptions = { locale: defaultLocale },
) {
  const posts = await getCollection("posts", ({ data, id }) => {
    const matchesLocale = id.startsWith(`${options.locale}/`);
    const matchesDraftOption = options.withDraft || !data.draft;
    return matchesLocale && matchesDraftOption;
  });

  return posts.sort(
    (a, b) => b.data.creationDate.getTime() - a.data.creationDate.getTime(),
  );
}

type Tag = { name: string; count: number };

/**
 * Retrieves all tags with their post count, sorted alphabetically.
 * @param options.withDraft - Include draft posts (default: false)
 */
export async function getAllTags(
  options: PostsOptions = { locale: defaultLocale },
): Promise<Tag[]> {
  const posts = await getAllPosts(options);
  const tagsMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
    }
  }

  return [...tagsMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Retrieves all posts matching a specific tag.
 * @param options.withDraft - Include draft posts (default: false)
 */
export async function getPostsByTag(
  tag: string,
  options: PostsOptions = { locale: defaultLocale },
) {
  const posts = await getCollection("posts", ({ data, id }) => {
    const matchesLocale = id.startsWith(`${options.locale}/`);
    const matchesTag = data.tags.includes(tag);
    const matchesDraft = options.withDraft || !data.draft;

    return matchesTag && matchesDraft && matchesLocale;
  });

  return posts;
}
