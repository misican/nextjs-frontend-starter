# Agile Artifacts Dynamic Growth Plan

## Objective
Keep `docs/specs/agile-artifacts` maintainable as new releases and sprints are added without turning canonical phase artifacts into duplicated or brittle delivery records.

## Scope
- Current target: `docs/specs/agile-artifacts`
- Change horizon: future `release-XX` and `sprint-YY` additions
- Constraint: preserve the current phase-based source-of-truth model while making delivery evidence scalable

## Confirmed Decisions
- Release and sprint instance records will live inside `docs/specs/agile-artifacts`.
- Phase 1 document changes will be applied directly to the workspace.
- The current `3 releases / 6 sprints` roadmap is treated as a baseline seed, not a structural ceiling.
- Preferred target shape: **moderately lean**, with one folder per release and sprint records stored as files inside the release folder.

## Technical Audit Report

### Spec Scope
Reviewed:
- `docs/specs/agile-artifacts/README.md`
- `docs/specs/agile-artifacts/INDEX.md`
- `docs/specs/agile-artifacts/artifact-registry.md`
- `docs/specs/agile-artifacts/00-governance/naming-conventions.md`
- `docs/specs/agile-artifacts/00-governance/artifact-lifecycle.md`
- `docs/plans/agile-artifacts-revision-plan.md`
- `docs/releases/agile-artifacts-revision-closure-summary.md`

### Current State Summary
The workspace has a clear split between governance, templates, and canonical phase artifacts. That is strong for baseline SDLC documentation. However, the current model still hard-codes a `3 releases / 6 sprints` roadmap in planning and closure documents, while governance already hints at future `release-XX` and `sprint-YY` growth. In addition, the first dynamic-growth implementation introduced more folders and placeholder files than the team wants to maintain long term. The structure is therefore scalable, but currently heavier than necessary for the expected operating cadence.

### Findings by Severity

#### Critical
1. **Release and sprint runtime artifacts have no dedicated home**
   - Governance and naming examples anticipate `release-XX` and `sprint-YY`, but `docs/specs/agile-artifacts` currently contains only phase-level folders.
   - Impact: teams will either overload canonical files or create ad hoc folders that drift from governance.

2. **Roadmap assumptions are embedded as fixed numbers**
   - The plan and closure summary anchor the system to `3 releases / 6 sprints`.
   - Impact: every new release risks requiring manual doc rewrites across multiple files.

3. **Registry schema does not yet distinguish canonical artifacts from delivery instances strongly enough**
   - The registry supports `release-XX/sprint-YY` values conceptually, but it does not define parent-child linkage, template source, or archive location.
   - Impact: poor traceability once multiple release and sprint instances exist.

#### Recommended
1. **Introduce a dedicated delivery-record layer**
   - Add a folder for evolving release/sprint instances while keeping `02-phase-artifacts` canonical.

2. **Flatten sprint records within each release folder**
   - Keep one folder per release, but store sprint records as `sprint-YY.md` files rather than one folder per sprint.

3. **Define a creation workflow for new release/sprint additions**
   - Require the same update sequence each time: scaffold folder, clone template, register artifact, update index, link evidence.

4. **Formalize delta-only rules for sprint and release packs**
   - Sprint and release docs should reference canonical artifacts and store only scope-specific deltas, evidence, and outcomes.

5. **Remove placeholder-only folders unless they are actively used**
   - Archive trees, evidence folders, and per-release README files should exist only when they provide real operational value.

#### Optimization
1. **Add lightweight scaffolding automation**
   - A small script or task can create a new `release-XX` or `sprint-YY` pack from templates and pre-fill metadata.

2. **Add archive conventions**
   - Close completed or superseded release/sprint packs into an archive path without polluting active navigation.

3. **Add monthly governance review cadence**
   - Review the registry and active delivery folders to prevent drift.

## Recommended Target Structure (Moderately Lean)

```text
docs/specs/agile-artifacts/
  00-governance/
  01-templates/
      iteration/
         sprint-pack.template.md
      release/
         release-pack.template.md
  02-phase-artifacts/
    ... canonical source-of-truth docs ...
  03-delivery-records/
      release-01/
         release-pack.md
         sprint-01.md
         sprint-02.md
      release-02/
         release-pack.md
         sprint-03.md
         sprint-04.md
      release-03/
         release-pack.md
         sprint-05.md
         sprint-06.md
      archive.md
```

### Why this shape is preferred
- Keeps the strong canonical vs delivery separation.
- Limits nesting to a single level under each release.
- Removes one-folder-per-sprint overhead.
- Avoids maintaining README placeholders that duplicate `release-pack.md`.
- Keeps archiving lightweight until historical volume actually grows.

## Design Principles
1. **Canonical vs instance separation**
   - `02-phase-artifacts`: long-lived source of truth
   - `03-delivery-records`: release/sprint instances, evidence, and outcomes

2. **Delta-over-duplication**
   - Instance docs must reference canonical files rather than copy them.

3. **Lean grouping**
   - Use one folder per release.
   - Store sprint records as files inside the release folder: `sprint-YY.md`.
   - Create subfolders only when a sprint needs local binary evidence that cannot be linked externally.

4. **Stable identifiers**
   - Use zero-padded identifiers: `release-01`, `sprint-01`
   - Add parent references in metadata: sprint belongs to release

5. **Append-only history**
   - Do not rewrite historical sprint packs to fit new structures; supersede or archive them.

## Governance Adjustments to Make

