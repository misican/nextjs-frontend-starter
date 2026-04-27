# Agentic Sprint Workflow (Beginner-Friendly)

This guide shows exactly how to run a sprint with AI agents in this repo, using your existing artifact system.

## Sources

This workflow was derived from these project artifacts and repository checks:

- `docs/specs/agile-artifacts/README.md` (structure, layering model, checklists, lifecycle and automation commands)
- `docs/specs/agile-artifacts/INDEX.md` (artifact navigation and phase/release map)
- `docs/specs/agile-artifacts/artifact-registry.md` (artifact states, lineage, ownership, and sprint/release relationships)
- `docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md` (required sprint record sections and evidence/sign-off format)
- `docs/specs/agile-artifacts/02-phase-artifacts/iteration/definition-of-done.md` (delivery and quality gates)
- `docs/specs/agile-artifacts/03-delivery-records/release-01/sprint-01.md` (real sprint instance baseline)
- `pnpm agile:check` via `scripts/check-agile-artifacts.mjs` (consistency validation)

### Web Sources Reviewed

These external references were used as guardrails to validate that the workflow aligns with widely accepted Agile/Scrum and engineering delivery practices:

- Scrum Guide (Schwaber & Sutherland, 2020): https://scrumguides.org/scrum-guide.html
   - Used for: sprint planning topics (why/what/how), daily adaptation, review/retro cadence, and Definition of Done framing.
- Agile Manifesto Principles (Agile Alliance): https://agilemanifesto.org/principles.html
   - Used for: iterative delivery, sustainable pace, technical excellence, and regular reflection/adaptation.
- Continuous Integration (Martin Fowler, 2024 update): https://martinfowler.com/articles/continuousIntegration.html
   - Used for: small-batch integration, self-testing builds, and rapid feedback loops in daily execution.
- GitHub Copilot documentation: https://docs.github.com/en/copilot
   - Used for: practical Copilot usage patterns, agentic features overview, and integration points in day-to-day development workflows.
- GitHub Research on Copilot productivity (Eirini Kalliamvakou et al.): https://github.blog/ai-and-ml/github-copilot/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
   - Used for: evidence that AI gains should be measured beyond speed (flow, satisfaction, and task completion outcomes).
- SPACE framework for developer productivity (Forsgren, Storey, et al., ACM Queue): https://queue.acm.org/detail.cfm?id=3454124
   - Used for: multidimensional sprint health measurement (not single-metric productivity tracking).
- Microsoft Learn: Introduction to GitHub Copilot: https://learn.microsoft.com/en-us/training/modules/introduction-to-github-copilot/
   - Used for: beginner onboarding path for team members new to AI-assisted development.
- DORA State of AI-assisted Software Development (Google Cloud): https://cloud.google.com/devops/state-of-devops
   - Used for: framing AI adoption as a systems/process capability problem, not just a tooling decision.

### Cross-Check Result

- The current guide was primarily constructed from repository artifacts, then cross-checked against the web sources above.
- No direct copy-paste quotations from external sources are included in this guide.
- External references were used to validate process quality and consistency, not to override project-specific governance in `docs/specs/agile-artifacts`.
- Practical additions from external sources are integrated below as workflow upgrades, prompts, and metrics.

---

## 0) What "agentic sprint" means here

- You (human) decide priorities and approve outcomes.
- The agent does the repetitive execution work (drafting, coding, updating docs, validating).
- Every sprint record stays in `03-delivery-records/release-XX/sprint-YY.md`.
- Canonical truth stays in `02-phase-artifacts` (do **not** duplicate it in sprint files).

---

## 1) Pre-sprint setup (30-60 min)

### Goal
Make sure sprint inputs are clear before asking the agent to implement anything.

### Do this
1. Open these canonical files:
   - `02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md`
   - `02-phase-artifacts/iteration/sprint-backlog.md`
   - `02-phase-artifacts/iteration/definition-of-done.md`
   - `02-phase-artifacts/release/qa-strategy-and-test-plan.md`
2. Pick sprint scope (stories/tasks) and confirm they are realistic.
3. Confirm constraints for this project:
   - frontend-only scope
   - shadcn/ui + Tailwind semantic tokens
4. Open your sprint record (example: `03-delivery-records/release-01/sprint-01.md`) and fill Metadata + Sprint Goal first.

