---
name: work-on-story
description: Start work on a user story by auditing context first, then gating implementation on explicit approval.
---

I want to work on user story {{storyId}}.

If `{{storyId}}` is not provided, infer it from my message (for example: "work on user story US-101") and confirm the ID before auditing.

Run this workflow:
1. Audit story readiness against:
   - `user-stories-and-acceptance-criteria.md`
   - `technical-blueprint.md`
   - `architecture-decision-record-log.md`
2. Return status as `Green`, `Yellow`, or `Red` with concise rationale.
3. On `Green` or `Yellow`, pause and ask for explicit approval before implementation.
4. On approval, generate an incremental implementation plan and persist plan artifacts under `docs/plans/ai-workflows/`.
5. On `Red`, stop and provide a resolution checklist only.

Use project conventions from `.ai/copilot-instructions.md` and relevant file-scoped instructions.