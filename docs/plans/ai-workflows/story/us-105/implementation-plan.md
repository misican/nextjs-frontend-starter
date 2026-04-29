# US-105 Incremental Implementation Plan

## Metadata
- Story ID: US-105
- Story Title: Base Components via shadcn/ui
- Date: 2026-04-29
- Workflow: work-on-story prompt approval path
- Readiness Status: Yellow (approved to proceed)

## Source Alignment
- Story and acceptance criteria source: docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md
- Architecture/source-of-truth structure: docs/specs/agile-artifacts/02-phase-artifacts/inception/technical-blueprint.md
- Governing decisions: docs/specs/agile-artifacts/02-phase-artifacts/inception/architecture-decision-record-log.md

## Scope
Implement US-105 by creating reusable header, footer, and menu primitives using shadcn/ui-first composition and semantic Tailwind tokens, then integrating them into the root route shell without introducing backend functionality.

## Out of Scope
- Backend API or auth service implementation
- Theme persistence and toggle behaviors (US-108 to US-110 scope)
- Settings route and controls (US-111+ scope)
- Storybook coverage expansion (US-114+ scope)

## Incremental Plan

### Step 1 - Baseline Audit and Primitive Selection
Objective: Confirm current UI baseline and identify shadcn/ui primitives needed for header/footer/menu composition.

Tasks:
- Audit current route shell usage in `src/app/layout.tsx` and `src/app/page.tsx`.
- Inventory existing `src/components/ui` and `src/components/features` state.
- Select required shadcn/ui building blocks (for example: navigation menu primitives, separators, buttons, sheet/drawer for mobile menu if required).
- Define component boundaries and target file locations for header/footer/menu primitives.

Exit Criteria:
- Component map and primitive dependency list are documented and traceable to US-105 acceptance criteria.

### Step 2 - Scaffold UI Primitives (shadcn/ui-first)
Objective: Add required reusable primitives using shadcn/ui composition before writing custom wrappers.

Tasks:
- Generate/install any missing shadcn/ui primitives through project workflow.
- Keep primitive implementations in `src/components/ui` aligned with repository conventions.
- Avoid custom alternatives where approved shadcn/ui primitives cover the use case.

Exit Criteria:
- Required low-level primitives exist and are importable from `~/components/ui`.

### Step 3 - Implement Feature-Level Header/Footer/Menu Components
Objective: Build feature-level navigational components by composing primitives and semantic tokens.

Tasks:
- Implement `Header` component with desktop and mobile-friendly menu behavior.
- Implement `Footer` component with minimal, reusable content slots.
- Implement menu composition component(s) using shadcn/ui primitives first.
- Use semantic Tailwind tokens only; avoid hard-coded color classes/values.

Exit Criteria:
- Header/footer/menu feature components render from composed primitives and pass static review for token usage.

### Step 4 - Integrate Into App Shell
Objective: Wire the new base components into the application shell with minimal route impact.

Tasks:
- Integrate header and footer into `src/app/layout.tsx`.
- Ensure page content remains wrapped correctly and responsive after shell updates.
- Preserve frontend-only scope and avoid unrelated layout refactors.

Exit Criteria:
- App shell consistently renders header/footer/menu components across routes.

### Step 5 - Validation, Tests, and Quality Gates
Objective: Provide acceptance evidence and verify no regressions.

Tasks:
- Add or update tests for shell rendering and menu accessibility behaviors.
- Verify shadcn/ui-first composition and semantic-token-only styling through code review checklist.
- Run smallest relevant checks first, then broader gates (`pnpm typecheck`, `pnpm check`, focused tests, then broader suite as needed).
- Record verification outputs in validation checklist.

Exit Criteria:
- Acceptance criteria are traceable to tests/review evidence and quality checks pass for the modified scope.

## Acceptance Criteria Trace Plan

1. AC1: Given base components are implemented, when code is reviewed, then shadcn/ui composition is used before custom markup.
- Evidence target: component implementation references in `src/components/ui` and `src/components/features`, plus review checklist assertions.

2. AC2: Given style classes are applied, when reviewed, then semantic tokens are used and hard-coded colors are avoided.
- Evidence target: class audit in updated shell/components and checklist confirmation with no hard-coded color values.

## Readiness Gap Handling Plan
- Gap: Story and dependency state are still Draft in inception backlog.
  - Handling: Proceed under explicit approval and capture this assumption in implementation evidence.
- Gap: Story-to-test-case mapping is not explicit in inception artifact.
  - Handling: Create direct AC-to-test linkage in validation checklist.

## Implementation Notes (to update during execution)

### Execution Status
- Step 1 completed on 2026-04-29.
- Step 2 completed on 2026-04-29.
- Step 3 completed on 2026-04-29.
- Step 4 completed on 2026-04-29.
- Step 5 completed on 2026-04-29.

### Step 1 Outcome - Baseline Audit and Primitive Selection

#### Current Shell Baseline
| Area | Current State | Gap vs US-105 |
|---|---|---|
| App shell structure | `src/app/layout.tsx` currently renders fonts and `<body>{children}</body>` only | No shared header/footer shell primitives are integrated |
| Root route implementation | `src/app/page.tsx` contains story-specific landing sections in page-local markup | No reusable header/footer/menu feature components are present |
| Component inventory | `src/components/ui` and `src/components/features` only contain `.gitkeep` | No reusable UI primitives or feature wrappers exist yet |
| shadcn config baseline | `components.json` exists with aliases, CSS variables enabled, and `src/styles/globals.css` wiring | Project is ready to add shadcn/ui primitives, but none are currently installed in workspace components |

