# Agile Artifacts Workspace

This directory organizes all Agile SDLC artifacts for the Next.js frontend starter initiative.

## Structure
- `00-governance`: standards, ownership model, and lifecycle policies for artifacts
- `01-templates`: reusable templates for each SDLC phase
- `02-phase-artifacts`: canonical phase-level documents with current working content
- `03-delivery-records`: one folder per release for active delivery records, plus a lightweight archive tracker

## Layering Model
- `02-phase-artifacts` holds the canonical source of truth for each SDLC phase.
- `03-delivery-records` holds evolving release instances and sprint records that reference canonical artifacts and store only delivery-specific deltas, outcomes, and evidence links.

## How to Use
1. Start from `INDEX.md` to locate a phase or sprint artifact quickly.
2. Use `01-templates` when creating new artifacts.
3. Keep canonical source-of-truth artifacts in `02-phase-artifacts`.
4. Keep release and sprint instance records in `03-delivery-records`.
5. Update `INDEX.md` and `artifact-registry.md` in the same change whenever delivery records are added, moved, archived, or superseded.

## Delivery Record Status Conventions
- Use `Draft` when a release or sprint record is being prepared and content is incomplete.
- Move to `In Review` when scope, links, and evidence references are ready for PO/TL/QA review.
- Move to `Approved` when the record is accepted as the current delivery reference for that release or sprint.
- Move to `Archived` when the release or sprint is closed and no longer active.
- Keep the `State` field in the record, `artifact-registry.md`, and any sign-off section aligned.

## Adding a New Release
1. Create `03-delivery-records/release-XX/`.
2. Add `release-pack.md` from `01-templates/release/release-pack.template.md`.
3. Add sprint records as `sprint-YY.md` files as planning or execution starts.
4. Register the release instance and child sprint instances in `artifact-registry.md`.
5. Add the release and sprint file references to `INDEX.md`.

### Release Creation Checklist
- [ ] Create `03-delivery-records/release-XX/`.
- [ ] Create `release-pack.md` from `01-templates/release/release-pack.template.md`.
- [ ] Fill metadata: owner, leads, state, review date, and baseline window.
- [ ] Link canonical release and iteration artifacts.
- [ ] Seed known sprint files only if planning has started.
- [ ] Add the release row to `artifact-registry.md`.
- [ ] Add the release and sprint file paths to `INDEX.md`.
- [ ] Validate naming, links, and lifecycle state before review.

## Adding a New Sprint
1. Create `03-delivery-records/release-XX/sprint-YY.md`.
2. Create the sprint record from the sprint pack template baseline.
3. Reference canonical backlog, DoD, QA, and release artifacts instead of copying them.
4. Add direct evidence links in the sprint file; create local attachments only when necessary.
5. Update `INDEX.md` and `artifact-registry.md` together.

### Sprint Creation Checklist
- [ ] Create `03-delivery-records/release-XX/sprint-YY.md` from `01-templates/iteration/sprint-pack.template.md`.
- [ ] Fill metadata: dates, owner roles, state, and review date.
- [ ] Link canonical stories, backlog, DoD, and QA artifacts.
- [ ] Record sprint-specific deltas only.
- [ ] Add direct evidence links or note why evidence is pending.
- [ ] Add the sprint row to `artifact-registry.md` with the correct `parent_artifact_id`.
- [ ] Add the sprint file path under the release in `INDEX.md`.
- [ ] Validate state, links, and naming before moving to `In Review`.

## Delivery Record Review Cadence
- **Sprint records:** review during sprint planning, sprint review, and sprint closure.
- **Release packs:** review at release planning start, release readiness review, and release closure.
- **Registry/index drift check:** perform at least once per month, or immediately after a release closes.
- **Ownership:** SM drives cadence compliance, PO confirms scope accuracy, TL and QA validate technical and quality evidence.

## Automation Commands
- `pnpm agile:scaffold -- --release release-XX --title "Release title" --sprints sprint-YY,sprint-ZZ`
- `pnpm agile:check`
- Run `pnpm agile:check` after adding, archiving, or renaming delivery records and during the monthly governance review.

## Evidence Naming Rules
- Prefer direct links to external evidence systems first: CI runs, dashboards, demos, and test reports.
- If evidence must be stored in the workspace, use lowercase kebab-case and prefix by evidence type.
- Recommended file patterns:
	- `ci-run-YYYY-MM-DD.md`
	- `demo-notes-YYYY-MM-DD.md`
	- `test-report-YYYY-MM-DD.md`
	- `metrics-snapshot-YYYY-MM-DD.md`
- If evidence belongs to a specific sprint, keep the date and sprint context in the filename or first heading.
- Do not create local evidence folders unless the sprint or release has actual files to store.

## Archive Split Trigger
- Keep using `03-delivery-records/archive.md` while archived volume is low.
- Split into archive folders only when one of these triggers is met:
	- more than 12 archived records are tracked, or
	- archived records require local attachments that cannot be summarized cleanly in a single file, or
	- monthly review shows `archive.md` is no longer easy to scan.

## Naming Conventions
- Use lowercase kebab-case for folders and files.
- Avoid numeric prefixes on individual files; rely on `INDEX.md` for sequence.
- Prefer concise, domain-based filenames (example: `qa-strategy-and-test-plan.md`).

## Change Rules
- Update `INDEX.md` and `artifact-registry.md` whenever files are added, moved, or archived.
- Do not store duplicates of the same artifact across canonical and delivery-instance folders.
- Keep sprint and release packs delta-oriented; canonical content remains in `02-phase-artifacts`.
- Track archived delivery records in `03-delivery-records/archive.md` until archive volume justifies a dedicated folder split.
- Apply the release/sprint creation checklists before moving a delivery record to `In Review`.

## Current Planning Baseline
- `release-01: The Foundation of Landing Pages` -> `sprint-01` (scaffolding + unit test baseline), `sprint-02` (landing page + onboarding + navigation + base components)
- `release-02: Standardizing Light and Dark Mode` -> `sprint-03` (theme toggle), `sprint-04` (settings page)
- `release-03: Storybook Integration and Documentation` -> `sprint-05` (Storybook integration), `sprint-06` (documentation)
- This baseline is intentionally open-ended; new `release-XX` and `sprint-YY` instances can be added without changing the canonical phase structure.

## Scope Guardrails
- This initiative is frontend-only (no backend implementation in project scope).
- UI standardization uses shadcn/ui with Tailwind CSS v4 semantic tokens.
