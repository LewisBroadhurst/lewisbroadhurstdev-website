import Link from 'next/link';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';

import { Button } from '@big-shared/ui/button';
import { GitHubIcon } from '@/components/brand-icons';
import { SiteNav } from '@/components/SiteNav';
import { Container } from '@/components/ui';
import { site } from '@/lib/site';

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-border-faint bg-background/80 backdrop-blur-md">
			<Container className="flex h-14 items-center justify-between gap-3">
				<Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
					<span className="grid size-7 place-items-center rounded-md border border-border bg-card font-mono text-xs text-brand">LB</span>
					<span className="hidden md:inline">{site.name}</span>
				</Link>
				<nav aria-label="Main" className="flex items-center gap-1 sm:gap-3">
					<SiteNav />
					<a
						href={site.links.github}
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						className="hidden rounded-md p-1.5 text-subtle-foreground transition-colors hover:text-foreground sm:block"
					>
						<GitHubIcon className="size-4" />
					</a>
					<Button asChild size="sm" variant="default">
						<a href={site.cvPath} download>
							<ArrowDownTrayIcon className="size-3.5" aria-hidden="true" />
							CV
						</a>
					</Button>
				</nav>
			</Container>
		</header>
	);
}
