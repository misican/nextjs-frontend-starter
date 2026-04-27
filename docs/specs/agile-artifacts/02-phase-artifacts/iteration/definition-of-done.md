# Definition of Done

## Scope
Applies to all stories and tasks in Iteration artifacts for the Next.js Frontend Boilerplate.

## Scope Guardrail
- Work must remain frontend-only; backend implementation tasks are out of scope.

## Delivery Criteria
- Code is reviewed and approved by at least one responsible reviewer.
- Type checking, linting, tests, and build pass in CI.
- Acceptance criteria are demonstrated and validated for each story.
- Relevant documentation in `docs/specs/agile-artifacts` is updated.
- Story has mapped release-phase test case coverage.
- Story includes owner and sprint assignment.

## Quality Criteria
- Accessibility checks show no critical violations for changed UI.
- Performance budgets are not exceeded for impacted landing routes.
- No critical security findings from dependency/secret scanning.
- No unresolved High defects for stories planned as complete in the sprint.

## shadcn/ui Criteria
- New reusable UI is composed from shadcn/ui components unless an ADR-approved exception exists.
- Styling uses semantic tokens and avoids hard-coded color values.
- Component behavior is documented in Storybook when component APIs are introduced or changed.

## Release-Specific Completion Gates
| Release | Gate |
|---|---|
| Release 1 | Scaffolding stable, unit test baseline active, landing/onboarding/nav components accepted |
| Release 2 | Theme toggle + persistence + settings page accepted with accessibility checks |
| Release 3 | Storybook integration and documentation artifacts accepted by PO and QA |

## Acceptance Workflow
1. Story owner confirms all AC checks are complete.
2. QA verifies applicable test cases and records evidence.
3. Product Owner confirms business acceptance.
4. Story is moved to Done.

## Story Volume Control
- Sprint closure requires at least 3 completed INVEST-ready stories unless formally waived with documented reason.