### Example prompt to start
> Read the sprint artifacts for sprint-01 and prepare a clean sprint execution plan. Use:
> - docs/specs/agile-artifacts/02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md
> - docs/specs/agile-artifacts/02-phase-artifacts/iteration/sprint-backlog.md
> - docs/specs/agile-artifacts/02-phase-artifacts/iteration/definition-of-done.md
> - docs/specs/agile-artifacts/02-phase-artifacts/release/qa-strategy-and-test-plan.md
> Then update docs/specs/agile-artifacts/03-delivery-records/release-01/sprint-01.md sections 1, 2, and 3 with concrete sprint-ready content.

---

## 2) Sprint planning workflow (human + agent)

### Goal
Turn backlog items into implementation-ready, testable work.

### Do this
0. Align planning output to three questions (Scrum Guide):
   - Why is this sprint valuable?
   - What can be done this sprint?
   - How will the work get done?
1. Ask the agent to decompose stories into implementable tasks.
2. Ask the agent to map each task to acceptance criteria and DoD checks.
3. Ask the agent to propose implementation order (lowest risk first).
4. Review and approve task order and ownership.
5. Update sprint file sections:
   - `2) Scope Delta`
   - `3) Commitments and Capacity`
   - `4) DoD Confirmation and Exceptions` (initial expected checks)

### Example prompts
> For sprint planning, structure output into: WHY (sprint value), WHAT (items we commit to), HOW (task decomposition). Keep each task small enough to complete in about a day or less.

> Break sprint-01 scope into 6-10 implementation tasks with dependencies, estimated effort, and AC mapping. Keep output concise and update sprint-01.md section 2 and 3.

> For each planned task, add the expected DoD evidence we will need (CI, accessibility, performance, docs). Update section 4 and section 9 in sprint-01.md.

---

## 3) Build loop (daily execution)

### Goal
Implement incrementally, keep quality gates passing, and keep sprint docs current.

### Daily loop
1. Pick 1 task from sprint scope.
2. Ask agent to implement only that task (small PR-sized change).
3. Run validation (`typecheck/lint/test/build`) for changed scope.
4. Ask agent to update sprint pack with real progress and evidence links.
5. Repeat.

### AI operating rules for daily execution
- Keep changes small-batch and integrate frequently (at least daily).
- Treat AI output as draft code: always verify with tests, linting, and review.
- If the mainline/build breaks, prioritize fix or revert before new work.
- Prefer short feedback loops (fast commit checks first, slower checks later).

### Example implementation prompt
> Implement only Task T-03 from sprint-01 scope. Keep changes minimal and aligned with existing patterns. After coding, run relevant checks and summarize what passed/failed.

### Example documentation prompt
> Update sprint-01.md with today’s progress: section 5 (test summary), section 6 daily highlights, section 7 blockers/decisions, and section 9 evidence links from latest runs.

### Good rule
- One prompt = one clear deliverable.
- If prompt is too broad, split it.

---

## 4) Mid-sprint control (when things drift)

### Trigger signals
- Too many carry-over tasks
- Repeated test failures
- Scope creep
- Blockers older than 1-2 days

### Do this
1. Ask agent for a drift report (planned vs actual).
2. Re-scope sprint to protect sprint goal.
3. Record decisions in sprint section 7.
4. Update commitments/capacity table with reality.
5. Track whether AI is helping or harming flow using a lightweight scorecard (section 11).

### Example prompt
> Analyze sprint-01 drift: compare planned scope vs completed work, identify top 3 risks, and propose a re-plan that still protects the sprint goal. Then update sections 3, 6, and 7 in sprint-01.md.

---

## 5) Sprint closure workflow

### Goal
Close sprint with auditable evidence and clear handoff into release artifacts.

### Do this
1. Ask agent to compile completion summary:
   - accepted work
   - deferred work
   - defects/open risks
2. Ensure DoD table is fully filled with evidence links.
3. Fill test summary with actual results.
4. Draft release note inputs (section 8).
5. Complete sign-off table (section 10).

### Example prompt
> Prepare sprint-01 for closure. Validate sections 4, 5, 8, 9, and 10 are complete and consistent with actual execution. Flag missing evidence clearly. Do not invent data.

---

## 6) Post-closure hygiene (required)

### Do this every sprint close
1. Confirm lifecycle state in sprint record (`Draft` -> `In Review` -> `Approved`).
2. Update `artifact-registry.md` row for that sprint (`state`, `last_reviewed`, optional `iteration_window`).
3. Keep `INDEX.md` accurate (if files moved/added).
4. Run:
   - `pnpm agile:check`

