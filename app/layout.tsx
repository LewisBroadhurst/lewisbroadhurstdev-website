import {Metadata} from "next"
import {Inter} from 'next/font/google'
import React from "react"
import {Theme} from "@radix-ui/themes";

import './globals.css'
import "@radix-ui/themes/styles.css";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Lewis Broadhurst',
    description: 'Portfolio of Lewis Broadhurst',
}

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <Theme appearance='dark' accentColor='gold' grayColor='sand' panelBackground='translucent'>
            {children}
        </Theme>
        </body>
        </html>
    )
}