'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Header as HeaderBase } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import clsx from 'clsx'

export interface Category {
  id: string
  title: string
  slug?: string
}

export interface HeaderExtended extends HeaderBase {
  categories?: Category[]
}

interface HeaderClientProps {
  data: HeaderExtended
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  const categories: Category[] = data?.categories || []

  const isActive = (href: string) => {
    // marca activo si coincide exactamente o si es un prefijo (opcional)
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <div className="border-b border-solid">
      <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="py-8 flex justify-between items-center gap-6">
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>

          {categories.length > 0 && (
            <ul className="flex items-center gap-4">
              {categories.map((cat) => {
                const href = `/categoria/${cat.slug || cat.id}`
                const active = isActive(href)
                return (
                  <li key={cat.id}>
                    <Link href={href} className="group block">
                      <div
                        className={clsx(
                          'text-md transition-colors',
                          // color de texto en hover/activo (opcional)
                          active ? 'text-red-600' : 'text-gray-800 group-hover:text-red-600',
                        )}
                      >
                        {cat.title}
                      </div>
                      <div
                        className={clsx(
                          'mt-1 h-[2px] w-full transition-all duration-200',
                          active ? 'bg-red-600' : 'bg-transparent group-hover:bg-red-600',
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}

          <nav className="flex items-center gap-4">
            <HeaderNav data={data} />
          </nav>
        </div>
      </header>
    </div>
  )
}
