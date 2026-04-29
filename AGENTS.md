# Agent Operating Guide

Use this repository's AI customizations as the source of truth:

- Always-on project guidance: `.ai/copilot-instructions.md` (discovery link: `.github/copilot-instructions.md`)
- File-scoped guidance: `.ai/instructions/*.instructions.md` (discovery link: `.github/instructions/`)
- Reusable workflows: `.ai/prompts/*.prompt.md` (discovery link: `.github/prompts/`)
- Custom personas: `.ai/agents/*.agent.md` (discovery link: `.github/agents/`)
- Skills: `.ai/skills/*/SKILL.md` (canonical); IDE links at `.github/skills/` and `.cursor/skills/`

## Repo Context

- Frontend-first implementation scope.
- Next.js + TypeScript + Tailwind v4 + shadcn/ui.
- Agile artifact governance in `docs/specs/agile-artifacts`.

## Artifact Guardrails

- Keep canonical phase content in `02-phase-artifacts`.
- Keep sprint/release deltas in `03-delivery-records`.
- Update `INDEX.md` and `artifact-registry.md` in the same change when record topology changes.