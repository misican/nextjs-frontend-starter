"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Separator } from "~/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "~/components/ui/sheet";

const navItems = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/docs",
		label: "Docs",
	},
	{
		href: "/settings",
		label: "Settings",
	},
];

export function AppMenu() {
	return (
		<>
			<NavigationMenu className="hidden md:flex" viewport={false}>
				<NavigationMenuList>
					{navItems.map((item) => (
						<NavigationMenuItem key={item.href}>
							<NavigationMenuLink asChild>
								<Link href={item.href}>{item.label}</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>

			<Sheet>
				<SheetTrigger asChild>
					<Button
						aria-label="Open menu"
						className="md:hidden"
						size="sm"
						variant="outline"
					>
						Menu
					</Button>
				</SheetTrigger>
				<SheetContent className="w-full sm:max-w-sm" side="right">
					<SheetHeader>
						<SheetTitle>Navigation</SheetTitle>
					</SheetHeader>
					<Separator />
					<nav aria-label="Mobile navigation" className="px-6 py-4">
						<ul className="flex flex-col gap-2">
							{navItems.map((item) => (
								<li key={item.href}>
									<Button
										asChild
										className="w-full justify-start"
										variant="ghost"
									>
										<Link href={item.href}>{item.label}</Link>
									</Button>
								</li>
							))}
						</ul>
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
