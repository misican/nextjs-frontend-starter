#!/usr/bin/env node
/**
 * AI post-edit hook — runs after agent tool use.
 *
 * Behaviour:
 * - Source files (.ts, .tsx, .js, .mjs, .json): runs `biome check` on the file
 * - Agile artifact docs (docs/specs/agile-artifacts/**): runs `pnpm agile:check`
 *
 * Invoked by .github/hooks/post-edit-checks.json (PostToolUse).
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { extname } from "node:path";

const SOURCE_EXTS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"]);
const AGILE_PATH_PREFIX = "docs/specs/agile-artifacts";

/** @param {string} filePath */
function isAgileArtifactPath(filePath) {
	const normalized = filePath.replaceAll("\\", "/");
	return (
		normalized === AGILE_PATH_PREFIX ||
		normalized.startsWith(`${AGILE_PATH_PREFIX}/`) ||
		normalized.includes(`/${AGILE_PATH_PREFIX}/`) ||
		normalized.endsWith(`/${AGILE_PATH_PREFIX}`)
	);
}

/** @param {string} cmd */
function run(cmd) {
	try {
		execSync(cmd, { stdio: "inherit" });
	} catch {
		// Non-zero exit is surfaced by the hook runner; we just let it propagate.
		process.exitCode = 1;
	}
}

/** @param {string[]} files */
function check(files) {
	const sourceFiles = files.filter(
		(f) => SOURCE_EXTS.has(extname(f)) && existsSync(f),
	);
	const hasAgileDoc = files.some(isAgileArtifactPath);

	if (sourceFiles.length > 0) {
		run(`pnpm exec biome check ${sourceFiles.map((f) => `"${f}"`).join(" ")}`);
	}

	if (hasAgileDoc) {
		run("pnpm agile:check");
	}
}

// Files are passed as CLI arguments by the hook runner.
const args = process.argv.slice(2);
if (args.length > 0) {
	check(args);
}
