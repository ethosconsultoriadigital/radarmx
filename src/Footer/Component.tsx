import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="container py-10 md:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Link
            className="inline-flex max-w-xs items-center rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href="/"
          >
            <Logo />
          </Link>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
            {navItems.length > 0 && (
              <nav
                className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2"
                aria-label="Pie de página"
              >
                {navItems.map(({ link }, i) => {
                  return (
                    <CMSLink
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      key={i}
                      {...link}
                    />
                  )
                })}
              </nav>
            )}

            <div className="flex shrink-0 items-center gap-2 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:sr-only">
                Tema
              </span>
              <ThemeSelector />
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground md:text-left">
          Desarrollado por RadarMex · {year}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
