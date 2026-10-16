import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { absoluteURL } from '@/utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const dateFallback = new Date().toISOString()

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const defaultSitemap = [
      {
        loc: absoluteURL('/search'),
        lastmod: dateFallback,
      },
      {
        loc: absoluteURL('/posts'),
        lastmod: dateFallback,
      },
      {
        loc: absoluteURL('/terminos'),
        lastmod: dateFallback,
      },
      {
        loc: absoluteURL('/privacidad'),
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? absoluteURL('/') : absoluteURL(`/${page?.slug}`),
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
    revalidate: 60,
  },
)

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
