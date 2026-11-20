/**
 * Shaping for the one live fact each project card carries. Pure; `load.ts` does the fetching.
 */

export type LiveFact = { label: string; value: string; href?: string };

const isTicker = (v: unknown): v is string => typeof v === 'string' && /^[A-Z0-9.\-]{1,12}$/.test(v);

/**
 * StratDeck's /api/stocks/shortlist answers `{ orders: string[][] }`; the first order is the day's shortlist in
 * rank order. Returns its leaders, or null if the answer isn't that shape.
 */
export function shortlistLeaders(json: unknown, count = 3): string[] | null {
	const orders = (json as { orders?: unknown })?.orders;
	if (!Array.isArray(orders) || !Array.isArray(orders[0])) return null;
	const leaders = (orders[0] as unknown[]).filter(isTicker).slice(0, count);
	return leaders.length ? leaders : null;
}

/** The npm registry's answer for a package: its latest version, or null if it isn't published. */
export function npmLatest(status: number, json: unknown): string | null {
	if (status !== 200) return null;
	const latest = (json as { 'dist-tags'?: { latest?: unknown } })?.['dist-tags']?.latest;
	return typeof latest === 'string' ? latest : null;
}

/** A GitHub repo's last push as `20 Nov 2026`, or null. */
export function lastPushed(json: unknown): string | null {
	const pushed = (json as { pushed_at?: unknown })?.pushed_at;
	if (typeof pushed !== 'string' || Number.isNaN(Date.parse(pushed))) return null;
	return formatDay(pushed);
}

export function formatDay(iso: string): string {
	return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}
