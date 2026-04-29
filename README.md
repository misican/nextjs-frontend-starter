# Next.js Frontend Starter

Production-ready frontend starter built on Next.js App Router with TypeScript, Tailwind CSS v4, and shadcn/ui-first composition patterns.

This repository is intentionally frontend-focused. Backend services are out of scope unless explicitly added.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui primitives first
- Biome for lint/format checks
- Vitest, Playwright, and Storybook-ready workflow standards

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10+

### Install

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

Open http://localhost:3000.

## Core Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Start Next.js dev server (Turbo mode) |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm preview` | Build then run production server |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm check` | Run Biome checks |
| `pnpm check:write` | Apply safe Biome fixes |
| `pnpm check:unsafe` | Apply all Biome fixes including unsafe |
| `pnpm agile:check` | Validate agile artifact consistency |
| `pnpm agile:scaffold` | Scaffold agile delivery records |
| `pnpm ai:setup` | Refresh AI discovery symlinks |
| `pnpm ai:verify` | Validate AI customization setup |
| `pnpm ai:lint-metadata` | Lint AI customization metadata |

## Frontend Structure Baseline

The project follows a standardized App Router-oriented structure under `src/`.

| Path | Purpose |
|---|---|
| `src/app` | Routes, layouts, loading and error boundaries |
| `src/components/ui` | Reusable UI primitives |
| `src/components/features` | Feature or domain-level components |
| `src/lib` | Shared utilities and client helpers |
| `src/hooks` | Reusable React hooks |
| `src/styles` | Global styles and design tokens |

### App Router Route Conventions

- Create routable pages under `src/app/<segment>/page.tsx`.
- Keep shared segment layout in `src/app/<segment>/layout.tsx` when needed.
- Add optional segment boundaries such as `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- Keep API handlers in `src/app/api/<segment>/route.ts` (or nested segment variants).

## Agile Artifact System

Agile SDLC artifacts are maintained in a canonical layered model:

- Canonical phase artifacts: `docs/specs/agile-artifacts/02-phase-artifacts`
- Delivery records and deltas: `docs/specs/agile-artifacts/03-delivery-records`

When adding, moving, superseding, or archiving delivery records, keep the index and registry synchronized:

- `docs/specs/agile-artifacts/INDEX.md`
- `docs/specs/agile-artifacts/artifact-registry.md`

## AI Workflow Customization

AI customizations are canonical in `.ai/`.

- Always-on instructions: `.ai/copilot-instructions.md`
- Prompt workflows: `.ai/prompts/`
- Agents: `.ai/agents/`
- Skills: `.ai/skills/`
- Hooks: `.ai/hooks/`

IDE discovery paths in `.github/` and `.cursor/` are generated links. Regenerate them with `pnpm ai:setup`.

## Documentation Entry Points

- AI first-run scripts: `docs/guides/ai-first-run-scripts-guide.md`
- AI customization guide: `docs/guides/ai-customization-guide.md`
- Agile artifacts root: `docs/specs/agile-artifacts/README.md`

## Deployment

Default deployment target is Vercel with preview deployments per pull request and regular production releases.
