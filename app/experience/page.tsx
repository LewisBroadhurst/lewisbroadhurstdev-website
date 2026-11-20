import type { Metadata } from 'next';
import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/16/solid';

import { Button } from '@big-shared/ui/button';
import { Chips, Container, HeroGlow, Label, SectionHeading } from '@/components/ui';
import { education, roles, skills } from '@/lib/experience';
import { site } from '@/lib/site';

const description = 'Four years building trading and portfolio tools at Citi, Vanguard and Mahi Markets. The work timeline, skills and CV.';

export const metadata: Metadata = {
	title: 'Experience',
	description,
	alternates: { canonical: '/experience' },
	openGraph: { title: `Experience · ${site.name}`, description, url: '/experience' },
};

export default function ExperiencePage() {
	return (
		<>
			<section className="relative isolate">
				<HeroGlow />
				<Container className="rise-in flex flex-col items-start gap-5 pt-14 pb-12 sm:pt-20">
					<Label>Experience</Label>
					<h1 className="text-4xl leading-display font-semibold tracking-tight text-foreground sm:text-5xl">Where I’ve worked</h1>
					<p className="max-w-2xl text-lg text-subtle-foreground">
						Four years building tools for demanding users in finance: FX traders, risk managers and portfolio managers. React and TypeScript
						at the front, Java services and AWS behind them.
					</p>
					<div className="flex flex-wrap gap-2">
						<Button asChild size="lg" variant="default">
							<a href={site.cvPath} download>
								<ArrowDownTrayIcon className="size-4" aria-hidden="true" />
								Download CV (PDF)
							</a>
						</Button>
						<Button asChild size="lg">
							<a href={site.cvPath} target="_blank" rel="noreferrer">
								<DocumentTextIcon className="size-4" aria-hidden="true" />
								View in browser
							</a>
						</Button>
					</div>
				</Container>
			</section>

			<Container className="flex flex-col gap-16">
				<section>
					<SectionHeading step="01" title="Timeline" />
					<ol className="relative flex flex-col gap-10 border-l border-border pl-6 sm:pl-8">
						{roles.map((role, i) => (
							<li key={role.company} className="relative">
								<span
									aria-hidden="true"
									className={`absolute top-1.5 -left-[calc(1.5rem+4.5px)] size-2 rounded-full ring-4 ring-background sm:-left-[calc(2rem+4.5px)] ${i === 0 ? 'bg-brand' : 'bg-border-bright'}`}
								/>
								<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
									<h3 className="text-lg font-semibold text-foreground">
										{role.company} <span className="font-normal text-subtle-foreground">· {role.title}</span>
									</h3>
									<p className="shrink-0 font-mono text-xs text-muted-foreground">
										{role.start} – {role.end}
									</p>
								</div>
								<p className="mt-1 text-sm text-muted-foreground">{role.summary}</p>
								<ul className="mt-3 flex max-w-3xl list-disc flex-col gap-2 pl-4 text-sm leading-relaxed text-body-foreground marker:text-faint-foreground">
									{role.highlights.map(h => (
										<li key={h}>{h}</li>
									))}
								</ul>
								<Chips items={role.stack} className="mt-3" />
							</li>
						))}
					</ol>
				</section>

				<section>
					<SectionHeading step="02" title="Skills" />
					<dl className="divide-y divide-border-faint border-y border-border-faint">
						{skills.map(s => (
							<div key={s.group} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6">
								<dt className="text-sm font-medium text-emphasis-foreground">{s.group}</dt>
								<dd className="text-sm text-subtle-foreground">{s.items}</dd>
							</div>
						))}
					</dl>
				</section>

				<section>
					<SectionHeading step="03" title="Education & certifications" />
					<dl className="divide-y divide-border-faint border-y border-border-faint">
						{education.map(e => (
							<div key={e.title} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6">
								<dt className="text-sm font-medium text-emphasis-foreground">{e.title}</dt>
								<dd className="text-sm text-subtle-foreground">{e.detail}</dd>
							</div>
						))}
					</dl>
				</section>
			</Container>
		</>
	);
}
