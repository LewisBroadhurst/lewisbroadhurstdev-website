import Link from 'next/link';
import { ArrowDownTrayIcon, ArrowRightIcon } from '@heroicons/react/16/solid';

import { Button } from '@big-shared/ui/button';
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons';
import { ProjectCard } from '@/components/ProjectCard';
import { ShippingChart } from '@/components/ShippingChart';
import { Container, HeroGlow, Pill, SectionHeading } from '@/components/ui';
import { roles } from '@/lib/experience';
import { loadShippingRecord } from '@/lib/github/load';
import { loadProjectFacts } from '@/lib/live/load';
import { projects } from '@/lib/projects';
import { site } from '@/lib/site';

export const revalidate = 3600;

export default async function HomePage() {
	const [facts, record] = await Promise.all([loadProjectFacts(), loadShippingRecord()]);

	return (
		<>
			<section className="relative isolate">
				<HeroGlow />
				<Container className="rise-in flex flex-col items-start gap-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
					<Pill>
						{site.role} · {site.location}
					</Pill>
					<h1 className="text-4xl leading-display font-semibold tracking-tight text-foreground sm:text-5xl">{site.name}</h1>
					<p className="max-w-2xl text-lg text-subtle-foreground sm:text-xl">{site.headline}</p>
					<div className="flex flex-wrap gap-2">
						<Button asChild size="lg" variant="default">
							<a href={site.cvPath} download>
								<ArrowDownTrayIcon className="size-4" aria-hidden="true" />
								Download CV
							</a>
						</Button>
						<Button asChild size="lg">
							<a href={site.links.github} target="_blank" rel="noreferrer">
								<GitHubIcon className="size-4" aria-hidden="true" />
								<span className="max-sm:sr-only">GitHub</span>
							</a>
						</Button>
						<Button asChild size="lg">
							<a href={site.links.linkedin} target="_blank" rel="noreferrer">
								<LinkedInIcon className="size-4" aria-hidden="true" />
								<span className="max-sm:sr-only">LinkedIn</span>
							</a>
						</Button>
					</div>
				</Container>
			</section>

			<Container className="flex flex-col gap-20">
				<section aria-labelledby="projects">
					<SectionHeading id="projects" title="Projects">
						What I’ve designed, built and run on my own, outside the day job. Each card opens a case study: the problem, the decisions, the
						architecture and what I’d change.
					</SectionHeading>
					<ul className="grid gap-4 md:grid-cols-2">
						{projects.map((project, i) => (
							<li key={project.slug}>
								<ProjectCard project={project} fact={facts[project.slug] ?? null} index={i} />
							</li>
						))}
					</ul>
				</section>

				<section aria-labelledby="shipping">
					<SectionHeading id="shipping" title="Shipping record">
						What that looks like week by week.{' '}
						<Link href="/how-i-build" className="text-brand hover:underline">
							How I build
						</Link>{' '}
						explains the workflow behind it.
					</SectionHeading>
					<ShippingChart record={record} />
				</section>

				<section aria-labelledby="experience">
					<SectionHeading id="experience" title="Experience">
						Four years building tools for traders and portfolio managers.
					</SectionHeading>
					<ol className="divide-y divide-border-faint border-y border-border-faint">
						{roles.map(role => (
							<li key={role.company} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6">
								<p className="font-semibold text-foreground">{role.company}</p>
								<div>
									<p className="text-sm text-emphasis-foreground">{role.title}</p>
									<p className="text-sm text-muted-foreground">{role.summary}</p>
								</div>
								<p className="font-mono text-xs text-muted-foreground sm:text-right">
									{role.start} – {role.end}
								</p>
							</li>
						))}
					</ol>
					<div className="mt-5 flex flex-wrap gap-2">
						<Button asChild>
							<Link href="/experience">
								Full experience
								<ArrowRightIcon className="size-3.5" aria-hidden="true" />
							</Link>
						</Button>
						<Button asChild variant="ghost">
							<a href={site.cvPath} download>
								<ArrowDownTrayIcon className="size-3.5" aria-hidden="true" />
								CV (PDF)
							</a>
						</Button>
					</div>
				</section>
			</Container>
		</>
	);
}
