import type { MetadataRoute } from 'next';

import { projects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = ['', '/experience', '/how-i-build', '/work-with-me', ...projects.map(p => `/projects/${p.slug}`)];
	return paths.map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: 'weekly', priority: path === '' ? 1 : 0.7 }));
}
