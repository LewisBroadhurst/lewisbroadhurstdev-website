import type { Metadata } from 'next';
import { CalendarDaysIcon } from '@heroicons/react/16/solid';

import { Button } from '@big-shared/ui/button';
import { Card } from '@big-shared/ui/card';
import { Container, Label } from '@/components/ui';
import { site } from '@/lib/site';

const description = 'Mentoring for developers moving into finance, English lessons, and websites for small businesses, by arrangement.';

export const metadata: Metadata = {
	title: 'Work with me',
	description,
	alternates: { canonical: '/work-with-me' },
	openGraph: { title: `Work with me · ${site.name}`, description, url: '/work-with-me' },
};

const CALENDLY = 'https://calendly.com/lewis1broadhurst/15min';

const offers = [
	{
		title: 'Career mentoring',
		body: 'For developers aiming at front-office finance: CV positioning, interview preparation and a technical roadmap, from someone doing the job.',
	},
	{
		title: 'English lessons',
		body: 'Advanced conversation and professional English for B1+ speakers, one to one, online.',
	},
	{
		title: 'Websites',
		body: 'Fast, mobile-friendly sites for small businesses, with hosting, domain and payments set up for you.',
	},
];

export default function WorkWithMePage() {
	return (
		<Container className="flex flex-col gap-10 pt-14 sm:pt-20">
			<div className="flex flex-col items-start gap-4">
				<Label>Work with me</Label>
				<h1 className="text-4xl leading-display font-semibold tracking-tight text-foreground">Alongside the day job</h1>
				<p className="max-w-2xl text-lg text-subtle-foreground">
					I take on a small amount of outside work, by arrangement. Book a short call and we’ll see whether it’s a fit.
				</p>
			</div>
			<ul className="grid gap-4 md:grid-cols-3">
				{offers.map(o => (
					<li key={o.title}>
						<Card className="h-full">
							<h2 className="font-semibold text-foreground">{o.title}</h2>
							<p className="mt-2 text-sm leading-relaxed text-subtle-foreground">{o.body}</p>
						</Card>
					</li>
				))}
			</ul>
			<div className="flex flex-wrap gap-2">
				<Button asChild size="lg" variant="default">
					<a href={CALENDLY} target="_blank" rel="noreferrer">
						<CalendarDaysIcon className="size-4" aria-hidden="true" />
						Book a 15-minute call
					</a>
				</Button>
				<Button asChild size="lg">
					<a href={site.links.linkedin} target="_blank" rel="noreferrer">
						Message on LinkedIn
					</a>
				</Button>
			</div>
		</Container>
	);
}
