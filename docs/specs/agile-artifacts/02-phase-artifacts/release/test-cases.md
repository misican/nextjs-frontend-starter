# Test Cases

## Traceability Matrix (Epic → Story → Test Case)
| Epic ID | Story ID | Test Case IDs |
|---|---|---|
| EPIC-001 | US-101, US-106 | TC-001, TC-006 |
| EPIC-002 | US-104, US-105, US-107 | TC-004, TC-005, TC-007 |
| EPIC-003 | US-110, US-113 | TC-010, TC-013 |
| EPIC-004 | US-108, US-109, US-111, US-112 | TC-008, TC-009, TC-011, TC-012 |
| EPIC-005 | US-102, US-103, US-114, US-115, US-117, US-118, US-119 | TC-002, TC-003, TC-014, TC-015, TC-017, TC-018, TC-019 |
| EPIC-007 | US-116 | TC-016 |

## Refined Test Cases

### Release 1 — Foundation of Landing Pages

### TC-001 — Project Structure Compliance (US-101)
- **Precondition:** Repository is checked out with latest baseline branch.
- **Steps:**
  1. Inspect source directories.
  2. Verify required frontend folders exist and match blueprint.
  3. Validate route files follow App Router conventions.
- **Expected Result:** Directory and route conventions are compliant.
- **Type:** Functional / Configuration
- **Owner:** QA

### TC-002 — Unit Testing Baseline (US-102)
- **Precondition:** Test runner and baseline tests are configured.
- **Steps:**
  1. Execute unit test command.
  2. Add one simple component/utility change and rerun tests.
- **Expected Result:** Unit tests run successfully and detect regressions.
- **Type:** Unit
- **Owner:** QA + FE Dev

### TC-003 — CI Quality Gate Enforcement (US-103)
- **Precondition:** CI pipeline configured for lint/type/test/build.
- **Steps:**
  1. Trigger CI with valid branch.
  2. Trigger CI with deliberate failing check.
- **Expected Result:** Passing branch merges; failing branch is blocked.
- **Type:** Functional / Quality Gate
- **Owner:** TL

### TC-004 — Landing Page Baseline (US-104)
- **Precondition:** Landing route implementation is complete.
- **Steps:**
  1. Open landing page on desktop and mobile breakpoints.
  2. Verify hero/value proposition/CTA visibility.
- **Expected Result:** Key sections render and remain usable across target breakpoints.
- **Type:** E2E / UX
- **Owner:** QA

### TC-005 — Base Components Compliance (US-105)
- **Precondition:** Header, footer, and menu components are implemented.
- **Steps:**
  1. Review component composition and styles.
  2. Verify shadcn/ui-first construction and semantic tokens.
- **Expected Result:** Components comply with shadcn/ui and token standards.
- **Type:** Design System Compliance
- **Owner:** FE Lead

### TC-006 — Sample Onboarding Flow (US-106)
- **Precondition:** Onboarding route is implemented.
- **Steps:**
  1. Navigate through onboarding steps.
  2. Validate progression and completion messaging.
- **Expected Result:** Onboarding sample flow is complete and coherent.
- **Type:** E2E
- **Owner:** QA

### TC-007 — Responsive Navigation Accessibility (US-107)
- **Precondition:** Navigation components are available in mobile and desktop layouts.
- **Steps:**
  1. Verify navigation behavior below and above mobile breakpoint.
  2. Validate keyboard operation and visible focus.
- **Expected Result:** Navigation remains accessible and usable across breakpoints.
- **Type:** Accessibility / E2E
- **Owner:** QA

### Release 2 — Standardizing Light and Dark Mode

### TC-008 — Theme Toggle Interaction (US-108)
- **Precondition:** Theme toggle is present in UI.
- **Steps:**
  1. Toggle between light and dark modes.
  2. Validate immediate visual state transition.
- **Expected Result:** Theme changes correctly and consistently.
- **Type:** Functional / UX
- **Owner:** QA

### TC-009 — Theme Persistence Across Sessions (US-109)
- **Precondition:** Theme preference storage is configured.
- **Steps:**
  1. Select dark theme.
  2. Reload page and navigate routes.
- **Expected Result:** Preference persists across refresh and navigation.
- **Type:** E2E
- **Owner:** QA

