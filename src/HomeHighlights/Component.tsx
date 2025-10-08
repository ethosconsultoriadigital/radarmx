'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Media = { url?: string; alt?: string }
type Category = { id: string; title?: string; slug?: string; color?: string }
type PostDoc = {
  id: string
  title: string
  slug: string
  status?: 'draft' | 'published'
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  // Si tienes campos de fecha personalizados en tu schema, añade aquí también:
  publishDate?: string
  date?: string
  categories?: (Category | string)[]
  blocks?: any[]
}

type ColumnCfg = {
  mode: 'latestByCategory' | 'manualPost'
  category?: Category | string
  post?: PostDoc | string
  dateOverride?: string
}

type GlobalConfig = {
  title?: string
  background?: Media | string
  columns?: ColumnCfg[]
}

const API = process.env.NEXT_PUBLIC_SERVER_URL || ''

function extractThumbFromBlocks(blocks?: any[]): string | undefined {
  if (!Array.isArray(blocks)) return undefined
  for (const b of blocks) {
    const t = b?.blockType
    if (t === 'hero' && b?.image?.url) return b.image.url as string
    /* if (t === 'image' && b?.image?.url) return b.image.url as string
    if (t === 'gallery' && Array.isArray(b?.images) && b.images[0]?.image?.url) */
    return b.images[0].image.url as string
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

export default function HomeHighlights() {
  const [cfg, setCfg] = useState<GlobalConfig | null>(null)
  const [items, setItems] = useState<
    { post: PostDoc; category?: Category; thumb?: string; date?: string }[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const g: GlobalConfig = await fetch(`${API}/api/globals/home-highlights?depth=2`, {
          cache: 'no-store',
        }).then((r) => r.json())
        setCfg(g)

        const cols = (g?.columns || []).slice(0, 4)
        const out: { post: PostDoc; category?: Category; thumb?: string; date?: string }[] = []

        for (const col of cols) {
          if (col?.mode === 'manualPost' && col.post && typeof col.post === 'object') {
            const post = col.post as PostDoc
            const cat =
              (Array.isArray(post.categories) && (post.categories[0] as Category)) || undefined
            const thumb = extractThumbFromBlocks(post.blocks) || '/placeholder.jpg'
            const date = col.dateOverride || getPostDate(post)
            out.push({ post, category: cat, thumb, date })
            continue
          }

          if (col?.mode === 'latestByCategory' && col.category) {
            const catId =
              typeof col.category === 'object'
                ? (col.category as Category).id
                : String(col.category)

            const qs = new URLSearchParams({
              'where[and][0][status][equals]': 'published',
              'where[and][1][categories][contains]': String(catId),
              depth: '2',
              limit: '1',
              sort: '-publishedAt',
            })

            const res = await fetch(`${API}/api/posts?${qs.toString()}`, { cache: 'no-store' })
            const data = await res.json()
            const post: PostDoc | undefined = data?.docs?.[0]

            if (post) {
              const cat = typeof col.category === 'object' ? (col.category as Category) : undefined
              const thumb = extractThumbFromBlocks(post.blocks) || '/placeholder.jpg'
              const date = col.dateOverride || getPostDate(post)
              out.push({ post, category: cat, thumb, date })
            } else {
              out.push(undefined as any)
            }
          } else {
            out.push(undefined as any)
          }
        }

        while (out.length < 4) out.push(undefined as any)
        setItems(out)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  const bgUrl = useMemo(() => {
    if (!cfg?.background) return undefined
    return typeof cfg.background === 'object' && (cfg.background as Media).url
      ? (cfg.background as Media).url
      : undefined
  }, [cfg])

  if (loading) return <div style={{ height: 220 }} />
  if (!cfg) return null

  return (
    <section
      aria-label={cfg.title || 'Recientes'}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        background: bgUrl
          ? `url(${bgUrl}) center/cover no-repeat`
          : 'linear-gradient(180deg, rgba(141,211,232,0.45) 0%, rgba(207,230,240,0.55) 100%)',
      }}
    >
      <div
        style={{
          backdropFilter: 'saturate(120%) blur(1px)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 100%)',
        }}
      >
        <div className="mx-auto max-w-none md:max-w-[1220px] px-4 py-7">
          <div className="flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-8 md:items-center">
            {items.slice(0, 4).map((item, idx) => {
              if (!item) return <div key={idx} className="h-[72px]" />

              const { post, category, thumb, date } = item
              const catSlug = category?.slug || (category?.id ? String(category.id) : '')
              const href = catSlug ? `/${catSlug}/${post.slug}` : `/posts/${post.slug}`

              return (
                <article
                  key={`${post.id}-${idx}`}
                  className="flex  items-start gap-4 md:flex-row md:items-center md:gap-4"
                >
                  <Link
                    href={href}
                    className="inline-block shrink-0 overflow-hidden rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] w-[72px] h-[72px]"
                  >
                    <img
                      src={thumb}
                      alt={post.title}
                      width={72}
                      height={72}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="min-w-0">
                    <div className="mb-1 text-[11px] tracking-[0.3px] text-[#6c8b9a] uppercase font-semibold">
                      Recientes
                      {category?.title ? (
                        <>
                          <span className="mx-[6px]">·</span>
                          <span
                            className="text-[#4f8ea3]"
                            style={{ color: category.color || '#4f8ea3' }}
                          >
                            {category.title}
                          </span>
                        </>
                      ) : null}
                    </div>

                    <Link
                      href={href}
                      title={post.title}
                      className="block text-[#12313f] font-bold no-underline truncate max-w-[28ch]"
                    >
                      {post.title}
                    </Link>

                    <div className="mt-1 text-xs text-[#6b7b85]">
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
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
