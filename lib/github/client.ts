/** Shared by the site's loader and the snapshot script, so no path aliases here. */
export const GITHUB_LOGIN = 'LewisBroadhurst';
export const SHIPPING_WEEKS = 26;

export async function githubGraphQL(query: string, token: string, init?: RequestInit): Promise<unknown> {
	const res = await fetch('https://api.github.com/graphql', {
		...init,
		method: 'POST',
		headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'portfolio-site' },
		body: JSON.stringify({ query }),
	});
	if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
	return res.json();
}
