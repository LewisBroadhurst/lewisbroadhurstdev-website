import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{ source: '/cv', destination: '/experience', permanent: true },
			{ source: '/projects', destination: '/#projects', permanent: true },
			{ source: '/blog', destination: '/', permanent: true },
			{ source: '/mentorship', destination: '/work-with-me', permanent: true },
			{ source: '/learn-english', destination: '/work-with-me', permanent: true },
		];
	},
};

export default nextConfig;
