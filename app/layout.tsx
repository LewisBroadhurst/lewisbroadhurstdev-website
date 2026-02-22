import {Metadata} from "next"
import {Inter} from 'next/font/google'
import React from "react"
import {Theme} from "@radix-ui/themes";

import './globals.css'
import "@radix-ui/themes/styles.css";
import Script from "next/script";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Lewis Broadhurst',
    description: 'Portfolio of Lewis Broadhurst',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID

    return (
        <html lang="en">
        <body className={inter.className}>
        <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleTagId}');
          `}
        </Script>
        <Theme appearance='dark' accentColor='gold' grayColor='sand' panelBackground='translucent'>
            {children}
        </Theme>
        </body>
        </html>
    )
}