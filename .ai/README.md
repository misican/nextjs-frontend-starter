# .ai — Canonical AI Customizations

This directory is the **single source of truth** for all AI agent customizations in this repository.

IDE-specific discovery folders are generated links pointing here — do not edit them directly.

| Link | Target | IDE / Tool |
|------|--------|------------|
| `.github/skills/` | `.ai/skills/` | GitHub Copilot (VS Code) |
| `.cursor/skills/` | `.ai/skills/` | Cursor |

## Structure

```
.ai/
├── README.md            ← you are here
├── scripts/             ← AI-reusable hook scripts
│   └── ai-post-edit-check.mjs
└── skills/              ← agent skill definitions
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
3. No changes to IDE config files are needed.
