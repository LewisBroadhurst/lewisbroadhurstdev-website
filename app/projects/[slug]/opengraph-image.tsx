import { getProject, projects } from '@/lib/projects';
import { ogContentType, ogSize, shareImage } from '@/lib/og';

export const alt = 'Project case study by Lewis Broadhurst';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
	return projects.map(p => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const project = getProject((await params).slug);
	return shareImage({ eyebrow: 'Case study', title: project?.name ?? 'Projects', subtitle: project?.tagline });
}
