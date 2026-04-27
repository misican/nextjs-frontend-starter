# Sprint Backlog

## Metadata
- Scope: Release 1 to Release 3 execution backlog
- State: Draft
- Last Reviewed: 2026-04-27

## Sprint Story Allocation
| Sprint | Release | Planned Stories | Story IDs | Planned Story Count |
|---|---|---|---|---:|
| Sprint 1 | Release 1 | Scaffolding + test baseline | US-101, US-102, US-103 | 3 |
| Sprint 2 | Release 1 | Landing + onboarding + base components | US-104, US-105, US-106, US-107 | 4 |
| Sprint 3 | Release 2 | Theme implementation | US-108, US-109, US-110 | 3 |
| Sprint 4 | Release 2 | Settings experience | US-111, US-112, US-113 | 3 |
| Sprint 5 | Release 3 | Storybook integration | US-114, US-115, US-116 | 3 |
| Sprint 6 | Release 3 | Documentation completion | US-117, US-118, US-119 | 3 |

## Backlog Items
| Item ID | Sprint | Story ID | Task | Owner | Estimate (hrs) | Status | Dependency |
|---|---|---|---|---|---:|---|---|
| SB-001 | Sprint 1 | US-101 | Finalize folder conventions and route boundaries | FE Dev | 6 | Todo | None |
| SB-002 | Sprint 1 | US-102 | Configure unit test baseline and sample tests | FE Dev | 6 | Todo | SB-001 |
| SB-003 | Sprint 1 | US-103 | Enforce lint/type/test/build CI gate | TL | 5 | Todo | SB-002 |
| SB-004 | Sprint 2 | US-104 | Build landing page sections and route composition | FE Dev | 8 | Todo | SB-001 |
| SB-005 | Sprint 2 | US-105 | Implement header/footer/menu with shadcn/ui | FE Lead | 8 | Todo | SB-004 |
| SB-006 | Sprint 2 | US-106 | Add sample onboarding flow and route | FE Dev | 6 | Todo | SB-004 |
| SB-007 | Sprint 2 | US-107 | Add responsive nav behavior and accessibility | QA + FE Dev | 5 | Todo | SB-005 |
| SB-008 | Sprint 3 | US-108 | Implement theme toggle interaction | FE Dev | 5 | Todo | SB-005 |
| SB-009 | Sprint 3 | US-109 | Persist theme across refresh/navigation | FE Dev | 4 | Todo | SB-008 |
| SB-010 | Sprint 3 | US-110 | Validate theme stability and visual consistency | QA | 4 | Todo | SB-009 |
| SB-011 | Sprint 4 | US-111 | Implement `/settings` route and layout | FE Dev | 6 | Todo | SB-009 |
| SB-012 | Sprint 4 | US-112 | Add settings controls and persistence wiring | FE Dev | 5 | Todo | SB-011 |
| SB-013 | Sprint 4 | US-113 | Validate settings accessibility states | QA | 4 | Todo | SB-012 |
| SB-014 | Sprint 5 | US-114 | Integrate Storybook into project workflow | FE Lead | 6 | Todo | SB-003 |
| SB-015 | Sprint 5 | US-115 | Create stories for core components | FE Dev | 6 | Todo | SB-014 |
| SB-016 | Sprint 5 | US-116 | Enable visual regression checks in CI | QA | 5 | Todo | SB-015 |
| SB-017 | Sprint 6 | US-117 | Build contributor documentation structure | PO | 5 | Todo | SB-014 |
| SB-018 | Sprint 6 | US-118 | Add component usage and design-system guidance | FE Lead | 5 | Todo | SB-017 |
| SB-019 | Sprint 6 | US-119 | Finalize release documentation package | PO + QA | 4 | Todo | SB-018 |

## Capacity Summary
- Expected team capacity target: 30-40 hours per sprint.
- Story count target: minimum 3 stories per sprint (target range 3-5).

## Definition of Done Link
See `definition-of-done.md` in this folder.
