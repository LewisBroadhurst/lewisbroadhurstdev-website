export const SITE_URL = 'https://lewisbroadhurst-dev.vercel.app';

export const site = {
	name: 'Lewis Broadhurst',
	role: 'Full-stack product engineer',
	location: 'London',
	/** The one line under the name on the home page. */
	headline:
		'Full-stack product engineer in London, building trading and portfolio tools at Citi, and shipping my own products on the side.',
	description:
		'Lewis Broadhurst: full-stack product engineer in London. Four years of trading and portfolio tools at Citi, Vanguard and Mahi Markets, and the founder-engineer of StratDeck.',
	cvPath: '/Lewis_Broadhurst_CV.pdf',
	links: {
		github: 'https://github.com/LewisBroadhurst',
		linkedin: 'https://www.linkedin.com/in/lewis-broadhurst/',
		youtube: 'https://www.youtube.com/channel/UCv8iDXiyBoaNRtPmFt-fOYw',
		medium: 'https://medium.com/@lewis1broadhurst',
	},
};

export const nav = [
	{ href: '/#projects', label: 'Projects', match: '/projects' },
	{ href: '/experience', label: 'Experience', match: '/experience' },
	{ href: '/how-i-build', label: 'How I build', match: '/how-i-build' },
] as const;
