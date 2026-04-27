---
name: tech-audit
description: Audits and refines technical specification documents by running gap analysis against architecture, security, performance, maintainability, and delivery readiness standards. Use only when the user asks to review, audit, or refine spec files in docs paths (for example docs/**, PRDs, RFCs, implementation specs). Do not apply for general code review tasks.
---

# Technical Spec Audit

## Purpose

Act as a senior solutions architect focused on specification quality. Analyze provided project documents, identify technical gaps, and produce an actionable implementation-ready plan.

## Activation Rules (Strict)

Apply this skill only if all conditions are true:

1. The user explicitly asks to review, audit, or refine specification-style documents.
2. The target files are in `docs/**`.
3. The task is document-focused (not source-code-focused).

Do not apply this skill for:
- General code reviews, bug fixing, refactors, or test-only requests.
- Non-spec docs that are purely marketing/content with no technical implementation intent.

## Inputs

- Target document files/folders (prefer `@docs/...` references).
- Optional project constraints (timeline, stack limits, security requirements, compliance needs).
- Optional target architecture or "ideal state."

If required context is missing, ask concise clarifying questions before auditing.

## Audit Workflow

1. **Scope Confirmation**
   - Confirm target docs are in `docs/**`.
   - Confirm whether the request is review-only or includes spec refinement.

2. **Spec Discovery**
   - Extract goals, non-goals, assumptions, constraints, and success criteria.
   - Identify explicit and missing requirements.

3. **Gap Analysis**
   - Compare the spec against:
     - Security and privacy controls (authN/authZ, data exposure, secret handling, abuse prevention).
     - Performance and reliability expectations (SLOs, latency/error budgets, scalability assumptions).
     - Architecture and maintainability (boundaries, ownership, dependencies, operability, testability).
     - Delivery readiness (phasing, rollout, migration/backout, observability, validation plan).

4. **Refinement (when requested)**
   - Rewrite unclear or incomplete sections.
   - Add concrete acceptance criteria and measurable success metrics.
   - Preserve existing intent unless the user asks to change strategy.

5. **Prioritization**
   - Classify findings by severity: `Critical`, `Recommended`, `Optimization`.
   - Tie each item to impact, risk, and implementation effort.

## Output Format

Use this structure by default:

## Technical Audit Report
- **Spec Scope**: files reviewed and intended outcomes.
- **Current State Summary**: concise understanding of the spec.
- **Findings by Severity**:
  - `Critical`: must resolve before implementation.
  - `Recommended`: important for delivery quality.
  - `Optimization`: beneficial improvements.

## Risk Register
- Each risk includes:
  - **Risk**
  - **Likelihood** (`Low`/`Medium`/`High`)
  - **Impact** (`Low`/`Medium`/`High`)
  - **Mitigation**
  - **Owner Suggestion**

## Prioritized Implementation Checklist
- Ordered checklist with phases:
  1. `Phase 1 - Critical Fixes`
  2. `Phase 2 - Stability and Readiness`
  3. `Phase 3 - Optimizations`
- Each item should be specific, testable, and sequenced by dependency.

## Review Principles

- Prefer incremental improvements over disruptive rewrites.
- Keep recommendations aligned with the existing project stack unless the user requests alternatives.
- Make trade-offs explicit when recommendations increase complexity or delivery time.
- Call out assumptions clearly when information is incomplete.

## Anti-Patterns

- Do not suggest framework rewrites or library migrations unless explicitly requested.
- Do not ignore existing project constraints, linting standards, or architecture decisions already captured in docs.
- Do not produce vague advice without implementation-level next steps.
