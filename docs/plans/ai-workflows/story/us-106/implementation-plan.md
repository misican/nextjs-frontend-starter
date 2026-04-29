# US-106 Incremental Implementation Plan

## Metadata
- Story ID: US-106
- Story Title: Sample Onboarding Page
- Date: 2026-04-29
- Workflow: work-on-story prompt approval path
- Readiness Status: Yellow (approved to proceed)
- Plan Revision: v2 (adjusted before execution)

## Source Alignment
- Story and acceptance criteria source: docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md
- Architecture/source-of-truth structure: docs/specs/agile-artifacts/02-phase-artifacts/inception/technical-blueprint.md
- Governing decisions: docs/specs/agile-artifacts/02-phase-artifacts/inception/architecture-decision-record-log.md

## Scope
Implement US-106 by adding a reusable sample onboarding flow route and UI states that clearly communicate progression and completion, aligned to frontend-only constraints and existing Next.js App Router structure.

## Current Baseline Snapshot
- Shared shell is already integrated via `src/app/layout.tsx` with `AppHeader` and `AppFooter`.
- Navigation currently exposes `Home`, `Docs`, and `Settings` in `src/components/features/app-menu.tsx` and `src/components/features/app-footer.tsx`.
- No dedicated onboarding route currently exists under `src/app/onboarding`.
- Existing test conventions use colocated Vitest files such as `src/app/page.test.tsx` and `src/components/features/app-shell.test.tsx`.

## Out of Scope
- Backend onboarding APIs, persistence services, or user account writes
- Authentication workflow implementation details
- Theme persistence and settings work (US-108+ scope)
- Storybook expansion beyond minimum implementation evidence

## Incremental Plan

### Step 1 - Baseline Audit and Route Definition
Objective: Confirm current route baseline and define onboarding route boundaries before coding.

Tasks:
- Confirm route map under `src/app` and existing navigation entry points in `src/components/features/app-menu.tsx` and `src/components/features/app-footer.tsx`.
- Define onboarding route at `src/app/onboarding/page.tsx` with feature-level flow logic in `src/components/features/onboarding-flow.tsx`.
- Define step-state model: `currentStep`, `isComplete`, and derived statuses (`completed`, `current`, `upcoming`).
- Confirm no backend dependency is required and keep all state local to client components.

Exit Criteria:
- Route and component map are documented and traceable to US-106 acceptance criteria.

### Step 2 - Build Onboarding Stepper UI
Objective: Implement clear, reusable onboarding progression states.

Tasks:
- Add `src/components/features/onboarding-flow.tsx` as a client component containing step configuration and progression logic.
- Implement step-state rendering with accessible labels for `completed`, `current`, and `upcoming` states.
- Provide visible progress feedback (for example `Step 2 of 4`) and completion summary text.
- Use existing UI primitives from `src/components/ui` (for example `Button`, `Separator`) before custom markup.

Exit Criteria:
- A user can view and understand progression status at each step.

### Step 3 - Implement Navigation and Completion State
Objective: Support predictable step transitions and a clear completion outcome.

Tasks:
- Add `Next` and `Previous` actions with disabled states for first/last boundaries.
- Implement terminal completion state with clear confirmation and restart action.
- Keep transitions deterministic with local `useState` only.
- Ensure feedback text updates on each transition and remains visible on the route.

Exit Criteria:
- A user can complete the full sample flow with clear transition and completion feedback.

### Step 4 - Integrate Entry Point in Existing UI
Objective: Make onboarding route discoverable from existing app shell/landing experience.

Tasks:
- Add `Onboarding` navigation entry to `src/components/features/app-menu.tsx`.
- Add matching footer entry in `src/components/features/app-footer.tsx`.
- Add a landing-page internal CTA to `/onboarding` in `src/app/page.tsx` while preserving existing external links.
- Keep integration small and avoid unrelated layout refactors.

