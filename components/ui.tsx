import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@big-shared/ui/cn';

/** The page column. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
	return <div className={cn('mx-auto w-full max-w-5xl px-4 sm:px-6', className)} {...props} />;
}

/** Small caps, grey, above what it names. */
export function Label({ className, ...props }: ComponentProps<'p'>) {
	return <p className={cn('text-2xs font-semibold tracking-caps text-muted-foreground uppercase', className)} {...props} />;
}

/** A section heading with its step number in brand mono. */
export function SectionHeading({ step, title, children, id }: { step?: string; title: string; children?: ReactNode; id?: string }) {
	return (
		<div id={id} className="mb-6 flex scroll-mt-24 flex-col gap-2">
			<h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-foreground">
				{step && <span className="font-mono text-sm font-semibold text-brand">{step}</span>}
				{title}
			</h2>
			{children && <p className="max-w-2xl text-base text-subtle-foreground">{children}</p>}
		</div>
	);
}

/** A quiet capsule label with a brand dot. */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<span
			className={cn(
				'inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-subtle-foreground',
				className,
			)}
		>
			<span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
			{children}
		</span>
	);
}

export function Chips({ items, className }: { items: string[]; className?: string }) {
	return (
		<ul className={cn('flex flex-wrap gap-1.5', className)}>
			{items.map(item => (
				<li key={item} className="rounded-md border border-border px-2 py-0.5 text-xs text-subtle-foreground">
					{item}
				</li>
			))}
		</ul>
	);
}

/** The one glow a page may have, behind its hero. */
export function HeroGlow() {
	return (
		<div
			aria-hidden="true"
			className="glow-bloom pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,var(--brand-wash),transparent_65%)]"
		/>
	);
}
