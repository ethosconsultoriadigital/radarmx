import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { absoluteURL } from '@/utilities/getURL'

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const dateFallback = new Date().toISOString()
    const docs: { slug?: string | null; updatedAt?: string | null }[] = []
    let page = 1

    while (page <= 20) {
      const results = await payload.find({
        collection: 'posts',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 500,
        page,
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

      docs.push(...results.docs)
      if (!results.hasNextPage) break
      page += 1
    }

    return docs
      .filter((post) => Boolean(post?.slug))
      .map((post) => ({
        loc: absoluteURL(`/posts/${post.slug}`),
        lastmod: post.updatedAt || dateFallback,
      }))
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
    revalidate: 60,
  },
)

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
