# Go/No-Go Checklist

## Release Candidate
- Version: 
- Decision Meeting Date: 
- Facilitator: 
- State: Draft
- Release Track: Release 1 | Release 2 | Release 3
- Sprint Coverage: Sprint [X] to Sprint [Y]
- Story IDs in Scope:

## Checklist
| Area | Check | Status (Pass/Fail/N/A) | Owner | Notes |
|---|---|---|---|---|
| Scope | All committed stories meet acceptance criteria |  | PO |  |
| Scope | Story count target met for each sprint (>=3) or exception documented |  | SM |  |
| Scope | No backend implementation scope included |  | PO |  |
| Quality | Unit/integration/E2E suites pass |  | QA |  |
| Performance | Lighthouse mobile >= 90 and budgets pass |  | TL |  |
| Accessibility | No critical WCAG violations in key flows |  | QA |  |
| Security | Dependency/secret scans have no critical findings |  | DO |  |
| Design System | shadcn/ui-first and semantic token rules followed |  | FE Lead |  |
| Operations | Monitoring/alerts and rollback plan are ready |  | DO |  |
| Documentation | Release notes and support docs are complete |  | PO |  |

## Release-Specific Checks
| Release | Must Pass Criteria | Status | Owner |
|---|---|---|---|
| Release 1 | Scaffolding/test baseline + landing/onboarding/nav/base UI accepted |  | PO + TL |
| Release 2 | Theme toggle/persistence + settings page accessibility accepted |  | QA + TL |
| Release 3 | Storybook runtime + coverage + documentation package accepted |  | PO + QA |

## Decision
- Final Decision: Go / No-Go
- Approvers: Product Owner, Tech Lead, QA Lead, DevOps Lead
- Decision Notes:
