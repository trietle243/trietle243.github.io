# Codex Kickoff Prompt

You are implementing **Triet's Engineering Field Notes**, a personal portfolio and blog for GitHub Pages.

Read these documents fully before making changes:

1. `AGENTS.md`
2. `01-PRD.md`
3. `02-ARCHITECTURE.md`
4. `03-DESIGN-SPEC.md`
5. `04-CODEX-TASKS.md`

## Current instruction

Implement **ticket P0-A1 only — Repository audit and bootstrap**. Do not start A2 or later tickets.

Requirements:

- Inspect the current directory and `git status` first; never overwrite an existing project without approval.
- Target a GitHub Pages **user site** repo named `trietle243.github.io`, separate from profile README repo `trietle243`.
- Bootstrap Astro + TypeScript + Tailwind CSS v4 + MDX, static output. Prefer npm and preserve the lockfile.
- Avoid React, SSR, database, backend, auth, CMS and unrelated dependencies.
- Scaffold basic scripts and documentation; don't add invented portfolio facts.
- Run `npm run check && npm run build`, and report the results honestly.
- Provide a concise file-change summary, blockers, and what remains for P0-A2.
- **Do not commit, push, create a remote GitHub repository, modify Pages settings, or deploy.**

If existing files conflict with this plan, stop and report the conflict rather than deleting or replacing them.
