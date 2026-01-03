import { getCollection } from "astro:content";

type PostsOptions = {
  withDraft?: boolean;
};

/**
 * @param options.withDraft - Include draft posts (default: false)
 */
export async function getAllPosts(options: PostsOptions = {}) {
  const posts = await getCollection("posts", ({ data }) => {
    return options.withDraft || !data.draft;
  });

  return posts;
}

type Tag = { name: string; count: number };

/**
 * Retrieves all tags with their post count, sorted alphabetically.
 * @param options.withDraft - Include draft posts (default: false)
 */
export async function getAllTags(options: PostsOptions = {}): Promise<Tag[]> {
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
export async function getPostsByTag(tag: string, options: PostsOptions = {}) {
  const posts = await getCollection("posts", ({ data }) => {
    const matchesTag = data.tags.includes(tag);
    const matchesDraft = options.withDraft || !data.draft;

    return matchesTag && matchesDraft;
  });

  return posts;
}
