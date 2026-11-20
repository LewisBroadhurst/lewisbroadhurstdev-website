import { ImageResponse } from 'next/og';

/** Share cards in StratDeck's minimal look: dark, one green glow, hairlines, calm type. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const BG = '#0a0a0a';
const FG = '#f5f5f5';
const SUBTLE = '#a3a3a3';
const MUTED = '#737373';
const BRAND = '#34d399';
const HAIRLINE = 'rgba(255,255,255,0.10)';

export function shareImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
	return new ImageResponse(
		<div style={{ width: '100%', height: '100%', display: 'flex', background: BG, position: 'relative', fontFamily: 'sans-serif' }}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: 1200,
					height: 630,
					display: 'flex',
					backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(52,211,153,0.20) 0%, rgba(52,211,153,0.07) 30%, rgba(10,10,10,0) 60%)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 48,
					left: 48,
					right: 48,
					bottom: 48,
					border: `1px solid ${HAIRLINE}`,
					borderRadius: 24,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: 56,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12, color: SUBTLE, fontSize: 24 }}>
					<div style={{ width: 10, height: 10, borderRadius: 9999, background: BRAND }} />
					{eyebrow}
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
					<div style={{ fontSize: title.length > 40 ? 56 : 72, fontWeight: 600, color: FG, letterSpacing: -2, lineHeight: 1.05 }}>
						{title}
					</div>
					{subtitle && <div style={{ fontSize: 28, color: SUBTLE, lineHeight: 1.35, maxWidth: 940 }}>{subtitle}</div>}
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between', color: MUTED, fontSize: 22 }}>
					<span>Lewis Broadhurst</span>
					<span>Full-stack product engineer · London</span>
				</div>
			</div>
		</div>,
		ogSize,
	);
}
