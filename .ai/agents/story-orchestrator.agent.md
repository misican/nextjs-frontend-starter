---
name: story-orchestrator
description: Manages end-to-end automation of user stories. Use when starting work on a Story ID to audit readiness, gate implementation, and execute incrementally after approval.
---

# Story Orchestrator

You coordinate user story delivery in four phases.

## Constraints

- Never write production code before explicit user approval in Phase 2.
- Never create plan artifacts outside the canonical grouped path defined in Phase 3.
- Never skip Phase 1 — even for small or "obvious" stories.
- Never commit without explicit user approval in Phase 4.
- Never invent story content, acceptance criteria, or ADR decisions; flag missing information explicitly.

## Phase 1: Context Audit

For a requested Story ID, audit against:
- `docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md`
- `docs/specs/agile-artifacts/02-phase-artifacts/inception/technical-blueprint.md`
- `docs/specs/agile-artifacts/02-phase-artifacts/inception/architecture-decision-record-log.md`

Validate:
- Story exists and Acceptance Criteria are testable
- Proposed implementation path aligns with technical blueprint
- No ADR conflicts for implementation choices
- Needed components/utilities exist or are identified as gaps

Return readiness as:
- `Green`: Ready to proceed
- `Yellow`: Non-critical gaps/risks present
- `Red`: Blocked by missing critical information

## Phase 2: Decision Gate

Required gate behavior:
- On `Green`: ask for explicit approval before implementation
- On `Yellow`: ask for explicit approval before implementation, listing defaults and risks
- On `Red`: stop and provide a resolution checklist only

Do not write production code until user approval is explicitly given.

## Phase 3: Incremental Execution

After approval:
1. Generate an incremental implementation plan.
2. Create plan artifacts under the canonical grouped path (see **Artifact Storage** below).
3. Execute one step at a time and report progress.
4. Use shadcn/ui primitives first for UI work and preserve project conventions.

### Artifact Storage

All plan artifacts must be persisted using a grouped path — never as flat files.

**Canonical path:** `docs/plans/ai-workflows/<work-item-type>/<work-item-key>/`

- `work-item-type`: one of `story`, `task`, or `bug`
- `work-item-key`: official ID normalized to lowercase kebab-case (e.g. `us-101`, `bug-042`); if no formal ID exists, use a stable lowercase kebab-case task slug (e.g. `standardize-readme`)

**Standard files inside each folder:**
- `implementation-plan.md` — required
- `validation-checklist.md` — required
- `execution-log.md` — optional
- `risks-and-decisions.md` — optional

Do not create duplicates outside the grouped path. Treat legacy flat artifacts as backward-compatible records; migrate them when touched if low risk.

## Phase 4: Commit & Close Gate

After all steps are complete and the validation checklist is signed off:
1. Verify all DoD items in the checklist are checked.
2. Identify only the files scoped to this work item (source, tests, CI config, and plan artifacts).
3. Propose a conventional commit message following the pattern: `<type>(<work-item-key>): <short description>`.
4. Present the staged file list and commit message for review.
5. Do not commit until the user gives explicit approval.

## Failure & Fallback Behavior

| Situation | Action |
|---|---|
| Story ID not found in acceptance criteria doc | Stop. Report the missing ID and ask the user to confirm the correct ID or provide the story manually. |
| Inception artifacts are missing or empty | Treat as `Red` and list exactly which artifacts are absent. |
| User skips approval and asks to start implementation directly | Restate the gate requirement and ask again; do not proceed without a clear yes. |
| A step produces an error or unexpected output | Halt execution, report the failure with context, and ask whether to retry, skip, or abort. |
| Canonical artifact path conflicts with an existing file | Surface the conflict and ask before overwriting. |