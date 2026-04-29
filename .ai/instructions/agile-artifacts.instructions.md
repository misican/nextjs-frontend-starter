---
name: Agile Artifacts Governance
description: Rules for creating and updating Agile SDLC artifact documents.
applyTo: docs/specs/agile-artifacts/**/*.md
---

# Agile Artifacts Rules

- Respect the layering model: canonical content in `02-phase-artifacts`, delivery-specific deltas in `03-delivery-records`.
- Do not duplicate canonical text in sprint/release records; reference canonical artifacts instead.
- Keep lifecycle states consistent across delivery records and `artifact-registry.md`.
- Update `INDEX.md` and `artifact-registry.md` together whenever delivery records are added, moved, superseded, or archived.
- Use lowercase kebab-case names for artifact files and evidence files.
- Do not invent metrics, sign-offs, or evidence; mark missing items explicitly.