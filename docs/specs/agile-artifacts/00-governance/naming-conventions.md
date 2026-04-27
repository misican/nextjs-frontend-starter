# Naming Conventions

## Purpose
Define consistent naming for Agile artifact files and folders.

## Folder Naming
- Use lowercase kebab-case.
- Use top-level numeric prefixes only for major groups (example: `01-templates`).
- Use sprint folders as `sprint-XX` (example: `sprint-01`).

## File Naming
- Use lowercase kebab-case.
- Prefer semantic names over numbered prefixes.
- Use `.template.md` suffix for reusable templates.
- Keep phase artifacts without suffixes (example: `sprint-backlog.md`).

## Examples
- `02-phase-artifacts/release/qa-strategy-and-test-plan.md`
- `01-templates/inception/technical-blueprint.template.md`
- `03-releases/release-02/sprints/sprint-02/sprint-pack.md`

## Do/Don't
- **Do:** `user-stories-and-acceptance-criteria.md`
- **Don't:** `UserStories_v2_FINAL.md`
