import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/16/solid';

import { Card } from '@big-shared/ui/card';
import { Chips, Label } from '@/components/ui';
import type { LiveFact } from '@/lib/live/facts';
import type { Project } from '@/lib/projects';

export function ProjectCard({ project, fact, index }: { project: Project; fact: LiveFact | null; index: number }) {
	return (
		<Card asChild padding="none" className="group transition-colors hover:border-border-strong">
			<Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
				<div className="flex flex-1 flex-col gap-3 p-5">
					<Label>
						<span className="font-mono text-brand">{String(index + 1).padStart(2, '0')}</span> · {project.kind}
					</Label>
					<h3 className="text-xl font-semibold tracking-tight text-foreground">{project.name}</h3>
					<p className="text-sm leading-relaxed text-subtle-foreground">{project.tagline}</p>
					<Chips items={project.stack.slice(0, 4)} className="mt-auto pt-2" />
				</div>
				<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-border px-5 py-3 text-xs">
					{fact ? (
						<span className="flex items-center gap-2 text-muted-foreground">
							<span className="relative flex size-1.5 shrink-0" aria-hidden="true">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-50 motion-reduce:animate-none" />
								<span className="relative inline-flex size-1.5 rounded-full bg-brand" />
							</span>
							<span>
								{fact.label} <span className="font-mono text-emphasis-foreground">{fact.value}</span>
							</span>
						</span>
					) : (
						<span className="text-muted-foreground">{project.status}</span>
					)}
					<span className="flex shrink-0 items-center gap-1 font-medium text-brand">
						Case study
						<ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
					</span>
				</div>
			</Link>
		</Card>
	);
}
