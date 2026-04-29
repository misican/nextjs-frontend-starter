# .ai — Canonical AI Customizations (Source of Truth)

This directory is the **single source of truth** for all AI agent customizations in this repository. IDE-specific discovery folders are generated symlinks/junctions pointing here — do not edit them directly.

| Generated link | Points to | IDE / Tool |
|---|---|---|
| `.github/copilot-instructions.md` | `.ai/copilot-instructions.md` | GitHub Copilot |
| `.github/agents/` | `.ai/agents/` | GitHub Copilot |
| `.github/prompts/` | `.ai/prompts/` | GitHub Copilot |
| `.github/hooks/` | `.ai/hooks/` | GitHub Copilot |
| `.github/instructions/` | `.ai/instructions/` | GitHub Copilot |
| `.github/skills/` | `.ai/skills/` | GitHub Copilot |
| `.cursor/skills/` | `.ai/skills/` | Cursor |
| `.cursor/agents/` | `.ai/agents/` | Cursor |
| `.cursor/prompts/` | `.ai/prompts/` | Cursor |

## Structure

```
.ai/
├── README.md            ← you are here
├── copilot-instructions.md   ← always-on project instructions
├── agents/                   ← custom agent definitions
│   └── story-orchestrator.agent.md
├── prompts/                  ← reusable prompt commands
│   └── work-on-story.prompt.md
├── hooks/                    ← post-edit validation hooks
│   └── post-edit-checks.json
├── instructions/             ← file-scoped instruction rules
│   └── agile-artifacts.instructions.md
├── scripts/                  ← hook scripts
│   └── ai-post-edit-check.mjs
└── skills/                   ← agent skill definitions
    ├── README.md
    ├── shadcn/
    │   └── SKILL.md
    └── tech-audit/
        └── SKILL.md
```

## Setup

Run once (or on every `pnpm install` via the `prepare` hook):

```bash
pnpm ai:setup
```

This creates the IDE symlinks / junctions idempotently on macOS, Linux, and Windows.

## Adding a new skill

1. Create `.ai/skills/<name>/SKILL.md` with frontmatter `name` and `description`.
2. Run `pnpm ai:setup` — the new skill is immediately available in all IDEs via the existing links.
3. No IDE config changes needed.

## Adding a new primitive (agent, prompt, instruction, hook)

1. Create the file in the appropriate `.ai/<type>/` subdirectory.
2. The existing IDE discovery links already cover the folder — no script changes needed.
