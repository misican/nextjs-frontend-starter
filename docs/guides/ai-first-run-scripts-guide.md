# AI First-Run Scripts Guide

This guide contains three ready-to-use Copilot Chat scripts:
- First real run script
- Agile artifact edit script
- Fast path script (3 prompts)

Use each section as copy-paste prompts in order.

## 1) First Real Run Script (Onboarding)

### Step 1: Confirm active AI workflow assets
Paste in chat:

> Please confirm what AI workflow assets are active for this workspace. List: always-on instructions, skills, prompt commands, agent behavior, and post-edit checks.

Expected response:
- Summary of active instructions
- Mention of `shadcn`, `tech-audit`, `work-on-story`, `story-orchestrator`
- Mention of post-edit validation behavior

If weak/incomplete, paste:

> Please re-check using workspace customization files and summarize in a checklist with status Done or Missing.

### Step 2: Test UI skill behavior (plan-only)
Paste in chat:

> Use /shadcn. I need a settings panel with profile info, password change, and save/cancel actions. Do not write code yet. First propose component primitives and layout structure.

Expected response:
- Composition-first proposal using existing primitives
- Semantic token guidance
- No immediate code dump

If it jumps into code too soon, paste:

> Pause on implementation. Provide only structure and decision rationale first.

### Step 3: Test story workflow entry
Paste in chat:

> Use /work-on-story US-101

Expected response:
- Readiness audit
- Explicit `Green`, `Yellow`, or `Red` classification
- Concise rationale

If no status is shown, paste:

> Please classify explicitly as Green, Yellow, or Red and include blockers/risks.

### Step 4: Test approval gate
If status is Green or Yellow, paste in chat:

> I approve planning only. Generate the incremental implementation plan now, but do not write production code yet.

Expected response:
- Incremental plan only
- No production implementation before explicit code approval

If it starts coding immediately, paste:

> Stop implementation. Return to plan-only mode and wait for my explicit code approval.

### Step 5: Test plan artifact location
Paste in chat:

> Persist the plan under docs/plans/ai-workflows/ and show me the file path you created.

Expected response:
- Plan artifact path under `docs/plans/ai-workflows/`

### Step 6: Controlled implementation
Paste in chat:

> Approved to implement Step 1 only. Make minimal focused changes, then stop and report exactly what changed.

Expected response:
- One scoped change set
- No scope creep
- Clear change summary

### Step 7: Validate checks
Paste in chat:

> After your edits, report which checks were run and the result. Include any failures and proposed fixes.

Expected response:
- Checks run + pass/fail summary
- Fix recommendations if needed

### Step 8: Continue safely
Paste in chat:

> Proceed to the next step only if previous checks passed. Otherwise fix issues first and summarize the fix.

Expected response:
- Gated progression with safer iterative delivery


## 2) Agile Artifact Edit Script (Governance Enforcement)

### Step 1: Load governance context first
Paste in chat:

> Before editing anything, read and summarize the agile governance constraints from these files:
> - docs/specs/agile-artifacts/00-governance/artifact-lifecycle.md
> - docs/specs/agile-artifacts/INDEX.md
> - docs/specs/agile-artifacts/artifact-registry.md
> - docs/specs/agile-artifacts/03-delivery-records/archive.md

Expected response:
- Lifecycle states
- Naming and layering rules
- Requirement to keep INDEX and registry synchronized

### Step 2: Plan-only impact map
Paste in chat:

> Plan-only mode. Do not edit files yet. Propose exactly which files would need edits if we add one new release delivery record under release-03 and keep governance consistent.

Expected response:
- New record path under release-03
- INDEX update
- artifact-registry update

### Step 3: Execute minimal compliant change
Paste in chat:

> Approved. Create one minimal new delivery record in release-03, using lowercase kebab-case naming, Draft lifecycle state, and no invented metrics. Then update INDEX and artifact-registry in the same change.

Expected response:
- All required files updated together

### Step 4: Force consistency audit
Paste in chat:

> Now run a consistency audit:
> 1) confirm lifecycle state is valid
> 2) confirm INDEX includes the new record
> 3) confirm artifact-registry includes the same record
> 4) flag any mismatch

Expected response:
- Pass/fail checklist with concrete file references

### Step 5: Run governance validation
Paste in chat:

> Run the agile artifact check now and report only the result summary and any failing rule.

Expected response:
- Validation pass/fail and drift details if any

### Step 6: Supersede-flow stress test (plan-only)
Paste in chat:

> Plan-only mode again. If we supersede the new record, show the exact updates needed across delivery record, INDEX, artifact-registry, and archive handling.

Expected response:
- Full cross-file update plan

### Step 7: Execute supersede flow (optional)
Paste in chat:

> Approved. Apply the supersede updates from your plan in one focused batch and rerun agile artifact check.

Expected response:
- Lifecycle transition reflected consistently
- Validation rerun outcome

### Correction prompt if sync is missed
Paste in chat:

> You must enforce governance: whenever a delivery record is added, moved, superseded, or archived, update both docs/specs/agile-artifacts/INDEX.md and docs/specs/agile-artifacts/artifact-registry.md in the same change. Replan and fix now.


## 3) Fast Path Script (3 Prompts for Daily Use)

### Prompt 1
Paste in chat:

> Use /work-on-story for US-101.
> Return Green/Yellow/Red with rationale.
> Do not implement yet.
> If Green or Yellow, give a minimal step-by-step plan and wait for my approval.

Expected response:
- Readiness status + plan gate

### Prompt 2
Paste in chat:

> Approved for Step 1 only.
> Make minimal focused edits, then stop.
> Report exactly what changed and what checks were run.

Expected response:
- One-step implementation + validation summary

### Prompt 3
Paste in chat:

> If your edits touched agile artifacts, confirm lifecycle validity and sync between docs/specs/agile-artifacts/INDEX.md and docs/specs/agile-artifacts/artifact-registry.md, then run agile check and report pass/fail.

Expected response:
- Governance sync confirmation + check outcome


## Quick Rules to Remember

1. Green/Yellow still requires explicit approval before implementation.
2. Keep execution step-by-step; do not approve multiple implementation steps blindly.
3. For agile delivery record changes, update INDEX and registry in the same change.
4. Keep customizations canonical in `.ai/`; run `pnpm ai:setup` if discovery links drift.
