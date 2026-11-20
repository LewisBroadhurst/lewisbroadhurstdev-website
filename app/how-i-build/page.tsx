import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

import { Button } from '@big-shared/ui/button';
import { Card } from '@big-shared/ui/card';
import { Container, HeroGlow, Label, SectionHeading } from '@/components/ui';
import { loadShippingRecord } from '@/lib/github/load';
import { summarise } from '@/lib/github/shipping';
import { site } from '@/lib/site';

export const revalidate = 3600;

const description =
	'How one engineer ships a product’s worth of work: written specs, parallel Claude Code sessions, a pull request per feature, and CI that decides.';

export const metadata: Metadata = {
	title: 'How I build',
	description,
	alternates: { canonical: '/how-i-build' },
	openGraph: { title: `How I build · ${site.name}`, description, url: '/how-i-build' },
};

const fmt = new Intl.NumberFormat('en-GB');

const steps = [
	{
		title: 'A spec before any code',
		body: 'Every feature starts as a short written spec: the outcome a reader gets, the rules it must keep, and what done looks like. Agents are fast at code and slow at guessing intent, so the spec is where my time goes.',
	},
	{
		title: 'Parallel sessions, one pull request each',
		body: 'Several Claude Code sessions run at once, each in its own git worktree on its own branch, each ending in a single pull request I can review on its own. Crypto Charts was built this way from its first commit.',
	},
	{
		title: 'The repo carries the standards',
		body: 'Files in each repo hold the look, the interaction rules and which tier of test a change needs, so every session starts with the same standards I would give a new teammate, and holds to them without being reminded.',
	},
	{
		title: 'CI decides, then I review',
		body: 'Unit tests, browser tests and end-to-end runs against the real services gate every pull request before I read it. I then review every diff before it merges: the same human-in-the-loop role I play with Devin at Citi.',
	},
];

export default async function HowIBuildPage() {
	const summary = summarise((await loadShippingRecord()).candles);
	const stats = [
		{ label: 'Pull requests merged', value: fmt.format(summary.mergedPRs), note: `in the last ${summary.weeks} weeks` },
		{
			label: 'Busiest week',
			value: summary.busiestWeek ? `${summary.busiestWeek.mergedPRs} PRs` : '–',
			note: 'merged, reviewed, deployed',
		},
		{ label: 'Products live', value: '3', note: 'StratDeck, Crypto Charts, Acropolis Rising' },
	];

	return (
		<>
			<section className="relative isolate">
				<HeroGlow />
				<Container className="rise-in flex flex-col items-start gap-5 pt-14 pb-12 sm:pt-20">
					<Label>How I build</Label>
					<h1 className="max-w-3xl text-4xl leading-display font-semibold tracking-tight text-foreground sm:text-5xl">
						A product’s worth of output, from one engineer
					</h1>
					<p className="max-w-2xl text-lg text-subtle-foreground">
						I build with Claude Code as a team I direct: I write the specs and review every change; agents write most of the code. The
						result is shipped, tested software rather than prototypes.
					</p>
				</Container>
			</section>

			<Container className="flex flex-col gap-16">
				<ul className="grid gap-4 sm:grid-cols-3">
					{stats.map(s => (
						<li key={s.label}>
							<Card className="h-full">
								<Label>{s.label}</Label>
								<p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-foreground">{s.value}</p>
								<p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
							</Card>
						</li>
					))}
				</ul>

				<section>
					<SectionHeading title="The workflow">
						Four habits that keep the output high and the quality where a reviewer would want it.
					</SectionHeading>
					<ol className="flex flex-col divide-y divide-border-faint border-y border-border-faint">
						{steps.map((step, i) => (
							<li key={step.title} className="grid gap-2 py-6 sm:grid-cols-[3rem_14rem_1fr] sm:gap-6">
								<span className="font-mono text-sm font-semibold text-brand">{String(i + 1).padStart(2, '0')}</span>
								<h3 className="font-semibold text-foreground">{step.title}</h3>
								<p className="text-sm leading-relaxed text-body-foreground">{step.body}</p>
							</li>
						))}
					</ol>
				</section>

				<section>
					<SectionHeading title="See it in the work">
						Crypto Charts’ repo is public: its pull requests, CI runs and plan show the whole loop.
					</SectionHeading>
					<div className="flex flex-wrap gap-2">
						<Button asChild size="lg" variant="default">
							<Link href="/projects/crypto-charts">
								Crypto Charts case study
								<ArrowRightIcon className="size-4" aria-hidden="true" />
							</Link>
						</Button>
						<Button asChild size="lg">
							<a href="https://github.com/LewisBroadhurst/cryptocharts/pulls?q=is%3Apr+is%3Amerged" target="_blank" rel="noreferrer">
								Its merged pull requests
							</a>
						</Button>
						<Button asChild size="lg">
							<Link href="/#shipping">Shipping record</Link>
						</Button>
					</div>
				</section>
			</Container>
		</>
	);
}
