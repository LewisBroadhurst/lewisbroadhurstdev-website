import { describe, expect, it } from 'vitest';

import {
	buildShippingQuery,
	dropLeadingQuietWeeks,
	fetchShippingRecord,
	parseShippingResponse,
	summarise,
	toWeeklyCandles,
	weekStartOf,
	weekStarts,
	type ContributionDay,
} from './shipping';

const days = (start: string, counts: number[]): ContributionDay[] =>
	counts.map((count, i) => ({ date: new Date(Date.parse(`${start}T00:00:00Z`) + i * 86_400_000).toISOString().slice(0, 10), count }));

describe('weekStartOf', () => {
	it('returns the Monday on or before a date', () => {
		expect(weekStartOf('2026-11-20')).toBe('2026-11-16'); // Friday
		expect(weekStartOf('2026-11-16')).toBe('2026-11-16'); // Monday
		expect(weekStartOf('2026-11-22')).toBe('2026-11-16'); // Sunday
	});

	it('crosses month and year ends', () => {
		expect(weekStartOf('2027-01-01')).toBe('2026-12-28');
	});
});

describe('weekStarts', () => {
	it('lists Mondays oldest first, ending with the current week', () => {
		expect(weekStarts('2026-11-20', 3)).toEqual(['2026-11-02', '2026-11-09', '2026-11-16']);
	});
});

describe('toWeeklyCandles', () => {
	const starts = ['2026-11-02', '2026-11-09', '2026-11-16'];
	// GitHub's calendar weeks start on Sunday; the candles group by Monday.
	const calendar = [
		...days('2026-11-02', [7, 7, 7, 7, 7, 7, 7]), // average 7
		...days('2026-11-09', [4, 12, 30, 82, 10, 7, 8]), // average 21.9
		...days('2026-11-16', [6, 5, 0, 2, 22]), // partial week, average 7
	];

	it('drops the seed week and opens each candle at the previous close', () => {
		const candles = toWeeklyCandles(calendar, {}, starts);
		expect(candles.map(c => c.weekStart)).toEqual(['2026-11-09', '2026-11-16']);
		expect(candles[0]).toMatchObject({ open: 7, close: 21.9, high: 82, low: 4, total: 153 });
		expect(candles[1]).toMatchObject({ open: 21.9, close: 7, high: 22, low: 0, total: 35 });
	});

	it('averages a partial week over the days so far, not seven', () => {
		const [, current] = toWeeklyCandles(calendar, {}, starts);
		expect(current.close).toBe(7);
	});

	it('ignores days after today', () => {
		const withFuture = [...calendar, ...days('2026-11-21', [500, 500])];
		const [, current] = toWeeklyCandles(withFuture, {}, starts, '2026-11-20');
		expect(current.high).toBe(22);
	});

	it('attaches merged PRs by week and defaults missing weeks to zero', () => {
		const candles = toWeeklyCandles(calendar, { '2026-11-09': 40 }, starts);
		expect(candles.map(c => c.mergedPRs)).toEqual([40, 0]);
	});

	it('draws a flat candle for a week with no data', () => {
		const candles = toWeeklyCandles([], {}, starts);
		expect(candles).toEqual([
			{ weekStart: '2026-11-09', open: 0, high: 0, low: 0, close: 0, total: 0, mergedPRs: 0 },
			{ weekStart: '2026-11-16', open: 0, high: 0, low: 0, close: 0, total: 0, mergedPRs: 0 },
		]);
	});

	it('keeps the wicks around the body when the open is outside the week’s range', () => {
		const candles = toWeeklyCandles([...days('2026-11-02', [50]), ...days('2026-11-09', [1, 2])], {}, starts.slice(0, 2));
		expect(candles[0]).toMatchObject({ open: 50, close: 1.5, high: 50, low: 1 });
	});
});

