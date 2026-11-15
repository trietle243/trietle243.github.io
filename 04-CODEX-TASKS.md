# Codex Execution Plan — Bounded Tickets

**Rule:** implement one ticket at a time, inspect working tree first, report changed files and checks; **do not push or commit without explicit permission**. No speculative refactors of unrelated files. The first actual implementation ticket starts **after** the user chooses/creates the target directory/repo.

## Milestone map

| Phase | Deliverable | Gate |
|---|---|---|
| A — Foundation | Astro shell, content collections, styling primitives | Build/check pass |
| B — Functional portfolio | Home, experience, projects index + details, contact | 1 approved project case study, complete navigation |
| C — Writing | Writing index, article layout and MDX rendering | Draft exclusion, published article route, code rendering |
| D — Public readiness | a11y, SEO/RSS/sitemap, Actions deploy | Link/content QA, approval, production URL smoke |
| E — Optional polish | Notes, theme toggle, related content | Only after MVP successful |

### P0-A1 — Repository audit and bootstrap

**Do**
- Inspect directory, `git status`, file structure, versions; stop before overwrite if nonempty/unexpected files.
- Confirm target repo `trietle243.github.io` (not profile README repo).
- Scaffold minimal Astro TypeScript with npm, integrate Tailwind v4, MDX and sitemap.
- Add `.gitignore`, `README.md` (project instructions), scripts `dev`, `check`, `build`, `preview`.
- Copy approved `AGENTS.md` guardrails.

**Acceptance**
- `npm ci`, `npm run check`, `npm run build` pass on a fresh checkout or clean dependency install.
- No SSR adapter, React, database or unneeded packages.
- The package lockfile is generated and included in proposed changes.

**Evidence**: commands/results, tree, dependency list. **Do not deploy yet.**

### P0-A2 — Tokens, base layout, navigation

**Do**
- Implement design tokens in global CSS, `BaseLayout`, header/footer, skip link, responsive content wrapper.
- Add title/description metadata and canonical URL helper.
- Implement nav Home/Projects/Writing/GitHub. Create minimal route stubs without made-up copy.

**Acceptance**
- Header fits 360px and desktop, visible focus, all nav links resolve locally.
- No external fonts or large animation dependencies.
- `npm run check && npm run build` pass.

### P0-A3 — Typed content model and public-content policy

**Do**
- Implement `src/content.config.ts` for projects and writing from architecture spec.
- Add `getPublishedProjects` and `getPublishedWriting` helpers.
- Create accurate verified profile facts only; unset optional data stays hidden.
- Add one DSA candidate case study as `draft: true` pending user review; add one writing draft also unpublished.

**Acceptance**
- Invalid frontmatter breaks check/build.
- Drafts do **not** generate project/article routes, home listings, indexes or feeds.
- Unverified work history/metrics absent from public rendering.

### P0-B1 — Homepage content shell

**Do**
- Build Hero, About, Experience section, Featured Work, Recent Writing and Contact.
- Use collection/data sources, not duplicated project snippets.
- Implement truthful empty states for no approved experience/content.

**Acceptance**
- Key routes discoverable from Home and nav.
- At 360px there is no clipping; at 1280px ample whitespace and typography hierarchy.
- No fabricated employers, dates, social links or project claims.

### P0-B2 — Projects directory and minimal filter

**Do**
- Projects index cards and category labels.
- Three category filters (`data`, `tools`, `learning`) plus All; categories can hide empty labels if desired.
- Filter via small progressive enhancement script; without JS all visible.

**Acceptance**
- All published items present initially; filter updates correctly and exposes `aria-pressed`.
- Buttons keyboard-accessible, result counts truthful.
- One invalid/unpublished project never appears.

### P0-B3 — Project details and case study content

**Do**
- Static detail route via `getStaticPaths()`, `render(entry)` and ProseLayout.
- DSA case study draft can be populated with accurately sourced details, then **request explicit approval to flip `draft: false`**.
- Sections: Problem, Approach, Architecture/Design, Implementation, Lessons; use sections as applicable.
- Add repo/demo links only when verified; add back-link.

**Acceptance**
- Published project has its own correct URL, meaningful narrative, readable code/diagram handling.
- All fake placeholders removed from public output.
- Draft project route returns 404/not generated.

