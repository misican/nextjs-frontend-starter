---
name: tech-audit
description: Audits and refines technical specification documents with gap analysis across architecture, security, performance, maintainability, and delivery readiness.
---

# tech-audit Skill

## When to trigger

Invoke when:
- Auditing spec or architecture documents in `docs/`
- Producing gap analysis or a risk register
- Validating delivery readiness against agile phase criteria
- Reviewing PRDs, RFCs, or implementation specs before sign-off

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
