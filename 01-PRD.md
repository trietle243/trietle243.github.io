# Product Requirements Document (PRD)

**Product:** Triet's Engineering Field Notes  
**Release:** MVP 1.0 (specification)  
**Owner:** `trietle243`  
**Status:** Approved direction from conversation; content/repo deployment not yet verified  
**Last updated:** 2026-11-15

## 1. Product thesis

> A calm, technically credible personal home for showing what I build and explaining how I learn.

The site combines a **portfolio** (who, experience, projects, contact) with an **engineering notebook** (writing, eventually short notes). Visitors should find evidence of practical work and the reasoning behind it, not a wall of badges and counters.

### Audiences and jobs-to-be-done

| Audience | What they need | Design response |
|---|---|---|
| Hiring manager / collaborator | Understand focus, skills, experience, real work | Clear hero; scannable experience timeline; featured projects; links |
| Engineer | Evaluate technical decisions, implementation depth | Case studies with problem, architecture, tradeoffs, lessons |
| Fellow learner | Discover understandable, personal articles | Writing index, topic tags, readable MDX posts |
| Future self | Maintain a record of experiments | Git-based content with simple frontmatter and no CMS |

### Success criteria (behavioral, not vanity metrics)

1. Visitor can reach any featured case study in **two clicks from Home**.
2. Visitor can reach writing from persistent navigation, and read without login or JavaScript.
3. Owner can publish a new post by adding **one `.md`/`.mdx` file and pushing to `main`**.
4. No unverified work history, fabricated metrics, credentials, or proprietary data appears on public pages.
5. Production build and Pages deployment are reproducible from a clean checkout.

## 2. Positioning and content voice

**Name:** Triet's Engineering Field Notes  
**Short label in nav:** `TRIET / NOTES`  
**Tagline:** `Data, code, and everything in between.`  
**Secondary line:** `Building things, breaking things, writing about what I learn.`

Voice: first-person, grounded, warm, lightly playful; avoid corporate buzzwords, self-assigned expert titles, unverified achievements, or overstuffed skill badges. English-first MVP; Vietnamese posts are allowed if labeled correctly later. Avoid automated translation or two-language routing initially.

### Content sourcing rules

- Public GitHub projects may be linked only when URL and ownership are checked.
- The DSA learning repository is a candidate: `https://github.com/trietle243/i_learn_dsa_as_a_non_IT_guy`; verify before publishing.
- Corporate work (e.g. SEER) stays out of public pages **unless content is specifically authorized**. If featured later, generalize and use synthetic datasets where authorized; never expose internal hosts, schemas, paths, staff, SQL, proprietary architectures or unreleased results.
- Experience employers, job dates, social accounts, and email addresses require user-confirmed values. Keep optional fields blank/hidden rather than guessing.
- Seed posts may be in `draft: true` until the user reviews content; do not present invented articles as published work.

## 3. Functional scope and priorities

### P0 — required for first public launch

| ID | Feature | Expected behavior |
|---|---|---|
| P0-01 | Responsive shell | Header/nav, main content, footer; accessible keyboard navigation |
| P0-02 | Home | Hero, brief bio, selected work, latest writing, Experience area (data-driven), contact/social links |
| P0-03 | Project directory | `/projects/`; list/cards, category labels; client-side filter with usable no-JS fallback showing all |
| P0-04 | Project detail | `/projects/<slug>/`; meaningful problem, approach, architecture, implementation, lessons, external URLs if verified |
| P0-05 | Writing directory | `/writing/`; reverse-chronological articles; tag labels and date |
| P0-06 | Writing detail | `/writing/<slug>/`; MD/MDX rendering, headings, code highlighting, metadata, readable typography |
| P0-07 | Content model | Validated Astro collections for `projects` and `writing`; drafts excluded from public pages and RSS |
| P0-08 | Pages deployment | GitHub Actions build, deploy, working routes and assets at `https://trietle243.github.io/` |
| P0-09 | Contact | GitHub link; optional LinkedIn/email only after validated; no contact backend |
| P0-10 | Quality | No broken internal links, accessible interactions, sensible mobile layout, build/check passes |

**Experience nuance:** the component and section belong to MVP, but if approved work history is not supplied, **do not publish placeholder companies/dates**. Render a truthful short background summary or conditionally hide the timeline entries until approved.

### P1 — next iteration, not a blocker for initial deploy

- `/notes/` directory and short-form notes collection; optional index of work-in-progress.
- Theme switcher with persisted user preference and OS-default support.
- RSS feed at `/rss.xml`, sitemap, `robots.txt`, canonical URLs, Open Graph image/metadata.
- Tag/category landing pages only if enough content; otherwise tags are informational chips.
- Cross-links between projects and posts (`relatedWriting` IDs or a simple manually entered list).
- Image gallery for case study screenshots, if there are actual images.

**Implementation recommendation:** RSS + sitemap are inexpensive; implement in the final quality/deployment ticket if capacity allows. Other P1 items are deferred by default.

### Explicitly out of scope

- User accounts, authentication, comments, forms that submit to servers, CMS/admin, database, API server.
- Deployment to infrastructure other than GitHub Pages.
- Live GitHub/LinkedIn ingestion, live analytics dashboard, project auto-scraping.
- 3D mascot, animated ASCII centerpiece, particle backgrounds, mandatory GSAP/Three.js.
- Internationalization routing, full-text search, newsletter, integrations, custom domain purchase.
- Reproducing Vik's UI, typography, graphics, or code.

## 4. Information architecture and user flows

### Primary navigation

`Home  |  Projects  |  Writing  |  GitHub [external]`

