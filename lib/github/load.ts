import 'server-only';

import snapshot from '@/data/shipping-snapshot.json';

import { GITHUB_LOGIN, SHIPPING_WEEKS, githubGraphQL } from './client';
import { dropLeadingQuietWeeks, fetchShippingRecord, type ShippingRecord } from './shipping';

export type LoadedShippingRecord = ShippingRecord & { live: boolean };

const DAY = 86_400;

/**
 * The shipping record, live from GitHub when GITHUB_TOKEN is set (refreshed daily), otherwise the snapshot in
 * data/. The token needs read access to the private repos for their PRs to count; without it, only public
 * activity shows.
 */
export async function loadShippingRecord(): Promise<LoadedShippingRecord> {
	const token = process.env.GITHUB_TOKEN;
	const fallback = { ...(snapshot as ShippingRecord), live: false };
	if (!token) return { ...fallback, candles: dropLeadingQuietWeeks(fallback.candles) };
	try {
		const today = new Date().toISOString().slice(0, 10);
		const record = await fetchShippingRecord(GITHUB_LOGIN, today, SHIPPING_WEEKS, query =>
			githubGraphQL(query, token, { next: { revalidate: DAY } } as RequestInit),
		);
		return { ...record, candles: dropLeadingQuietWeeks(record.candles), live: true };
	} catch (error) {
		console.error('Shipping record: falling back to the snapshot.', error);
		return { ...fallback, candles: dropLeadingQuietWeeks(fallback.candles) };
	}
}
