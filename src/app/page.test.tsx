import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "~/app/page";

describe("HomePage", () => {
	it("renders hero, value proposition, and CTA sections", () => {
		render(HomePage());

		expect(
			screen.getByRole("heading", {
				name: /ship ui faster with a production-ready foundation for modern frontend teams/i,
			}),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /why this starter works/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /build your first feature today/i }),
		).toBeInTheDocument();

		expect(screen.getByText(/fast setup/i)).toBeInTheDocument();
		expect(screen.getByText(/built-in quality/i)).toBeInTheDocument();
		expect(screen.getByText(/team scalability/i)).toBeInTheDocument();

		expect(
			screen.getByRole("link", { name: /get started locally/i }),
		).toHaveAttribute(
			"href",
			"https://nextjs.org/docs/app/getting-started/installation",
		);
		expect(
			screen.getByRole("link", { name: /view technical blueprint/i }),
		).toHaveAttribute(
			"href",
			"https://nextjs.org/docs/app/getting-started/project-structure",
		);
	});
});
