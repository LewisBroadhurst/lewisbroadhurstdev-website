import { ogContentType, ogSize, shareImage } from '@/lib/og';

export const alt = 'Lewis Broadhurst: experience';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return shareImage({
		eyebrow: 'Experience',
		title: 'Citi · Vanguard · Mahi Markets',
		subtitle: 'Four years building tools for traders and portfolio managers.',
	});
}
