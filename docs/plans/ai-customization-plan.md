# AI Customization: Implementation Guide

This guide documents the complete AI customization system for this workspace — covering every primitive in use, its current status, and the steps needed to complete the full setup.

The goal is a workflow where GitHub Copilot acts as a **context-aware project collaborator**: auditing story readiness, generating high-fidelity UI from visual references, and enforcing project conventions automatically.

---

## Architecture Overview

All AI customization content lives in `.ai/`. IDE-specific discovery folders (`.github/`, `.cursor/`) are generated symlinks pointing back to `.ai/` — do not edit them directly. Run `pnpm ai:setup` to regenerate links.

```text
.
├─ .ai/
│  ├─ copilot-instructions.md        # always-on project instructions
│  ├─ agents/
│  │  └─ story-orchestrator.agent.md
│  ├─ prompts/
│  │  └─ work-on-story.prompt.md
│  ├─ hooks/
│  │  └─ post-edit-checks.json       # PostToolUse hook
│  ├─ instructions/
│  │  └─ agile-artifacts.instructions.md
│  ├─ scripts/
│  │  └─ ai-post-edit-check.mjs      # post-edit validation script
│  └─ skills/
│     ├─ shadcn/SKILL.md             # UI generation + component management
│     └─ tech-audit/SKILL.md         # spec auditing + story readiness
├─ .github/
│  ├─ copilot-instructions.md        # symlink → .ai/copilot-instructions.md
│  ├─ agents/                        # symlink → .ai/agents/
│  ├─ prompts/                       # symlink → .ai/prompts/
│  ├─ hooks/                         # symlink → .ai/hooks/
│  ├─ instructions/                  # symlink → .ai/instructions/
│  └─ skills/                        # symlink → .ai/skills/
├─ .cursor/
│  ├─ skills/                        # symlink → .ai/skills/
│  ├─ agents/                        # symlink → .ai/agents/
│  └─ prompts/                       # symlink → .ai/prompts/
└─ AGENTS.md
```

Run `pnpm ai:setup` after cloning to create the symlinks.

---

## Primitive Status

| # | Primitive | File | Status |
|---|-----------|------|--------|
| 1 | Always-on instructions | `.ai/copilot-instructions.md` | ✅ Done |
| 2 | File-scoped instructions | `.ai/instructions/agile-artifacts.instructions.md` | ✅ Done |
| 3 | UI generation skill | `.ai/skills/shadcn/SKILL.md` | ✅ Done |
| 4 | Spec / story audit skill | `.ai/skills/tech-audit/SKILL.md` | ✅ Done |
| 5 | Post-edit hook | `.ai/hooks/post-edit-checks.json` | ✅ Done |
| 6 | Story orchestrator agent | `.ai/agents/story-orchestrator.agent.md` | ✅ Done |
| 7 | Work-on-story prompt | `.ai/prompts/work-on-story.prompt.md` | ✅ Done |
| 8 | Workspace Copilot discovery settings | `.vscode/settings.json` | ✅ Done |

---

## Step 1: Always-On Instructions ✅

**File**: `.ai/copilot-instructions.md`
**Linked at**: `.github/copilot-instructions.md` (generated — do not edit)

Establishes ground truth for every Copilot interaction in this workspace: project scope, tech stack, UI/styling rules, agile artifact constraints, change discipline, and verification commands.

Key content:
- Tech stack declaration (Next.js 15, TypeScript, Tailwind v4, shadcn/ui, Vitest/Playwright/Storybook 8)
- Frontend-first scope boundary
- Agile artifact layering rules (`02-phase-artifacts` vs `03-delivery-records`)
- Verification scripts: `pnpm typecheck`, `pnpm check`, `pnpm agile:check`

---

## Step 2: File-Scoped Instructions ✅

**File**: `.ai/instructions/agile-artifacts.instructions.md`
**Linked at**: `.github/instructions/agile-artifacts.instructions.md` (generated — do not edit)

Applies automatically (`applyTo: docs/specs/agile-artifacts/**/*.md`) when editing agile artifact files. Enforces layering, lifecycle state consistency, and kebab-case naming.

To add more file-scoped rules, create additional `*.instructions.md` files in `.ai/instructions/` with appropriate `applyTo` patterns.

---

## Step 3: Skills ✅

Skills are on-demand workflows. They appear as slash commands in Copilot Chat (`/shadcn`, `/tech-audit`).

**Canonical location**: `.ai/skills/<name>/SKILL.md`
`.github/skills/` and `.cursor/skills/` are generated symlinks — edit only the `.ai/skills/` source.

