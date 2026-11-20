/** The case studies, in the order the home page shows them. */

export type DiagramNode = { title: string; note?: string };
/** A diagram reads left to right (top to bottom on a phone): each stage feeds the next. */
export type DiagramStage = { label: string; nodes: DiagramNode[] };

export type Project = {
	slug: string;
	name: string;
	/** One line on the card and under the title. */
	tagline: string;
	kind: string;
	year: string;
	role: string;
	status: string;
	links: { label: string; href: string }[];
	stack: string[];
	outcomes: string[];
	problem: string[];
	decisions: { title: string; body: string }[];
	diagram: { caption: string; stages: DiagramStage[] };
	differently: string[];
};

export const projects: Project[] = [
	{
		slug: 'stratdeck',
		name: 'StratDeck',
		tagline: 'Stock research for self-directed investors: find the stocks worth a look and learn each one’s story in minutes.',
		kind: 'Product · founder-engineer',
		year: '2026',
		role: 'Solo, from zero to production',
		status: 'Live, early access',
		links: [{ label: 'stratdeck.uk', href: 'https://www.stratdeck.uk' }],
		stack: [
			'Next.js 16',
			'TypeScript',
			'Tailwind 4',
			'Postgres (Neon)',
			'Drizzle',
			'Auth.js',
			'Python',
			'Claude API',
			'Nx',
			'Expo',
			'Vercel',
			'GitHub Actions',
		],
		outcomes: [
			'A daily shortlist of stocks across the US, UK, Europe and Asia, each with its reasons in one line, like “Keeps 22p per £1 of sales; peers 10p”.',
			'Six checks on every stock (trend, growth, profitability, value, analysts, earnings), each a clear pass or watch with the figures behind it.',
			'Weekly AI-written stories on four market themes, every claim tied to a source and every AI-written line labelled.',
			'An iPhone and Android app and three emails a week, all served from the same site.',
		],
		problem: [
			'There’s no shortage of financial data. What’s hard is knowing what matters. Screeners drown a new investor in columns; tips skip the reasons.',
			'StratDeck had to be opinionated enough to say “look at these three today”, and honest enough to show every figure behind that, with its source, in a page someone can read in minutes.',
		],
		decisions: [
			{
				title: 'Pipelines publish, the site only reads',
				body: 'Two Python pipelines run on a schedule: one fetches prices and filings and classifies every stock against its 200-day trend, the other writes the research. They publish to Postgres, and the Next.js site never computes a reading on request, so pages are fast and hosting stays cheap.',
			},
			{
				title: 'One monorepo, one change',
				body: 'The web app, both pipelines, the phone app and the shared packages live in one Nx workspace with data contracts between them. A change to what a pipeline writes lands in the same pull request as the pages that read it.',
			},
			{
				title: 'AI text is held to its sources',
				body: 'Every AI draft is checked against its citations, then read by a second call looking for phrases that claim more than their facts. A draft that fails goes back. Every figure links to SEC EDGAR or Yahoo Finance.',
			},
			{
				title: 'The phone app reads the site’s routes',
				body: 'The Expo app draws what the site’s mobile endpoints return, so a rule like what counts as a pass is written once, on the server, and the app can’t disagree with the site.',
			},
		],
		diagram: {
			caption: 'Scheduled pipelines write; the site and the phone app read.',
			stages: [
				{
					label: 'Sources',
					nodes: [
						{ title: 'Market data', note: 'Prices, fundamentals' },
						{ title: 'SEC EDGAR', note: 'Filings' },
						{ title: 'Claude API', note: 'Research drafts' },
					],
				},
				{
					label: 'Pipelines',
					nodes: [
						{ title: 'Trend board', note: 'Python · 200-day trend, checks' },
						{ title: 'Research', note: 'Python · feed, briefings, stories' },
					],
				},
				{ label: 'Store', nodes: [{ title: 'Postgres', note: 'Neon · Drizzle schema' }] },
				{
					label: 'Readers',
					nodes: [
						{ title: 'Next.js site', note: 'Vercel · pages, share cards, email' },
						{ title: 'Phone app', note: 'Expo · /api/mobile' },
					],
				},
			],
		},
		differently: [
			'Write the data contracts between the pipelines and the site as typed schemas on day one. They grew out of JSON files on disk, and moving to Postgres as the store of record meant untangling those files later.',
			'Put real users on it sooner. The checks and the copy got much sharper once founding users started telling me what they skipped.',
		],
	},
	{
		slug: 'crypto-charts',
		name: 'Crypto Charts',
		tagline: 'Free live crypto charts with drawing tools, indicators, replay, and Python backtests that run in your own browser.',
		kind: 'Product · open source to read',
		year: '2026',
		role: 'Solo',
		status: 'Live',
		links: [
			{ label: 'cryptocharts.stratdeck.uk', href: 'https://cryptocharts.stratdeck.uk' },
			{ label: 'GitHub', href: 'https://github.com/LewisBroadhurst/cryptocharts' },
		],
		stack: ['Next.js 16', 'TypeScript', 'Lightweight Charts', 'Pyodide', 'Vitest', 'Playwright', 'Vercel', 'GitHub Actions'],
		outcomes: [
			'Live charts straight from Kraken, with drawings, indicators and bar-by-bar replay.',
			'Backtests written in Python, with numpy, that run in the reader’s own browser: no server cost, no queue.',
			'Sign in with StratDeck to keep layouts, drawings and scripts across devices, without this site ever holding a secret.',
			'Every coin’s link unfurls into its own share card.',
		],
		problem: [
			'Charting sites keep backtesting behind a paid server, because running a stranger’s code is a cost and a security risk.',
			'The aim was a free site with no running costs that could still run anyone’s Python safely, and stay within the exchanges’ terms and the UK’s crypto promotion rules.',
		],
		decisions: [
			{
				title: 'The browser talks straight to the exchange',
				body: 'History and live bars come from Kraken’s public APIs in the reader’s browser. No server, no database and no API keys, so the first version had no secrets at all.',
			},
			{
				title: 'Python runs in a sandbox with its own origin',
				body: 'Backtests run in Pyodide inside a frame served from its own origin, with a content security policy that lets it load Pyodide from this site and reach nothing else. A script can’t touch the page, its storage or the network.',
			},
			{
				title: 'Sign in with StratDeck, holding nothing',
				body: 'The browser calls StratDeck directly with StratDeck’s own session cookie, which this site never sees. Accounts come for free and there is no key here to leak.',
			},
			{
				title: 'Checked the terms before writing code',
				body: 'A short first phase read each exchange’s market-data terms and measured their history depth. Coinbase stays locked in the menu until it agrees to its prices being shown, and nothing on the site nudges anyone to trade.',
			},
		],
		diagram: {
			caption: 'Everything runs in the reader’s browser; Vercel only serves files.',
			stages: [
				{ label: 'Exchange', nodes: [{ title: 'Kraken', note: 'REST history · WebSocket live' }] },
				{
					label: 'Reader’s browser',
					nodes: [
						{ title: 'Chart workspace', note: 'Indicators, drawings, replay' },
						{ title: 'Sandboxed frame', note: 'Pyodide + numpy · own origin, strict CSP' },
					],
				},
				{
					label: 'Services',
					nodes: [
						{ title: 'StratDeck', note: 'Account · saved workspace' },
						{ title: 'Vercel', note: 'Static pages, share cards' },
					],
				},
			],
		},
		differently: [
			'Design the exchange interface around paging back years of history from the start. Kraken returns only the last 720 bars per interval, which backtests feel first.',
			'Extract the shared UI package before copying StratDeck’s chart components across, not after. Two copies drifted within weeks.',
		],
	},
	{
		slug: 'big-shared-ui',
		name: '@big-shared/ui',
		tagline: 'The design tokens and UI primitives that make StratDeck, Crypto Charts and this site look like one family.',
		kind: 'Design system · package',
		year: '2026',
		role: 'Solo',
		status: 'In use by StratDeck and this site',
		links: [],
		stack: ['Tailwind 4', 'CSS custom properties', 'React 19', 'TypeScript', 'class-variance-authority', 'Radix Slot'],
		outcomes: [
			'One palette change is one edit, picked up by every site that uses it. Crypto Charts is moving onto it next.',
			'Seventeen entry points (button, card, dialog, popover, tooltip and their styles), each importable on its own.',
			'This site is built on it: the colours, type scale and the buttons and cards you’re looking at come from the package.',
		],
		problem: [
			'Crypto Charts started by copying StratDeck’s components, and the two copies began to drift: a fixed tooltip here, a different grey there.',
			'A third site on the way meant a third copy unless the look became a package with one source of truth.',
		],
		decisions: [
			{
				title: 'Tokens are CSS variables, mapped into Tailwind',
				body: 'Colours live once as CSS custom properties and reach Tailwind through an inline theme, so utilities resolve to the variables rather than copying their values, and a token can be redefined further down the tree.',
			},
			{
				title: 'Scales are closed',
				body: 'Each scale (type, leading, tracking, radius, shadow) is cleared and given only its steps, so a class off the scale draws nothing, and a lint rule flags one-off values. The look can’t drift by accident.',
			},
			{
				title: 'Shipped as TypeScript source',
				body: 'No build step: apps list it in transpilePackages and compile it with their own code, so a change is tested in StratDeck the moment it’s made.',
			},
			{
				title: 'Dark only, on purpose',
				body: 'Neither app has a light mode, so there is no second set of values to keep in step. A light theme would redefine the same names under one selector.',
			},
		],
		diagram: {
			caption: 'Built in StratDeck’s workspace; every other site installs it.',
			stages: [
				{ label: 'Source', nodes: [{ title: 'packages/ui', note: 'theme.css tokens · primitives' }] },
				{
					label: 'Delivery',
					nodes: [
						{ title: 'Workspace link', note: 'StratDeck, instantly' },
						{ title: 'npm', note: '@big-shared/ui' },
					],
				},
				{
					label: 'Sites',
					nodes: [
						{ title: 'StratDeck', note: 'stratdeck.uk' },
						{ title: 'Crypto Charts', note: 'Moving over next' },
						{ title: 'This portfolio', note: 'Tailwind 4' },
					],
				},
			],
		},
		differently: [
			'Start the package the day a second app copies a component. By the time I extracted it, Crypto Charts had its own copies of a dozen primitives to unwind.',
			'Add a live showcase page alongside the package from the start, so a change can be reviewed visually rather than only in the apps.',
		],
	},
	{
		slug: 'acropolis-rising',
		name: 'Acropolis Rising',
		tagline: 'A browser city-builder set in ancient Greece. Nothing to install: open it and play.',
		kind: 'Game',
		year: '2026',
		role: 'Solo',
		status: 'Playable',
		links: [
			{ label: 'Play it', href: 'https://lewisbroadhurst.github.io/acropolis-rising/' },
			{ label: 'GitHub', href: 'https://github.com/LewisBroadhurst/acropolis-rising' },
		],
		stack: ['React', 'TypeScript', 'Canvas', 'Vite', 'Vitest', 'GitHub Pages'],
		outcomes: [
			'A playable city-builder: lay out a city on a tile map, feed and house its people, run its industries and win the gods’ favour.',
			'Your city saves in the browser, so there’s no account and nothing to download.',
			'CI checks formatting, lint, types and tests on every push, and main publishes itself to GitHub Pages.',
		],
		problem: [
			'This was my first project built with an agentic workflow. The question was whether an agent-driven loop could ship something with real state and rules, not just pages.',
			'A city-builder is a hard test: dozens of interacting rules (paths, food delivery, housing growth, workers), a game loop, and a save file that has to survive changes.',
		],
		decisions: [
			{
				title: 'A pure simulation core',
				body: 'Map generation, the random number generator, the tick loop, pathing and saving are plain TypeScript, covered by unit tests, with a single hook connecting them to the UI. The rules can be changed and checked without a browser.',
			},
			{
				title: 'A thin UI over it',
				body: 'React draws the side panels and a canvas draws the map; neither holds game rules. That split is what made it safe to let an agent work on either half.',
			},
			{
				title: 'Seeded randomness',
				body: 'Maps and events come from a seeded generator, so a bug report is reproducible and a test can pin an exact map.',
			},
			{
				title: 'Saves that refuse to load blindly',
				body: 'A save is versioned and every field is validated on load, so a save from an older version of the game is rejected cleanly instead of corrupting a city.',
			},
		],
		diagram: {
			caption: 'The rules know nothing about React; the UI knows nothing about the rules.',
			stages: [
				{
					label: 'Simulation',
					nodes: [
						{ title: 'Game core', note: 'Map, RNG, tick loop, pathing' },
						{ title: 'Save', note: 'Versioned, validated, local storage' },
					],
				},
				{ label: 'Bridge', nodes: [{ title: 'useGame hook', note: 'Ticks the core, hands state to the view' }] },
				{
					label: 'View',
					nodes: [
						{ title: 'Canvas renderer', note: 'Tiles, walkers, carts' },
						{ title: 'React panels', note: 'Palette, city readout' },
					],
				},
			],
		},
		differently: [
			'Write the game’s rules down as a spec before the first prompt. The agent was fastest when the rules were explicit, and slowest when it had to guess what “food reaches a house” meant.',
			'Start it in its own repo. It began inside a shared Nx workspace and had to be split out once it became a real project.',
		],
	},
];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
