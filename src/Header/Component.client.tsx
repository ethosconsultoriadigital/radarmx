'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

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

  // Mobile menu state (igual que antes)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => setMobileOpen(false), [pathname])
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [mobileOpen])

  return (
    <div className="border-b border-solid">
      <header
        className="container relative z-30"
        {...(theme ? { 'data-theme': theme } : {})}
        role="banner"
      >
        <div className="py-4 md:py-8 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="sr-only">Inicio</span>
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Center (desktop): ahora usa HeaderNav que incluye Inicio + Categorías + navItems */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <HeaderNav data={data} categories={categories} showSearch={false} />
          </div>

          {/* Right: Search */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/search"
              className="inline-flex items-center p-1 rounded-md text-gray-700 hover:text-red-600"
            >
              <span className="sr-only">Buscar</span>
              <SearchIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-controls="mobile-navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex items-center justify-center rounded-md p-2 bg-white/90 shadow-sm border border-gray-200"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer (igual que antes) */}
      <div
        id="mobile-navigation"
        aria-hidden={!mobileOpen}
        className={clsx(
          'fixed inset-0 z-40 transition-opacity duration-200',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={clsx(
            'absolute inset-0 bg-black/40 transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={clsx(
            'absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-lg transform transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="h-full flex flex-col">
            <div className="px-4 py-4 flex items-center justify-between border-b">
              <Link href="/">
                <Logo />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded-md"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="px-4 py-4 overflow-auto">
              {/* Categorías (móvil) */}
              {categories.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Categorías
                  </div>
                  <ul className="flex flex-col gap-2">
                    {categories.map((cat) => {
                      const href = `/categoria/${cat.slug || cat.id}`
                      return (
                        <li key={cat.id}>
                          <Link
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-2 py-2 rounded-md text-gray-800 hover:bg-gray-50"
                          >
                            {cat.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Nav completo (móvil) */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Navegación</div>
                <HeaderNav data={data} showSearch={true} />
              </div>

              <div className="mt-auto pt-4 text-sm text-gray-500">
                © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
