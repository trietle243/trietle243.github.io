# Content authoring

The P0-A3 schema is defined in `src/content.config.ts`. It supersedes the earlier
illustrative field names in `02-ARCHITECTURE.md` (for example, use `publishedAt`,
not `pubDate`). No content directory/detail pages or feeds are implemented yet.
Adding content does not currently create a public route.

## Organization and IDs

```text
src/content.config.ts
src/content/projects/*.md or *.mdx
src/content/writing/*.md or *.mdx
src/utils/content.ts
```

Use Markdown for ordinary text and MDX when embedded Astro components are useful.
Keep filenames lowercase and hyphenated, such as `a-small-parser.md`. Astro's
`glob()` loader derives the entry `id` from the relative filename without its
extension. A nested `tools/a-small-parser.md` becomes `tools/a-small-parser`.
Treat IDs as stable future slugs. Avoid duplicate IDs, including `.md` and `.mdx`
versions of the same name. Do not set a separate `slug` field.

The `example-project.mdx` and `example-article.mdx` files are schema fixtures.
`learning-dsa-as-a-non-it-guy.mdx` and `why-im-building-an-engineering-notebook.mdx`
are candidate drafts pending full content population and explicit approval before
publication. All fixtures and drafts must remain `draft: true` until reviewed.

## Frontmatter contract

All text fields must be nonempty after trimming. Unknown frontmatter keys fail
validation to catch typos. Booleans must be YAML booleans, not quoted strings.
Arrays may be empty; their supplied members must be nonempty strings.

| Project field | Requirement |
| --- | --- |
| `title`, `summary` | Required strings |
| `category` | Required: `data`, `tools`, or `learning` |
| `technologies` | Required string array; use `[]` if empty |
| `status` | Required: `active`, `completed`, or `archived` |
| `featured` | Boolean, defaults to `false` |
| `draft` | Boolean, defaults to `true` |
| `publishedAt`, `updatedAt` | Optional dates |
| `repositoryUrl`, `demoUrl` | Optional absolute HTTP/HTTPS URLs |

| Writing field | Requirement |
| --- | --- |
| `title`, `description` | Required strings |
| `publishedAt`, `updatedAt` | Optional dates |
| `tags` | String array, defaults to `[]` |
| `draft` | Boolean, defaults to `true` |

Use ISO dates (`YYYY-MM-DD`) or ISO timestamps with an explicit timezone.
Dates are converted to `Date` values. Omit unset dates and URLs rather than using
empty strings or `null`. Drafts need no invented publication date. Undated
published articles are allowed and sort after every dated article; use a real
publication date when known. Dates do not schedule publication: only the draft
flag controls inclusion. A future date with `draft: false` is included immediately.

## Add a project

1. Create a new file in `src/content/projects/` using the filename convention above.
2. Add the required frontmatter and keep `draft: true`. For example, this template
   is deliberately an example and must not be published as real work:

```yaml
---
title: "Example project — replace with a reviewed title"
summary: "Example only — replace with an accurate summary."
category: learning
technologies: []
status: active
featured: false
draft: true
---
```

3. Write the actual problem, decisions, and lessons in the body. Add verified
   repository/demo links only when available. `featured: true` never overrides draft.
4. Validate locally, review facts and public safety, then follow the publication
   workflow below. Do not copy confidential corporate information.

## Add a blog post

Create a file in `src/content/writing/`, add the following draft frontmatter,
and write the actual article body. These example strings are not publishable copy.

```yaml
---
title: "Example article — replace with a reviewed title"
description: "Example only — replace with an accurate description."
tags: []
draft: true
---
```

Add `publishedAt` only when its value is known; `updatedAt` records an actual later
edit. No component change should be needed once the public routes are implemented.

## Review and publication

1. Author with `draft: true` (also the safe default when omitted).
2. Validate all entries, including drafts. Review claims, dates, links, and any
   project material for factual accuracy and permission to share.
3. Obtain explicit approval before setting an entry to `draft: false`. Keep the
   two schema fixtures as drafts permanently. No employers, results, metrics, or
   private data may be invented to fill a page.
4. Revalidate, inspect public output when routes exist, and obtain separate
   authorization for commit, push, or deployment. A private source repository
   does not make built website content private.

Use the typed helpers in `src/utils/content.ts` for all future public listings,
detail-route paths, featured selections, and feeds:

```ts
getPublishedProjects(): Promise<CollectionEntry<'projects'>[]>
getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]>
getPublishedWriting(): Promise<CollectionEntry<'writing'>[]>
sortArticlesByDate(articles: readonly CollectionEntry<'writing'>[]): CollectionEntry<'writing'>[]
```

The first three helpers exclude drafts. Published writing is sorted newest first,
undated last, then by ID for equal dates. The sort helper returns a new array and
does not filter; use `getPublishedWriting()` for public access. Project retrieval
does not promise an editorial order; future pages can choose one explicitly.

## Validate

```sh
npm ci
npm run check
npm run build
```

Astro sync during check/build loads both collections and validates every file.
Missing fields, invalid enums, malformed dates/URLs, incorrect types, or unknown
keys fail validation. Check generated output before release: content collection
files are not routes by themselves. Future pages must use the draft-filtering
helpers; schema validation alone cannot enforce draft filtering in arbitrary code.

The latest target is Cloudflare Pages with a private GitHub repository. Existing
hosting configuration and older GitHub Pages references are intentionally unchanged
in P0-A3; reconcile them in a separately authorized hosting ticket before release.
