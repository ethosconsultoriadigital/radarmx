import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { absoluteURL } from '@/utilities/getURL'
import { NEWS_PUBLICATION_NAME } from '@/utilities/site'

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const getNewsSitemapXml = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()

    const results = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      sort: '-publishedAt',
      where: {
        and: [{ _status: { equals: 'published' } }, { publishedAt: { greater_than_equal: since } }],
      },
      select: {
        title: true,
        slug: true,
        publishedAt: true,
        createdAt: true,
      },
    })

    const urls = (results.docs || [])
      .filter((post) => Boolean(post.slug && post.title))
      .map((post) => {
        const published = post.publishedAt || post.createdAt
        const date = published ? new Date(published).toISOString() : new Date().toISOString()
        return `  <url>
    <loc>${xmlEscape(absoluteURL(`/posts/${post.slug}`))}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(NEWS_PUBLICATION_NAME)}</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${xmlEscape(date)}</news:publication_date>
      <news:title>${xmlEscape(post.title)}</news:title>
    </news:news>
  </url>`
      })
      .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`
  },
  ['news-sitemap'],
  {
    tags: ['news-sitemap'],
    revalidate: 60,
  },
)

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const xml = await getNewsSitemapXml()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
