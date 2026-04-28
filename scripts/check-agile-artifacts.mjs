#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const docsDir = join(rootDir, "docs", "specs", "agile-artifacts");
const deliveryDir = join(docsDir, "03-delivery-records");
const indexPath = join(docsDir, "INDEX.md");
const registryPath = join(docsDir, "artifact-registry.md");
const archivePath = join(deliveryDir, "archive.md");

const errors = [];

if (!existsSync(deliveryDir)) {
	errors.push("Missing docs/specs/agile-artifacts/03-delivery-records");
}

if (!existsSync(archivePath)) {
	errors.push(
		"Missing docs/specs/agile-artifacts/03-delivery-records/archive.md",
	);
}

const releaseDirs = existsSync(deliveryDir)
	? readdirSync(deliveryDir, { withFileTypes: true })
			.filter(
				(entry) => entry.isDirectory() && /^release-\d{2}$/.test(entry.name),
			)
			.map((entry) => entry.name)
			.sort()
	: [];

const deliveryPaths = [];
for (const releaseDir of releaseDirs) {
	const releasePath = join(deliveryDir, releaseDir);
	const releasePackPath = join(releasePath, "release-pack.md");
	if (!existsSync(releasePackPath)) {
		errors.push(`Missing release-pack.md in ${relativeToRoot(releasePath)}`);
	} else {
		deliveryPaths.push(relativeToRoot(releasePackPath));
	}
	const sprintFiles = readdirSync(releasePath)
		.filter((fileName) => /^sprint-\d{2}\.md$/.test(fileName))
		.sort();
	for (const sprintFile of sprintFiles) {
		deliveryPaths.push(relativeToRoot(join(releasePath, sprintFile)));
	}
}

const indexContent = readFileSync(indexPath, "utf8");
for (const releaseDir of releaseDirs) {
	if (!indexContent.includes(`### ${releaseDir}`)) {
		errors.push(`INDEX.md is missing section for ${releaseDir}`);
	}
}
for (const deliveryPath of deliveryPaths) {
	const displayName = deliveryPath.split("/").at(-1);
	if (displayName && !indexContent.includes(`\`${displayName}\``)) {
		errors.push(`INDEX.md is missing file entry for ${deliveryPath}`);
	}
}
if (!indexContent.includes("`archive.md`")) {
	errors.push("INDEX.md is missing archive.md entry");
}

const registryContent = readFileSync(registryPath, "utf8");
for (const deliveryPath of deliveryPaths) {
	if (!registryContent.includes(deliveryPath)) {
		errors.push(`artifact-registry.md is missing row for ${deliveryPath}`);
	}
}

const registryPaths = Array.from(
	registryContent.matchAll(
		/\|\s(docs\/specs\/agile-artifacts\/03-delivery-records\/[^|]+)\s\|/g,
	),
).map((match) => match[1]);
for (const registryPathValue of registryPaths) {
	const absolute = join(rootDir, registryPathValue);
	if (!existsSync(absolute)) {
		errors.push(
			`artifact-registry.md references missing path ${registryPathValue}`,
		);
	}
}

if (errors.length > 0) {
	console.error("Agile artifact drift check failed:");
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

console.log("Agile artifact drift check passed.");
console.log(`Release folders checked: ${releaseDirs.length}`);
console.log(`Delivery records checked: ${deliveryPaths.length}`);

function relativeToRoot(path) {
	return path.replace(`${rootDir}/`, "");
}
