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
    <div className="border-b border-border bg-background/90 shadow-sm shadow-foreground/5 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <header
        className="container relative z-30"
        {...(theme ? { 'data-theme': theme } : {})}
        role="banner"
      >
        <div className="flex items-center justify-between gap-4 py-4 md:gap-6 md:py-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 rounded-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
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
              className="inline-flex items-center rounded-md p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="sr-only">Buscar</span>
              <SearchIcon className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-controls="mobile-navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="inline-flex items-center justify-center rounded-md border border-border bg-card p-2 text-foreground shadow-sm transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            'absolute inset-0 bg-foreground/25 transition-opacity dark:bg-foreground/40',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={clsx(
            'absolute right-0 top-0 h-full w-full max-w-xs transform border-l border-border bg-card text-card-foreground shadow-xl transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Link href="/">
                <Logo />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
                            className="block rounded-md px-2 py-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Navegación
                </div>
                <HeaderNav data={data} showSearch={true} />
              </div>

              <div className="mt-auto border-t border-border pt-4 text-sm text-muted-foreground">
                © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
