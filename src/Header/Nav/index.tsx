'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import clsx from 'clsx'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{
  data: HeaderType
  categories?: { id: string; title: string; slug?: string }[]
  showSearch?: boolean
}> = ({ data, categories = [], showSearch = true }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const linkClass = (active?: boolean) =>
    clsx(
      'text-md transition-colors',
      active ? 'text-red-600 font-semibold' : 'text-gray-800 hover:text-red-600',
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
          className="inline-flex items-center p-1 rounded-md text-gray-700 hover:text-red-600"
        >
          <span className="sr-only">Buscar</span>
          <SearchIcon className="w-5 h-5" />
        </Link>
      )}
    </nav>
  )
}