Use Home sections for About, Experience and Contact in MVP rather than multiplying top-level pages. In future, `Notes` may be added to nav; `About` gets a standalone route only if content justifies it.

### Route contract

| URL | Content | Rendering |
|---|---|---|
| `/` | Hero, About, Experience, 2–3 featured projects, 2–3 latest posts, Contact | Static |
| `/projects/` | Project listing, categories, filter | Static + tiny progressive JS |
| `/projects/<slug>/` | Case study | Static from `projects` collection |
| `/writing/` | Articles index | Static |
| `/writing/<slug>/` | Article | Static from `writing` collection |
| `/404.html` | Helpful not-found page | Static |
| `/rss.xml` (P1) | Published writing only | Build-time endpoint |
| `/notes/` (P1) | Short learning notes | Static collection |

### Key journeys

1. Home → featured project → case study → GitHub repo/demo → back to Projects.
2. Home/Navigation → Writing → article → next relevant post or Projects.
3. Home → Experience → Contact → GitHub/LinkedIn/email (only valid destinations).
4. Author → create MDX file + frontmatter → local `npm run check && npm run build` → approved push → Pages deployed.

## 5. Detailed requirements and acceptance

### Homepage

- H1 `Hey, I'm Triet.` with one-line positioning, not a resume dump.
- Short intro (max 2–3 brief paragraphs) and one primary link `Explore projects`, secondary `Read my notes`.
- Experience timeline rows show role, organization, date range, 1–3 meaningful bullets **only if verified**. No fake metrics.
- Featured projects reuse the same data used by `/projects/`; no duplicated hard-coded content.
- Recent writing shows latest published posts, otherwise one gentle empty-state line (no fabricated cards).
- Contact shows verified GitHub, with LinkedIn/email rendered only when configured.
- Acceptance: homepage usable at 360px width without horizontal scrolling; primary links accessible by keyboard.

### Projects index

- Project card/list shows title, short summary, category, tags, optional status, and Details link.
- At least one useful filter (`All`, `Data`, `Tools`, `Learning`) where present; filter should work with both pointer and keyboard. With JS disabled, all published items remain visible.
- Featured vs other work is data-driven; sort featured first, then newest if dates exist; no fake sorting dates.
- No Repo/Demo buttons if URL is absent.
- Acceptance: filter updates `aria-pressed`, empty state never traps visitors, all detail links resolve.

### Project detail / case study

- Header contains title, context, year if verified, tags, links if valid.
- Editorial structure: **The problem → My approach → Architecture → Implementation → Results & lessons**. Content can adapt naturally; not all sections require numeric metrics.
- Images have explanatory alt text; diagrams have accessible captions or nearby textual explanation.
- Tradeoffs are more valuable than a wall of technology badges.
- Acceptance: content readable on mobile, no horizontal overflow from code or diagrams, meaningful content and no boilerplate placeholders.

### Writing

- Markdown (`.md`) for simple posts; MDX (`.mdx`) only when embedded components are useful.
- Required frontmatter: `title`, `description`, `pubDate`, `tags`. Optional: `updatedDate`, `draft`, `featured`, `cover`.
- Post body supports headings, lists, tables, images, fenced code, external links.
- Articles include human-friendly date; no fake reading time required for MVP.
- Acceptance: draft posts never appear in index, detail routes, RSS, or sitemap; missing frontmatter fails `astro check` / build.

## 6. Quality bars and release gates

- **Accessibility:** semantic landmarks, labelled links, visible focus, no color-only meaning, contrast >= WCAG AA 4.5:1 for normal text, reduced motion honored.
- **Performance:** no client-side framework shipped by default; avoid autoplay video and heavy external scripts. Target good Lighthouse mobile scores (>=90 for Performance and Accessibility on typical tested pages, report measured result rather than claiming it).
- **Responsive:** review 360, 768, 1280px viewport widths; long paths and code lines wrap/scroll safely.
- **SEO:** per-page title/description, consistent canonical URLs; sitemap/RSS P1.
- **Privacy:** no trackers, cookies or analytics unless separately requested and documented.
- **Security:** external anchors `rel="noopener noreferrer"` where appropriate; never expose runtime keys; public static content only.
- **Deployment:** Actions workflow successful; Pages source configured for Actions; `astro.config.mjs` `site` root and **no `base`** for `trietle243.github.io` repo.

## 7. MVP release checklist

- [ ] Design tokens/layout match spec across desktop/mobile.
- [ ] Home, Projects, Writing and detail routes work.
- [ ] At least one **approved** public case study; more may remain drafts.
- [ ] At least one **approved** real post if Writing is to be presented as populated; otherwise show truthful empty state.
- [ ] No invented profile/company/date/contact facts.
- [ ] `npm run check` and `npm run build` pass from clean install.
- [ ] Keyboard nav, contrast, alt text, responsive and reduced-motion checks pass.
- [ ] GitHub Actions build/deploy passes; published internal links work.
- [ ] User explicitly reviews and approves the content before public publish.

## 8. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Publishing corporate or inaccurate facts | Draft-by-default for uncertain content; explicit public-content review gate |
| Scope creep | P0/P1 split and one-task-at-a-time Codex execution |
| Flashy visuals obscure work | One decorative motif, no heavy 3D for MVP |
| GitHub Pages path errors | Use user-site repo and no `base`, verify deployed links |
| Markdown grows inconsistent | Zod-validated Astro content schemas and editorial layout |
| Site launches empty | One approved authentic project/post or transparent empty state; never invent content |

## 9. Reference boundaries

Vik's site informed the **functional organization**: hero, experience timeline, categorized projects, detail pages, contact. The source screencast and CSV do not authorize copying source implementation, illustrations, color palette, or typography. This site's visual identity and content model are original.
