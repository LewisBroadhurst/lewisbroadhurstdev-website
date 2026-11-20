import Link from 'next/link';

import { GitHubIcon, LinkedInIcon, MediumIcon, YouTubeIcon } from '@/components/brand-icons';
import { Container } from '@/components/ui';
import { site } from '@/lib/site';

const socials = [
	{ label: 'GitHub', href: site.links.github, Icon: GitHubIcon },
	{ label: 'LinkedIn', href: site.links.linkedin, Icon: LinkedInIcon },
	{ label: 'YouTube', href: site.links.youtube, Icon: YouTubeIcon },
	{ label: 'Medium', href: site.links.medium, Icon: MediumIcon },
];

export function SiteFooter() {
	return (
		<footer className="mt-24 border-t border-border-faint">
			<Container className="flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
					<span>
						© {new Date().getFullYear()} {site.name}
					</span>
					<Link href="/how-i-build" className="transition-colors hover:text-foreground sm:hidden">
						How I build
					</Link>
					<Link href="/work-with-me" className="transition-colors hover:text-foreground">
						Work with me
					</Link>
				</div>
				<ul className="flex items-center gap-1">
					{socials.map(({ label, href, Icon }) => (
						<li key={label}>
							<a
								href={href}
								target="_blank"
								rel="noreferrer"
								aria-label={label}
								className="block rounded-md p-1.5 transition-colors hover:text-foreground"
							>
								<Icon className="size-4" />
							</a>
						</li>
					))}
				</ul>
			</Container>
		</footer>
	);
}
