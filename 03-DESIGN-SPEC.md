# Visual Design Specification — Quiet Engineering Notebook

**Design goal:** An original, calm digital notebook for a technical writer who also builds things. Preserve Vik's effective functional flow, not his pixel-art visuals, ASCII art, typography, or layout reproduction.

## 1. Visual personality

**Five adjectives:** editorial / grounded / curious / precise / human.

- Warm neutral paper-like background, readable deep-charcoal ink.
- One restrained **deep teal** accent, not rainbow tech badges.
- Large readable headings with quiet uppercase/monospace section labels.
- Structured whitespace and hairline separators rather than box-heavy dashboard UI.
- Small terminal/notebook details: section index `01 / SELECTED WORK`, a single inline prompt `>_`, subtle code borders.
- Real screenshots and diagrams in case studies, not decorative stock art.

**Explicitly avoid:** pixel-font imitation, smiling-face avatar mimicry, animated ASCII pretzel, enormous hero GIF, glowing gradients, GitHub streak widgets as hero, fake terminal apps that need JS to display basic content.

## 2. Page anatomy

### Homepage layout

```text
┌────────────────────────────────────────────────────────────┐
│ TRIET / FIELD NOTES               Projects  Writing  GitHub│
├────────────────────────────────────────────────────────────┤
│ 01 / INTRODUCTION                                          │
│                                                            │
│ Hey, I'm Triet.                                            │
│ Data, code, and everything in between.                     │
│                                                            │
│ I work with data and enjoy understanding how systems work. │
│ [Explore projects]  [Read my writing]                       │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ 02 / ABOUT                                                 │
│ Short, sincere first-person background                     │
├────────────────────────────────────────────────────────────┤
│ 03 / EXPERIENCE                                            │
│ • Role — Organization / verified dates                     │
│   What I worked on (approved summary)                     │
├────────────────────────────────────────────────────────────┤
│ 04 / SELECTED WORK                         [All projects]   │
│ ┌───────────────────────┐ ┌──────────────────────────────┐ │
│ │ DSA as a Non-IT Guy   │ │ Second verified project      │ │
│ │ Learning • Python/Go  │ │ Category • Stack            │ │
│ └───────────────────────┘ └──────────────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│ 05 / RECENT WRITING                         [All writing]   │
│ Title                                           YYYY-MM-DD  │
│ Title                                           YYYY-MM-DD  │
├────────────────────────────────────────────────────────────┤
│ 06 / CONTACT                  GitHub • LinkedIn • Email     │
└────────────────────────────────────────────────────────────┘
```

At launch with only one approved project or zero published posts, **adapt the grid and use truthful empty states**; never insert fictional projects or dates to fill space.

### Projects index

- Editorial heading and 2–3 sentence intro.
- Filters: understated segmented buttons/chips (`All`, `Data`, `Tools`, `Learning`). Default `All`.
- Items as two-column cards on wide screens; one-column list on mobile; cards distinguish by title/summary/category, not colorful icons.
- Hover: slight border/accent shift; no zoom explosion.

### Project detail

- Breadcrumb: Home / Projects / Case Study.
- Large H1, 1–2-sentence synopsis, metadata/tags and verified external links.
- Main narrative max 72ch; occasional full-width diagram/code/image inside the content column or controlled bleed.
- Clear section labels: problem, constraints, decisions, architecture, implementation, lessons.
- Back to Projects and related writing link near bottom.

### Writing index and article

- Writing list feels like a publication: **title, excerpt, date, tags**, generous line spacing.
- Article max 68–72 characters; left aligned, not center-justified; nice heading rhythm.
- Code blocks in dark, monospace surface even in light theme, horizontally scrollable.
- No sticky sidebar TOC in MVP; add only if article depth warrants it.

## 3. Design tokens

### Colors

| Token | Light | Dark (P1) | Usage |
|---|---|---|---|
| `--canvas` | `#F7F5F0` | `#12191D` | Page background |
| `--surface` | `#FFFEFB` | `#1D272C` | Card/code-frame backgrounds |
| `--ink` | `#182028` | `#EEF0EA` | Headlines, body text |
| `--muted` | `#58616B` | `#AFBAB9` | Metadata, secondary copy |
| `--border` | `#D9D6CE` | `#38464B` | Rules, card borders |
| `--accent` | `#275D62` | `#80C1BD` | Links, emphasis, focus |
| `--code-bg` | `#121B20` | `#10171A` | Code blocks |
| `--code-ink` | `#E7EEE9` | `#E7EEE9` | Code text |

Verified approximate contrast ratios against their page canvas: light ink 15.1:1, light muted 5.78:1, light accent 6.81:1; dark ink 15.46:1, dark muted 8.92:1, dark accent 8.69:1. Recheck any new colors against actual surfaces and interactive states.

Use CSS custom properties; styling can be written in Tailwind classes or one global stylesheet. Do **not** add a separate runtime theme package.

### Typography

