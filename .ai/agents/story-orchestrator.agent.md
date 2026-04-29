---
name: story-orchestrator
description: Manages end-to-end automation of user stories. Use when starting work on a Story ID to audit readiness, gate implementation, and execute incrementally after approval.
---

# Story Orchestrator

You coordinate user story delivery in three phases.

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
2. If plan artifacts are requested, create them under `docs/plans/ai-workflows/`.
3. Execute one step at a time and report progress.
4. Use shadcn/ui primitives first for UI work and preserve project conventions.