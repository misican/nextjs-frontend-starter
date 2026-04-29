# AI Customization Guide (Copilot + Cursor)

This repository uses a single canonical source for AI skills and links IDE discovery folders to it.

## What this guide gives you

- A unified `.ai/` customization model — single source of truth for all AI primitives.
- Cross-platform setup with symlink/junction automation.
- Clear separation between canonical source (`.ai/`) and IDE-specific discovery folders (`.github/`, `.cursor/`).
- Hook-based post-edit validation for code and agile artifacts.

## Canonical model

All AI customization content lives in `.ai/`. IDE folders are generated discovery links only — do not edit them directly.

```text
.
├─ .ai/
│  ├─ README.md
│  ├─ copilot-instructions.md         # always-on project instructions
│  ├─ agents/
│  │  └─ story-orchestrator.agent.md
│  ├─ prompts/
│  │  └─ work-on-story.prompt.md
│  ├─ hooks/
│  │  └─ post-edit-checks.json
│  ├─ instructions/
│  │  └─ agile-artifacts.instructions.md
│  ├─ scripts/
│  │  └─ ai-post-edit-check.mjs
│  └─ skills/
│     ├─ README.md
│     ├─ shadcn/SKILL.md
│     └─ tech-audit/SKILL.md
├─ .github/
│  ├─ copilot-instructions.md  # generated symlink → .ai/copilot-instructions.md
│  ├─ agents/                  # generated symlink → .ai/agents/
│  ├─ prompts/                 # generated symlink → .ai/prompts/
│  ├─ hooks/                   # generated symlink → .ai/hooks/
│  ├─ instructions/            # generated symlink → .ai/instructions/
│  └─ skills/                  # generated symlink → .ai/skills/
├─ .cursor/
│  ├─ rules/
│  ├─ skills/                  # generated symlink → .ai/skills/
│  ├─ agents/                  # generated symlink → .ai/agents/
│  └─ prompts/                 # generated symlink → .ai/prompts/
└─ AGENTS.md
```

## Why this structure

- `.ai/` is edited once and shared across all tools.
- `.github/` and `.cursor/` exist only for IDE discovery compatibility; their contents are generated links.
- Generated links are gitignored; canonical content in `.ai/` is the only thing tracked.

## Setup and link creation

Run:

```bash
pnpm ai:setup
```

This calls:

- `scripts/setup-ai-links.sh` on macOS/Linux (symlinks)
- `scripts/setup-ai-links.ps1` on Windows (directory junctions)

The scripts are idempotent and safe to run repeatedly.

## Copilot and Cursor discovery

### Copilot

- Always-on instructions: `.ai/copilot-instructions.md` (linked at `.github/copilot-instructions.md`)
- File-scoped rules: `.ai/instructions/*.instructions.md` (linked at `.github/instructions/`)
- Prompts: `.ai/prompts/*.prompt.md` (linked at `.github/prompts/`)
- Agents: `.ai/agents/*.agent.md` (linked at `.github/agents/`)
- Skills: `.ai/skills/` (linked at `.github/skills/`)
- Hooks: `.ai/hooks/*.json` (linked at `.github/hooks/`)

### Cursor

- Rules: `.cursor/rules/*.mdc`
- Skills: `.ai/skills/` (linked at `.cursor/skills/`)
- Agents: `.ai/agents/` (linked at `.cursor/agents/`)
- Prompts: `.ai/prompts/` (linked at `.cursor/prompts/`)

## Hooks and validation

Hook files:

- `.ai/hooks/post-edit-checks.json`
- `.ai/scripts/ai-post-edit-check.mjs`

Behavior:

- Runs targeted `biome check` on edited source files.
- Runs `pnpm agile:check` when edited files include `docs/specs/agile-artifacts/**`.

## Suggested VS Code settings

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

## Verification checklist

- `pnpm ai:setup` succeeds.
- `.github/skills` resolves to `.ai/skills`.
- `.cursor/skills` resolves to `.ai/skills`.
- Skills appear in the slash menu (`/shadcn`, `/tech-audit`).
- `pnpm agile:check` passes after agile-doc edits.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Skill not visible in Copilot | Missing/broken `.github/skills` link | Run `pnpm ai:setup` |
| Skill not visible in Cursor | Missing/broken `.cursor/skills` link | Run `pnpm ai:setup` |
| Hook does not run | Incorrect hook command path | Ensure `.github/hooks/post-edit-checks.json` points to `.ai/scripts/ai-post-edit-check.mjs` |
| Agile checks not triggered | Edited file outside agile docs path | Ensure path is under `docs/specs/agile-artifacts/` |

## Adding new skills

1. Create `.ai/skills/<name>/SKILL.md` with frontmatter `name` and `description`.
2. Run `pnpm ai:setup`.
3. Use the skill via slash command in your IDE.
