# Site Architecture & Engineering Contract

## 1. Constraints

- Astro static output; no SSR adapter; GitHub Pages user site.
- TypeScript for configs/data/helpers, `.astro` components for UI, Markdown/MDX for authored content.
- Tailwind CSS v4 via the official Vite plugin, with CSS custom properties for design tokens.
- No React until a concrete feature proves it necessary; vanilla JS for light interactivity.
- No secrets, server routes, database, CMS, or live external APIs.
- Use npm and commit `package-lock.json` if authorized; avoid mixing lockfiles.

## 2. Proposed repository

- Repo: `https://github.com/trietle243/trietle243.github.io` (proposed — create/verify before execution).
- Site: `https://trietle243.github.io/`.
- **Important:** `trietle243/trietle243` is the **profile README** repo, not the GitHub Pages project repo.

```
trietle243.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.svg
│   └── og-default.png                 # optional after a real asset is created
├── src/
│   ├── components/
│   │   ├── SiteHeader.astro
│   │   ├── SiteFooter.astro
│   │   ├── SectionHeading.astro
│   │   ├── Hero.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectFilter.astro
│   │   ├── ArticleCard.astro
│   │   ├── Tag.astro
│   │   ├── ContactLinks.astro
│   │   └── ThemeToggle.astro           # P1
│   ├── content/
│   │   ├── projects/
│   │   │   └── dsa-as-a-non-it-guy.mdx # approve content before public deploy
│   │   └── writing/
│   │       └── why-i-am-building-this.mdx  # draft until reviewed
│   ├── content.config.ts
│   ├── data/
│   │   ├── profile.ts
│   │   └── experience.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ProseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── writing/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── rss.xml.ts                  # optional P1
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── content.ts                  # sort/filter published entries
│       └── seo.ts                      # per-page title/canonical helpers
├── AGENTS.md
├── README.md
├── astro.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

**No premature abstractions:** one `BaseLayout`, one `ProseLayout`, content helpers only when repeated, no design-system package, no `src/services/`, no dynamic runtime data client.

## 3. Bootstrap commands

Run in a **new or user-approved** directory; do not overwrite an existing repository:

```bash
npm create astro@latest .
npx astro add tailwind
npx astro add mdx
npx astro add sitemap
npm install @astrojs/rss
npm install --save-dev @astrojs/check typescript
```

If scaffolding asks questions, choose minimal/empty starter, TypeScript strict, npm, no SSR adapter. Verify compatibility with latest published versions at execution; keep the generated lockfile. If `astro add` automatically installs relevant packages, avoid duplicates.

Add scripts to package.json (preserving scaffold-generated scripts):

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

## 4. Astro config

For the *user site* repository `trietle243.github.io`, **do not set** `base`:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://trietle243.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

This example shows intent; **do not duplicate a Tailwind plugin already inserted by `astro add tailwind`**. If the repository is not a user-site repo (e.g. `portfolio`), the `base` rule changes. The chosen root URL must be tested after publishing.

## 5. Content model

Use Astro Content Layer API with `src/content.config.ts` and `glob()` loaders, not legacy `src/content/config.ts` conventions:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(240),
    category: z.enum(['data', 'tools', 'learning']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    status: z.enum(['active', 'completed', 'archived']).optional(),
    year: z.number().int().min(2000).optional(),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(240),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects, writing };
```

Defaults are **draft: true** so a newly created file is not accidentally published. Authors must explicitly set `draft: false` after review. Do not generate `pubDate` as today's date for an unreviewed article.

### Example project MDX frontmatter

```mdx
---
title: "Learning DSA as a Non-IT Guy"
description: "Learning data structures and algorithms with Python and Go."
category: "learning"
tags: ["Python", "Go", "DSA"]
featured: true
draft: true
githubUrl: "https://github.com/trietle243/i_learn_dsa_as_a_non_IT_guy"
---

<!-- Write/review a real problem, decisions and lessons before setting draft: false. -->
```

### Example writing MDX frontmatter

```mdx
---
title: "Why I'm building an engineering notebook"
description: "A place to document projects, experiments, and lessons learned."
pubDate: 2026-11-15
tags: ["meta", "learning"]
draft: true
---

<!-- This is only a draft seed, not a verified published article. -->
```

### Collection queries and static routes

