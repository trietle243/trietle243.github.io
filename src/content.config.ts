import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().trim().min(1);
// Accept YAML dates or date strings, but never coerce null/booleans to epoch dates.
const date = z.union([text, z.date()]).pipe(z.coerce.date());
const webUrl = z.url({ protocol: /^https?$/ });

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: text,
    summary: text,
    category: z.enum(['data', 'tools', 'learning']),
    technologies: z.array(text),
    status: z.enum(['active', 'completed', 'archived']),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    publishedAt: date.optional(),
    updatedAt: date.optional(),
    repositoryUrl: webUrl.optional(),
    demoUrl: webUrl.optional(),
  }).strict(),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: text,
    description: text,
    publishedAt: date.optional(),
    updatedAt: date.optional(),
    tags: z.array(text).default([]),
    draft: z.boolean().default(true),
  }).strict(),
});

export const collections = { projects, writing };
