import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
				<section aria-labelledby="hero-heading" className="space-y-6">
					<p className="font-semibold text-sky-300 text-sm uppercase tracking-[0.2em]">
						Next.js Frontend Starter
					</p>
					<h1
						className="max-w-4xl font-bold text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl"
						id="hero-heading"
					>
						Ship UI faster with a production-ready foundation for modern
						frontend teams.
					</h1>
					<p className="max-w-2xl text-balance text-base text-slate-300 leading-7 sm:text-lg">
						Start with an opinionated Next.js App Router setup that includes
						testing, quality gates, and a maintainable structure so teams can
						focus on product features instead of project wiring.
					</p>
				</section>

				<section aria-labelledby="value-heading" className="space-y-6">
					<h2 className="font-semibold text-2xl sm:text-3xl" id="value-heading">
						Why this starter works
					</h2>
					<ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
						<li className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
							<h3 className="font-semibold text-lg text-sky-200">Fast setup</h3>
							<p className="mt-3 text-slate-300 text-sm leading-6">
								Launch features quickly with a clear App Router structure and
								reusable project conventions.
							</p>
						</li>
						<li className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
							<h3 className="font-semibold text-lg text-sky-200">
								Built-in quality
							</h3>
							<p className="mt-3 text-slate-300 text-sm leading-6">
								Type checks, tests, and CI quality gates are ready so
								regressions are caught early.
							</p>
						</li>
						<li className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
							<h3 className="font-semibold text-lg text-sky-200">
								Team scalability
							</h3>
							<p className="mt-3 text-slate-300 text-sm leading-6">
								Standardized folders and shared UI patterns improve onboarding
								and make collaboration predictable.
							</p>
						</li>
					</ul>
				</section>

				<section
					aria-labelledby="cta-heading"
					className="rounded-2xl border border-slate-800 bg-slate-900 p-8 sm:p-10"
				>
					<h2 className="font-semibold text-2xl sm:text-3xl" id="cta-heading">
						Build your first feature today
					</h2>
					<p className="mt-4 max-w-2xl text-balance text-slate-300 text-sm leading-6 sm:text-base">
						Use the setup guide to run the project locally, then follow the
						architecture docs to start delivering your first user story.
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link
							className="inline-flex w-full items-center justify-center rounded-xl bg-sky-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-sky-300 focus-visible:outline-offset-2 sm:w-auto"
							href="https://nextjs.org/docs/app/getting-started/installation"
							rel="noreferrer"
							target="_blank"
						>
							Get started locally
						</Link>
						<Link
							className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-slate-300 focus-visible:outline-offset-2 sm:w-auto"
							href="https://nextjs.org/docs/app/getting-started/project-structure"
							rel="noreferrer"
							target="_blank"
						>
							View technical blueprint
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
