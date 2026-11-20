import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE_URL, site } from '@/lib/site';

import './globals.css';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: { default: `${site.name}, ${site.role}`, template: `%s · ${site.name}` },
	description: site.description,
	authors: [{ name: site.name, url: SITE_URL }],
	openGraph: { type: 'website', siteName: site.name, locale: 'en_GB', url: '/' },
	twitter: { card: 'summary_large_image' },
	alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#0a0a0a', colorScheme: 'dark' };

export default function RootLayout({ children }: { children: ReactNode }) {
	const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

	return (
		<html lang="en-GB" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body className="flex min-h-dvh flex-col font-sans">
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
				>
					Skip to content
				</a>
				<SiteHeader />
				<main id="main" className="flex-1">
					{children}
				</main>
				<SiteFooter />
				{googleTagId && (
					<>
						<Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} strategy="afterInteractive" />
						<Script id="google-gtag-init" strategy="afterInteractive">
							{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleTagId}');`}
						</Script>
					</>
				)}
				<Analytics />
			</body>
		</html>
	);
}
