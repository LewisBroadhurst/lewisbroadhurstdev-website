import { ogContentType, ogSize, shareImage } from '@/lib/og';

export const alt = 'Lewis Broadhurst, full-stack product engineer';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return shareImage({
		eyebrow: 'Portfolio',
		title: 'Lewis Broadhurst',
		subtitle: 'Trading and portfolio tools at Citi, Vanguard and Mahi Markets. Founder-engineer of StratDeck.',
	});
}