Exit Criteria:
- Onboarding route is reachable through visible in-app navigation.

### Step 5 - Validation and Quality Gates
Objective: Provide acceptance evidence and ensure no regressions.

Tasks:
- Add focused feature test `src/components/features/onboarding-flow.test.tsx` for progression and completion behavior.
- Add route-level test `src/app/onboarding/page.test.tsx` for onboarding page rendering and visible state feedback.
- Run checks in this order: focused tests, `pnpm typecheck`, `pnpm check`, then `pnpm test` if shared navigation files are touched.
- Record command outcomes in `docs/plans/ai-workflows/story/us-106/validation-checklist.md`.

Exit Criteria:
- Acceptance criteria are mapped to passing tests and verification evidence.

## Acceptance Criteria Trace Plan

1. AC1: Given onboarding route access, when user steps through sample flow, then progression and completion states are clear.
- Evidence target: `src/app/onboarding/page.tsx`, `src/components/features/onboarding-flow.tsx`, and `src/components/features/onboarding-flow.test.tsx`.

2. AC2: Given route transitions, when navigation occurs, then onboarding state feedback is visible.
- Evidence target: transition assertions in `src/components/features/onboarding-flow.test.tsx` and page-level visibility checks in `src/app/onboarding/page.test.tsx`.

## Risks and Mitigations
- Risk: Ambiguous wording for "route transitions" may be interpreted as page-to-page navigation only.
	- Mitigation: Treat step navigation actions on `/onboarding` as transitions and validate visible state changes at each step.
- Risk: Menu/footer updates can affect existing shell tests.
	- Mitigation: Update existing shell assertions in `src/components/features/app-shell.test.tsx` only where needed and run focused tests first.
- Risk: Style drift from existing token strategy.
	- Mitigation: Prefer semantic tokens and existing utility patterns; avoid introducing hard-coded color values in new onboarding components.

## Ready-to-Execute Task Order
1. Baseline audit and onboarding route/component map.
2. Build progression UI and state model.
3. Implement transitions and completion state.
4. Integrate discoverable onboarding entry point.
5. Run validation checks and complete evidence checklist.

## Implementation Notes (to update during execution)

### Execution Status
- Step 1 completed on 2026-04-29.
- Step 2 completed on 2026-04-29.
- Step 3 completed on 2026-04-29.
- Step 4 completed on 2026-04-29.
- Step 5 completed on 2026-04-29.

### Step 1 Outcome - Baseline Audit and Route Definition

#### Route and Navigation Baseline
| Area | Current State | Step 1 Decision |
|---|---|---|
| App routes | `src/app` currently contains `page.tsx`, `layout.tsx`, and `api/` only (no onboarding route) | Add new route at `src/app/onboarding/page.tsx` |
| Shell integration | Shared shell is already wired in `src/app/layout.tsx` with `AppHeader` and `AppFooter` | Reuse current shell; onboarding route will render inside existing layout |
| Header/mobile nav entry points | `src/components/features/app-menu.tsx` currently lists `Home`, `Docs`, `Settings` | Add `Onboarding` item in Step 4 |
| Footer entry points | `src/components/features/app-footer.tsx` currently lists `Home`, `Docs`, `Settings` | Add `Onboarding` link in Step 4 |
| Landing entry point | `src/app/page.tsx` has external CTAs only | Add internal CTA to `/onboarding` in Step 4 |

#### Component and State Model Definition
- Route component: `src/app/onboarding/page.tsx` (server route component hosting page container).
- Feature flow component: `src/components/features/onboarding-flow.tsx` (`"use client"` component with local interactive state).
- State model:
	- `currentStep: number` for active index.
	- `isComplete: boolean` for terminal flow state.
	- Derived status per step: `completed`, `current`, `upcoming`.
- Transition model:
	- `Next` increments `currentStep` until last step.
	- Final `Next` sets `isComplete = true`.
	- `Previous` decrements `currentStep` and is disabled at first step.
	- `Restart` resets `currentStep = 0` and `isComplete = false`.