```ts
// src/utils/content.ts (illustrative)
import { getCollection } from 'astro:content';

export async function getPublishedProjects() {
  const items = await getCollection('projects', ({ data }) => !data.draft);
  return items.sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
}

export async function getPublishedWriting() {
  const items = await getCollection('writing', ({ data }) => !data.draft);
  return items.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
```

```astro
---
// src/pages/projects/[...slug].astro (route contract excerpt)
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}
const { entry } = Astro.props;
const { Content } = await render(entry);
---
<article>
  <h1>{entry.data.title}</h1>
  <Content />
</article>
```

The excerpt intentionally omits layout/styling. Use `.id` from the file-based loader as the stable slug; verify case/nested filename behavior. Apply the **same draft filter** to writing detail paths, home cards, feeds, and sitemap. Do not emit links for unpublished pages.

### Experience and personal info

`src/data/profile.ts`: first-person intro, GitHub URL, optional approved LinkedIn/email. `src/data/experience.ts`: array of **verified** positions with `company`, `role`, `start`, `end?`, `summary?`, `bullets?`. Missing entries should not generate fake timeline rows or dummy labels on the public build. An unpublished template with TODO comments is acceptable.

## 6. Rendering and navigation

- `BaseLayout`: document metadata, skip-link, header, `<main id="main">`, footer, base CSS.
- `ProseLayout`: max 68–72ch text, metadata row, breadcrumb, readable typography and code blocks.
- `getStaticPaths()` for each published project/post; `render(entry)` for MDX.
- Use normal `<a href>` navigation; avoid SPA/router libraries.
- Frontmatter-driven `featured` and `draft`; no duplicated hardcoded project cards.
- Project filters: tiny JS toggles visible cards based on data-category; no-JS shows all. Keyboard support, `aria-pressed` and visible focus.
- External URLs open normally (new tabs optional); if new tabs, use `rel="noopener noreferrer"`.

## 7. GitHub Pages workflow

Set GitHub **Settings → Pages → Source: GitHub Actions**. Current official Astro deploy example uses `withastro/action@v6`, `actions/checkout@v7`, and `actions/deploy-pages@v5` (verify updates when implementing).

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: withastro/action@v6
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

`withastro/action` installs based on the committed lockfile and builds Astro. **Do not configure a custom token or add secrets** for static publishing. The GitHub Pages action requires suitable workflow permissions; organization policies may affect availability.

### Verification sequence (after user approves push)

1. Run `npm ci`, `npm run check`, `npm run build` locally.
2. Inspect generated `dist/` for HTML, assets, sitemap, RSS where configured.
3. Verify GitHub Actions build and deploy jobs succeed.
4. Test root URL, `/projects/`, `/writing/`, detail URLs, images, CSS, and `404.html` on the deployed site.
5. Confirm canonical URLs, sitemap, RSS and draft exclusions.

## 8. Accessibility, SEO and performance contracts

- `lang="en"`, descriptive title and meta description per route, single H1, heading hierarchy.
- Use semantic `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` and descriptive landmark labels.
- Use system/local fonts; no external tracking script by default.
- Prefer native `<details>` for disclosures; avoid unnecessary custom keyboard handling.
- Embed images via Astro image utilities where practical; use optimized WebP/AVIF only after real source assets exist.
- `@astrojs/sitemap` reads `site`. RSS via `@astrojs/rss` and `getPublishedWriting()`; no drafts.
- Never hardcode project count or claim GitHub stats without data.
- A 404 page should link to Home, Projects, Writing and not redirect silently.

## 9. Tests

- Static/type: `npm run check`, `npm run build`.
- Routes: verify expected HTML files and all local link destinations in `dist/`.
- Browser smoke if Playwright already available; otherwise use simple manual checklist first.
- Browser widths: 360, 768, 1280. Keyboard-only nav; reduced-motion; dark preference when P1 theme is present.
- One test ensuring `draft: true` never appears in public output.
- Screenshot regression optional only if existing testing setup supports it; do not add a full E2E platform for an otherwise static site.

## 10. Technical anti-patterns to reject

- Next.js/React app shell for this scope.
- Content duplicated in `.astro` card markup rather than collections.
- Legacy Tailwind v3 `@astrojs/tailwind` for a new Tailwind v4 project.
- Legacy Astro content config path/API copied from older tutorials.
- Using `base: '/trietle243.github.io'` for the user-site repo (incorrect).
- Any backend form handler or database just to show static content.
- Forcing example posts to be public before facts/review are complete.
