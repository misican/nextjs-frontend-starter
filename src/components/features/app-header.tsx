import Link from "next/link";

import { AppMenu } from "~/components/features/app-menu";

export function AppHeader() {
	return (
		<header className="border-border border-b bg-background/95 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
				<Link
					className="font-heading font-semibold text-lg tracking-tight"
					href="/"
				>
					Next.js Frontend Starter
				</Link>
				<AppMenu />
			</div>
		</header>
	);
}
