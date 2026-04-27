# Agile Artifacts Workspace

This directory organizes all Agile SDLC artifacts for the Next.js frontend starter initiative.

## Structure
- `00-governance`: standards, ownership model, and lifecycle policies for artifacts
- `01-templates`: reusable templates for each SDLC phase
- `02-phase-artifacts`: canonical phase-level documents with current working content


## How to Use
1. Start from `INDEX.md` to locate a phase or sprint artifact quickly.
2. Use `01-templates` when creating new artifacts.
3. Keep active and approved artifacts in `02-phase-artifacts`.

## Naming Conventions
- Use lowercase kebab-case for folders and files.
- Avoid numeric prefixes on individual files; rely on `INDEX.md` for sequence.
- Prefer concise, domain-based filenames (example: `qa-strategy-and-test-plan.md`).

## Change Rules
- Update `INDEX.md` whenever files are added, moved, or archived.
- Do not store duplicates of the same artifact across phase and sprint folders.

## Demonstration Mapping
- `Release 1: The Foundation of Landing Pages` -> `Sprint 1` (scaffolding + unit test baseline), `Sprint 2` (landing page + onboarding + navigation + base components)
- `Release 2: Standardizing Light and Dark Mode` -> `Sprint 3` (theme toggle), `Sprint 4` (settings page)
- `Release 3: Storybook Integration and Documentation` -> `Sprint 5` (Storybook integration), `Sprint 6` (documentation)

## Scope Guardrails
- This initiative is frontend-only (no backend implementation in project scope).
- UI standardization uses shadcn/ui with Tailwind CSS v4 semantic tokens.
