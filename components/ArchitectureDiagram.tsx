import { Fragment } from 'react';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/16/solid';

import { Card } from '@big-shared/ui/card';
import { Label } from '@/components/ui';
import type { Project } from '@/lib/projects';

/** Stages left to right on a wide screen, top to bottom on a phone; each stage feeds the next. */
export function ArchitectureDiagram({ diagram }: { diagram: Project['diagram'] }) {
	return (
		<Card padding="none" className="overflow-hidden">
			<figure>
				<div className="bg-[radial-gradient(var(--border-faint)_1px,transparent_1px)] [background-size:16px_16px] p-4 sm:p-6">
					<div className="flex flex-col items-stretch gap-2 md:flex-row md:gap-3">
						{diagram.stages.map((stage, i) => (
							<Fragment key={stage.label}>
								{i > 0 && (
									<div aria-hidden="true" className="flex shrink-0 items-center justify-center text-brand-strong">
										<ArrowDownIcon className="size-4 md:hidden" />
										<ArrowRightIcon className="hidden size-4 md:block" />
									</div>
								)}
								<section className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg border border-border bg-background/70 p-3">
									<Label className="font-mono">
										<span className="text-brand">{String(i + 1).padStart(2, '0')}</span> {stage.label}
									</Label>
									<ul className="flex flex-1 flex-col justify-center gap-2">
										{stage.nodes.map(node => (
											<li key={node.title} className="rounded-md border border-border-strong bg-surface px-3 py-2">
												<p className="text-sm font-medium text-foreground">{node.title}</p>
												{node.note && <p className="text-xs text-muted-foreground">{node.note}</p>}
											</li>
										))}
									</ul>
								</section>
							</Fragment>
						))}
					</div>
				</div>
				<figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground sm:px-6">{diagram.caption}</figcaption>
			</figure>
		</Card>
	);
}
