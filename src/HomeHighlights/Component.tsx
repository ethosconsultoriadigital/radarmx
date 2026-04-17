import Link from 'next/link'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { cn } from '@/utilities/ui'

type Media = { url?: string; alt?: string }
type PostDoc = {
  id: string
  title: string
  slug: string
  status?: 'draft' | 'published'
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  publishDate?: string
  date?: string
  blocks?: any[]
}

type GlobalCfg = {
  title?: string | null
  background?: Media | string | number | null
  count?: number | null
}

function extractThumbFromBlocks(blocks?: any[]): string | undefined {
  if (!Array.isArray(blocks)) return undefined
  for (const b of blocks) {
    if (!b) continue
    const t = b?.blockType
    if (t === 'hero' && b?.image?.url) return b.image.url as string
    if (t === 'image' && b?.image?.url) return b.image.url as string
    if (t === 'gallery' && Array.isArray(b?.images) && b.images[0]?.image?.url) {
      return b.images[0].image.url as string
    }
  }
  return undefined
}

function getPostDate(post?: Partial<PostDoc>): string | undefined {
  return (
    post?.publishedAt ||
    (post as any)?.publishDate ||
    (post as any)?.date ||
    post?.createdAt ||
    post?.updatedAt ||
    undefined
  )
}

async function getRecentPosts(): Promise<{
  title: string
  bgUrl?: string
  posts: PostDoc[]
}> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const g = (await payload.findGlobal({
    slug: 'home-highlights',
    depth: 2,
    draft,
  })) as GlobalCfg | null

  const title = (g?.title ?? 'Recientes').trim() || 'Recientes'
  const rawCount = typeof g?.count === 'number' ? g.count : 4
  const count = Math.min(4, Math.max(2, rawCount))

  let bgUrl: string | undefined
  if (g?.background && typeof g.background === 'object') {
    bgUrl = (g.background as Media).url
  }

  const res = await payload.find({
    collection: 'posts',
    draft,
    depth: 2,
    limit: count,
    sort: '-publishedAt',
    ...(draft
      ? {}
      : {
          where: {
            status: { equals: 'published' },
          },
        }),
  })

  const posts = (res.docs || []) as PostDoc[]

  return { title, bgUrl, posts }
}

export default async function HomeHighlights() {
  noStore()

  const { title, bgUrl, posts } = await getRecentPosts()

  if (posts.length === 0) {
    return null
  }

  return (
    <section
      aria-label={title}
      className={cn(
        'relative overflow-hidden rounded-b-lg border-x border-b border-border/60',
        !bgUrl &&
          'bg-gradient-to-br from-primary/[0.07] via-muted/60 to-accent/25 dark:from-primary/15 dark:via-card/80 dark:to-background',
      )}
      style={
        bgUrl
          ? {
              backgroundImage: `url(${bgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="bg-gradient-to-b from-background/90 via-background/78 to-background/92 backdrop-blur-[1px] dark:from-background/95 dark:via-background/88 dark:to-background">
        <div className="container py-8 md:py-10">
          <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>

          <ul className="flex flex-col divide-y divide-border border-t border-border">
            {posts.map((post) => {
              const thumb = extractThumbFromBlocks(post.blocks) || '/placeholder.jpg'
              const date = getPostDate(post)
              const href = `/posts/${post.slug}`

              return (
                <li key={post.id}>
                  <article className="flex gap-4 py-6 first:pt-0 last:pb-0 md:gap-6 md:py-8">
                    <Link
                      href={href}
                      className="inline-block h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-border/70 shadow-card transition-shadow hover:shadow-card-hover md:h-20 md:w-20"
                    >
                      <img
                        src={thumb}
                        alt=""
                        role="presentation"
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={href}
                        title={post.title}
                        className="block font-serif text-lg font-bold leading-snug text-foreground no-underline transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-xl"
                      >
                        {post.title}
                      </Link>

                      <div className="mt-2 text-sm text-muted-foreground">
                        {date
                          ? new Date(date).toLocaleDateString('es-MX', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })
                          : ''}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