#### Scope Guardrail Confirmation
- Implementation remains frontend-only and requires no backend endpoints, auth mutations, or persistence APIs.
- Route-transition feedback for AC2 will be interpreted as visible feedback during onboarding step transitions on the `/onboarding` route.

#### Step 1 Exit Criteria Result
- Route map confirmation: complete.
- Onboarding route/component target definition: complete.
- Local state model and transition behavior defined: complete.
- Frontend-only dependency confirmation: complete.

### Step 2 Outcome - Build Onboarding Stepper UI
- Added `src/components/features/onboarding-flow.tsx` as a client component with:
	- Story-aligned step configuration and ordering.
	- Derived step statuses (`completed`, `current`, `upcoming`) for clear progression visibility.
	- Progress feedback text (`Step X of Y`) and completion summary messaging.
	- Semantic-token styling and existing primitive reuse (`Separator`).
- Implemented a reusable props model (`currentStep`, `isComplete`) to support Step 3 transitions without backend dependencies.

#### Step 2 Exit Criteria Result
- Stepper UI component created and ready for route composition: complete.
- Progression state visibility across steps: complete.
- Completion-state presentation block: complete.
- Responsive-friendly layout and semantic-token styling baseline: complete.

### Step 3 Outcome - Implement Navigation and Completion State
- Extended `src/components/features/onboarding-flow.tsx` with local interactive state using `useState`.
- Added deterministic transition actions:
	- `Previous` decrements the active step and is disabled on the first step.
	- `Next` advances through steps.
	- Final-step action switches to `Finish onboarding` and sets terminal completion state.
	- `Restart` resets the flow after completion.
- Added visible transition feedback via route-local status text and expanded completion guidance.
- Reused existing `Button` primitive for all onboarding actions.

#### Step 3 Exit Criteria Result
- Transition controls implemented with first/last-step guardrails: complete.
- Completion state and restart path implemented: complete.
- Route-local state feedback remains visible during transitions: complete.
- Local-only deterministic state management preserved: complete.

### Step 4 Outcome - Integrate Entry Point in Existing UI
- Added onboarding route page at `src/app/onboarding/page.tsx` and rendered `OnboardingFlow` inside the shared app shell.
- Updated `src/components/features/app-menu.tsx` to expose an `Onboarding` navigation item for desktop and mobile menus.
- Updated `src/components/features/app-footer.tsx` to expose an `Onboarding` footer link.
- Updated `src/app/page.tsx` with an internal CTA button that links to `/onboarding` while preserving the existing external links.

#### Step 4 Exit Criteria Result
- Onboarding route is reachable via direct route file: complete.
- Navigation entry point added to shared menu: complete.
- Footer entry point added: complete.
- Landing-page CTA integration added without layout refactor: complete.

### Step 5 Outcome - Validation and Quality Gates
- Added focused feature coverage in `src/components/features/onboarding-flow.test.tsx` for:
	- progression state visibility,
	- transition feedback updates,
	- completion messaging, and
	- restart behavior.
- Added route-level coverage in `src/app/onboarding/page.test.tsx` for onboarding route rendering and visible feedback.
- Updated shared-surface tests:
	- `src/components/features/app-shell.test.tsx` now asserts `Onboarding` is present in footer and menu links.
	- `src/app/page.test.tsx` now asserts the landing-page onboarding CTA points to `/onboarding`.
- Added global React Testing Library cleanup in `vitest.setup.ts` to prevent DOM leakage between Vitest cases.
- Completed validation commands successfully after one formatter-only fix cycle.

#### Step 5 Exit Criteria Result
- Acceptance criteria mapped to focused tests and route coverage: complete.
- Typecheck, lint/format, full test suite, and production build passed: complete.
- Validation evidence recorded in checklist artifact: complete.
