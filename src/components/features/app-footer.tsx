import Link from "next/link";

export function AppFooter() {
	return (
		<footer className="border-border border-t bg-muted/30">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
				<p className="text-muted-foreground text-sm">
					Built with Next.js and shadcn/ui primitives.
				</p>
				<nav aria-label="Footer links">
					<ul className="flex flex-wrap items-center gap-4 text-sm">
						<li>
							<Link
								className="text-muted-foreground hover:text-foreground"
								href="/"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								className="text-muted-foreground hover:text-foreground"
								href="/docs"
							>
								Docs
							</Link>
						</li>
						<li>
							<Link
								className="text-muted-foreground hover:text-foreground"
								href="/settings"
							>
								Settings
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}
