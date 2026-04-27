#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const docsDir = join(rootDir, 'docs', 'specs', 'agile-artifacts');
const deliveryDir = join(docsDir, '03-delivery-records');
const releaseTemplatePath = join(
	 docsDir,
	 '01-templates',
	 'release',
	 'release-pack.template.md',
);
const sprintTemplatePath = join(
	 docsDir,
	 '01-templates',
	 'iteration',
	 'sprint-pack.template.md',
);
const indexPath = join(docsDir, 'INDEX.md');
const registryPath = join(docsDir, 'artifact-registry.md');
const args = parseArgs(process.argv.slice(2));

if (args.help || !args.release || !args.title) {
	printUsage(args.help ? 0 : 1);
}

validateRelease(args.release);
const sprintIds = parseSprints(args.sprints);
const releaseFolderPath = join(deliveryDir, args.release);

if (existsSync(releaseFolderPath)) {
	console.error(`Release folder already exists: ${relativeToRoot(releaseFolderPath)}`);
	process.exit(1);
}

const context = {
	releaseId: args.release,
	title: args.title,
	owner: args.owner ?? 'PO',
	techLead: args.techLead ?? 'TL',
	qaLead: args.qaLead ?? 'QA',
	scrumMaster: args.scrumMaster ?? 'SM',
	state: args.state ?? 'Draft',
	baselineWindow: args.window ?? 'current baseline',
	lastReviewed: args.reviewDate ?? new Date().toISOString().slice(0, 10),
	sprintIds,
};

const plannedFiles = buildPlannedFiles(context);
const nextRegistryRows = buildRegistryRows(context);
const nextIndexContent = buildIndexContent();
const nextRegistryContent = buildRegistryContent(nextRegistryRows);

if (args.dryRun) {
	console.log('Dry run: no files were written.');
	console.log('Planned files:');
	for (const file of plannedFiles) {
		console.log(`- ${relativeToRoot(file.path)}`);
	}
	console.log('Registry rows to add:');
	for (const row of nextRegistryRows) {
		console.log(`- ${row.artifactId}: ${row.path}`);
	}
	console.log('INDEX.md and artifact-registry.md would be updated.');
	process.exit(0);
}

mkdirSync(releaseFolderPath, { recursive: true });
for (const file of plannedFiles) {
	mkdirSync(dirname(file.path), { recursive: true });
	writeFileSync(file.path, file.content, 'utf8');
}
writeFileSync(indexPath, nextIndexContent, 'utf8');
writeFileSync(registryPath, nextRegistryContent, 'utf8');

console.log(`Created ${relativeToRoot(releaseFolderPath)}`);
for (const file of plannedFiles) {
	console.log(`Wrote ${relativeToRoot(file.path)}`);
}
console.log('Updated docs/specs/agile-artifacts/INDEX.md');
console.log('Updated docs/specs/agile-artifacts/artifact-registry.md');

function parseArgs(argv) {
	const parsed = {};
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (arg === '--') {
			continue;
		}
		if (!arg.startsWith('--')) {
			continue;
		}
		const key = arg.slice(2);
		if (['dry-run', 'help'].includes(key)) {
			parsed[camelCase(key)] = true;
			continue;
		}
		parsed[camelCase(key)] = argv[index + 1];
		index += 1;
	}
	return parsed;
}

function printUsage(exitCode) {
	const lines = [
		'Usage:',
		'  node scripts/scaffold-agile-delivery-records.mjs --release release-04 --title "Release title" [options]',
		'',
		'Options:',
		'  --sprints sprint-07,sprint-08',
		'  --owner PO',
		'  --tech-lead TL',
		'  --qa-lead QA',
		'  --scrum-master SM',
		'  --state Draft',
		'  --window "current baseline"',
		'  --review-date 2026-04-28',
		'  --dry-run',
		'  --help',
	];
	const logger = exitCode === 0 ? console.log : console.error;
	for (const line of lines) {
		logger(line);
	}
	process.exit(exitCode);
}

function validateRelease(releaseId) {
	if (!/^release-\d{2}$/.test(releaseId)) {
		console.error('Release ID must match release-XX.');
		process.exit(1);
	}
}

function parseSprints(value) {
	if (!value) {
		return [];
	}
	const items = value
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);
	for (const sprintId of items) {
		if (!/^sprint-\d{2}$/.test(sprintId)) {
			console.error(`Sprint ID must match sprint-YY: ${sprintId}`);
			process.exit(1);
		}
	}
	return items;
}

