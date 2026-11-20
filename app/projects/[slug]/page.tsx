import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon, CheckIcon } from '@heroicons/react/16/solid';

import { Button } from '@big-shared/ui/button';
import { Card } from '@big-shared/ui/card';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { Chips, Container, HeroGlow, Label, SectionHeading } from '@/components/ui';
import { getProject, projects } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const project = getProject((await params).slug);
	if (!project) return {};
	const title = `${project.name}: case study`;
	return {
		title,
		description: project.tagline,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: { title, description: project.tagline, url: `/projects/${project.slug}`, type: 'article' },
	};
}

export default async function ProjectPage({ params }: Props) {
	const project = getProject((await params).slug);
	if (!project) notFound();
	const index = projects.indexOf(project);
	const next = projects[(index + 1) % projects.length];

	return (
		<>
			<section className="relative isolate">
				<HeroGlow />
				<Container className="rise-in flex flex-col gap-5 pt-10 pb-12 sm:pt-14">
					<Link
						href="/#projects"
						className="flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						<ArrowLeftIcon className="size-3.5" aria-hidden="true" />
						All projects
					</Link>
					<Label>{project.kind}</Label>
					<h1 className="text-4xl leading-display font-semibold tracking-tight text-foreground sm:text-5xl">{project.name}</h1>
					<p className="max-w-3xl text-lg text-subtle-foreground">{project.tagline}</p>
					{project.links.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{project.links.map((link, i) => (
								<Button key={link.href} asChild size="lg" variant={i === 0 ? 'default' : 'outline'}>
									<a href={link.href} target="_blank" rel="noreferrer">
										{link.label}
										<ArrowTopRightOnSquareIcon className="size-3.5" aria-hidden="true" />
									</a>
								</Button>
							))}
						</div>
					)}
					<dl className="mt-2 grid grid-cols-[1fr_1fr_auto] gap-4 border-y border-border-faint py-4 sm:grid-cols-3">
						{[
							['Role', project.role],
							['Status', project.status],
							['Year', project.year],
						].map(([term, value]) => (
							<div key={term}>
								<dt>
									<Label>{term}</Label>
								</dt>
								<dd className="mt-1 text-sm text-emphasis-foreground">{value}</dd>
							</div>
						))}
					</dl>
				</Container>
			</section>

			<Container className="flex flex-col gap-16">
				<section>
					<SectionHeading step="01" title="What it does" />
					<ul className="grid gap-3 sm:grid-cols-2">
						{project.outcomes.map(outcome => (
							<li
								key={outcome}
								className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-body-foreground sm:[&:last-child:nth-child(odd)]:col-span-2"
							>
								<CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-strong" aria-hidden="true" />
								{outcome}
							</li>
						))}
					</ul>
				</section>

				<section>
					<SectionHeading step="02" title="The problem" />
					<div className="flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-body-foreground">
						{project.problem.map(p => (
							<p key={p}>{p}</p>
						))}
					</div>
				</section>

				<section>
					<SectionHeading step="03" title="Key decisions" />
					<ol className="grid gap-4 md:grid-cols-2">
						{project.decisions.map((decision, i) => (
							<li key={decision.title}>
								<Card className="h-full">
									<p className="font-mono text-xs text-brand">{String(i + 1).padStart(2, '0')}</p>
									<h3 className="mt-1 font-semibold text-foreground">{decision.title}</h3>
									<p className="mt-2 text-sm leading-relaxed text-subtle-foreground">{decision.body}</p>
								</Card>
							</li>
						))}
					</ol>
				</section>

				<section>
					<SectionHeading step="04" title="Architecture" />
					<ArchitectureDiagram diagram={project.diagram} />
				</section>

				<section>
					<SectionHeading step="05" title="What I’d do differently" />
					<ul className="flex max-w-3xl flex-col gap-4 text-base leading-relaxed text-body-foreground">
						{project.differently.map(item => (
							<li key={item} className="border-l-2 border-brand-strong/40 pl-4">
								{item}
							</li>
						))}
					</ul>
				</section>

				<section>
					<SectionHeading step="06" title="Stack" />
					<Chips items={project.stack} />
				</section>

				<Link
					href={`/projects/${next.slug}`}
					className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-border-strong"
				>
					<span>
						<Label>Next project</Label>
						<span className="mt-1 block text-lg font-semibold text-foreground">{next.name}</span>
					</span>
					<ArrowRightIcon className="size-5 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
				</Link>
			</Container>
		</>
	);
}
