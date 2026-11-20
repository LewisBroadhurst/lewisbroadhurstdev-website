import { describe, expect, it } from 'vitest';

import { formatDay, lastPushed, npmLatest, shortlistLeaders } from './facts';

describe('shortlistLeaders', () => {
	it('takes the leaders of the first order', () => {
		expect(shortlistLeaders({ orders: [['BMY', 'FOXA', 'NEM', 'NTAP'], ['SIE.DE']] })).toEqual(['BMY', 'FOXA', 'NEM']);
	});

	it('keeps exchange suffixes and skips anything that isn’t a ticker', () => {
		expect(shortlistLeaders({ orders: [['0939.HK', null, '<b>', 'SIE.DE']] })).toEqual(['0939.HK', 'SIE.DE']);
	});

	it('returns null for an empty shortlist or an unexpected shape', () => {
		expect(shortlistLeaders({ orders: [[]] })).toBeNull();
		expect(shortlistLeaders({ orders: 'nope' })).toBeNull();
		expect(shortlistLeaders(null)).toBeNull();
	});
});

describe('npmLatest', () => {
	it('reads the latest dist-tag', () => {
		expect(npmLatest(200, { 'dist-tags': { latest: '0.2.0' } })).toBe('0.2.0');
	});

	it('is null when the package isn’t published', () => {
		expect(npmLatest(404, { error: 'Not found' })).toBeNull();
		expect(npmLatest(200, {})).toBeNull();
	});
});

describe('lastPushed', () => {
	it('formats the push date in UTC', () => {
		expect(lastPushed({ pushed_at: '2026-11-20T23:30:00Z' })).toBe('20 Nov 2026');
	});

	it('is null without a valid date', () => {
		expect(lastPushed({})).toBeNull();
		expect(lastPushed({ pushed_at: 'soon' })).toBeNull();
	});
});

describe('formatDay', () => {
	it('uses a short British date', () => {
		expect(formatDay('2026-11-01')).toBe('1 Nov 2026');
	});
});
