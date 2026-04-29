#!/usr/bin/env node
/**
 * AI customization verification — validates setup integrity.
 *
 * Checks:
 * 1. Discovery links exist and resolve to canonical sources
 * 2. Required canonical files exist in .ai
 * 3. Hook command targets exist
 * 4. Metadata lint passes (via ai-lint-metadata.mjs)
 *
 * Usage: pnpm ai:verify
 */

import { execSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, readlinkSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();

const checks = {
	passed: [],
	failed: [],
	warnings: [],
};

/** @param {string} msg */
function success(msg) {
	console.log(`✓ ${msg}`);
	checks.passed.push(msg);
}

/** @param {string} msg */
function fail(msg) {
	console.error(`✗ ${msg}`);
	checks.failed.push(msg);
}

/** @param {string} msg */
function warn(msg) {
	console.warn(`! ${msg}`);
	checks.warnings.push(msg);
}

/** @param {string} linkPath @param {string} expectedTarget */
function checkLink(linkPath, expectedTarget) {
	const fullPath = join(repoRoot, linkPath);
	if (!existsSync(fullPath)) {
		fail(`Link missing: ${linkPath}`);
		return false;
	}

	try {
		const stat = lstatSync(fullPath);
		if (!stat.isSymbolicLink()) {
			warn(`Not a symlink (may be junction on Windows): ${linkPath}`);
			return true;
		}
		const target = readlinkSync(fullPath);
		if (target === expectedTarget) {
			success(`Link valid: ${linkPath} -> ${expectedTarget}`);
			return true;
		}

		fail(
			`Link mismatch: ${linkPath} -> ${target} (expected ${expectedTarget})`,
		);
		return false;
	} catch (err) {
		fail(`Link check failed for ${linkPath}: ${err.message}`);
		return false;
	}
}

/** @param {string} filePath */
function checkFile(filePath) {
	const fullPath = join(repoRoot, filePath);
	if (existsSync(fullPath)) {
		success(`File exists: ${filePath}`);
		return true;
	}

	fail(`File missing: ${filePath}`);
	return false;
}

console.log("AI Customization Verification\n");

console.log("1) Discovery Links");
checkLink(".github/copilot-instructions.md", "../.ai/copilot-instructions.md");
checkLink(".github/agents", "../.ai/agents");
checkLink(".github/prompts", "../.ai/prompts");
checkLink(".github/hooks", "../.ai/hooks");
checkLink(".github/instructions", "../.ai/instructions");
checkLink(".github/skills", "../.ai/skills");
checkLink(".cursor/skills", "../.ai/skills");
checkLink(".cursor/agents", "../.ai/agents");
checkLink(".cursor/prompts", "../.ai/prompts");

console.log("\n2) Canonical .ai Structure");
checkFile(".ai/README.md");
checkFile(".ai/copilot-instructions.md");
checkFile(".ai/agents/story-orchestrator.agent.md");
checkFile(".ai/prompts/work-on-story.prompt.md");
checkFile(".ai/instructions/agile-artifacts.instructions.md");
checkFile(".ai/hooks/post-edit-checks.json");
checkFile(".ai/scripts/ai-post-edit-check.mjs");
checkFile(".ai/skills/README.md");
checkFile(".ai/skills/shadcn/SKILL.md");
checkFile(".ai/skills/tech-audit/SKILL.md");

console.log("\n3) Hook Configuration");
const hookConfigPath = join(repoRoot, ".ai/hooks/post-edit-checks.json");
if (existsSync(hookConfigPath)) {
	try {
		const configContent = readFileSync(hookConfigPath, "utf8");
		const config = JSON.parse(configContent);
		const hookTarget = config.hooks?.PostToolUse?.[0]?.command;
		if (hookTarget?.includes(".ai/scripts/ai-post-edit-check.mjs")) {
			const targetPath = hookTarget.split(" ")[1];
			if (existsSync(join(repoRoot, targetPath))) {
				success(`Hook target exists: ${targetPath}`);
			} else {
				fail(`Hook target missing: ${targetPath}`);
			}
		} else {
			fail("Hook config missing or invalid PostToolUse command");
		}
	} catch (err) {
		fail(`Hook config parse failed: ${err.message}`);
	}
} else {
	fail("Hook config not found: .ai/hooks/post-edit-checks.json");
}

console.log("\n4) Metadata Lint");
try {
	execSync("node .ai/scripts/ai-lint-metadata.mjs", { stdio: "inherit" });
	success("Metadata lint passed");
} catch {
	fail("Metadata lint failed");
}

console.log(
	`\nSummary: ${checks.passed.length} passed, ${checks.failed.length} failed, ${checks.warnings.length} warnings\n`,
);

if (checks.failed.length > 0) {
	console.error("Verification failed. Fix issues above and re-run.\n");
	process.exit(1);
}

if (checks.warnings.length > 0) {
	console.warn("Verification passed with warnings. Review above.\n");
	process.exit(0);
}

console.log("All checks passed. Customization setup is healthy.\n");
process.exit(0);
