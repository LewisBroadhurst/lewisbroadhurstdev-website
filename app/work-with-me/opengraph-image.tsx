import { ogContentType, ogSize, shareImage } from '@/lib/og';

export const alt = 'Work with Lewis Broadhurst';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return shareImage({
		eyebrow: 'Work with me',
		title: 'Mentoring, lessons and websites',
		subtitle: 'A small amount of outside work, by arrangement.',
	});
}
