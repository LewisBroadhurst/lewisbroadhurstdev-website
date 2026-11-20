'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@big-shared/ui/cn';
import { nav } from '@/lib/site';

export function SiteNav() {
	const pathname = usePathname();
	return (
		<ul className="flex items-center gap-1 sm:gap-2">
			{nav.map(item => {
				const active = pathname.startsWith(item.match);
				return (
					<li key={item.href} className={item.match === '/how-i-build' ? 'hidden sm:block' : undefined}>
						<Link
							href={item.href}
							aria-current={active ? 'page' : undefined}
							className={cn(
								'rounded-md px-2 py-1.5 text-sm transition-colors hover:text-foreground',
								active ? 'text-foreground' : 'text-subtle-foreground',
							)}
						>
							{item.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
