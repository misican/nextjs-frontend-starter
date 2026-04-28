# Agent Operating Guide

Use this repository's AI customizations as the source of truth:

- Always-on project guidance: `.github/copilot-instructions.md`
- File-scoped guidance: `.github/instructions/*.instructions.md`
- Reusable workflows: `.github/prompts/*.prompt.md`
- Custom personas: `.github/agents/*.agent.md`
- Skills: `.ai/skills/*/SKILL.md` (canonical); IDE links at `.github/skills/` and `.cursor/skills/`

## Repo Context

- Frontend-first implementation scope.
- Next.js + TypeScript + Tailwind v4 + shadcn/ui.
- Agile artifact governance in `docs/specs/agile-artifacts`.

## Artifact Guardrails

- Keep canonical phase content in `02-phase-artifacts`.
- Keep sprint/release deltas in `03-delivery-records`.
- Update `INDEX.md` and `artifact-registry.md` in the same change when record topology changes.