# Artifact Registry

## Purpose
Track all active Agile SDLC artifacts with a single registry for ownership, lifecycle state, and source-of-truth control.

## Usage Rules
- Keep one row per active artifact.
- Keep `source_of_truth=yes` for canonical phase artifacts.
- Keep release and sprint evidence artifacts as `source_of_truth=no`.
- Update this file whenever artifacts are added, renamed, superseded, or archived.

## Lifecycle States
- `Draft`
- `In Review`
- `Approved`
- `Superseded`
- `Archived`

## Registry Fields
- `artifact_id`: unique identifier
- `title`: artifact name
- `type`: governance | template | canonical | release-evidence
- `phase_or_release`: concept/inception/iteration/release/maintenance/retirement/release-XX/sprint-YY
- `owner`: accountable role
- `state`: lifecycle state
- `source_of_truth`: yes | no
- `current_path`: current file path
- `supersedes`: prior artifact id (or `-`)
- `last_reviewed`: ISO date (`YYYY-MM-DD`)

## Artifact Register

| artifact_id | title | type | phase_or_release | owner | state | source_of_truth | current_path | supersedes | last_reviewed |
|---|---|---|---|---|---|---|---|---|---|
| GOV-001 | Naming Conventions | governance | governance | TL | Approved | yes | docs/specs/agile-artifacts/00-governance/naming-conventions.md | - | 2026-04-28 |
| GOV-002 | Artifact Lifecycle | governance | governance | TL | Approved | yes | docs/specs/agile-artifacts/00-governance/artifact-lifecycle.md | - | 2026-04-28 |
| GOV-003 | Roles and RACI | governance | governance | PO | Approved | yes | docs/specs/agile-artifacts/00-governance/roles-and-raci.md | - | 2026-04-28 |
| TMP-001 | Concept Artifacts Template | template | concept | PO | Approved | yes | docs/specs/agile-artifacts/01-templates/concept/concept-artifacts.template.md | - | 2026-04-28 |
| TMP-002 | Inception Artifacts Template | template | inception | TL | Approved | yes | docs/specs/agile-artifacts/01-templates/inception/inception-artifacts.template.md | - | 2026-04-28 |
| TMP-003 | Iteration Artifacts Template | template | iteration | SM | Approved | yes | docs/specs/agile-artifacts/01-templates/iteration/iteration-artifacts.template.md | - | 2026-04-28 |
| TMP-004 | Sprint Pack Template | template | iteration | SM | Approved | yes | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | - | 2026-04-28 |
| TMP-005 | Release Artifacts Template | template | release | QA | Approved | yes | docs/specs/agile-artifacts/01-templates/release/release-artifacts.template.md | - | 2026-04-28 |
| TMP-006 | Maintenance Artifacts Template | template | maintenance | QA | Approved | yes | docs/specs/agile-artifacts/01-templates/maintenance/maintenance-artifacts.template.md | - | 2026-04-28 |
| TMP-007 | Retirement Artifacts Template | template | retirement | PO | Approved | yes | docs/specs/agile-artifacts/01-templates/retirement/retirement-artifacts.template.md | - | 2026-04-28 |
| CON-001 | Product Vision Board | canonical | concept | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/concept/product-vision-board.md | - | 2026-04-28 |
| CON-002 | Initial Product Backlog (Epics) | canonical | concept | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/concept/initial-product-backlog-epics.md | - | 2026-04-28 |
| CON-003 | Feasibility Risk Snapshot | canonical | concept | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/concept/feasibility-risk-snapshot.md | - | 2026-04-28 |
| INC-001 | ADR Log | canonical | inception | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/inception/architecture-decision-record-log.md | - | 2026-04-28 |
| INC-002 | User Stories and Acceptance Criteria | canonical | inception | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md | - | 2026-04-28 |
| INC-003 | Technical Blueprint | canonical | inception | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/inception/technical-blueprint.md | - | 2026-04-28 |
| ITR-001 | Sprint Goal | canonical | iteration | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/sprint-goal.md | - | 2026-04-28 |
| ITR-002 | Sprint Backlog | canonical | iteration | SM | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/sprint-backlog.md | - | 2026-04-28 |
| ITR-003 | Definition of Done | canonical | iteration | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/definition-of-done.md | - | 2026-04-28 |
| ITR-004 | Sprint Ceremonies Tracker | canonical | iteration | SM | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/sprint-ceremonies-tracker.md | - | 2026-04-28 |
| REL-001 | QA Strategy and Test Plan | canonical | release | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/qa-strategy-and-test-plan.md | - | 2026-04-28 |
| REL-002 | Test Cases | canonical | release | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/test-cases.md | - | 2026-04-28 |
| REL-003 | Release Notes Template | canonical | release | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/release-notes-template.md | - | 2026-04-28 |
| REL-004 | Go/No-Go Checklist | canonical | release | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/go-no-go-checklist.md | - | 2026-04-28 |
| MNT-001 | Maintenance Backlog | canonical | maintenance | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/maintenance/maintenance-backlog.md | - | 2026-04-28 |
| MNT-002 | Monitoring and Incident Response | canonical | maintenance | DO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/maintenance/monitoring-and-incident-response.md | - | 2026-04-28 |
| MNT-003 | Continuous Improvement Plan | canonical | maintenance | SM | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/maintenance/continuous-improvement-plan.md | - | 2026-04-28 |
| RET-001 | Retirement Strategy | canonical | retirement | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/retirement/retirement-strategy.md | - | 2026-04-28 |
| RET-002 | Migration Runbook | canonical | retirement | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/retirement/migration-runbook.md | - | 2026-04-28 |
| RET-003 | Decommission Checklist and Communications | canonical | retirement | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/retirement/decommission-checklist-and-communications.md | - | 2026-04-28 |


## Notes
- 2026-04-28: Final consistency sweep completed; naming conventions, lifecycle states, and source-of-truth uniqueness validated.

