import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OnboardingFlow } from "~/components/features/onboarding-flow";

describe("OnboardingFlow", () => {
	it("renders progression state and completion feedback while stepping through the flow", () => {
		render(<OnboardingFlow />);

		expect(
			screen.getByRole("heading", { name: /project onboarding/i }),
		).toBeInTheDocument();
		expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument();
		expect(
			screen.getByText(/current focus: set up your profile/i),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();

		fireEvent.click(screen.getByRole("button", { name: /next/i }));

		expect(screen.getByText(/step 2 of 4/i)).toBeInTheDocument();
		expect(screen.getByRole("status", { name: "" })).toHaveTextContent(
			/transition ready: explore navigation/i,
		);
		expect(screen.getByText(/^completed$/i)).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /next/i }));
		fireEvent.click(screen.getByRole("button", { name: /next/i }));

		expect(
			screen.getByRole("button", { name: /finish onboarding/i }),
		).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /finish onboarding/i }));

		expect(screen.getByText(/onboarding complete/i)).toBeInTheDocument();
		expect(
			screen.getByText(/you have completed all onboarding steps/i),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /restart/i }),
		).toBeInTheDocument();
	});

	it("supports restarting after completion", () => {
		render(<OnboardingFlow currentStep={3} />);

		fireEvent.click(screen.getByRole("button", { name: /finish onboarding/i }));
		fireEvent.click(screen.getByRole("button", { name: /restart/i }));

		expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument();
		expect(
			screen.getByText(/current focus: set up your profile/i),
		).toBeInTheDocument();
	});
});
