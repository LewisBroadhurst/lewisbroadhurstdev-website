/**
 * Writes data/shipping-snapshot.json, the shipping record the site shows when it has no GITHUB_TOKEN or GitHub
 * is unreachable. Run it now and then so the fallback isn't stale:
 *
 *   GITHUB_TOKEN=$(gh auth token) node scripts/refresh-shipping-snapshot.ts
 */
import { writeFileSync } from 'node:fs';

import { fetchShippingRecord } from '../lib/github/shipping.ts';
import { GITHUB_LOGIN, SHIPPING_WEEKS, githubGraphQL } from '../lib/github/client.ts';

const token = process.env.GITHUB_TOKEN;
if (!token) {
	console.error('Set GITHUB_TOKEN, e.g. GITHUB_TOKEN=$(gh auth token)');
	process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const record = await fetchShippingRecord(GITHUB_LOGIN, today, SHIPPING_WEEKS, query => githubGraphQL(query, token));
writeFileSync(new URL('../data/shipping-snapshot.json', import.meta.url), JSON.stringify(record, null, '\t') + '\n');
console.log(`Wrote ${record.candles.length} weeks to data/shipping-snapshot.json`);
