import type { Metadata } from 'next'
import React from 'react'
import { Frank_Ruhl_Libre } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { cn } from '@/utilities/ui'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { absoluteURL, getServerSideURL } from '@/utilities/getURL'
import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_TITLE_DEFAULT } from '@/utilities/site'

import HomeHighlights from '@/HomeHighlights/Component'
import './globals.css'

const frank = Frank_Ruhl_Libre({
  subsets: ['latin'],
  variable: '--font-frank',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(frank.variable, GeistSans.variable, GeistMono.variable)}
      lang={SITE_LOCALE}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsMediaOrganization',
              name: SITE_NAME,
              url: getServerSideURL(),
              description: SITE_DESCRIPTION,
              logo: {
                '@type': 'ImageObject',
                url: absoluteURL('/radarmex_profile.png'),
                width: 800,
                height: 800,
              },
              publishingPrinciples: absoluteURL('/terminos'),
            }),
          }}
        />
        <Providers>
          <Header />
          <HomeHighlights />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: SITE_TITLE_DEFAULT,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: '/logo.favico.ico', type: 'image/x-icon', sizes: 'any' }],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
