---
name: tech-audit
description: Audits and refines technical specification documents with gap analysis across architecture, security, performance, maintainability, and delivery readiness. Assesses user story readiness (Green / Yellow / Red) before implementation begins.
---

# tech-audit Skill

## When to trigger

Invoke when:
- Auditing spec or architecture documents in `docs/`
- Producing gap analysis or a risk register
- Validating delivery readiness against agile phase criteria
- Reviewing PRDs, RFCs, or implementation specs before sign-off
- Checking whether a user story is ready for implementation before writing code

## Behavior

1. Read the target document **fully** before producing output
2. Classify every finding as one of: `Critical` / `Recommended` / `Optimization`
3. Produce a risk register table: likelihood · impact · mitigation · owner
4. Never fabricate evidence — flag missing information explicitly
5. Align findings with the `02-phase-artifacts` layering conventions in `docs/specs/agile-artifacts/`
6. Preserve lifecycle state consistency (`Draft`, `In Review`, `Approved`, `Superseded`, `Archived`)

## Output format

**Technical Audit Report**
- Executive summary (2-4 sentences)
- Findings table (ID · severity · description · recommendation)

**Risk Register** (table)

**Prioritized Implementation Checklist**
- Ordered by: Critical → Recommended → Optimization

## Story Readiness Audit

When assessing whether a user story is ready for implementation:

1. Verify the Story ID exists in `user-stories-and-acceptance-criteria.md`
2. Confirm Acceptance Criteria are testable (specific, observable outcomes)
3. Check for conflicting ADRs in `architecture-decision-record-log.md`
4. Validate the proposed directory paths against `technical-blueprint.md`
5. Confirm required components or lib utilities exist in `src/`
6. Classify overall readiness as one of:
   - **Green** — all required information is present; safe to proceed
   - **Yellow** — non-critical gaps or risks exist; list them and ask whether to proceed with defaults
   - **Red** — blocked; required information is missing; stop and describe what must be resolved before implementation