### Example prompt
> Apply sprint close hygiene for sprint-01: update lifecycle state and review date in sprint file, sync artifact-registry row DR-SPR-001, then run pnpm agile:check and report any issues.

---

## 7) Prompt templates you can reuse each day

### A) Plan the day
> Read sprint-01.md and produce a one-day execution plan with top 2 tasks, expected outputs, tests to run, and documentation updates required at end of day.

### B) Implement safely
> Implement only [TASK-ID]. Keep scope tight. Follow project conventions and avoid unrelated refactors. Run relevant checks and summarize results.

### B1) Integrate frequently
> Implement [TASK-ID] in the smallest safe slice, then run checks and prepare a merge-ready update. If any check fails, stop and propose fix/revert options before continuing.

### C) Update sprint artifacts
> Update sprint-01.md sections impacted by today’s work. Keep entries factual, concise, and linked to evidence.

### D) Prepare review demo
> Generate a sprint review brief from sprint-01.md: accepted work, deferred work, risks, and demo talking points.

### E) Retro starter
> Draft retrospective inputs for sprint-01: what worked, what didn’t, root causes, and 3 concrete action items for sprint-02.

---

## 8) Anti-patterns to avoid

- Asking the agent to "do everything" in one prompt.
- Letting sprint doc drift for several days before updates.
- Copying canonical artifact text into sprint files instead of linking.
- Marking DoD as complete without evidence links.
- Closing sprint without explicit deferred-work notes.

---

## 9) Minimal weekly cadence (simple version)

- **Day 1 (Planning):** finalize scope + commit table + initial DoD expectations
- **Day 2-4 (Build):** daily task loop + evidence capture + sprint doc updates
- **Day 5 (Close):** finalize tests, DoD, release-note inputs, sign-off readiness

If a sprint is longer than 1 week, repeat the Day 2-4 loop each week and run one mid-sprint drift check.

---

## 10) Fast "start now" checklist for your next sprint

- [ ] Open sprint pack file for current sprint
- [ ] Fill metadata + sprint goal
- [ ] Map scope deltas to canonical artifacts
- [ ] Break work into 6-10 tasks with AC mapping
- [ ] Implement task-by-task with validation after each change
- [ ] Update sections 5/6/7/9 daily
- [ ] Complete closure sections 4/5/8/10
- [ ] Sync registry/index + run `pnpm agile:check`
- [ ] Record sprint metrics in section 11 scorecard

---

## 11) External insights integrated (practical add-ons)

Use this as a simple add-on to your existing sprint pack workflow.

### 11.1 AI-assisted sprint scorecard (SPACE-lite + delivery)

Track these once per sprint (not daily micromanagement):

- **Satisfaction / Well-being:** quick team pulse (1-5) for "AI helped me stay in flow".
- **Performance:** Sprint Goal achieved (`Yes/Partial/No`) and accepted stories count.
- **Activity:** completed tasks and merged PRs (context only, not performance rating).
- **Collaboration:** median review turnaround time and blocker resolution time.
- **Efficiency / Flow:** median PR cycle time, plus time from "task start" to "merged".

Do not use a single metric to judge people; use the set to detect bottlenecks and improve process.

### 11.2 Suggested AI quality guardrails

- Require evidence links for all "done" claims.
- Require test/lint/build output summaries on each implementation prompt.
- Require explicit "unknowns/risks" section in agent outputs for non-trivial changes.
- Keep sprint goal stable; renegotiate scope before adding net-new work.

### 11.3 Optional role split for AI-assisted Scrum ceremonies

- **Planning:** agent drafts options; PO/SM/TL finalize scope and commitment.
- **Daily:** agent summarizes progress + blockers; team decides adaptations.
- **Review:** agent compiles demo notes and evidence index; stakeholders inspect.
- **Retro:** agent clusters issues and proposes actions; team selects 1-3 real improvements.

### 11.4 External learning path (tutorials/courses)

Start in this order:

1. Microsoft Learn module: Introduction to GitHub Copilot (beginner onboarding)
2. GitHub Copilot Docs: workflow capabilities and agent concepts
3. Scrum Guide refresher: sprint events and artifact commitments
4. Martin Fowler CI article: frequent integration and feedback-loop discipline
5. SPACE framework article: define balanced productivity metrics

---

## Optional improvement (recommended)

Create one markdown file per sprint called `working-log.md` inside each `release-XX/` folder for raw daily notes. Keep `sprint-YY.md` as the clean, audit-friendly summary.
