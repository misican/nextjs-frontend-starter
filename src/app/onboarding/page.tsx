import { OnboardingFlow } from "~/components/features/onboarding-flow";

export default function OnboardingPage() {
	return (
		<main className="bg-background">
			<div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
				<section className="max-w-3xl space-y-4">
					<p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.16em]">
						Starter pattern
					</p>
					<h2 className="font-heading text-4xl tracking-tight sm:text-5xl">
						Walk through a reusable onboarding flow.
					</h2>
					<p className="max-w-2xl text-muted-foreground text-sm leading-6 sm:text-base">
						This sample route demonstrates how teams can present setup progress,
						state feedback, and completion messaging inside the shared app
						shell.
					</p>
				</section>

				<div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
					<OnboardingFlow />
				</div>
			</div>
		</main>
	);
}