- Body: system UI font stack (`ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif`). No external font request required.
- Editorial display: same family but semibold and tight letter spacing for consistency. Optionally use a locally bundled font later (not MVP).
- Mono: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` for labels, dates and code.
- H1 responsive clamp `clamp(2.8rem, 7vw, 5rem)`; line-height ~1.08; letter-spacing -0.035em.
- H2 `clamp(1.6rem, 3vw, 2.25rem)`; line-height 1.2.
- Body 1rem–1.0625rem, line-height 1.7; prose 1.05–1.125rem line-height 1.75.
- Small metadata 0.75–0.8125rem mono, tracking 0.06em and uppercase sparingly.
- Link underlines visible by default in prose; buttons clearly differentiated.

### Spacing and containers

- Root page width: `max-width: 1120px` / `padding-inline: clamp(20px, 4vw, 48px)`.
- Hero readable measure: `max-width: 780px`.
- Article column: `max-width: 72ch`.
- Rhythm: 4px base scale; core steps 8, 12, 16, 24, 32, 48, 64, 96px.
- Section vertical gap: 72–112px desktop, 52–72px mobile.
- Card padding: 24–32px desktop, 20–24px mobile.
- Corners: `10–14px` on content cards, small `6px` on chips/buttons; no pill-everything design.
- Borders 1px neutral; shadows limited to a very subtle hover state if used at all.

### Layout and breakpoints

| Width | Rule |
|---|---|
| `< 640px` | Single column; nav never overflows; buttons stack/wrap |
| `640–1023px` | Single main column or 2-card grid when space permits |
| `>= 1024px` | Hero spacious; selected work in 2 columns; prose remains narrow |

Do not build a separate mobile experience or hamburger menu unless links actually cannot fit; initial short nav should fit by simplifying labels.

## 4. Component contracts

### `SiteHeader`
- Small typographic brand `TRIET / FIELD NOTES`; nav Home, Projects, Writing, GitHub.
- Current route marked `aria-current="page"`; sticky header optional, not mandatory.
- Keyboard focus clear; small screens should keep nav tappable.

### `Hero`
- Single H1, eyebrow `01 / INTRODUCTION`, short copy, two destination links.
- Decorative accent: one small `>_` or vertical rule. No auto-typing effect.

### `SectionHeading`
- Mono label `NN / LABEL`, semantic H2, optional small plain-text link.
- Reused to give pages a coherent editorial rhythm.

### `ExperienceTimeline`
- Vertical hairline + one compact dot per entry; aligned role/company/dates; up to 3 bullets.
- Mobile: left border and stacked metadata. No horizontal scrolling.
- If empty, never show fake timeline entries.

### `ProjectCard`
- Clickable title to detail; title not embedded in nested clickable div.
- Category label, summary, tags (max 3 visible), optional verified links.
- Hover/focus border accent; height can vary naturally.

### `ProjectFilter`
- Buttons with `aria-pressed`; `All` visible by default.
- Content remains visible without JS; with JS, filter cards; announce result count to screen readers via polite live region if cheap.
- Avoid query routing/state libraries for three categories.

### `ArticleCard`
- Title, date, excerpt, tags; whole-card click area optional but must not create nested links.
- Writing list should emphasize typography, not thumbnails.

### `Tag`
- Low-contrast outlined chip; avoid color alone to denote category.
- Clickable only if an actual tag destination exists; otherwise plain text.

### `ContactLinks`
- GitHub always; other links conditional on verified data.
- Email copy button P1 only if email supplied and HTTPS/browser support; clickable `mailto:` is enough for MVP.

### `ProseLayout`
- Link styling, lists, blockquotes, tables with overflow handling, readable code; anchorable headings optional.
- Image caption and alt text support, distinguish diagrams from decoration.

## 5. Interaction states and motion

- Hover: use a modest ~150ms color/border transition.
- Focus: 2px visible outline and 2px offset in accent; must work via keyboard.
- Reduced motion: `@media (prefers-reduced-motion: reduce) { ... }`; disable nonessential animation.
- Do not animate every element on scroll; no parallax, no forced motion to read content.
- Theme toggle P1: auto/light/dark behavior; OS preference as default, optional localStorage when visitor selects preference. Site must be readable without JS.

## 6. Asset guidelines

- No external stock avatars or borrowed visuals from Vik.
- Prefer screenshots of actual public projects, sanitized architecture diagrams and original diagrams.
- Use simple custom SVG favicon (e.g. `>_` glyph) built as code, not copied artwork.
- If an avatar is used, user supplies/approves image; no guessing personal appearance or identity.
- Add OG image only when a consistent asset is ready; metadata must not reference missing assets.

## 7. Design QA checklist

- [ ] Design looks distinct from Vik (no pixel font, pretend-screen recreation or ASCII art clone).
- [ ] H1/H2/readable body hierarchy unmistakable.
- [ ] 360/768/1280px layouts tested, no horizontal body scroll.
- [ ] Keyboard focus visible, skip-to-content works.
- [ ] Light theme contrast acceptable; dark P1 theme tested when implemented.
- [ ] Prose and code blocks legible, long lines do not break mobile.
- [ ] No unexplained generic stock graphics, lorem ipsum, or fake project thumbnails.
- [ ] Every interactive control performs the described action.
