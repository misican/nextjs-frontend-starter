# AI Customization Guide (Copilot + Cursor)

This repository uses a single canonical source for AI skills and links IDE discovery folders to it.

## What this guide gives you

- A unified `.ai/` customization model for Copilot and Cursor.
- Cross-platform setup with symlink/junction automation.
- Clear separation between canonical skill sources and IDE-specific discovery paths.
- Hook-based post-edit validation for code and agile artifacts.

## Canonical model

The source of truth for skills is `.ai/skills/`.

```text
.
├─ .ai/
│  ├─ README.md
│  ├─ scripts/
│  │  └─ ai-post-edit-check.mjs
│  └─ skills/
│     ├─ README.md
│     ├─ shadcn/
│     │  └─ SKILL.md
│     └─ tech-audit/
│        └─ SKILL.md
├─ .github/
│  ├─ copilot-instructions.md
│  ├─ instructions/
│  ├─ prompts/
│  ├─ agents/
│  ├─ hooks/
│  └─ skills/           # generated symlink/junction -> .ai/skills/
├─ .cursor/
│  ├─ rules/
│  └─ skills/           # generated symlink/junction -> .ai/skills/
└─ AGENTS.md
```

## Why this structure

- `.ai/skills/` is edited once and shared across tools.
- `.github/skills/` and `.cursor/skills/` exist only for tool discovery compatibility.
- Generated links are ignored in git; canonical content remains tracked in `.ai/`.

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

- Always-on instructions: `.github/copilot-instructions.md`
- File-scoped rules: `.github/instructions/*.instructions.md`
- Prompts: `.github/prompts/*.prompt.md`
- Agents: `.github/agents/*.agent.md`
- Skills discovery path: `.github/skills/` (linked to `.ai/skills/`)
- Hooks: `.github/hooks/*.json`

### Cursor

- Rules: `.cursor/rules/*.mdc`
- Skills discovery path: `.cursor/skills/` (linked to `.ai/skills/`)

## Hooks and validation

Hook files:

- `.github/hooks/post-edit-checks.json`
- `.ai/scripts/ai-post-edit-check.mjs`

Behavior:

- Runs targeted `biome check` on edited source files.
- Runs `pnpm agile:check` when edited files include `docs/specs/agile-artifacts/**`.

## Suggested VS Code settings

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "chat.instructionsFilesLocations": { ".github/instructions": true },
  "chat.agentFilesLocations": { ".github/agents": true },
  "chat.promptFilesLocations": { ".github/prompts": true },
  "chat.agentSkillsLocations": { ".ai/skills": true, ".github/skills": true },
  "chat.hookFilesLocations": { ".github/hooks": true }
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
