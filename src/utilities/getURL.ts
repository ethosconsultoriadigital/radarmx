import canUseDOM from './canUseDOM'

/**
 * Quita la barra final y garantiza un protocolo.
 * `NEXT_PUBLIC_SERVER_URL=https://www.radarmex.com/` producía
 * `https://www.radarmex.com//posts/...` en canonical, og:url, sitemaps y robots.
 */
export function normalizeSiteURL(
  input?: string | null,
  fallback = 'https://www.radarmex.com',
): string {
  const raw = (input || '').trim()
  if (!raw) return fallback
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/+$/, '')
}

export const getServerSideURL = () => {
  if (process.env.NEXT_PUBLIC_SERVER_URL?.trim()) {
    return normalizeSiteURL(process.env.NEXT_PUBLIC_SERVER_URL, 'http://localhost:3000')
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()) {
    return normalizeSiteURL(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  }

  return 'http://localhost:3000'
}

/** Une el origen del sitio con una ruta, sin barras duplicadas. */
export function absoluteURL(path = '/'): string {
  const base = getServerSideURL()
  if (!path || path === '/') return base
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized.replace(/\/{2,}/g, '/')}`
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeSiteURL(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  }

  return normalizeSiteURL(process.env.NEXT_PUBLIC_SERVER_URL, '')
}
