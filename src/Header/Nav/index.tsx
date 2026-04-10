'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import clsx from 'clsx'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{
  data: HeaderType
  categories?: { id: string; title: string; slug?: string }[]
  showSearch?: boolean
}> = ({ data, categories = [], showSearch = true }) => {
  void data?.navItems
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const linkClass = (active?: boolean) =>
    clsx(
      'text-sm md:text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
      active
        ? 'text-primary font-semibold'
        : 'text-foreground/85 hover:text-primary',
    )

  return (
    <nav className="flex items-center gap-6" aria-label="Header navigation">
      {/* Inicio (único) */}
      <Link href="/" className={linkClass(isActive('/'))}>
        Inicio
      </Link>

      {/* Separador opcional (puedes quitarlo si no lo deseas) */}
      {/* Categorías */}
      {categories.length > 0 && (
        <div className="flex items-center gap-4">
          {categories.map((cat) => {
            const href = `/categoria/${cat.slug || cat.id}`
            return (
              <Link key={cat.id} href={href} className={linkClass(isActive(href))}>
                {cat.title}
              </Link>
            )
          })}
        </div>
      )}

      {/* Otros navItems (CMSLink) */}
      {/*    <div className="flex items-center gap-3">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
      </div> */}

      {showSearch && (
        <Link
          href="/search"
          className="inline-flex items-center rounded-md p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="sr-only">Buscar</span>
          <SearchIcon className="h-5 w-5" aria-hidden />
        </Link>
      )}
    </nav>
  )
}
