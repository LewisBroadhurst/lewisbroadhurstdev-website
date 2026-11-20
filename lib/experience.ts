/** The work timeline. Kept in step with the CV PDF in public/. */

export type Role = {
	company: string;
	title: string;
	start: string;
	end: string;
	summary: string;
	highlights: string[];
	stack: string[];
};

export const roles: Role[] = [
	{
		company: 'Citi',
		title: 'AVP, Application Developer',
		start: 'Nov 2025',
		end: 'Present',
		summary: 'Front-office FX and risk applications.',
		highlights: [
			'Introduced automated testing to a codebase that had none: architected the team’s Playwright framework, wrote most of the first suite and set the patterns the team now follows.',
			'Designed and built a shared component library to move the team’s FX applications onto an upgraded UI framework, and led its adoption across 15 engineers.',
			'Delivered features on a front-office risk application with Devin as an autonomous coding agent, scoping the work and reviewing every generated change before merge.',
			'Built the UI foundations for a Chat Blotter bringing Bloomberg messages into the trading application.',
		],
		stack: ['React', 'TypeScript', 'AG Grid', 'Zustand', 'Playwright'],
	},
	{
		company: 'Vanguard',
		title: 'Application Developer',
		start: 'Apr 2024',
		end: 'Nov 2025',
		summary: 'Portfolio management systems behind trillions in assets.',
		highlights: [
			'Replaced manual, error-prone sign-off, allocation and rebalancing with risk-controlled one-click tools, giving portfolio managers direct control of work that used to need an engineer.',
			'Built real-time Java 21 portfolio management systems used by portfolio managers globally.',
			'Designed and ran event-driven AWS infrastructure across multiple regions for fault-tolerant, low-latency trade data.',
		],
		stack: ['Java 21', 'AWS (SQS, SNS, AppSync, Lambda)', 'React', 'TypeScript'],
	},
	{
		company: 'Mahi Markets',
		title: 'Full Stack Developer',
		start: 'Dec 2022',
		end: 'Apr 2024',
		summary: 'FX trading technology for brokers and liquidity providers.',
		highlights: [
			'Designed and shipped information-dense trading interfaces (blotters, dashboards and analytics) for FX traders working with real-time data.',
			'Owned FIX adaptors and REST APIs in Java 17 from specification to production, including end-to-end connectivity testing with brokers and liquidity providers.',
			'Deployed and supported trading systems on AWS-hosted Linux: monitoring, log analysis and incident response.',
		],
		stack: ['React', 'TypeScript', 'Java 17', 'FIX', 'AWS', 'Linux'],
	},
];

export const education = [
	{ title: 'MChem, Chemistry', detail: 'University of Leeds, 2014–2019' },
	{ title: 'Certifications', detail: 'AWS Developer Associate · AWS Solutions Architect Associate · CFA Level I (Feb 2026) · CFI CMSA' },
];

export const skills = [
	{ group: 'AI-assisted development', items: 'Claude Code, Devin, Codex, agentic workflows' },
	{ group: 'Languages', items: 'TypeScript, JavaScript, Python, Java, SQL' },
	{ group: 'Frontend', items: 'React, Next.js, Vue, Zustand, AG Grid, Tailwind, component libraries, Playwright' },
	{
		group: 'Backend & infrastructure',
		items: 'AWS (Lambda, SQS, SNS, AppSync), Postgres, event-driven architecture, REST, FIX, Linux, CI/CD',
	},
];
