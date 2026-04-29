import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "~/app/page";

describe("HomePage", () => {
	it("renders core content and primary external links", () => {
		render(HomePage());

		expect(
			screen.getByRole("heading", { name: /create\s+t3\s+app/i }),
		).toBeInTheDocument();

		expect(screen.getByRole("link", { name: /first steps/i })).toHaveAttribute(
			"href",
			"https://create.t3.gg/en/usage/first-steps",
		);
		expect(
			screen.getByRole("link", { name: /documentation/i }),
		).toHaveAttribute("href", "https://create.t3.gg/en/introduction");
	});
});