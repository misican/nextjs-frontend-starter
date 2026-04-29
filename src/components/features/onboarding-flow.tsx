"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

type StepStatus = "completed" | "current" | "upcoming";

type OnboardingStep = {
	id: string;
	title: string;
	description: string;
};

const onboardingSteps: OnboardingStep[] = [
	{
		id: "profile",
		title: "Set up your profile",
		description:
			"Add your team name, workspace label, and starter preferences.",
	},
	{
		id: "navigation",
		title: "Explore navigation",
		description:
			"Review routes and shell components used across the starter app.",
	},
	{
		id: "quality-gates",
		title: "Run quality gates",
		description:
			"Execute typecheck and lint commands to verify baseline health.",
	},
	{
		id: "ready",
		title: "Confirm project readiness",
		description:
			"Validate completion and choose the next implementation story.",
	},
];

function getStepStatus(
	index: number,
	currentStep: number,
	isComplete: boolean,
): StepStatus {
	if (isComplete || index < currentStep) {
		return "completed";
	}

	if (index === currentStep) {
		return "current";
	}

	return "upcoming";
}

type OnboardingFlowProps = {
	currentStep?: number;
	isComplete?: boolean;
};

export function OnboardingFlow({
	currentStep: currentStepProp = 0,
	isComplete: isCompleteProp = false,
}: OnboardingFlowProps) {
	const initialStep = Math.min(
		Math.max(currentStepProp, 0),
		onboardingSteps.length - 1,
	);
	const [currentStep, setCurrentStep] = useState(initialStep);
	const [isComplete, setIsComplete] = useState(isCompleteProp);
	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === onboardingSteps.length - 1;
	const progressText = isComplete
		? "Onboarding complete"
		: `Step ${currentStep + 1} of ${onboardingSteps.length}`;
	const activeStep = onboardingSteps[currentStep];

	function handleNext() {
		if (isLastStep) {
			setIsComplete(true);
			return;
		}

		setCurrentStep((step) => step + 1);
	}

	function handlePrevious() {
		if (isFirstStep) {
			return;
		}

		setCurrentStep((step) => step - 1);
	}

	function handleRestart() {
		setCurrentStep(0);
		setIsComplete(false);
	}

	return (
		<section aria-labelledby="onboarding-heading" className="w-full space-y-6">
			<header className="space-y-2">
				<p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.16em]">
					Sample flow
				</p>
				<h1
					className="font-heading text-3xl tracking-tight"
					id="onboarding-heading"
				>
					Project onboarding
				</h1>
				<p className="text-muted-foreground text-sm">{progressText}</p>
			</header>

			<ol aria-label="Onboarding progress" className="space-y-3">
				{onboardingSteps.map((step, index) => {
					const status = getStepStatus(index, currentStep, isComplete);
					const markerLabel = status === "completed" ? "Done" : index + 1;
					const statusLabel =
						status === "current"
							? "Current"
							: status === "completed"
								? "Completed"
								: "Upcoming";

					return (
						<li
							className={cn(
								"rounded-xl border px-4 py-3",
								status === "current" && "border-foreground/30 bg-muted/30",
								status !== "current" && "border-border bg-background",
							)}
							key={step.id}
						>
							<div className="flex items-start gap-3">
								<span
									aria-hidden="true"
									className={cn(
										"mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs",
										status === "completed" &&
											"border-foreground bg-foreground text-background",
										status === "current" &&
											"border-foreground/60 bg-muted text-foreground",
										status === "upcoming" &&
											"border-border bg-background text-muted-foreground",
									)}
								>
									{markerLabel}
								</span>
								<div className="space-y-1">
									<p className="font-medium text-sm">{step.title}</p>
									<p className="text-muted-foreground text-sm">
										{step.description}
									</p>
									<p className="text-muted-foreground text-xs uppercase tracking-wide">
										{statusLabel}
									</p>
								</div>
							</div>
						</li>
					);
				})}
			</ol>

			<Separator />

			<div
				aria-live="polite"
				className="rounded-xl border border-border bg-muted/20 px-4 py-3"
			>
				{isComplete ? (
					<div className="space-y-3">
						<p className="font-medium text-sm">
							You have completed all onboarding steps and are ready to start
							building.
						</p>
						<p className="text-muted-foreground text-sm">
							Completion confirmed. Choose a new story or restart this flow to
							review the setup path again.
						</p>
					</div>
				) : (
					<div className="space-y-1">
						<p className="font-medium text-sm">
							Current focus: {activeStep?.title}
						</p>
						<p className="text-muted-foreground text-sm">
							{activeStep?.description}
						</p>
					</div>
				)}
			</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-muted-foreground text-sm" role="status">
					{isComplete
						? "Flow finished. Restart to walk through the onboarding steps again."
						: `Transition ready: ${activeStep?.title}`}
				</p>
				<div className="flex flex-col gap-3 sm:flex-row">
					<Button
						disabled={isComplete || isFirstStep}
						onClick={handlePrevious}
						type="button"
						variant="outline"
					>
						Previous
					</Button>
					{isComplete ? (
						<Button onClick={handleRestart} type="button">
							Restart
						</Button>
					) : (
						<Button onClick={handleNext} type="button">
							{isLastStep ? "Finish onboarding" : "Next"}
						</Button>
					)}
				</div>
			</div>
		</section>
	);
}