### `shadcn` — UI Generation & Component Management

Trigger with `/shadcn` for:
- Adding, composing, or modifying shadcn/ui primitives
- Generating high-fidelity UI from a mockup or visual reference
- If no visual is provided, the skill prompts: _"Should I base this on a mockup you have, or reimagine it from the Technical Blueprint?"_

### `tech-audit` — Spec Auditing & Story Readiness

Trigger with `/tech-audit` for:
- Auditing spec documents in `docs/` (gap analysis, risk register)
- Validating a user story before implementation using a **Green / Yellow / Red** readiness classification:
  - **Green** — all required information present; safe to proceed
  - **Yellow** — non-critical gaps or risks; lists them and asks whether to proceed with defaults
  - **Red** — blocked; lists what must be resolved before implementation starts

---

## Step 4: Post-Edit Hook ✅

**File**: `.ai/hooks/post-edit-checks.json`
**Linked at**: `.github/hooks/post-edit-checks.json` (generated — do not edit)

**Script**: `.ai/scripts/ai-post-edit-check.mjs`

Runs automatically after every tool-based file edit (`PostToolUse`). Behavior:
- Runs targeted `biome check` on edited source files
- Runs `pnpm agile:check` when edited files are under `docs/specs/agile-artifacts/`

---

## Step 5: Story Orchestrator Agent ✅

**File**: `.ai/agents/story-orchestrator.agent.md`
**Linked at**: `.github/agents/` and `.cursor/agents/` (generated — do not edit)

This agent manages the end-to-end lifecycle of a user story — from context audit to incremental implementation.

Configured behavior:
1. **Audit Phase** — use the `tech-audit` skill to produce a Green/Yellow/Red readiness report against `user-stories-and-acceptance-criteria.md`, `technical-blueprint.md`, and `architecture-decision-record-log.md`
2. **Decision Gate** — on Green or Yellow, pause and require explicit approval before writing production code
3. **Execution Phase** — implement tasks one at a time; invoke `shadcn` skill for UI generation steps
4. **Plan Artifacts** — when requested, write plan artifacts under `docs/plans/ai-workflows/`

Frontmatter:
```markdown
---
name: story-orchestrator
description: Manages end-to-end automation of user stories — audits context, gates on readiness, then implements incrementally. Use when starting work on a User Story ID.
---
```

---

## Step 6: Work-on-Story Prompt ✅

**File**: `.ai/prompts/work-on-story.prompt.md`
**Linked at**: `.github/prompts/` and `.cursor/prompts/` (generated — do not edit)

A slash command (`/work-on-story`) that kicks off the story orchestrator workflow for a given Story ID.

Invocation supports both styles:
- Parameter token: `/work-on-story` with `{{storyId}}`
- Natural language: "work on user story US-101"

Template:
```markdown
---
name: work-on-story
description: Start the automated workflow for a specific user story. Prompts for a Story ID then audits context before implementation.
---
I want to work on user story {{storyId}}.

1. Audit the context using the tech-audit skill.
2. Provide the readiness report (Green / Yellow / Red).
3. If Green or Yellow and I approve, generate an incremental implementation plan.
4. If Red, list what must be resolved and stop.

Reference the technical blueprint for directory structures and the ADR log for styling and component standards.
```

---

## VS Code Settings ✅ (`.vscode/settings.json`)

All discovery paths point to `.ai/` directly — no `.github/` paths needed in settings since the canonical source is `.ai/`.

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "chat.instructionsFilesLocations": { ".ai/instructions": true },
  "chat.agentFilesLocations": { ".ai/agents": true },
  "chat.promptFilesLocations": { ".ai/prompts": true },
  "chat.agentSkillsLocations": { ".ai/skills": true },
  "chat.hookFilesLocations": { ".ai/hooks": true }
}
```

> **Note**: All `chat.*FilesLocations` and `chat.agentSkillsLocations` settings expect an object `{ "path": true }`, not an array.

---

## What This Setup Achieves

1. **Automated Context Retrieval** — Copilot knows the full stack and conventions without re-stating them each session.
2. **Story Readiness Gate** — the `tech-audit` skill (and eventually the orchestrator agent) prevents implementation from starting until context is verified.
3. **Visual Fidelity** — the `shadcn` skill pauses and asks for visual input before generating UI, preventing generic output.
4. **Post-Edit Enforcement** — the hook validates linting and agile artifact checks automatically after every edit.
5. **Traceability** — the prompt and agent can emit structured plans before executing, so there is always a clear record of what is being built and why.
