# Naming Conventions

## Purpose
Define consistent naming for Agile artifact files and folders.

## Folder Naming
- Use lowercase kebab-case.
- Use top-level numeric prefixes only for major groups (example: `01-templates`).
- Use the delivery-record layer name `03-delivery-records` for release and sprint instances.
- Use release folders as `release-XX` (example: `release-01`).
- Do not create one folder per sprint unless a sprint must carry local binary attachments.
- Use `archive.md` first; split archives into folders only when volume justifies it.

## File Naming
- Use lowercase kebab-case.
- Prefer semantic names over numbered prefixes.
- Use `.template.md` suffix for reusable templates.
- Keep phase artifacts without suffixes (example: `sprint-backlog.md`).
- Use `release-pack.md` for release instance records.
- Use `sprint-YY.md` for sprint instance records.
- Use `README.md` only when it adds unique operating guidance that is not already captured elsewhere.

## Evidence Naming
- Prefer direct links to external evidence systems when possible.
- If evidence is stored in the workspace, use lowercase kebab-case with an evidence-type prefix.
- Recommended patterns:
	- `ci-run-YYYY-MM-DD.md`
	- `demo-notes-YYYY-MM-DD.md`
	- `test-report-YYYY-MM-DD.md`
	- `metrics-snapshot-YYYY-MM-DD.md`
- If a single file serves one sprint or release, reference the owning `release-XX` or `sprint-YY` in the title or opening section rather than inflating the filename.

## Examples
- `02-phase-artifacts/release/qa-strategy-and-test-plan.md`
- `01-templates/inception/technical-blueprint.template.md`
- `03-delivery-records/release-02/release-pack.md`
- `03-delivery-records/release-02/sprint-04.md`
- `03-delivery-records/archive.md`
- `ci-run-2026-04-28.md`
- `test-report-2026-04-28.md`

## Do/Don't
- **Do:** `user-stories-and-acceptance-criteria.md`
- **Do:** `release-03/sprint-05.md`
- **Do:** `demo-notes-2026-04-28.md`
- **Don't:** `UserStories_v2_FINAL.md`
- **Don't:** `Release3_Final_v2.md`
- **Don't:** `FinalDemoNEWEST.pptx`
