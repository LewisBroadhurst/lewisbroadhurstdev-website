/**
 * The shipping record: a week-by-week candlestick of GitHub activity.
 *
 * Each candle is one week. It opens at the previous week's daily average of contributions, closes at this
 * week's, and its wicks reach the busiest and quietest day of the week, so a green candle is a week that
 * picked up pace. Under each candle, a volume bar counts the pull requests merged that week.
 *
 * Everything here is pure, so the loader and the snapshot script share it. No imports: the snapshot script
 * runs this file with Node's type stripping.
 */

export type ContributionDay = { date: string; count: number };

export type WeekCandle = {
	/** Monday of the week, YYYY-MM-DD (UTC). */
	weekStart: string;
	open: number;
	high: number;
	low: number;
	close: number;
	/** Contributions across the week. */
	total: number;
	mergedPRs: number;
};

export type ShippingRecord = {
	login: string;
	generatedAt: string;
	candles: WeekCandle[];
};

const DAY_MS = 86_400_000;

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const toIso = (date: Date) => date.toISOString().slice(0, 10);

export function addDays(iso: string, days: number): string {
	return toIso(new Date(toDate(iso).getTime() + days * DAY_MS));
}

/** The Monday on or before `iso`. */
export function weekStartOf(iso: string): string {
	const day = toDate(iso).getUTCDay(); // 0 is Sunday
	return addDays(iso, -((day + 6) % 7));
}

/** The Mondays of the `count` weeks ending with the week that holds `today`, oldest first. */
export function weekStarts(today: string, count: number): string[] {
	const last = weekStartOf(today);
	return Array.from({ length: count }, (_, i) => addDays(last, -7 * (count - 1 - i)));
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Shapes daily contributions and weekly merged-PR counts into candles. `starts` should hold one more week
 * than you want back: the first week only seeds the next one's open, and is dropped.
 */
export function toWeeklyCandles(
	days: ContributionDay[],
	prsByWeek: Record<string, number>,
	starts: string[],
	today?: string,
): WeekCandle[] {
	const byWeek = new Map<string, number[]>();
	for (const { date, count } of days) {
		if (today && date > today) continue;
		const week = weekStartOf(date);
		const list = byWeek.get(week);
		if (list) list.push(count);
		else byWeek.set(week, [count]);
	}

	const candles: WeekCandle[] = [];
	let previousClose: number | null = null;
	for (const weekStart of starts) {
		const counts = byWeek.get(weekStart) ?? [];
		const total = counts.reduce((sum, n) => sum + n, 0);
		const close = counts.length ? round1(total / counts.length) : 0;
		const open = previousClose ?? close;
		candles.push({
			weekStart,
			open,
			high: Math.max(open, close, ...counts),
			low: Math.min(open, close, ...counts),
			close,
			total,
			mergedPRs: prsByWeek[weekStart] ?? 0,
		});
		previousClose = close;
	}
	return candles.slice(1);
}

/** One GraphQL request: the contribution calendar, plus a merged-PR count per week as aliased searches. */
export function buildShippingQuery(login: string, starts: string[], today: string): string {
	const searches = starts
		.map((start, i) => {
			const end = i === starts.length - 1 ? today : addDays(start, 6);
			const q = `author:${login} is:pr is:merged merged:${start}..${end}`;
			return `w${i}: search(query: ${JSON.stringify(q)}, type: ISSUE, first: 0) { issueCount }`;
		})
		.join('\n  ');
	return `query {
  user(login: ${JSON.stringify(login)}) {
    contributionsCollection(from: "${starts[0]}T00:00:00Z", to: "${today}T23:59:59Z") {
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
  ${searches}
}`;
}

type ShippingResponse = {
	data?: {
		user?: {
			contributionsCollection?: {
				contributionCalendar?: { weeks?: { contributionDays?: { date: string; contributionCount: number }[] }[] };
			};
		} | null;
	} & Record<string, unknown>;
	errors?: { message: string }[];
};

/** Reads the response to `buildShippingQuery`. Throws if GitHub answered with errors or without the calendar. */
export function parseShippingResponse(json: unknown, starts: string[]): { days: ContributionDay[]; prsByWeek: Record<string, number> } {
	const res = json as ShippingResponse;
	if (res.errors?.length) throw new Error(`GitHub: ${res.errors.map(e => e.message).join('; ')}`);
	const weeks = res.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
	if (!weeks) throw new Error('GitHub: no contribution calendar in the response');

	const days = weeks.flatMap(w => w.contributionDays ?? []).map(d => ({ date: d.date, count: d.contributionCount }));
	const prsByWeek: Record<string, number> = {};
	starts.forEach((start, i) => {
		const hit = res.data?.[`w${i}`] as { issueCount?: number } | undefined;
		prsByWeek[start] = typeof hit?.issueCount === 'number' ? hit.issueCount : 0;
	});
	return { days, prsByWeek };
}

export type ShippingSummary = {
	weeks: number;
	contributions: number;
	mergedPRs: number;
	busiestWeek: WeekCandle | null;
	/** Close of the latest week against the first week's open, as a percentage, or null with no base. */
	change: number | null;
};

export function summarise(candles: WeekCandle[]): ShippingSummary {
	const busiestWeek = candles.reduce<WeekCandle | null>((best, c) => (!best || c.mergedPRs > best.mergedPRs ? c : best), null);
	const first = candles[0];
	const last = candles[candles.length - 1];
	return {
		weeks: candles.length,
		contributions: candles.reduce((sum, c) => sum + c.total, 0),
		mergedPRs: candles.reduce((sum, c) => sum + c.mergedPRs, 0),
		busiestWeek,
		change: first && last && first.open > 0 ? Math.round(((last.close - first.open) / first.open) * 100) : null,
	};
}

/** Builds the record end to end. `fetchGraphQL` posts a query to GitHub and returns the parsed JSON. */
export async function fetchShippingRecord(
	login: string,
	today: string,
	weeks: number,
	fetchGraphQL: (query: string) => Promise<unknown>,
): Promise<ShippingRecord> {
	const starts = weekStarts(today, weeks + 1);
	const json = await fetchGraphQL(buildShippingQuery(login, starts, today));
	const { days, prsByWeek } = parseShippingResponse(json, starts);
	return { login, generatedAt: today, candles: toWeeklyCandles(days, prsByWeek, starts, today) };
}

/** Drops the quiet weeks before the first one with any activity, so the chart starts where the record does. */
export function dropLeadingQuietWeeks(candles: WeekCandle[]): WeekCandle[] {
	const first = candles.findIndex(c => c.total > 0 || c.mergedPRs > 0);
	return first === -1 ? [] : candles.slice(first);
}
