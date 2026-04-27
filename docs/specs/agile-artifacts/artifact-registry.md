# Artifact Registry

## Purpose
Track all Agile SDLC artifacts with a single registry for ownership, lifecycle state, source-of-truth control, and release/sprint lineage.

## Usage Rules
- Keep one row per active artifact.
- Keep `source_of_truth=yes` for canonical phase artifacts.
- Keep release and sprint artifacts as `source_of_truth=no`.
- Use `parent_artifact_id` to link sprint instances to release instances.
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
- `type`: governance | template | canonical | delivery-record | evidence
- `artifact_scope`: governance | template | canonical | release-instance | sprint-instance | archive | evidence
- `phase_or_release`: concept/inception/iteration/release/maintenance/retirement/release-XX/sprint-YY/archive
- `owner`: accountable role
- `state`: lifecycle state
- `source_of_truth`: yes | no
- `current_path`: current file path
- `parent_artifact_id`: parent artifact id (or `-`)
- `template_source`: source template path (or `-`)
- `iteration_window`: planned date range or baseline window (or `TBD`)
- `supersedes`: prior artifact id (or `-`)
- `archive_path`: archive destination path (or `-`)
- `last_reviewed`: ISO date (`YYYY-MM-DD`)

## Simplification Rules
- Do not add registry rows for placeholder folders.
- Add evidence rows only if evidence becomes a first-class managed artifact.
- Use `archive.md` as the archive destination reference until archive volume justifies a folder split.

## Artifact Register