describe('buildShippingQuery', () => {
	const query = buildShippingQuery('LewisBroadhurst', ['2026-11-02', '2026-11-09', '2026-11-16'], '2026-11-20');

	it('asks for the calendar across the whole range', () => {
		expect(query).toContain('from: "2026-11-02T00:00:00Z", to: "2026-11-20T23:59:59Z"');
	});

	it('searches merged PRs per week, ending the last week today', () => {
		expect(query).toContain('w0: search(query: "author:LewisBroadhurst is:pr is:merged merged:2026-11-02..2026-11-08"');
		expect(query).toContain('w2: search(query: "author:LewisBroadhurst is:pr is:merged merged:2026-11-16..2026-11-20"');
	});
});

describe('parseShippingResponse', () => {
	const starts = ['2026-11-02', '2026-11-09'];

	it('flattens the calendar and reads each week’s search', () => {
		const json = {
			data: {
				user: {
					contributionsCollection: {
						contributionCalendar: {
							weeks: [
								{ contributionDays: [{ date: '2026-11-02', contributionCount: 3 }] },
								{ contributionDays: [{ date: '2026-11-09', contributionCount: 5 }] },
							],
						},
					},
				},
				w0: { issueCount: 12 },
				w1: { issueCount: 30 },
			},
		};
		expect(parseShippingResponse(json, starts)).toEqual({
			days: [
				{ date: '2026-11-02', count: 3 },
				{ date: '2026-11-09', count: 5 },
			],
			prsByWeek: { '2026-11-02': 12, '2026-11-09': 30 },
		});
	});

	it('throws on GitHub errors', () => {
		expect(() => parseShippingResponse({ errors: [{ message: 'Bad credentials' }] }, starts)).toThrow('Bad credentials');
	});

	it('throws when the user is missing', () => {
		expect(() => parseShippingResponse({ data: { user: null } }, starts)).toThrow('no contribution calendar');
	});

	it('counts a missing search as zero', () => {
		const json = { data: { user: { contributionsCollection: { contributionCalendar: { weeks: [] } } } } };
		expect(parseShippingResponse(json, starts).prsByWeek).toEqual({ '2026-11-02': 0, '2026-11-09': 0 });
	});
});

describe('summarise', () => {
	it('totals the record and finds the busiest week by merged PRs', () => {
		const summary = summarise([
			{ weekStart: '2026-11-09', open: 10, high: 20, low: 5, close: 15, total: 100, mergedPRs: 40 },
			{ weekStart: '2026-11-16', open: 15, high: 30, low: 2, close: 20, total: 60, mergedPRs: 55 },
		]);
		expect(summary).toMatchObject({ weeks: 2, contributions: 160, mergedPRs: 95, change: 100 });
		expect(summary.busiestWeek?.weekStart).toBe('2026-11-16');
	});

	it('handles an empty record', () => {
		expect(summarise([])).toEqual({ weeks: 0, contributions: 0, mergedPRs: 0, busiestWeek: null, change: null });
	});
});

describe('fetchShippingRecord', () => {
	it('asks for one extra week and returns the requested number of candles', async () => {
		let asked = '';
		const record = await fetchShippingRecord('me', '2026-11-20', 2, async query => {
			asked = query;
			return { data: { user: { contributionsCollection: { contributionCalendar: { weeks: [] } } } } };
		});
		expect(asked).toContain('merged:2026-11-02..2026-11-08');
		expect(record.candles.map(c => c.weekStart)).toEqual(['2026-11-09', '2026-11-16']);
		expect(record).toMatchObject({ login: 'me', generatedAt: '2026-11-20' });
	});
});

describe('dropLeadingQuietWeeks', () => {
	const quiet = { open: 0, high: 0, low: 0, close: 0, total: 0, mergedPRs: 0 };
	it('starts at the first week with contributions or merged PRs', () => {
		const candles = [
			{ ...quiet, weekStart: '2026-11-02' },
			{ ...quiet, weekStart: '2026-11-09', mergedPRs: 1 },
			{ ...quiet, weekStart: '2026-11-16' },
		];
		expect(dropLeadingQuietWeeks(candles).map(c => c.weekStart)).toEqual(['2026-11-09', '2026-11-16']);
	});

	it('returns nothing when every week is quiet', () => {
		expect(dropLeadingQuietWeeks([{ ...quiet, weekStart: '2026-11-02' }])).toEqual([]);
	});
});
