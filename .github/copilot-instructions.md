# Project AI Instructions

## Project Scope
- This repository is frontend-focused; avoid introducing backend architecture or APIs unless explicitly requested.
- Prioritize Next.js App Router patterns and existing project conventions.

## UI and Styling
- Prefer existing shadcn/ui components before custom UI markup.
- Use Tailwind semantic tokens and existing design primitives; avoid hard-coded color values.
- Keep implementations minimal and aligned with current component patterns.

## Agile Artifacts Constraints
- Canonical artifacts live in `docs/specs/agile-artifacts/02-phase-artifacts`.
- Delivery deltas and evidence live in `docs/specs/agile-artifacts/03-delivery-records`.
- Keep `docs/specs/agile-artifacts/INDEX.md` and `docs/specs/agile-artifacts/artifact-registry.md` synchronized when adding, moving, or archiving delivery records.
- Preserve lifecycle state consistency (`Draft`, `In Review`, `Approved`, `Superseded`, `Archived`) across records and registry.

## Change Discipline
- Prefer small, focused diffs; do not refactor unrelated areas.
- Do not invent artifact data; flag missing information explicitly.
- Keep naming in lowercase kebab-case for artifacts and evidence files.

## Verification
- For code changes, run the smallest relevant checks first, then broader checks if needed.
- Use these project scripts when relevant: `pnpm typecheck`, `pnpm check`, `pnpm agile:check`.