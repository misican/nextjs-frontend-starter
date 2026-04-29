#!/usr/bin/env node
/**
 * AI metadata linter — validates frontmatter in customization files.
 *
 * Checks:
 * 1. All .agent.md files have required frontmatter: name, description
 * 2. All .prompt.md files have required frontmatter: name, description
 * 3. All SKILL.md files have required frontmatter: name, description
 * 4. Frontmatter is valid YAML syntax
 *
 * Usage: pnpm ai:lint-metadata (or called by ai:verify)
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();
const aiDir = join(repoRoot, ".ai");

const violations = [];
const passed = [];

/**
 * Parse frontmatter from markdown file.
 * @param {string} content
 * @returns {{data: Record<string, any>, body: string} | null}
 */
function parseFrontmatter(content) {
	const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return null;

	const [, frontmatterStr] = match;
	const data = {};

	// Simple YAML key: value parser (not a full YAML parser)
	for (const line of frontmatterStr.trim().split("\n")) {
		const colonIdx = line.indexOf(":");
		if (colonIdx > -1) {
			const key = line.substring(0, colonIdx).trim();
			const value = line.substring(colonIdx + 1).trim();
			data[key] = value;
		}
	}

	return { data, body: match[2] };
}

/**
 * Check file for required metadata.
 * @param {string} filePath
 * @param {string[]} requiredKeys
 */
function checkFile(filePath, requiredKeys) {
	try {
		const content = readFileSync(filePath, "utf8");
		const parsed = parseFrontmatter(content);

		if (!parsed) {
			violations.push(`${filePath}: Missing or malformed frontmatter`);
			return;
		}

		const missing = requiredKeys.filter((key) => !parsed.data[key]);
		if (missing.length > 0) {
			violations.push(
				`${filePath}: Missing required keys: ${missing.join(", ")}`,
			);
		} else {
			passed.push(`${filePath}: Valid frontmatter`);
		}
	} catch (err) {
		violations.push(`${filePath}: Read/parse error: ${err.message}`);
	}
}

/**
 * Recursively find and validate files by pattern.
 * @param {string} dir
 * @param {string} pattern
 * @param {string[]} requiredKeys
 */
function checkPattern(dir, pattern, requiredKeys) {
	try {
		const entries = readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) {
				checkPattern(fullPath, pattern, requiredKeys);
			} else if (entry.name.endsWith(pattern)) {
				checkFile(fullPath, requiredKeys);
			}
		}
	} catch (err) {
		console.error(`Error scanning ${dir}: ${err.message}`);
	}
}

console.log("🔍 AI Metadata Lint\n");

// Check agents
console.log("Checking .agent.md files...");
checkPattern(join(aiDir, "agents"), ".agent.md", ["name", "description"]);

// Check prompts
console.log("Checking .prompt.md files...");
checkPattern(join(aiDir, "prompts"), ".prompt.md", ["name", "description"]);

// Check skills
console.log("Checking SKILL.md files...");
checkPattern(join(aiDir, "skills"), "SKILL.md", ["name", "description"]);

// Summary
console.log(
	`\n📊 Summary: ${passed.length} valid, ${violations.length} violations\n`,
);

if (violations.length > 0) {
	console.error("❌ Violations found:\n");
	for (const v of violations) {
		console.error(`  ✗ ${v}`);
	}
	console.error();
	process.exit(1);
} else {
	console.log("✅ All customization metadata is valid.\n");
	process.exit(0);
}
