import { Card } from '@big-shared/ui/card';
import { Label } from '@/components/ui';
import type { LoadedShippingRecord } from '@/lib/github/load';
import { summarise, type WeekCandle } from '@/lib/github/shipping';
import { formatDay } from '@/lib/live/facts';

const W = 1000;
const PRICE_H = 260;
const GAP = 16;
const VOL_H = 70;
const H = PRICE_H + GAP + VOL_H;

const fmt = new Intl.NumberFormat('en-GB');

function niceMax(n: number): number {
	if (n <= 0) return 10;
	const step = 10 ** Math.floor(Math.log10(n));
	return Math.ceil(n / step) * step;
}

/** A grid value rounded to something a reader would write: 6, 25, 100, 225. */
function roundLabel(v: number): number {
	if (v < 10) return Math.round(v);
	const step = 10 ** (Math.floor(Math.log10(v)) - 1) * 5;
	return Math.round(v / step) * step;
}

const monthOf = (iso: string) => new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

/** The month labels: one at the first week of each month. */
function monthTicks(candles: WeekCandle[]) {
	const ticks: { index: number; label: string }[] = [];
	candles.forEach((c, i) => {
		const label = monthOf(c.weekStart);
		if (i === 0 || label !== monthOf(candles[i - 1].weekStart)) ticks.push({ index: i, label });
	});
	return ticks;
}

/**
 * The shipping record as a candlestick chart, in Crypto Charts' style: green for a week that picked up pace,
 * red for one that slowed, merged pull requests as volume underneath. Server-rendered SVG, no client script.
 */
export function ShippingChart({ record }: { record: LoadedShippingRecord }) {
	const { candles } = record;
	const summary = summarise(candles);
	if (!candles.length) return null;

	const n = candles.length;
	const step = W / n;
	const body = Math.max(step * 0.62, 2);
	const priceMax = niceMax(Math.max(...candles.map(c => c.high)));
	const volMax = niceMax(Math.max(...candles.map(c => c.mergedPRs)));
	// Square-root scale: one very busy day shouldn't flatten every other week.
	const y = (v: number) => PRICE_H - Math.sqrt(Math.max(v, 0) / priceMax) * PRICE_H;
	const grid = [...new Set([0.25, 0.5, 0.75, 1].map(f => roundLabel(f * f * priceMax)))];
	const last = candles[n - 1];
	const ticks = monthTicks(candles);

	return (
		<Card padding="none" className="overflow-hidden">
			<div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="flex flex-col gap-1">
					<Label>Shipping record · GitHub</Label>
					<p className="text-xl font-semibold tracking-tight text-foreground">
						{fmt.format(summary.mergedPRs)} pull requests merged since {monthOf(candles[0].weekStart)}
					</p>
				</div>
				<dl className="grid grid-cols-3 gap-x-6 gap-y-1 text-xs sm:text-right">
					<div>
						<dt className="text-muted-foreground">Contributions</dt>
						<dd className="font-mono text-sm text-emphasis-foreground">{fmt.format(summary.contributions)}</dd>
					</div>
					<div>
						<dt className="text-muted-foreground">Busiest week</dt>
						<dd className="font-mono text-sm text-emphasis-foreground">
							{summary.busiestWeek ? `${summary.busiestWeek.mergedPRs} PRs` : '–'}
						</dd>
					</div>
					<div>
						<dt className="text-muted-foreground">Weeks</dt>
						<dd className="font-mono text-sm text-emphasis-foreground">{summary.weeks}</dd>
					</div>
				</dl>
			</div>

			<figure className="px-3 pt-4 pb-3 sm:px-5">
				<div className="relative pr-10">
					<svg
						viewBox={`0 0 ${W} ${H}`}
						preserveAspectRatio="none"
						className="block h-64 w-full sm:h-72"
						role="img"
						aria-label={`Weekly candlestick of GitHub contributions, ${summary.weeks} weeks, with merged pull requests as volume.`}
					>
						{grid.map(v => (
							<line key={v} x1={0} x2={W} y1={y(v)} y2={y(v)} stroke="var(--border-faint)" vectorEffect="non-scaling-stroke" />
						))}
						<line x1={0} x2={W} y1={PRICE_H} y2={PRICE_H} stroke="var(--border)" vectorEffect="non-scaling-stroke" />
						<line
							x1={0}
							x2={W}
							y1={y(last.close)}
							y2={y(last.close)}
							stroke="var(--brand)"
							strokeDasharray="4 4"
							strokeOpacity={0.5}
							vectorEffect="non-scaling-stroke"
						/>
						{candles.map((c, i) => {
							const up = c.close >= c.open;
							const color = up ? 'var(--positive)' : 'var(--negative)';
							const cx = i * step + step / 2;
							const top = y(Math.max(c.open, c.close));
							const height = Math.max(Math.abs(y(c.open) - y(c.close)), 1.5);
							const volHeight = (c.mergedPRs / volMax) * VOL_H;
							return (
								<g key={c.weekStart} className="group">
									<title>
										{`Week of ${formatDay(c.weekStart)}: ${c.total} contributions (average ${c.close} a day, peak ${c.high}), ${c.mergedPRs} PRs merged`}
									</title>
									<rect x={i * step} y={0} width={step} height={H} className="fill-transparent group-hover:fill-white/[0.04]" />
									<line x1={cx} x2={cx} y1={y(c.high)} y2={y(c.low)} stroke={color} vectorEffect="non-scaling-stroke" />
									<rect x={cx - body / 2} y={top} width={body} height={height} fill={color} />
									<rect x={cx - body / 2} y={H - volHeight} width={body} height={volHeight} fill={color} fillOpacity={0.35} />
								</g>
							);
						})}
					</svg>
					{/* Axis labels sit in HTML so they keep their size while the plot stretches. */}
					<div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 font-mono text-2xs text-muted-foreground">
						{grid.map(v => (
							<span key={v} className="absolute right-0 -translate-y-1/2" style={{ top: `${(y(v) / H) * 100}%` }}>
								{fmt.format(v)}
							</span>
						))}
						<span
							className="absolute right-0 -translate-y-1/2 rounded-sm bg-brand px-1 text-brand-foreground"
							style={{ top: `${(y(last.close) / H) * 100}%` }}
						>
							{last.close}
						</span>
					</div>
				</div>
				<div aria-hidden="true" className="relative mr-10 h-4 font-mono text-2xs text-muted-foreground">
					{ticks.map(t => (
						<span key={t.index} className="absolute top-1" style={{ left: `${((t.index + 0.5) / n) * 100}%` }}>
							{t.label}
						</span>
					))}
				</div>
				<figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
					Each candle is a week: it opens at the previous week’s daily average of contributions, closes at this week’s, and its wicks reach
					the busiest and quietest day. Bars underneath are pull requests merged. Square-root scale; includes private repos.{' '}
					{record.live ? 'Live from the GitHub API, refreshed daily.' : `Snapshot from ${formatDay(record.generatedAt)}.`}
				</figcaption>
			</figure>
		</Card>
	);
}