| artifact_id | title | type | artifact_scope | phase_or_release | owner | state | source_of_truth | current_path | parent_artifact_id | template_source | iteration_window | supersedes | archive_path | last_reviewed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| GOV-001 | Naming Conventions | governance | governance | governance | TL | Approved | yes | docs/specs/agile-artifacts/00-governance/naming-conventions.md | - | - | - | - | - | 2026-04-28 |
| GOV-002 | Artifact Lifecycle | governance | governance | governance | TL | Approved | yes | docs/specs/agile-artifacts/00-governance/artifact-lifecycle.md | - | - | - | - | - | 2026-04-28 |
| GOV-003 | Roles and RACI | governance | governance | governance | PO | Approved | yes | docs/specs/agile-artifacts/00-governance/roles-and-raci.md | - | - | - | - | - | 2026-04-28 |
| TMP-001 | Concept Artifacts Template | template | template | concept | PO | Approved | yes | docs/specs/agile-artifacts/01-templates/concept/concept-artifacts.template.md | - | - | - | - | - | 2026-04-28 |
| TMP-002 | Inception Artifacts Template | template | template | inception | TL | Approved | yes | docs/specs/agile-artifacts/01-templates/inception/inception-artifacts.template.md | - | - | - | - | - | 2026-04-28 |
| TMP-003 | Iteration Artifacts Template | template | template | iteration | SM | Approved | yes | docs/specs/agile-artifacts/01-templates/iteration/iteration-artifacts.template.md | - | - | - | - | - | 2026-04-28 |
| TMP-004 | Sprint Pack Template | template | template | iteration | SM | Approved | yes | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | - | - | - | - | - | 2026-04-28 |
| TMP-005 | Release Artifacts Template | template | template | release | QA | Approved | yes | docs/specs/agile-artifacts/01-templates/release/release-artifacts.template.md | - | - | - | - | - | 2026-04-28 |
| TMP-006 | Release Pack Template | template | template | release | PO | Approved | yes | docs/specs/agile-artifacts/01-templates/release/release-pack.template.md | - | - | - | - | - | 2026-04-28 |
| TMP-007 | Maintenance Artifacts Template | template | template | maintenance | QA | Approved | yes | docs/specs/agile-artifacts/01-templates/maintenance/maintenance-artifacts.template.md | - | - | - | - | - | 2026-04-28 |
| TMP-008 | Retirement Artifacts Template | template | template | retirement | PO | Approved | yes | docs/specs/agile-artifacts/01-templates/retirement/retirement-artifacts.template.md | - | - | - | - | - | 2026-04-28 |
| CON-001 | Product Vision Board | canonical | canonical | concept | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/concept/product-vision-board.md | - | - | - | - | - | 2026-04-28 |
| CON-002 | Initial Product Backlog (Epics) | canonical | canonical | concept | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/concept/initial-product-backlog-epics.md | - | - | - | - | - | 2026-04-28 |
| CON-003 | Feasibility Risk Snapshot | canonical | canonical | concept | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/concept/feasibility-risk-snapshot.md | - | - | - | - | - | 2026-04-28 |
| INC-001 | ADR Log | canonical | canonical | inception | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/inception/architecture-decision-record-log.md | - | - | - | - | - | 2026-04-28 |
| INC-002 | User Stories and Acceptance Criteria | canonical | canonical | inception | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md | - | - | - | - | - | 2026-04-28 |
| INC-003 | Technical Blueprint | canonical | canonical | inception | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/inception/technical-blueprint.md | - | - | - | - | - | 2026-04-28 |
| ITR-001 | Sprint Goal | canonical | canonical | iteration | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/sprint-goal.md | - | - | - | - | - | 2026-04-28 |
| ITR-002 | Sprint Backlog | canonical | canonical | iteration | SM | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/sprint-backlog.md | - | - | - | - | - | 2026-04-28 |
| ITR-003 | Definition of Done | canonical | canonical | iteration | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/definition-of-done.md | - | - | - | - | - | 2026-04-28 |
| ITR-004 | Sprint Ceremonies Tracker | canonical | canonical | iteration | SM | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/iteration/sprint-ceremonies-tracker.md | - | - | - | - | - | 2026-04-28 |
| REL-001 | QA Strategy and Test Plan | canonical | canonical | release | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/qa-strategy-and-test-plan.md | - | - | - | - | - | 2026-04-28 |
| REL-002 | Test Cases | canonical | canonical | release | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/test-cases.md | - | - | - | - | - | 2026-04-28 |
| REL-003 | Release Notes Template | canonical | canonical | release | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/release-notes-template.md | - | - | - | - | - | 2026-04-28 |
| REL-004 | Go/No-Go Checklist | canonical | canonical | release | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/release/go-no-go-checklist.md | - | - | - | - | - | 2026-04-28 |
| MNT-001 | Maintenance Backlog | canonical | canonical | maintenance | QA | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/maintenance/maintenance-backlog.md | - | - | - | - | - | 2026-04-28 |
| MNT-002 | Monitoring and Incident Response | canonical | canonical | maintenance | DO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/maintenance/monitoring-and-incident-response.md | - | - | - | - | - | 2026-04-28 |
| MNT-003 | Continuous Improvement Plan | canonical | canonical | maintenance | SM | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/maintenance/continuous-improvement-plan.md | - | - | - | - | - | 2026-04-28 |
| RET-001 | Retirement Strategy | canonical | canonical | retirement | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/retirement/retirement-strategy.md | - | - | - | - | - | 2026-04-28 |
| RET-002 | Migration Runbook | canonical | canonical | retirement | TL | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/retirement/migration-runbook.md | - | - | - | - | - | 2026-04-28 |
| RET-003 | Decommission Checklist and Communications | canonical | canonical | retirement | PO | Draft | yes | docs/specs/agile-artifacts/02-phase-artifacts/retirement/decommission-checklist-and-communications.md | - | - | - | - | - | 2026-04-28 |
| DR-REL-001 | Release 01 Pack | delivery-record | release-instance | release-01 | PO | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-01/release-pack.md | - | docs/specs/agile-artifacts/01-templates/release/release-pack.template.md | current baseline | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-REL-002 | Release 02 Pack | delivery-record | release-instance | release-02 | PO | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-02/release-pack.md | - | docs/specs/agile-artifacts/01-templates/release/release-pack.template.md | current baseline | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-REL-003 | Release 03 Pack | delivery-record | release-instance | release-03 | PO | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-03/release-pack.md | - | docs/specs/agile-artifacts/01-templates/release/release-pack.template.md | current baseline | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-SPR-001 | Sprint 01 Pack | delivery-record | sprint-instance | sprint-01 | SM | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-01/sprint-01.md | DR-REL-001 | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | TBD | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-SPR-002 | Sprint 02 Pack | delivery-record | sprint-instance | sprint-02 | SM | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-01/sprint-02.md | DR-REL-001 | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | TBD | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-SPR-003 | Sprint 03 Pack | delivery-record | sprint-instance | sprint-03 | SM | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-02/sprint-03.md | DR-REL-002 | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | TBD | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-SPR-004 | Sprint 04 Pack | delivery-record | sprint-instance | sprint-04 | SM | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-02/sprint-04.md | DR-REL-002 | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | TBD | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-SPR-005 | Sprint 05 Pack | delivery-record | sprint-instance | sprint-05 | SM | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-03/sprint-05.md | DR-REL-003 | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | TBD | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |
| DR-SPR-006 | Sprint 06 Pack | delivery-record | sprint-instance | sprint-06 | SM | Draft | no | docs/specs/agile-artifacts/03-delivery-records/release-03/sprint-06.md | DR-REL-003 | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | TBD | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | 2026-04-28 |


## Notes
- 2026-04-28: Final consistency sweep completed; naming conventions, lifecycle states, and source-of-truth uniqueness validated.
- 2026-04-28: Phase 1 dynamic-growth changes applied; delivery-record layer, lineage fields, and baseline release/sprint instances initialized.
- 2026-04-28: Phase 1.5 lean consolidation applied; sprint records flattened into release folders and archive tracking simplified.