### P0-C1 — Writing index and MDX article layout

**Do**
- Build list with date, title, description, tags; newest first.
- Implement dynamic route with MDX render, editorial typography, code blocks and heading styles.
- One first-person introduction post can remain a draft until reviewed.

**Acceptance**
- `.md` and `.mdx` both work; code/links/tables usable.
- Draft article absent from index and output.
- Published article (once explicitly approved) has correct slug/title/date/description.

### P0-C2 — Content workflow documentation

**Do**
- Document how to add/edit/publish project/article and validate frontmatter.
- Update repo README: install, develop, check/build, local preview, authoring, deploy steps.
- Document public-safe content policy, including corporate projects.

**Acceptance**
- New post needs one content file, no component code edits.
- A reviewer can follow steps to publish while verifying `draft: false` and GitHub Actions.

### P0-D1 — QA, basic SEO and deploy configuration

**Do**
- Implement per-route title, description and canonical metadata, and configure GitHub Pages.
- If capacity allows after P0 checks, add the P1 sitemap, RSS (published articles only), and `robots.txt`; otherwise leave these for a clearly reported follow-up ticket.
- Add GitHub Pages deploy workflow using official Astro action and permissions.
- Run local build, inspect output, link smoke and mobile/keyboard review; record observations.
- Don't create or push repo without user's authorization.

**Acceptance**
- All canonical URLs point to the root Pages site; if sitemap/RSS were added, drafts must be excluded from both.
- Clean `npm ci && npm run check && npm run build` passes.
- Deployment workflow is valid; actual remote deploy remains user-approved.
- List tests not run separately; do not claim pass without evidence.

### P0-D2 — User review and public release (explicit approval gate)

**Do**
- Present exact files/pages planned for release, including personal/career/contact text.
- Confirm proposed repository and GitHub Pages settings.
- After user authorizes push, verify Actions run and `https://trietle243.github.io/` live routes.

**Acceptance**
- All public-facing claims reviewed.
- Production URLs for Home, Projects, Writing and published details resolve.
- Report any action that requires user settings access rather than assuming completed.

### P1-E1 — Notes collection (optional)

- Add `notes` collection, `/notes/` and short-form entry pages only after there are actual notes.
- Reuse design components; don't introduce new CMS or analytics.

### P1-E2 — Theme toggle (optional)

- Implement light/dark/OS preference; minimal JS, no flash, accessible control.
- Verify chosen color pairs for text, interactive states and borders.

### P1-E3 — Related content and polish (optional)

- Optional manually curated related projects/articles, more diagrams, one distinctive custom SVG.
- No 3D unless explicitly requested after a content-complete MVP.

## Definition of done for *each* ticket

- Scope only the named ticket. Explain assumptions, changed files and any intentional deferrals.
- Run `npm run check && npm run build` when the project exists, or clearly state why not possible.
- Validate key user-facing behavior; do not call a screenshot or source-code scan a passing functional test.
- No fake or confidential content added.
- No git commit, push, external publication, or destructive command without explicit instruction.
- Finish with a concise review report: changes, verification, risks, next ticket.

## Suggested Codex prompts

**Start A1:**
> Read `AGENTS.md`, `README.md`, `01-PRD.md`, `02-ARCHITECTURE.md`, `03-DESIGN-SPEC.md` and `04-CODEX-TASKS.md`. Inspect the working tree. Implement **P0-A1 only**. Preserve existing code if any. Do not commit, push or deploy. Run local checks. Return changed-file list and evidence.

**Start A2:**
> Implement **P0-A2 only**, using the already approved spec. Keep pages static and design minimal. Verify 360px and desktop behavior if browser tooling exists. No new dependencies unless necessary. Do not commit or push.

**Start B3:**
> Implement **P0-B3 only**. Treat all case study copy as a draft until factual approval. Never describe private work or infrastructure. Check build and draft exclusion. Do not flip draft state without approval; do not commit or push.

**Review release:**
> Audit the site against `01-PRD.md` release checklist and `03-DESIGN-SPEC.md` QA checklist. Do not change code yet. Report PASS/FAIL/NOT VERIFIED with evidence and propose the smallest fixes. Check for sensitive or invented content.
