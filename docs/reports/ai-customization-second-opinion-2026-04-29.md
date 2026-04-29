# AI Customization Second Opinion Report

Date: 2026-04-29  
Reviewer: GitHub Copilot (GPT-5.3-Codex)  
Status: Active report (supersedes docs/reports/ai-customization-audit-2026-04-29.md)  
Scope: AI customization structure, consistency, portability, and operational reliability across .ai, .github, .cursor, scripts, hooks, and guidance docs.

## Audit Method

1. Reviewed canonical and discovery customization files.
2. Verified link structure and tracked-file state.
3. Cross-checked setup scripts and post-edit hook behavior.
4. Compared guidance docs for consistency and drift.

## Executive Summary

The customization system is fundamentally strong. Canonical content in .ai is present, discovery links are active, setup automation is in place, and VS Code settings point to canonical folders.

No critical blockers were found. The main gaps are consistency and hardening opportunities: mixed canonical-path messaging, one tracked generated discovery file, cross-platform path matching edge case in the post-edit hook, and small repository hygiene drift.

Implementation status (all approved options completed):
- A: Implemented ✅
- B: Implemented ✅
- C: Implemented ✅
- D: Implemented ✅
- E: Implemented ✅

## Confirmed Findings

### F1. Mixed Canonical Path Messaging
Severity: Recommended

Evidence:
- AGENTS.md uses .github paths as source-of-truth references.
- .ai/README.md and docs/guides/ai-customization-guide.md define .ai as canonical and .github/.cursor as generated discovery links.

Risk:
- Team members may edit via discovery paths instead of canonical paths, increasing drift risk.

Suggestion:
- Standardize language: .ai is canonical, .github/.cursor are discovery links.

### F2. Prompt Points to Discovery Path
Severity: Recommended

Evidence:
- .ai/prompts/work-on-story.prompt.md references .github/copilot-instructions.md.

Risk:
- Works while links are healthy, but reinforces indirect path usage and weakens canonical model clarity.

Suggestion:
- Reference .ai/copilot-instructions.md directly in prompt/agent docs.

### F3. Hook Agile-Path Detection Could Miss Windows Paths
Severity: Recommended

Evidence:
- .ai/scripts/ai-post-edit-check.mjs checks agile files using substring matching against docs/specs/agile-artifacts.

Risk:
- Incoming edited-file args can include backslashes on Windows, causing false negatives.

Suggestion:
- Normalize separators before matching and use prefix-based checks.

### F4. Generated Discovery File Still Tracked
Severity: Recommended

Evidence:
- .gitignore ignores .github/copilot-instructions.md and discovery links.
- Git index still includes .github/copilot-instructions.md.

Risk:
- Noise in reviews and confusion around canonical ownership.

Suggestion:
- Untrack generated discovery links from git index while preserving local link files.

### F5. .gitignore Contains Minor Duplicate Entries
Severity: Optimization

Evidence:
- .github/skills and .cursor/skills appear in two ignore sections.

Risk:
- Low risk, but creates minor maintenance noise.

Suggestion:
- Remove duplicate lines and keep one clearly documented section.

## What Looks Good (No Action Required)

1. Canonical customizations exist and are complete under .ai.
2. .github and .cursor discovery links are active and correctly pointed.
3. setup-ai-links scripts are idempotent and cover macOS/Linux/Windows.
4. VS Code settings use object-form chat.* locations and point to .ai.
5. Skills include required frontmatter and align with folder names.

## Decision Menu (Choose What To Include)

Mark selected items with [x]. Leave others as [ ].

### Option A: Canonical Consistency Pack
- [x] Align AGENTS.md wording to canonical .ai model.
- [x] Update prompt/agent references from .github paths to .ai paths.
- [x] Add one short canonical reminder in always-on instructions.

Expected impact: High clarity, low risk.

### Option B: Hook Portability Hardening
- [x] Patch post-edit hook path matching for slash/backslash normalization.
- [x] Keep existing behavior and commands unchanged.

Expected impact: Prevent missed agile checks on Windows.

### Option C: Generated-Link Repo Hygiene
- [x] Untrack generated discovery links in git index.
- [x] Keep .gitignore as authority for generated artifacts.

Expected impact: Cleaner PRs and less ownership ambiguity.

### Option D: AI Verify Command
- [x] Add ai:verify script to validate links, required files, and hook target.
- [x] Optionally wire to CI or use manually.

Status: Implemented. Run `pnpm ai:verify` to validate links, canonical files, hook config, and metadata.

Expected impact: Faster detection of broken local setups and unhealthy configurations.


### Option E: Customization Metadata Lint
- [x] Add lightweight frontmatter lint for agent/prompt/skill files.

Status: Implemented. Run `pnpm ai:lint-metadata` or invoked automatically by ai:verify.

Expected impact: Prevents silent discovery failures.

## Suggested Selection Bundles

1. Fast and safe: A + B + C
2. Governance-focused: A + B + C + D
3. Full hardening: A + B + C + D + E

## Clarifications Needed Before Any Fixes

1. Should this second-opinion report replace the existing audit report, or should both be kept?
2. Do you want only low-effort changes first (A/B/C), or also process guardrails (D/E)?
3. Should generated discovery links be strictly untracked for all contributors, including historical cleanup in the current branch?

## Files Reviewed

- AGENTS.md
- .ai/README.md
- .ai/copilot-instructions.md
- .ai/instructions/agile-artifacts.instructions.md
- .ai/prompts/work-on-story.prompt.md
- .ai/agents/story-orchestrator.agent.md
- .ai/hooks/post-edit-checks.json
- .ai/scripts/ai-post-edit-check.mjs
- .ai/skills/README.md
- .ai/skills/shadcn/SKILL.md
- .ai/skills/tech-audit/SKILL.md
- scripts/setup-ai-links.sh
- scripts/setup-ai-links.ps1
- .gitignore
- .vscode/settings.json
- docs/guides/ai-customization-guide.md
- docs/guides/ai-first-run-scripts-guide.md
- docs/reports/ai-customization-audit-2026-04-29.md