#### Selected Primitive Dependency List (Step 2 Input)
- `navigation-menu`: desktop navigation structure and keyboard navigation behavior.
- `sheet`: mobile menu surface for small breakpoints.
- `button`: consistent action trigger styling and behavior for menu toggles/CTAs.
- `separator`: lightweight visual separation in header/footer/menu clusters.

#### Target Component Map (Step 3 Input)
| Layer | Target File | Responsibility |
|---|---|---|
| UI Primitive | `src/components/ui/navigation-menu.tsx` | Base nav primitives generated from shadcn/ui |
| UI Primitive | `src/components/ui/sheet.tsx` | Mobile drawer/sheet primitive for menu composition |
| UI Primitive | `src/components/ui/button.tsx` | Reusable action/button primitive |
| UI Primitive | `src/components/ui/separator.tsx` | Structural divider primitive |
| Feature Component | `src/components/features/app-menu.tsx` | Shared menu composition (desktop + mobile variants) |
| Feature Component | `src/components/features/app-header.tsx` | Header container and top-level navigation usage |
| Feature Component | `src/components/features/app-footer.tsx` | Footer container and baseline links/info layout |

#### Step 1 Exit Criteria Result
- Component map documented: complete.
- Primitive dependency list documented: complete.
- Traceability to US-105 acceptance criteria: complete (AC1 via shadcn/ui-first primitive set; AC2 via semantic-token constraint carried into Step 3 implementation checklist).

### Step 2 Outcome - Scaffold UI Primitives (shadcn/ui-first)
- Executed primitive scaffolding with `pnpm dlx shadcn@latest add navigation-menu sheet button separator`.
- Generated required low-level primitives in `src/components/ui`:
  - `navigation-menu.tsx`
  - `sheet.tsx`
  - `button.tsx`
  - `separator.tsx`
- Verified generated primitives are importable from `~/components/ui/*` and aligned with shadcn/ui composition baseline.

#### Step 2 Exit Criteria Result
- Required low-level primitives exist in workspace: complete.
- Import path alignment with UI alias (`~/components/ui`): complete.

### Step 3 Outcome - Implement Feature-Level Header/Footer/Menu Components
- Added `src/components/features/app-menu.tsx` using shadcn/ui primitives (`navigation-menu`, `sheet`, `button`, `separator`) for desktop and mobile navigation composition.
- Added `src/components/features/app-header.tsx` with reusable header container and menu placement.
- Added `src/components/features/app-footer.tsx` with reusable footer container and baseline navigation links.
- Kept styling semantic-token aligned (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `bg-muted`) with no hard-coded color classes.

#### Step 3 Exit Criteria Result
- Header/footer/menu feature components created under `src/components/features`: complete.
- Composition verified to use shadcn/ui primitives before custom wrappers: complete.
- Static token usage review for new feature components: complete.

### Step 4 Outcome - Integrate Into App Shell
- Updated `src/app/layout.tsx` to integrate `AppHeader` and `AppFooter` around route content.
- Added a flex column shell (`min-h-screen`) with a `flex-1` content wrapper so each route renders between shared header and footer.
- Preserved frontend-only scope and limited shell changes to layout composition.
- Maintained semantic token usage in layout shell classes (`bg-background`, `text-foreground`).

#### Step 4 Exit Criteria Result
- Shared app shell renders header/footer composition from layout: complete.
- Route content wrapping and responsive shell behavior validated statically: complete.

### Step 5 Outcome - Validation, Tests, and Quality Gates
- Added focused shell test coverage in `src/components/features/app-shell.test.tsx` for header branding/menu trigger, footer links, and menu labels.
- Ran focused verification command: `pnpm test -- src/components/features/app-shell.test.tsx` (suite passed; command also executed existing test files under current Vitest include behavior).
- Ran `pnpm typecheck` successfully.
- Ran `pnpm check`; initial run reported sortable/format diagnostics from generated shadcn files, then resolved via `pnpm check:write` and re-ran `pnpm check` successfully.
- Ran full test suite via `pnpm test` successfully.
- Ran production build via `pnpm build && echo BUILD_OK` successfully.

#### Step 5 Exit Criteria Result
- Acceptance criteria traceability to tests/review evidence: complete.
- Quality gates for typecheck, lint/format, tests, and build: complete.

### Initial Risks and Mitigations
- Risk: Adding custom markup that bypasses available shadcn/ui primitives.
  - Mitigation: Complete primitive selection first and enforce shadcn/ui-first review checkpoint.
- Risk: Inconsistent visual token usage in navigation and footer surfaces.
  - Mitigation: Restrict classes to semantic tokens and run explicit class audit during validation.
- Risk: Menu behavior regressions across mobile and desktop breakpoints.
  - Mitigation: Add focused interaction/accessibility tests and manual keyboard checks.

## Ready-to-Execute Task Order
1. Audit shell baseline and define primitive/component map.
2. Add missing shadcn/ui primitives required for header/footer/menu.
3. Implement feature components with semantic tokens.
4. Integrate into app shell and preserve responsive behavior.
5. Run validation checks and complete evidence checklist.
