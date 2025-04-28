import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const tz = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/tz" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    tracks: z.array(z.string()),
    slots: z.array(
      z.object({
        start: z.coerce.date(),
        end: z.coerce.date(),
        type: z.enum(["talk", "pause", "special"]),
        displaySize: z.number(),
        tracks: z.array(
          z.union([
            z.object({
              title: z.string(),
              authors: z.array(z.string()).optional(),
              category: z.string().optional(),
              summary: z.string().optional(),
              rowSpan: z.number().optional(),
            }),
            z.string(),
          ])
        ),
      })
    ),
  }),
});

export const collections = { tz };
