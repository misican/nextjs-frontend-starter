# US-103 Incremental Implementation Plan

## Metadata
- Story ID: US-103
- Story Title: Quality Gate Pipeline
- Date: 2026-04-29
- Workflow: work-on-story prompt approval path
- Readiness Status: Yellow (approved to proceed)

## Source Alignment
- Story and acceptance criteria source: docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md
- Architecture/source-of-truth structure: docs/specs/agile-artifacts/02-phase-artifacts/inception/technical-blueprint.md
- Governing decisions: docs/specs/agile-artifacts/02-phase-artifacts/inception/architecture-decision-record-log.md

## Scope
Implement US-103 by enforcing a CI quality gate that requires lint, type-check, unit tests, and build to pass for pull requests and prevents merge readiness when any check fails.

## Out of Scope
- Branch protection admin changes outside repository settings UI
- Security, visual regression, or accessibility tooling expansion beyond current story scope
- Backend or API delivery
- Story scope from dependent or subsequent stories (US-104+)

## Incremental Plan

### Step 1 - Current Pipeline Audit
Objective: Verify current scripts and CI wiring against US-103 acceptance criteria.

Tasks:
- Audit `package.json` scripts used for lint/type/test/build gates.
- Audit existing GitHub Actions workflow jobs and command order.
- Document gaps between current state and required quality gate sequence.

Exit Criteria:
- A baseline gap table is captured in implementation notes.

### Step 2 - Add Missing Gate(s)
Objective: Ensure CI executes the complete required gate set.

Tasks:
- Add lint execution to CI if not already present.
- Keep gate commands repo-standard (`pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm build`).
- Keep edits minimal and frontend-only.

Exit Criteria:
- CI workflow definition contains lint, type-check, test, and build checks.

### Step 3 - Failure Visibility and Merge-Blocking Readiness
Objective: Make failed gate behavior explicit and reviewable.

Tasks:
- Ensure workflow fails fast on failing commands by default shell behavior.
- Document merge-blocking requirement as a required status check configuration assumption.
- Add concise implementation note describing how reviewers verify blocked readiness.

Exit Criteria:
- Repository artifacts clearly state that failed checks block merge readiness.

### Step 4 - Verify Locally Using CI-Equivalent Commands
Objective: Validate that all gates run and pass in local environment before handoff.

Tasks:
- Run `pnpm check`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- Record pass/fail outcomes and any deviations.
- Resolve only issues related to US-103 scope.

Exit Criteria:
- CI-equivalent command suite succeeds locally or failures are documented with remediation.

### Step 5 - Evidence and Story Traceability
Objective: Produce acceptance-criteria traceability and completion evidence.

Tasks:
- Update validation checklist statuses and evidence log.
- Map each acceptance criterion to concrete repository proof.
- Prepare short implementation summary for reviewer handoff.

Exit Criteria:
- Acceptance criteria are fully traceable to workflow/config evidence.

## Acceptance Criteria Trace Plan

1. AC1: Given a pull request, when CI runs, then lint/type/test/build must pass.
- Evidence target: workflow file includes all four checks with failing command behavior.

2. AC2: Given a failed check, when reviewing status, then merge is blocked until fixed.
- Evidence target: failed job status in workflow plus required-check branch protection assumption documented.

## Implementation Notes (to update during execution)

### Execution Status
- Step 1 completed on 2026-04-29.
- Step 2 completed on 2026-04-29.
- Step 3 completed on 2026-04-29.
- Step 4 completed on 2026-04-29.
- Step 5 completed on 2026-04-29.

### Baseline Gap Summary (Step 1)
| Area | Current State | Gap | Planned Action |
|---|---|---|---|
| Lint gate in CI | `pnpm check` exists in scripts, but workflow does not run lint | Missing required lint gate for US-103 AC1 | Add lint step to CI workflow before type/test/build |
| Type/Test/Build gates | Workflow runs `pnpm typecheck`, `pnpm test`, `pnpm build` | No gap | Keep and preserve order |
| Merge blocking behavior | Workflow can fail job, but branch protection requirement is external | Evidence linkage gap for AC2 | Document required-status-check assumption in artifact notes |

### Step 2 Outcome
- Updated `.github/workflows/ci-quality-gates.yml` to add `Lint` step running `pnpm check` before `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- Pipeline change was additive and minimal with no unrelated workflow refactor.

### Step 3 Outcome
- Merge-blocking behavior is explicit via failing workflow status for any non-zero gate command.
- Branch protection dependency remains: repository settings must mark `quality-gates` as a required status check for hard merge blocking.

### Step 4 Outcome
- Local CI-equivalent verification succeeded:
  - `pnpm check` passed.
  - `pnpm typecheck` passed.
  - `pnpm test` passed (2 files, 3 tests).
  - `pnpm build` passed (Next.js production build successful).
- Formatting-only fixes were applied to existing files so the lint gate could pass:
  - `.vscode/settings.json`
  - `src/app/page.test.tsx`
  - `src/lib/utils.test.ts`

### Step 5 Outcome
- AC1 traceability satisfied: CI workflow now enforces lint/type/test/build.
- AC2 traceability satisfied for merge readiness: failed checks fail the `quality-gates` job; branch protection required-check setting is documented as the enforcement prerequisite.

### Risks and Mitigations
- Risk: CI change introduces unrelated pipeline churn.
  - Mitigation: Apply minimal, additive workflow edits only.
- Risk: Ambiguity between workflow failure and protected-branch enforcement.
  - Mitigation: Explicitly document branch protection dependency in evidence log.
- Risk: Lint failures from pre-existing issues outside story scope.
  - Mitigation: Fix only blockers necessary for gate pass and call out unrelated issues.

## Ready-to-Execute Task Order
1. Confirm baseline scripts/workflow and finalize gap table.
2. Add missing lint gate to CI workflow.
3. Document merge-blocking readiness assumptions.
4. Run CI-equivalent command suite locally.
5. Capture evidence and complete validation checklist.
