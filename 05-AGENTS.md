# AGENTS.md — Triet's Engineering Field Notes

This is a static personal portfolio and engineering writing site. **Keep it simple.**

## Product invariants

- Original editorial aesthetic; Vik's site is a **functional reference only**.
- Astro + TypeScript + Tailwind CSS v4 + Markdown/MDX; static output to GitHub Pages.
- Keep Projects and Writing as Astro content collections in `src/content.config.ts`.
- Home, Projects, Writing, and their real detail routes must work without a JS application runtime.
- Build from existing content; no backend, database, CMS, auth, live external APIs or unrelated features.
- Do not invent employers, dates, public GitHub repositories, published metrics, personal contact info or blog articles.
- Never expose confidential corporate code, schemas, hostnames, screenshots, internal diagrams, credentials, or data.
- `draft: true` by default; exclude drafts from all public lists, detail routes, sitemap and RSS.

## Working style

1. Before edits: inspect `git status`, tree, current scripts and relevant code. Preserve user changes.
2. Follow the smallest relevant P0 ticket in `04-CODEX-TASKS.md`, never implement later phases opportunistically.
3. Prefer native Astro, simple HTML and small vanilla JS. Avoid adding React, state libraries, animation suites or build-time APIs without a concrete need.
4. Use design tokens from `03-DESIGN-SPEC.md`; keep accessible semantics, keyboard focus and reduced motion.
5. Run `npm run check && npm run build` after code changes; record actual results. Test real routes and mobile view if tools exist.
6. Report changes, tests, known gaps and suggested next ticket.
7. **Do not commit, push, deploy, publish public content, or modify remote settings without explicit user authorization.**
8. If a content fact needs approval, leave it as a draft/TODO in source, not as public-facing filler.

## GitHub Pages specifics

- Intended user-site repo: `trietle243/trietle243.github.io`.
- Astro `site: 'https://trietle243.github.io'`, no `base` for this repository name.
- Use official GitHub Pages Actions workflow and lockfile-based install; do not require a service account or secrets.

## Quality rules

- One clear H1 per page, usable heading hierarchy, accessible links/buttons, keyboard navigation.
- No horizontally overflowing content at 360px. Long code is scrollable.
- No deceptive empty cards or filler; show honest empty states.
- Do not use labels or icons to imply interactions that are not implemented.
- No cosmetic 3D/particle effects in MVP.