### 1. README
- Add `03-delivery-records` to the documented structure.
- Replace roadmap examples that look fixed with wording such as “current planning baseline”.
- Add a “How to add a release” and “How to add a sprint” section.
- Keep navigation concise; avoid duplicating release summaries in multiple README files.

### 2. INDEX
- Keep existing governance/template/canonical sections.
- Add:
  - `03-delivery-records`
   - active releases
   - sprint files under each release
   - archive location as a single entry unless archive volume grows

### 3. Naming Conventions
- Standardize:
  - `release-XX`
   - `sprint-YY.md`
  - `release-pack.md`
   - `release-pack.template.md`
- Keep dedicated evidence subfolders optional, not mandatory.
- Replace example-only references with rules that match the actual directory tree.

### 4. Artifact Lifecycle
- Add lifecycle guidance for delivery instances:
  - `Draft` → `In Review` → `Approved` → `Archived`
- Clarify that canonical phase artifacts can be `Superseded`, while sprint/release packs usually move to `Archived` after closure.
- Clarify that `archive.md` is sufficient until archived records become numerous enough to justify a folder split.

### 5. Artifact Registry
Add fields:
- `artifact_scope`: `canonical | release-instance | sprint-instance | evidence`
- `parent_artifact_id`: release parent for a sprint
- `template_source`: template path used to create the artifact
- `archive_path`: populated when archived
- `iteration_window`: date range for sprint/release

Registry simplification guidance:
- Do not add registry rows for placeholder folders.
- Add evidence rows only if evidence artifacts become first-class managed files.

### 6. Templates
- Add a dedicated `release-pack.template.md`.
- Keep sprint pack template delta-oriented.
- Allow sprint instances to be stored as `sprint-YY.md` files derived from the sprint template.
- Add required metadata headers to every instance template.

## Operational Strategy for Adding a New Release
1. Create `03-delivery-records/release-XX/`.
2. Create `release-pack.md` from template.
3. Add sprint files such as `sprint-YY.md` as planning or execution starts.
4. Register the release in `artifact-registry.md`.
5. Add the release and sprint files to `INDEX.md`.
6. Update `archive.md` only when the release is closed and moved out of active use.

## Operational Strategy for Adding a New Sprint
1. Create `03-delivery-records/release-XX/sprint-YY.md`.
2. Create the sprint record from template.
3. Populate metadata: dates, owner, release parent, state.
4. Reference canonical backlog, DoD, QA plan, and stories instead of copying them.
5. Store proof as inline links by default; create a local evidence subfolder only if attachments must live beside the sprint record.
6. Register the sprint in `artifact-registry.md` with a `parent_artifact_id`.
7. Add the sprint entry under the release in `INDEX.md`.
8. Archive when complete.

## Risk Register

| Risk | Likelihood | Impact | Mitigation | Owner Suggestion |
|---|---|---|---|---|
| Canonical artifacts become cluttered with sprint-specific edits | High | High | Separate instance records into `03-delivery-records` | TL |
| Index and registry drift as the number of releases grows | High | Medium | Mandatory update checklist + review cadence | SM |
| Historical traceability is lost for completed sprints | Medium | High | Add parent-child registry links and archive paths | QA |
| Teams create inconsistent folder names for new releases | Medium | Medium | Enforce naming rules and template-based creation | TL |
| Scaling beyond the 3/6 roadmap causes spec churn | High | Medium | Replace fixed roadmap wording with rolling-baseline language | PO |
| Delivery-record structure becomes over-engineered and underused | High | Medium | Flatten release/sprint storage and remove placeholder-only folders | SM |

## Prioritized Implementation Checklist

### Phase 1 - Foundation Completed
- [x] Create a dedicated delivery-record layer for release and sprint instances.
- [x] Separate canonical phase artifacts from delivery instances.
- [x] Update roadmap wording to use “current baseline” rather than a hard ceiling.
- [x] Extend governance and registry rules to support dynamic release and sprint growth.

### Phase 1.5 - Lean Consolidation (Preferred Next Step)
- [x] Flatten sprint records from nested folders to `03-delivery-records/release-XX/sprint-YY.md`.
- [x] Remove per-release `README.md` files where `release-pack.md` already provides the summary.
- [x] Replace archive placeholder folders with a single `archive.md` until volume justifies a split.
- [x] Replace mandatory evidence folders with optional local attachments only when needed.
- [x] Update `INDEX.md`, `artifact-registry.md`, and naming rules to match the leaner file layout.
- [x] Add a dedicated `release-pack.template.md` to match the adopted release record shape.

### Phase 2 - Stability and Readiness
- [x] Update `naming-conventions.md` to align examples with the lean release-folder model.
- [x] Update `artifact-lifecycle.md` with simplified archive behavior.
- [x] Add a documented checklist for adding a release or sprint under the lean structure.

### Phase 2.5 - Operational Hardening
- [x] Add a delivery-record review cadence to `README.md` or governance docs.
- [x] Add status conventions for release and sprint record files.
- [x] Add evidence naming rules for CI runs, demos, and test exports.

### Phase 3 - Optimizations
- [x] Add a script or task to scaffold a release folder and sprint files from templates.
- [x] Split `archive.md` into archive folders only if historical volume justifies it.
- [x] Add periodic governance review cadence and drift checks.

## Recommended Default Decision
Adopt a **moderately lean dual-layer model**:
- keep `02-phase-artifacts` as canonical and reusable
- keep one folder per release under `03-delivery-records`
- store sprint instances as `sprint-YY.md` files inside the release folder
- avoid placeholder folders unless they are actively needed

This keeps the documentation scalable without creating unnecessary folder and file overhead.