function buildPlannedFiles(contextValue) {
	const releaseTemplate = readFileSync(releaseTemplatePath, 'utf8');
	const sprintTemplate = readFileSync(sprintTemplatePath, 'utf8');
	const files = [];

	files.push({
		path: join(releaseFolderPath, 'release-pack.md'),
		content: renderReleasePack(releaseTemplate, contextValue),
	});

	for (const sprintId of contextValue.sprintIds) {
		files.push({
			path: join(releaseFolderPath, `${sprintId}.md`),
			content: renderSprintPack(sprintTemplate, contextValue, sprintId),
		});
	}

	return files;
}

function renderReleasePack(template, contextValue) {
	let content = template
		.replace('# Release Pack Template', `# ${titleCase(contextValue.releaseId)} Pack`)
		.replace('- Release ID: `release-XX`', `- Release ID: \`${contextValue.releaseId}\``)
		.replace('- Title:', `- Title: \`${contextValue.title}\``)
		.replace('- Owner:', `- Owner: ${contextValue.owner}`)
		.replace('- Tech Lead:', `- Tech Lead: ${contextValue.techLead}`)
		.replace('- QA Lead:', `- QA Lead: ${contextValue.qaLead}`)
		.replace('- Scrum Master:', `- Scrum Master: ${contextValue.scrumMaster}`)
		.replace('- State: `Draft | In Review | Approved | Archived`', `- State: \`${contextValue.state}\``)
		.replace('- Baseline Window:', `- Baseline Window: \`${contextValue.baselineWindow}\``)
		.replace('- Last Reviewed: `YYYY-MM-DD`', `- Last Reviewed: \`${contextValue.lastReviewed}\``);

	content = replaceReleaseCanonicalLinks(content);
	content = replaceSprintRoster(content, contextValue.sprintIds);
	content = content.replace(
		'- YYYY-MM-DD: Release instance initialized.',
		`- ${contextValue.lastReviewed}: Release instance initialized via scaffold automation.`,
	);

	return content;
}

function renderSprintPack(template, contextValue, sprintId) {
	let content = template
		.replace('# Sprint Pack Template', `# ${titleCase(sprintId)} Pack`)
		.replace('- Sprint ID: `sprint-YY`', `- Sprint ID: \`${sprintId}\``)
		.replace('- Release ID: `release-XX`', `- Release ID: \`${contextValue.releaseId}\``)
		.replace('- Product Owner:', `- Product Owner: ${contextValue.owner}`)
		.replace('- Scrum Master:', `- Scrum Master: ${contextValue.scrumMaster}`)
		.replace('- Tech Lead:', `- Tech Lead: ${contextValue.techLead}`)
		.replace('- QA Lead:', `- QA Lead: ${contextValue.qaLead}`)
		.replace('- State: `Draft | In Review | Approved`', `- State: \`${contextValue.state}\``)
		.replace('- Last Reviewed: `YYYY-MM-DD`', `- Last Reviewed: \`${contextValue.lastReviewed}\``);

	content = replaceSprintCanonicalLinks(content);
	return content;
}

function replaceReleaseCanonicalLinks(content) {
	return content
		.replace('- QA strategy:', '- QA strategy: `../../02-phase-artifacts/release/qa-strategy-and-test-plan.md`')
		.replace('- Test cases:', '- Test cases: `../../02-phase-artifacts/release/test-cases.md`')
		.replace('- Release notes template:', '- Release notes template: `../../02-phase-artifacts/release/release-notes-template.md`')
		.replace('- Go/no-go checklist:', '- Go/no-go checklist: `../../02-phase-artifacts/release/go-no-go-checklist.md`')
		.replace('- Sprint backlog:', '- Sprint backlog: `../../02-phase-artifacts/iteration/sprint-backlog.md`')
		.replace('- Definition of done:', '- Definition of done: `../../02-phase-artifacts/iteration/definition-of-done.md`');
}

function replaceSprintCanonicalLinks(content) {
	return content
		.replace('| Stories | User Stories and Acceptance Criteria |  |  |', '| Stories | User Stories and Acceptance Criteria | `../../02-phase-artifacts/inception/user-stories-and-acceptance-criteria.md` | Sprint-specific story selection |')
		.replace('| Backlog | Sprint Backlog |  |  |', '| Backlog | Sprint Backlog | `../../02-phase-artifacts/iteration/sprint-backlog.md` | Sprint execution order and ownership |')
		.replace('| Quality | Definition of Done |  |  |', '| Quality | Definition of Done | `../../02-phase-artifacts/iteration/definition-of-done.md` | No sprint-specific exceptions recorded yet |')
		.replace('| Test | QA Strategy and Test Plan |  |  |', '| Test | QA Strategy and Test Plan | `../../02-phase-artifacts/release/qa-strategy-and-test-plan.md` | Sprint quality gate confirmation |');
}

