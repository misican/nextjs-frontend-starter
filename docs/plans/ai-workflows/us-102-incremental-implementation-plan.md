# US-102 Incremental Implementation Plan

## Metadata
- Story ID: US-102
- Story Title: Local Unit Testing Baseline
- Date: 2026-04-29
- Workflow: work-on-story prompt approval path
- Readiness Status: Yellow (approved to proceed)

## Source Alignment
- Story and acceptance criteria source: docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md
- Architecture/source-of-truth structure: docs/specs/agile-artifacts/02-phase-artifacts/inception/technical-blueprint.md
- Governing decisions: docs/specs/agile-artifacts/02-phase-artifacts/inception/architecture-decision-record-log.md

## Scope
Implement US-102 by establishing a reliable local unit-testing baseline (Vitest + React Testing Library) and wiring it into CI quality gates so regressions block merge.

## Out of Scope
- E2E test expansion beyond baseline validation
- Visual regression implementation (US-116 scope)
- Backend/API testing architecture
- Story scope from dependent or subsequent stories (US-103+)

## Incremental Plan

### Step 1 - Baseline Audit and Gap Mapping
Objective: Confirm current unit test capabilities, script wiring, and CI test gating status.

Tasks:
- Audit existing test dependencies, config files, and scripts in package.json.
- Inventory existing test files across src/ and identify missing baseline coverage targets.
- Verify whether CI currently blocks merge on failed tests and record any gap.

Exit Criteria:
- A documented baseline gap summary is captured in implementation notes.

### Step 2 - Minimal Unit Test Infrastructure Alignment
Objective: Ensure local unit tests execute consistently for components and utilities.

Tasks:
- Add or adjust minimal Vitest/RTL configuration only where missing.
- Ensure test script(s) are deterministic and suitable for CI use.
- Keep changes frontend-only and avoid unrelated refactors.

Exit Criteria:
- `pnpm test` (or equivalent project test command) runs unit tests successfully in local environment.

### Step 3 - Baseline Test Coverage Seeding
Objective: Provide representative baseline tests for at least one component and one utility.

Tasks:
- Create/update focused unit tests for a stable component path.
- Create/update focused unit tests for a stable utility path.
- Keep assertions meaningful and aligned to expected behavior.

Exit Criteria:
- Baseline tests pass and provide a reusable example for new work.

### Step 4 - CI Gate Enforcement
Objective: Ensure failed tests block merge.

Tasks:
- Verify CI workflow includes test stage in required checks.
- If missing, add minimal CI wiring to run unit tests in the quality gate sequence.
- Confirm failure behavior by design (test stage is required for merge readiness).

Exit Criteria:
- CI definition clearly enforces test failures as blocking.

### Step 5 - Verification and Evidence Capture
Objective: Produce acceptance-criteria traceability and implementation evidence.

Tasks:
- Run smallest relevant checks first (targeted tests/typecheck), then broader checks if needed.
- Record command outputs/results summary.
- Update validation checklist with completion status.

Exit Criteria:
- US-102 acceptance criteria are fully traceable to repository evidence.

## Acceptance Criteria Trace Plan

1. AC1: Given a new component or utility, when tests run, then baseline unit tests execute successfully.
- Evidence target: committed component + utility test files and passing local test command.

2. AC2: Given CI execution, when test stage runs, then failures block merge.
- Evidence target: CI workflow test stage as required quality gate and documented blocking behavior.

## Implementation Notes (to update during execution)

### Execution Status
- Step 1 completed on 2026-04-29.
- Step 2 completed on 2026-04-29.
- Step 3 completed on 2026-04-29.
- Step 4 completed on 2026-04-29.
- Step 5 completed on 2026-04-29.

### Baseline Gap Summary
| Area | Current State | Planned Action |
|---|---|---|
| Unit test config | No Vitest config or setup file found in repository. | Add minimal Vitest configuration and setup during Step 2. |
| Test scripts | No `test` script in package.json; no test runner commands configured. | Add deterministic unit test scripts suitable for local and CI execution in Step 2. |
| Baseline test files | No `*.test.*` or `*.spec.*` files found under src/. | Seed baseline tests in Step 3 for one utility and one UI/component surface. |
| CI test gate | No `.github/workflows` CI workflow file found; test-stage merge gate not represented in repo. | Add minimal CI workflow test stage in Step 4 and document required-check assumption. |

### Candidate Baseline Targets (from Step 1 audit)
- Utility target: `src/lib/utils.ts` (`cn` function)
- Component/surface target: `src/app/page.tsx` (`HomePage` rendering smoke test)
- Supporting integration surface: `src/app/layout.tsx` (optional smoke assertion if needed)

### Step 2 Outcome
- Added unit-test scripts in `package.json`: `test` and `test:watch`.
- Added baseline config in `vitest.config.ts` with happy-dom environment, path alias support, and `passWithNoTests` for infrastructure-stage validation.
- Added `vitest.setup.ts` with `@testing-library/jest-dom` matchers.
- Installed dev dependencies: `vitest`, `happy-dom`, `@testing-library/react`, `@testing-library/jest-dom`, `@vitejs/plugin-react`.
- Added `@rolldown/binding-darwin-arm64` to resolve local Vitest startup error on macOS arm64.
- Validation: `pnpm test` completed successfully (no tests yet, exit code 0 by design), `pnpm typecheck` passed.

### Step 3 Outcome
- Added baseline utility tests in `src/lib/utils.test.ts` for class merging and falsy-input handling.
- Added baseline component smoke test in `src/app/page.test.tsx` validating core heading and link targets.
- Validation after Step 3 changes: `pnpm test` passed with 2 files / 3 tests; `pnpm typecheck` passed.

### Step 4 Outcome
- Added CI workflow at `.github/workflows/ci-quality-gates.yml` for `pull_request` and `push` to `main`.
- Workflow quality-gate sequence runs: `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- Local pre-verification of CI commands passed: `pnpm test` and `pnpm typecheck`.
- Merge-blocking assumption: branch protection must require this workflow/job as a required status check for hard enforcement at merge time.

### Step 5 Outcome
- Final verification run completed successfully:
  - `pnpm test` passed (2 test files, 3 tests).
  - `pnpm typecheck` passed.
  - `pnpm build` passed (Next.js production build completed successfully).
- Acceptance criteria traceability confirmed:
  - AC1 evidence: baseline utility and component tests execute successfully.
  - AC2 evidence: CI workflow includes test stage in quality-gate sequence; merge blocking depends on required-check configuration.

### Risks and Mitigations
- Risk: Story scope creep into broader testing strategy changes.
  - Mitigation: Keep edits strictly to baseline unit-testing readiness.
- Risk: CI requirements vary by branch protection settings outside repository.
  - Mitigation: Enforce repository-level workflow checks and document external branch-protection assumption explicitly.
- Risk: Flaky tests undermining merge confidence.
  - Mitigation: Keep baseline tests deterministic and narrow in scope.

## Ready-to-Execute Task Order
1. Perform test baseline audit and fill gap summary.
2. Apply minimal test infrastructure adjustments.
3. Add baseline component and utility tests.
4. Verify/add CI test-gate enforcement.
5. Run checks and capture evidence in checklist.
