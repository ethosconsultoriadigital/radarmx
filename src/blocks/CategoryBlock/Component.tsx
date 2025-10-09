// blocks/CategoryBlock/Component.tsx
'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Category = { id: string; slug?: string; title?: string; color?: string }
type Post = {
  id: string
  title: string
  slug: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  categories?: (Category | string)[]
  blocks?: any[]
}

type BlockData = { category: Category | string }
type Props = Partial<BlockData> & { data?: BlockData }

const API = process.env.NEXT_PUBLIC_SERVER_URL || ''

function extractThumbFromBlocks(post?: Post | null): string | undefined {
  const blocks = post?.blocks
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

function getPostDate(p?: Partial<Post>) {
  return (
    p?.publishedAt || (p as any)?.publishDate || (p as any)?.date || p?.createdAt || p?.updatedAt
  )
}

export default function CategoryBlockComponent(props: Props) {
  // Soporta {...block} o data={block}
  const cfg = (props.data ?? (props as BlockData)) as BlockData | undefined
  const category = cfg?.category

  const catId = useMemo(() => {
    if (!category) return undefined
    return typeof category === 'string' ? category : category.id
  }, [category])

  const [catMeta, setCatMeta] = useState<Category | null>(
    typeof category === 'object' ? (category as Category) : null,
  )

  // Si no viene populada la categoría (solo ID), la consultamos para obtener title/slug
  useEffect(() => {
    const loadCat = async () => {
      if (!catId) return
      // Si ya tenemos título/slug, no hace falta pedirla
      if (catMeta?.id === catId && (catMeta.title || catMeta.slug)) return
      try {
        const r = await fetch(`${API}/api/categories/${catId}`, { cache: 'no-store' })
        if (r.ok) {
          const c = await r.json()
          setCatMeta(c)
        }
      } catch (e) {
        console.error(e)
      }
    }
    loadCat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId])

  const [leftPost, setLeftPost] = useState<Post | null>(null)
  const [rightPosts, setRightPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!catId) return
    const run = async () => {
      setLoading(true)
      try {
        // Trae 6: 1 para la izquierda + 5 para la derecha
        const qs1 = new URLSearchParams({
          'where[and][0][status][equals]': 'published',
          'where[and][1][categories][contains]': String(catId),
          depth: '2',
          limit: '6',
          sort: '-publishedAt',
        })
        let res = await fetch(`${API}/api/posts?${qs1.toString()}`, { cache: 'no-store' })
        let data = await res.json()
        let docs: Post[] = data?.docs || []

        if (!docs.length) {
          const qs2 = new URLSearchParams({
            'where[categories][contains]': String(catId),
            depth: '2',
            limit: '6',
            sort: '-createdAt',
          })
          res = await fetch(`${API}/api/posts?${qs2.toString()}`, { cache: 'no-store' })
          data = await res.json()
          docs = data?.docs || []
        }

        setLeftPost(docs[0] ?? null)
        setRightPosts(docs.slice(1, 6))
      } catch (e) {
        console.error(e)
        setLeftPost(null)
        setRightPosts([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [catId])

  if (loading || !catId || !leftPost) return null

  const sectionTitle = catMeta?.title || 'Categoría'
  const leftHref = `/posts/${leftPost.slug}`
  const leftThumb = extractThumbFromBlocks(leftPost) || '/placeholder.jpg'

  return (
    <section className="px-4 md:px-[20%] mt-14">
      <div className="mx-auto max-w-[1220px]">
        <h2 className="mb-4 text-[clamp(24px,3vw,40px)] font-extrabold text-[#0e1f28]  border-b-2 w-fit border-red-600">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Izquierda */}
          <div className="md:col-span-2">
            <Link href={leftHref} className="block no-underline">
              <div className="relative overflow-hidden rounded-xl bg-[#e9eef2]">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <img
                    src={leftThumb}
                    alt={leftPost.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <h3 className="mt-4 font-extrabold leading-[1.02] text-[clamp(22px,2.6vw,36px)] text-[#0e1f28]">
                {leftPost.title}
              </h3>
            </Link>
          </div>

          {/* Derecha */}
          <aside className="md:col-span-1">
            <div className="flex flex-col gap-6">
              {rightPosts.map((p) => {
                const thumb = extractThumbFromBlocks(p) || '/placeholder.jpg'
                const href = `/posts/${p.slug}`
                const date = getPostDate(p)

                return (
                  <article key={p.id} className="flex items-center gap-4">
                    <Link
                      href={href}
                      className="inline-block h-[72px] w-[110px] shrink-0 overflow-hidden rounded-md shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
                      title={p.title}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumb} alt={p.title} className="h-full w-full object-cover" />
                    </Link>

                    <div className="min-w-0">
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6c8b9a]">
                        {sectionTitle}
                      </div>

                      <Link
                        href={href}
                        className="block max-w-[28ch] truncate font-bold text-[#12313f] no-underline"
                        title={p.title}
                      >
                        {p.title}
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
          </aside>
        </div>
      </div>
    </section>
  )
}
