function normalizeSiteURL(input, fallback) {
  const raw = (input || '').trim()
  if (!raw) return fallback
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/+$/, '')
}

const SITE_URL = normalizeSiteURL(
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL,
  'https://www.radarmex.com',
)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/news-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/news-sitemap.xml`,
    ],
  },
}
