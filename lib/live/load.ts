import 'server-only';

import { lastPushed, npmLatest, shortlistLeaders, type LiveFact } from './facts';

const HOUR = 3600;

async function getJson(url: string, headers: Record<string, string> = {}): Promise<{ status: number; json: unknown } | null> {
	try {
		const res = await fetch(url, {
			headers: { 'User-Agent': 'portfolio-site', ...headers },
			next: { revalidate: HOUR },
			signal: AbortSignal.timeout(4000),
		});
		return { status: res.status, json: await res.json().catch(() => null) };
	} catch {
		return null;
	}
}

const githubHeaders = (): Record<string, string> =>
	process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};

async function stratdeckFact(): Promise<LiveFact | null> {
	const res = await getJson('https://www.stratdeck.uk/api/stocks/shortlist');
	const leaders = res && res.status === 200 ? shortlistLeaders(res.json) : null;
	return leaders ? { label: 'Today’s shortlist', value: leaders.join(' · '), href: 'https://www.stratdeck.uk' } : null;
}

async function npmFact(): Promise<LiveFact> {
	const res = await getJson('https://registry.npmjs.org/@big-shared%2fui');
	const version = res ? npmLatest(res.status, res.json) : null;
	return version
		? { label: 'On npm', value: `v${version}`, href: 'https://www.npmjs.com/package/@big-shared/ui' }
		: { label: 'npm', value: 'Publishing soon' };
}

async function repoFact(repo: string): Promise<LiveFact | null> {
	const res = await getJson(`https://api.github.com/repos/${repo}`, githubHeaders());
	const day = res && res.status === 200 ? lastPushed(res.json) : null;
	return day ? { label: 'Last shipped', value: day, href: `https://github.com/${repo}` } : null;
}

/** One live fact per project slug, or null where its source didn't answer. */
export async function loadProjectFacts(): Promise<Record<string, LiveFact | null>> {
	const [stratdeck, cryptoCharts, ui, acropolis] = await Promise.all([
		stratdeckFact(),
		repoFact('LewisBroadhurst/cryptocharts'),
		npmFact(),
		repoFact('LewisBroadhurst/acropolis-rising'),
	]);
	return { stratdeck, 'crypto-charts': cryptoCharts, 'big-shared-ui': ui, 'acropolis-rising': acropolis };
}