### TC-010 — Theme Stability and Regression (US-110)
- **Precondition:** Visual baseline exists for theme states.
- **Steps:**
  1. Execute visual regression checks for light/dark states.
  2. Validate no hydration/flicker issues on initial render.
- **Expected Result:** No unintended visual changes or critical flicker.
- **Type:** Visual Regression
- **Owner:** QA

### TC-011 — Settings Route Availability (US-111)
- **Precondition:** Settings route is implemented.
- **Steps:**
  1. Navigate to settings via app navigation.
  2. Validate route load on desktop and mobile.
- **Expected Result:** Settings page is reachable and stable.
- **Type:** Functional
- **Owner:** QA

### TC-012 — Settings Control Persistence (US-112)
- **Precondition:** Settings controls are wired to preferences.
- **Steps:**
  1. Change settings values.
  2. Reload and confirm values persist.
- **Expected Result:** Settings updates are persisted and reflected in UI.
- **Type:** Functional / E2E
- **Owner:** QA

### TC-013 — Settings Accessibility Conformance (US-113)
- **Precondition:** Settings controls are rendered.
- **Steps:**
  1. Navigate controls via keyboard only.
  2. Check labels and state announcements with assistive tooling.
- **Expected Result:** Controls are accessible with meaningful labels/states.
- **Type:** Accessibility
- **Owner:** QA

### Release 3 — Storybook Integration and Documentation

### TC-014 — Storybook Runtime Integration (US-114)
- **Precondition:** Storybook is configured in project.
- **Steps:**
  1. Start Storybook.
  2. Render Next.js-related component stories.
- **Expected Result:** Storybook runs reliably and renders core stories.
- **Type:** Functional
- **Owner:** FE Lead

### TC-015 — Core Story Coverage (US-115)
- **Precondition:** Core component list is defined.
- **Steps:**
  1. Compare component inventory against story files.
  2. Verify controls exist for key props.
- **Expected Result:** Core component stories are present with usable controls.
- **Type:** Documentation / Coverage
- **Owner:** QA + FE Dev

### TC-016 — Visual Regression in CI (US-116)
- **Precondition:** Visual testing is integrated with CI.
- **Steps:**
  1. Run visual checks in CI.
  2. Introduce intentional visual change and verify alert.
- **Expected Result:** CI catches and reports visual regressions.
- **Type:** Visual Regression / CI
- **Owner:** QA

### TC-017 — Documentation Structure Validation (US-117)
- **Precondition:** Documentation updates are published in repo.
- **Steps:**
  1. Review docs index and navigation paths.
  2. Execute onboarding steps as written.
- **Expected Result:** New contributor can follow docs without blocker.
- **Type:** Documentation QA
- **Owner:** PO

### TC-018 — Component Usage Documentation Quality (US-118)
- **Precondition:** Component usage pages are updated.
- **Steps:**
  1. Verify examples and props documentation.
  2. Confirm shadcn/ui usage constraints are documented.
- **Expected Result:** Usage documentation is complete and consistent.
- **Type:** Documentation QA
- **Owner:** FE Lead

### TC-019 — Release Readiness Documentation Package (US-119)
- **Precondition:** Release templates and checklists are prepared.
- **Steps:**
  1. Review release-note template and go/no-go checklist completion.
  2. Validate stakeholder sign-off fields are present.
- **Expected Result:** Release documentation package is ready for approval flow.
- **Type:** Release Readiness
- **Owner:** PO + QA

### TC-008 — shadcn/ui-First Composition Rule (US-105)
- **Precondition:** Pull request with new reusable component exists.
- **Steps:**
  1. Review component composition.
  2. Verify existing shadcn/ui primitives are used before custom markup.
- **Expected Result:** Components conform to shadcn/ui-first policy or include approved ADR exception.
- **Type:** Code Review Gate
- **Owner:** FE Lead

### TC-009 — Semantic Token Styling Compliance (US-105)
- **Precondition:** New/updated UI component styles are in branch.
- **Steps:**
  1. Inspect applied classes and theme usage.
  2. Check for hard-coded color primitives and non-semantic overrides.
- **Expected Result:** Semantic tokens used; no hard-coded color drift.
- **Type:** Design System Compliance
- **Owner:** FE Lead
