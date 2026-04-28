#!/usr/bin/env bash
# scripts/setup-ai-links.sh
# Creates IDE-specific symlinks pointing to .ai/skills/ as the canonical source.
# Compatible with bash 3.2+ (macOS default). Safe to run multiple times (idempotent).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_ABS="$REPO_ROOT/.ai/skills"
SOURCE_REL="../.ai/skills"

# Parallel arrays: link paths and their targets
LINK_RELS=(".github/skills" ".cursor/skills")

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

success() { printf "${GREEN}✓${NC} %s\n" "$1"; }
warn()    { printf "${YELLOW}!${NC} %s\n" "$1"; }
error()   { printf "${RED}✗${NC} %s\n" "$1"; }

for LINK_REL in "${LINK_RELS[@]}"; do
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
