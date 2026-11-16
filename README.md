# Triet's Engineering Field Notes — implementation package

Status: **foundation, content system, and homepage shell implemented through P0-B1; projects directory and public release pending**.
Prepared: 2026-11-15. Target: `https://trietle243.github.io/` (proposed, not verified live).

## Read in this order

1. [`01-PRD.md`](01-PRD.md) — product decisions, scope, user stories, acceptance criteria.
2. [`02-ARCHITECTURE.md`](02-ARCHITECTURE.md) — routes, content schemas, file tree, deployment, technical contracts.
3. [`03-DESIGN-SPEC.md`](03-DESIGN-SPEC.md) — original design language, tokens, component and interaction rules.
4. [`04-CODEX-TASKS.md`](04-CODEX-TASKS.md) — ordered, bounded tickets with tests and definition of done.
5. [`05-AGENTS.md`](05-AGENTS.md) — copy to the future project's `AGENTS.md` so Codex follows the project guardrails.
6. [`06-CODEX-KICKOFF.md`](06-CODEX-KICKOFF.md) — copy/paste prompt to start implementation safely.

## Decisions already made

- Functional reference: Vik's portfolio `https://thangbuiq.github.io/` (homepage, experience timeline, projects directory, per-project details, contact cards). **Do not copy its visual design or source code**.
- Original identity: *quiet engineering notebook*. Editorial layout, warm neutrals, dark teal accent, one compact terminal-inspired motif.
- Stack: **Astro + TypeScript + Tailwind CSS v4 + Markdown/MDX**, statically generated, deployed via **GitHub Actions to GitHub Pages**.
- GitHub Pages **user site** target repository: `trietle243/trietle243.github.io`. Separate from GitHub **profile README** repository: `trietle243/trietle243`.
- Homepage includes About, Experience and Contact; Projects and Writing have indexes and detail pages.
- No database, API server, admin/CMS, authentication, trackers, heavy animation, or third-party comment system in MVP.
- Do not invent or expose corporate/internal details, employer experience dates, performance numbers, or personal contact information. Only publish verified and approved content.
- Codex should implement only the next authorized ticket, inspect the repo before changes, run local checks, and not commit/push without explicit permission.

## Official documentation checked

- https://docs.astro.build/en/guides/deploy/github/
- https://docs.astro.build/en/guides/content-collections/
- https://docs.astro.build/en/guides/integrations-guide/mdx/
- https://docs.astro.build/en/guides/styling/
- https://docs.astro.build/en/guides/integrations-guide/sitemap/
- https://docs.astro.build/en/recipes/rss/

## Source basis and caveats

The Vik feature observations are grounded in the screencast and Wappalyzer CSV shared in this conversation, plus its public website. Wappalyzer fingerprinting suggests Next.js, React, Tailwind, Three.js, and GitHub Pages; it does **not** prove the underlying source architecture. No permission to reuse Vik's implementation or branding is assumed.

## Local bootstrap (P0-A1)

The specification above is preserved as the original project context. The minimal
Astro scaffold now lives in this directory. P0-A2 adds the shared layout and
navigation; content collections and authored content belong to later tickets.

Use Node.js >=22.23.4 and npm >=9.6.5. The bootstrap environment has Node.js
24.14.1 and npm 11.11.0.

```sh
# Initial dependency resolution, or when intentionally updating dependencies:
npm install
# Once package-lock.json has been generated, use clean installs:
npm ci
npm run dev
```

```sh
npm run check
npm run build
npm run preview
```

`build` emits static files to `dist/`; `preview` serves that build locally.
Tailwind v4 uses `@tailwindcss/vite` and `src/styles/global.css`. MDX and sitemap
are registered Astro integrations. TypeScript extends Astro's strict configuration.
No SSR adapter or client framework is configured.

The intended remote is `trietle243/trietle243.github.io`, separate from the profile
README repository `trietle243/trietle243`. Static output uses
`site: 'https://trietle243.github.io'`, trailing slashes, and no `base`, following
the [official Pages guidance](https://docs.astro.build/en/guides/deploy/github/).
Repository creation/association, Pages settings, and the deployment workflow are
deferred; no deployment is part of P0-A1.

### Bootstrap verification limitations

At the initial bootstrap, the supplied `.git/` directory was empty. Git is now
initialized, with all source files untracked, no commits, and no configured remote.
`AGENTS.md` is copied from the supplied `05-AGENTS.md`; all original specification
files are retained.

Initial bootstrap installation was blocked by registry DNS (`EAI_AGAIN`). The
subsequently verified baseline includes the generated `package-lock.json` and
cached dependencies. Clean installation now succeeds offline; preserve that
lockfile for reproducible installs.

Keep personal/career facts out of the scaffold. Follow `AGENTS.md` for the
public-content policy and approval requirements.

## Foundation layout (P0-A2)

- `src/styles/global.css` defines the approved light palette, system typography,
  4px spacing scale, surfaces, borders, radii, container widths, and focus ring.
  Tailwind v4 utilities share the same color/font tokens via `@theme inline`.
- `src/layouts/BaseLayout.astro` owns metadata, canonical URLs, skip link,
  header/footer, and the responsive main container. Pages supply a description
  and optional title. `src/utils/seo.ts` builds trailing-slash canonical URLs.
- The short navigation stays visible and wraps on narrow screens, with ordinary
  links and no client JavaScript. Projects/Writing intentionally point to
  `/#projects` and `/#writing`: labelled homepage placeholders, not directories
  or articles. Replace these destinations when their route tickets are implemented.
- `src/data/site.ts` holds the approved site identity/GitHub destination and
  optional `contact.linkedin` / `contact.email`. Set only user-approved values;
  absent values produce no links. `SiteFooter` also accepts a typed contact prop.
- Light mode is deliberate; dark mode/theme controls remain P1. No animation,
  client framework, external fonts, or runtime JavaScript is added.

Validation: clean cached `npm ci --offline --no-audit --no-fund`, Astro check
(zero errors/warnings/hints), and static build pass. Built-HTML smoke checks
cover landmarks, local anchor targets, metadata, and absence of scripts.
Chrome launch is blocked by the environment (`setsockopt: Operation not
permitted`), so visual overflow checks at 320/360/768/1280px and keyboard behavior
still need a browser review; source/HTML checks do not establish those results.

## Content system (P0-A3)

Projects and writing now use Astro Content Layer collections with validated
frontmatter, typed access helpers, and one unpublished example MDX fixture each.
See [CONTENT.md](CONTENT.md) for the current schemas, filename/ID conventions,
authoring, validation, and draft-to-published workflow. No content pages or
homepage changes are part of this ticket.

The latest hosting direction is Cloudflare Pages with a private GitHub repository.
Earlier GitHub Pages references describe the original plan; hosting configuration
has deliberately not changed in P0-A3.

## Homepage shell (P0-B1)

The homepage (`src/pages/index.astro`) implements a 5-section vertical flow:
- `01 / INTRODUCTION`: Hero heading, nickname tooltip (`Phil`), typewriter role cycling, verified contact chips (GitHub, LinkedIn, Email with one-click copy), and responsive full-width ASCII portrait (`triet.txt`).
- `02 / ABOUT ME`: Sincere single-paragraph narrative.
- `03 / EXPERIENCE`: Data-driven career timeline powered by `src/data/experience.ts` with verified roles across Home Credit Vietnam, MWG, and Lotte Vina International.
- `04 / PROJECTS`: Wired to `projects` collection with draft filtering.
- `05 / WRITING`: Wired to `writing` collection with draft filtering and link to `/writing/`.

Next ticket after review: **P0-B2 — Projects directory and minimal filter**.