function replaceSprintRoster(content, sprintIds) {
	const lines = sprintIds.length > 0
		? sprintIds.map((sprintId) => `| ${sprintId} | TBD | \`./${sprintId}.md\` | Draft |`).join('\n')
		: '| sprint-YY |  |  |  |';
	return content.replace('| sprint-YY |  |  |  |', lines);
}

function buildIndexContent() {
	const current = readFileSync(indexPath, 'utf8');
	const releaseDirs = getReleaseDirectories();
	const section = ['## 03-delivery-records'];
	for (const releaseDir of releaseDirs) {
		section.push(`### ${releaseDir}`);
		section.push('- `release-pack.md`');
		for (const sprintFile of getSprintFiles(releaseDir)) {
			section.push(`- \`${sprintFile}\``);
		}
		section.push('');
	}
	section.push('### archive');
	section.push('- `archive.md`');

	return current.replace(/## 03-delivery-records[\s\S]*?## Tracking/, `${section.join('\n')}\n\n## Tracking`);
}

function buildRegistryRows(contextValue) {
	const current = readFileSync(registryPath, 'utf8');
	const nextReleaseId = nextNumericId(current, 'DR-REL');
	const nextSprintId = nextNumericId(current, 'DR-SPR');
	const rows = [];
	const releaseArtifactId = `DR-REL-${formatId(nextReleaseId)}`;
	rows.push({
		artifactId: releaseArtifactId,
		path: `docs/specs/agile-artifacts/03-delivery-records/${contextValue.releaseId}/release-pack.md`,
		row: `| ${releaseArtifactId} | ${titleCase(contextValue.releaseId)} Pack | delivery-record | release-instance | ${contextValue.releaseId} | ${contextValue.owner} | ${contextValue.state} | no | docs/specs/agile-artifacts/03-delivery-records/${contextValue.releaseId}/release-pack.md | - | docs/specs/agile-artifacts/01-templates/release/release-pack.template.md | ${contextValue.baselineWindow} | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | ${contextValue.lastReviewed} |`,
	});
	contextValue.sprintIds.forEach((sprintId, offset) => {
		const artifactId = `DR-SPR-${formatId(nextSprintId + offset)}`;
		rows.push({
			artifactId,
			path: `docs/specs/agile-artifacts/03-delivery-records/${contextValue.releaseId}/${sprintId}.md`,
			row: `| ${artifactId} | ${titleCase(sprintId)} Pack | delivery-record | sprint-instance | ${sprintId} | ${contextValue.scrumMaster} | ${contextValue.state} | no | docs/specs/agile-artifacts/03-delivery-records/${contextValue.releaseId}/${sprintId}.md | ${releaseArtifactId} | docs/specs/agile-artifacts/01-templates/iteration/sprint-pack.template.md | TBD | - | docs/specs/agile-artifacts/03-delivery-records/archive.md | ${contextValue.lastReviewed} |`,
		});
	});
	return rows;
}

function buildRegistryContent(newRows) {
	const current = readFileSync(registryPath, 'utf8');
	const marker = '\n\n## Notes\n';
	const [beforeNotes, notesSection] = current.split(marker);
	const trimmed = beforeNotes.trimEnd();
	const appendedRows = newRows.map((item) => item.row).join('\n');
	return `${trimmed}\n${appendedRows}${marker}${notesSection}`;
}

function nextNumericId(content, prefix) {
	const regex = new RegExp(`\\| ${prefix}-(\\d{3}) \\|`, 'g');
	let match;
	let max = 0;
	while ((match = regex.exec(content)) !== null) {
		max = Math.max(max, Number(match[1]));
	}
	return max + 1;
}

function formatId(value) {
	return String(value).padStart(3, '0');
}

function getReleaseDirectories() {
	const existing = existsSync(deliveryDir)
		? readdirSync(deliveryDir, { withFileTypes: true })
				.filter((entry) => entry.isDirectory() && /^release-\d{2}$/.test(entry.name))
				.map((entry) => entry.name)
		: [];
	return [...new Set([...existing, args.release])].sort();
}

function getSprintFiles(releaseId) {
	const folderPath = join(deliveryDir, releaseId);
	if (existsSync(folderPath)) {
		return readdirSync(folderPath)
			.filter((fileName) => /^sprint-\d{2}\.md$/.test(fileName))
			.sort();
	}
	if (releaseId === args.release) {
		return args.sprints ? parseSprints(args.sprints).map((item) => `${item}.md`) : [];
	}
	return [];
}

function camelCase(value) {
	return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function titleCase(value) {
	return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function relativeToRoot(path) {
	return path.replace(`${rootDir}/`, '');
}
