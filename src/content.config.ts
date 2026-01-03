import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    creationDate: z.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { posts };
