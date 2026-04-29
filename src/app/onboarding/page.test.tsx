import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OnboardingPage from "~/app/onboarding/page";

describe("OnboardingPage", () => {
	it("renders the onboarding route content and flow feedback", () => {
		render(OnboardingPage());

		expect(
			screen.getByRole("heading", {
				name: /walk through a reusable onboarding flow/i,
				level: 2,
			}),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/this sample route demonstrates how teams can present setup progress/i,
			),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /project onboarding/i }),
		).toBeInTheDocument();
		expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument();
		expect(screen.getByRole("status", { name: "" })).toHaveTextContent(
			/transition ready: set up your profile/i,
		);
	});
});
