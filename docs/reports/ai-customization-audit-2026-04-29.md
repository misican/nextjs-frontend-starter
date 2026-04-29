# AI Customization Audit Report

Status: Superseded by docs/reports/ai-customization-second-opinion-2026-04-29.md
Date: 2026-04-29
Scope: Review of AI customization architecture, governance alignment, portability, and operational safety.

## Executive Summary

The customization setup is strong overall: canonical content is centralized under .ai, link automation exists for macOS/Linux/Windows, and VS Code settings are correctly configured to load instructions, agents, prompts, skills, and hooks directly from .ai.

The highest-value gaps are consistency and reliability issues: conflicting "source of truth" messaging, one tracked generated link despite ignore rules, and a cross-platform path-matching weakness in the post-edit hook script.

## Confirmed Findings

### 1) Conflicting Source-of-Truth Guidance
Severity: High

What was found:
- AGENTS.md states that always-on guidance is .github/copilot-instructions.md and related .github paths.
- .ai/README.md and docs/guides/ai-customization-guide.md state .ai is the canonical source and .github/.cursor are generated discovery links.

Why this is a problem:
- Conflicting guidance can cause edits in the wrong place and drift in team behavior.

Suggested direction:
- Standardize wording across AGENTS.md and prompts/instructions to consistently point to .ai as canonical, with .github/.cursor explicitly described as discovery links.

### 2) Prompt Uses Discovery Path Instead of Canonical Path
Severity: Medium

What was found:
- .ai/prompts/work-on-story.prompt.md instructs to use project conventions from .github/copilot-instructions.md.

Why this is a problem:
- Functionally it works while symlinks are healthy, but it encodes an indirect path and weakens canonical model clarity.

Suggested direction:
- Reference .ai/copilot-instructions.md in prompts/agents as canonical.

### 3) Post-Edit Hook Agile Path Detection is Not Fully Cross-Platform Robust
Severity: Medium

What was found:
- .ai/scripts/ai-post-edit-check.mjs detects agile artifact edits using `f.includes("docs/specs/agile-artifacts")`.

Why this is a problem:
- On Windows, file args may contain backslashes, causing false negatives.
- `includes` can match non-prefix substrings unexpectedly.

Suggested direction:
- Normalize separators before matching and use prefix-aware logic.

### 4) Documentation Claims Generated Links Are Gitignored, but One Generated Link is Tracked
Severity: Medium

What was found:
- .gitignore includes generated AI discovery links.
- `git ls-files` still includes .github/copilot-instructions.md.

Why this is a problem:
- Tracked generated links can confuse ownership and produce avoidable review noise.

Suggested direction:
- Untrack generated link paths so only .ai remains versioned source.

### 5) Good Practices Already in Place (Keep)
Severity: Positive

What was found:
- .github and .cursor discovery folders are currently symlinked to .ai targets.
- scripts/setup-ai-links.sh and scripts/setup-ai-links.ps1 are idempotent and support both file and directory links.
- .vscode/settings.json correctly uses object-shaped `chat.*FilesLocations` and `chat.agentSkillsLocations` settings.

Why this matters:
- This provides reliable discovery and minimizes duplicated customization content.

## Optional Improvement Menu (Decision Required)

Pick any options below to include in the follow-up implementation set.

### Option A: Consistency Alignment Pack (Recommended)
- Update AGENTS.md wording to align with canonical .ai model.
- Update .ai/prompts/work-on-story.prompt.md to reference .ai/copilot-instructions.md.
- Add one short "canonical-first" note in .ai/copilot-instructions.md.

Impact: High clarity, very low risk.
Estimated effort: Small.

### Option B: Hook Reliability Hardening
- Patch .ai/scripts/ai-post-edit-check.mjs path matching for Windows/macOS/Linux consistency.
- Keep behavior unchanged otherwise.

Impact: Prevent missed agile checks on Windows.
Estimated effort: Small.

### Option C: Repo Hygiene for Generated Links
- Remove tracked generated discovery link(s) from git index while keeping files locally.
- Keep .gitignore rules as authority for generated paths.

Impact: Reduces future drift/noise in PRs.
Estimated effort: Small.

### Option D: Add AI Customization Verification Script
- Add a lightweight script (for example `pnpm ai:verify`) that checks:
  - expected links exist and resolve
  - required core files exist in .ai
  - hook command target exists
- Optionally run in CI or as a manual health check.

Impact: Faster detection of broken setups.
Estimated effort: Medium.

### Option E: Add Minimal Customization Linting for .ai Markdown
- Validate required frontmatter keys for .agent.md, .prompt.md, and skill SKILL.md files.
- Fail fast on missing/invalid metadata.

Impact: Prevents silent discovery failures.
Estimated effort: Medium.

## Suggested Decision Paths

### Fast Safe Path
- Choose: A + B + C
- Rationale: Fixes main risks with minimal change surface.

### Governance Path
- Choose: A + B + C + D
- Rationale: Adds operational guardrails for team scale.

### Full Hardening Path
- Choose: A + B + C + D + E
- Rationale: Best long-term resilience for larger contributor teams.

## Evidence Sources Reviewed

- AGENTS.md
- .ai/README.md
- .ai/copilot-instructions.md
- .ai/agents/story-orchestrator.agent.md
- .ai/prompts/work-on-story.prompt.md
- .ai/hooks/post-edit-checks.json
- .ai/scripts/ai-post-edit-check.mjs
- .ai/skills/README.md
- .ai/skills/shadcn/SKILL.md
- .ai/skills/tech-audit/SKILL.md
- .vscode/settings.json
- .gitignore
- docs/guides/ai-customization-guide.md
- docs/guides/ai-first-run-scripts-guide.md
