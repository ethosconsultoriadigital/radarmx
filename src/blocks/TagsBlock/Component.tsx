// blocks/TagsBlock/Component.tsx
'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Post = {
  id: string
  title: string
  slug: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  tags?: string[]
  excerpt?: string
  summary?: string
  meta?: { description?: string }
  blocks?: any[]
}

type BlockData = {
  tags: string[]
  matchMode?: 'any' | 'all'
  title?: string
  rightCount?: number
}
type Props = Partial<BlockData> & { data?: BlockData }

const API = process.env.NEXT_PUBLIC_SERVER_URL || ''
const POST_TAGS_FIELD = 'tags'

// Imagen desde blocks del post (ajusta a tu schema si tienes un campo thumbnail directo)
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
    (p as any)?.publishedAt ||
    (p as any)?.publishDate ||
    (p as any)?.date ||
    p?.createdAt ||
    p?.updatedAt
  )
}

function formatRelativeEs(dateISO?: string) {
  if (!dateISO) return ''
  const d = new Date(dateISO)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMs / 3600000)

  if (diffMin < 60) return `Publicado hace ${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'}`
  if (diffH < 24) return `Publicado hace ${diffH} ${diffH === 1 ? 'hora' : 'horas'}`
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

function getExcerpt(p?: Post) {
  return p?.excerpt || p?.summary || p?.meta?.description || ''
}

export default function TagsBlockComponent(props: Props) {
  // Soporta {...block} o data={block}
  const cfg = (props.data ?? (props as BlockData)) as BlockData | undefined
  const inputTags = (cfg?.tags || []).map((t) => String(t).trim()).filter(Boolean)
  const matchMode = cfg?.matchMode || 'any'
  const rightCount = Math.max(1, Number(cfg?.rightCount ?? 4)) // 4 para 2x2 en la derecha

  const [leftPost, setLeftPost] = useState<Post | null>(null)
  const [rightPosts, setRightPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const title = useMemo(() => {
    if (cfg?.title) return cfg.title
    if (!inputTags.length) return ''
    return inputTags.join(' · ')
  }, [cfg?.title, inputTags])

  // WHERE dinámico para un campo de texto hasMany en Posts (tags:string[])
  const buildParams = (sort: '-publishedAt' | '-createdAt', total: number) => {
    const p = new URLSearchParams({ depth: '2', limit: String(total), sort })
    p.set(`where[and][0][status][equals]`, 'published')
    if (matchMode === 'all') {
      inputTags.forEach((tag, i) => {
        p.set(`where[and][${i + 1}][${POST_TAGS_FIELD}][contains]`, tag)
      })
    } else {
      inputTags.forEach((tag, i) => {
        p.set(`where[and][1][or][${i}][${POST_TAGS_FIELD}][contains]`, tag)
      })
    }
    return p
  }

  useEffect(() => {
    if (!inputTags.length) return
    const run = async () => {
      setLoading(true)
      try {
        const total = 1 + rightCount

        // 1) más recientes por publishedAt
        let res = await fetch(`${API}/api/posts?${buildParams('-publishedAt', total).toString()}`, {
          cache: 'no-store',
        })
        let data = await res.json()
        let docs: Post[] = data?.docs || []

        // 2) fallback por createdAt
        if (!docs.length) {
          res = await fetch(`${API}/api/posts?${buildParams('-createdAt', total).toString()}`, {
            cache: 'no-store',
          })
          data = await res.json()
          docs = data?.docs || []
        }

        setLeftPost(docs[0] ?? null)
        setRightPosts(docs.slice(1, total))
      } catch (e) {
        console.error(e)
        setLeftPost(null)
        setRightPosts([])
      } finally {
        setLoading(false)
      }
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTags.join('|'), matchMode, rightCount])

  if (loading || !inputTags.length || !leftPost) return null

  const leftHref = `/posts/${leftPost.slug}`
  const leftThumb = extractThumbFromBlocks(leftPost) || '/placeholder.jpg'
  const leftDate = getPostDate(leftPost)

  return (
    <section className="px-4 md:px-[20%] mt-14">
      {title ? (
        <h2 className="mb-5 text-[clamp(22px,3.2vw,44px)] font-extrabold leading-tight text-[#0e1f28]">
          {title}
        </h2>
      ) : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* IZQUIERDA: Hero grande (2/3) */}

        {/* DERECHA: Grid 2x2 de tarjetas (4 items). Si rightCount > 4, se seguirán listando en grid. */}
        <aside className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {rightPosts.map((p) => {
              const thumb = extractThumbFromBlocks(p) || '/placeholder.jpg'
              const href = `/posts/${p.slug}`
              const date = getPostDate(p)

              return (
                <article key={p.id}>
                  <Link href={href} className="block no-underline">
                    <div className="relative overflow-hidden rounded-lg bg-[#e9eef2]">
                      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumb}
                          alt={p.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <h4 className="mt-3 text-[17px] font-extrabold leading-snug text-[#0e1f28] hover:underline">
                      {p.title}
                    </h4>

                    <div className="mt-1 text-xs text-[#6b7b85]">{formatRelativeEs(date)}</div>
                  </Link>
                </article>
              )
            })}
          </div>
        </aside>
        <div className="lg:col-span-2">
          <Link href={leftHref} className="block no-underline">
            <div className="relative overflow-hidden rounded-lg bg-[#e9eef2]">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={leftThumb}
                  alt={leftPost.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <h3 className="mt-4 text-[clamp(26px,3.2vw,40px)] font-extrabold leading-snug text-[#0e1f28]">
              {leftPost.title}
            </h3>

            {/* Subtítulo/Resumen */}
            {getExcerpt(leftPost) ? (
              <p className="mt-3 text-[15px] leading-relaxed text-[#2a3a43]">
                {getExcerpt(leftPost)}
              </p>
            ) : null}

            {/* Fecha relativa */}
            <div className="mt-3 text-sm text-[#6b7b85]">{formatRelativeEs(leftDate)}</div>
          </Link>
        </div>
      </div>
    </section>
  )
}
