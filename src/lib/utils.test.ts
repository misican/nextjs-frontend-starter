import { describe, expect, it } from "vitest";
import { cn } from "~/lib/utils";

describe("cn", () => {
	it("merges tailwind class conflicts by keeping the last value", () => {
		expect(cn("px-2", "px-4", "text-sm")).toBe("px-4 text-sm");
	});

	it("ignores falsy values and keeps valid classes", () => {
		expect(cn("rounded", false && "hidden", undefined, "px-4")).toBe(
			"rounded px-4",
		);
	});
});