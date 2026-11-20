import { ogContentType, ogSize, shareImage } from '@/lib/og';

export const alt = 'How Lewis Broadhurst builds with Claude Code';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return shareImage({
		eyebrow: 'How I build',
		title: 'A product’s worth of output, from one engineer',
		subtitle: 'Specs, parallel Claude Code sessions, a pull request per feature, CI that decides.',
	});
}
