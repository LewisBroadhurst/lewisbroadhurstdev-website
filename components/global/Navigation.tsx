'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

enum NavigationTabs {
	CV = 'CV',
	BLOG = 'Blog',
	PROJECTS = 'Projects',
}

const navRoutes: Record<NavigationTabs, string> = {
	[NavigationTabs.CV]: '/cv',
	[NavigationTabs.BLOG]: '/blog',
	[NavigationTabs.PROJECTS]: '/projects',
};

const navTabs: NavigationTabs[] = [NavigationTabs.CV, NavigationTabs.BLOG, NavigationTabs.PROJECTS];

const Navigation = () => {
	const pathname = usePathname();

	return (
		<ul className="flex flex-row items-center text-[var(--gold-7)] gap-2 md:gap-4 lg:text-lg">
			{navTabs.map(navTab => (
				<li key={navTab}>
					<Link
						href={navRoutes[navTab]}
						className={`duration-200 transition-all hover:text-[var(--gold-9)] ${pathname === navRoutes[navTab] ? 'text-[var(--gold-9)]' : ''}`}
					>
						{navTab}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default Navigation;

export { NavigationTabs };
