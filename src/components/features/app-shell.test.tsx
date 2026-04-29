import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppFooter } from "~/components/features/app-footer";
import { AppHeader } from "~/components/features/app-header";
import { AppMenu } from "~/components/features/app-menu";

describe("App shell features", () => {
	it("renders the header brand and menu trigger", () => {
		render(<AppHeader />);

		expect(
			screen.getByRole("link", { name: /next\.js frontend starter/i }),
		).toHaveAttribute("href", "/");
		expect(
			screen.getByRole("button", { name: /open menu/i }),
		).toBeInTheDocument();
	});

	it("renders reusable footer links", () => {
		render(<AppFooter />);

		const footerNav = screen.getByRole("navigation", { name: /footer links/i });

		expect(footerNav).toBeInTheDocument();
		expect(
			within(footerNav).getByRole("link", { name: /home/i }),
		).toHaveAttribute("href", "/");
		expect(
			within(footerNav).getByRole("link", { name: /onboarding/i }),
		).toHaveAttribute("href", "/onboarding");
		expect(
			within(footerNav).getByRole("link", { name: /docs/i }),
		).toHaveAttribute("href", "/docs");
		expect(
			within(footerNav).getByRole("link", { name: /settings/i }),
		).toHaveAttribute("href", "/settings");
	});

	it("exposes desktop and mobile navigation labels", () => {
		render(<AppMenu />);

		expect(
			screen.getAllByRole("link", { name: /home/i }).length,
		).toBeGreaterThan(0);
		expect(
			screen.getAllByRole("link", { name: /onboarding/i }).length,
		).toBeGreaterThan(0);
		expect(
			screen.getAllByRole("link", { name: /docs/i }).length,
		).toBeGreaterThan(0);
		expect(
			screen.getAllByRole("link", { name: /settings/i }).length,
		).toBeGreaterThan(0);
		expect(
			screen.getAllByRole("button", { name: /open menu/i }).length,
		).toBeGreaterThan(0);
	});
});
