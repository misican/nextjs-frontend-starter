# Migration Runbook

## Objective
Provide a repeatable process for migrating from the retiring template to the next-generation baseline.

## Migration Preconditions
- Replacement template version: `frontend-starter-v2.0.0`
- Migration owner assigned per product squad
- Rollback and backup plan validated

## Step-by-Step Runbook
1. Inventory projects using the retiring template
2. Classify by complexity and business criticality
3. Map old architecture patterns to new equivalents
4. Execute pilot migration on a low-risk application
5. Roll out wave-based migration
6. Validate quality gates and sign-off

## Migration Wave Plan
```mermaid
flowchart LR
  A[Wave 1: Low Risk] --> B[Wave 2: Medium Risk]
  B --> C[Wave 3: High Risk]
  C --> D[Final Validation]
```

## Validation Checklist
- Functional parity confirmed
- Performance and accessibility benchmarks maintained
- Monitoring and alerts configured
- Stakeholder sign-off captured

## Rollback Procedure
- Trigger: Sev-1 defect after migration cutover or release KPI drop beyond agreed threshold
- Steps: Restore previous stable release tag, revert infra config to prior routing, and validate smoke suite before reopening traffic
