#!/usr/bin/env bash
# scripts/setup-ai-links.sh
# Creates IDE-specific symlinks pointing to .ai/ as the canonical source.
# Handles both directory and file symlinks.
# Compatible with bash 3.2+ (macOS default). Safe to run multiple times (idempotent).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Format: "LINK_REL|TARGET_REL"
# TARGET_REL is relative to the link's parent directory.
LINKS=(
  ".github/copilot-instructions.md|../.ai/copilot-instructions.md"
  ".github/agents|../.ai/agents"
  ".github/prompts|../.ai/prompts"
  ".github/hooks|../.ai/hooks"
  ".github/instructions|../.ai/instructions"
  ".github/skills|../.ai/skills"
  ".cursor/skills|../.ai/skills"
  ".cursor/agents|../.ai/agents"
  ".cursor/prompts|../.ai/prompts"
)

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

success() { printf "${GREEN}✓${NC} %s\n" "$1"; }
warn()    { printf "${YELLOW}!${NC} %s\n" "$1"; }
error()   { printf "${RED}✗${NC} %s\n" "$1"; }

for ENTRY in "${LINKS[@]}"; do
  LINK_REL="${ENTRY%%|*}"
  SOURCE_REL="${ENTRY##*|}"
  LINK="$REPO_ROOT/$LINK_REL"
  PARENT="$(dirname "$LINK")"

  mkdir -p "$PARENT"

  if [ -L "$LINK" ]; then
    CURRENT="$(readlink "$LINK")"
    if [ "$CURRENT" = "$SOURCE_REL" ]; then
      success "$LINK_REL → already correct"
      continue
    else
      warn "$LINK_REL → stale link ($CURRENT), updating..."
      rm "$LINK"
    fi
  elif [ -e "$LINK" ]; then
    error "$LINK_REL exists and is not a symlink — skipping (remove manually to replace)"
    continue
  fi

  ln -s "$SOURCE_REL" "$LINK"
  success "$LINK_REL → $SOURCE_REL"
done
