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
  durationSeconds?: number
  videoDuration?: string
}

type BlockData = {
  tag?: string
  tags?: string[]
  title?: string
}

type Props = Partial<BlockData> & { data?: BlockData }

const API = process.env.NEXT_PUBLIC_SERVER_URL || ''
const POST_TAGS_FIELD = 'tags'

function extractThumbFromBlocks(post?: Post | null): string | undefined {
  const blocks = post?.blocks
  if (!Array.isArray(blocks)) return undefined
  for (const b of blocks) {
    try {
      const t = b?.blockType
      if (t === 'hero' && b?.image?.url) return b.image.url as string
      if (t === 'image' && b?.image?.url) return b.image.url as string
      if (t === 'gallery' && Array.isArray(b?.images) && b.images[0]?.image?.url)
        return b.images[0].image.url as string
      if (b?.image?.url) return b.image.url as string
    } catch (err) {
      console.warn('extractThumbFromBlocks: formato inesperado', b)
      continue
    }
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
  const diff = now.getTime() - d.getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)

  if (m < 60) return `Publicado hace ${m} ${m === 1 ? 'minuto' : 'minutos'}`
  if (h < 24) return `Publicado hace ${h} ${h === 1 ? 'hora' : 'horas'}`
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

function getExcerpt(p?: Post) {
  return p?.excerpt || p?.summary || p?.meta?.description || ''
}

function getDurationLabel(p?: Post) {
  if (!p) return ''
  if (p.videoDuration) return p.videoDuration
  if (typeof p.durationSeconds === 'number') {
    const mm = Math.floor(p.durationSeconds / 60)
    const ss = String(p.durationSeconds % 60).padStart(2, '0')
    return `${mm}:${ss}`
  }
  return ''
}

/**
 * Truncado multilinea a 2 renglones con ellipsis.
 */
const twoLineClamp: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

export default function SingleTagBlockComponent(props: Props) {
  const cfg = (props.data ?? (props as BlockData)) as BlockData | undefined

  const tagValue = useMemo(() => {
    if (cfg?.tag) return String(cfg.tag).trim()
    if (Array.isArray(cfg?.tags) && cfg!.tags.length) return String(cfg!.tags[0]).trim()
    return ''
  }, [cfg?.tag, cfg?.tags])

  const sectionTitle = useMemo(() => {
    if (cfg?.title) return cfg.title
    return tagValue || 'Sección'
  }, [cfg?.title, tagValue])

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const LIMIT = 5

  const buildParams = (sort: '-publishedAt' | '-createdAt') => {
    const qs = new URLSearchParams({ depth: '2', limit: String(LIMIT + 2), sort })
    qs.set(`where[and][0][status][equals]`, 'published')
    qs.set(`where[and][1][${POST_TAGS_FIELD}][contains]`, tagValue)
    return qs
  }

  useEffect(() => {
    if (!tagValue) return
    const run = async () => {
      setLoading(true)
      try {
        let res = await fetch(`${API}/api/posts?${buildParams('-publishedAt').toString()}`, {
          cache: 'no-store',
        })
        let data = await res.json()
        let docs: Post[] = data?.docs || []

        if (!docs.length) {
          res = await fetch(`${API}/api/posts?${buildParams('-createdAt').toString()}`, {
            cache: 'no-store',
          })
          data = await res.json()
          docs = data?.docs || []
        }

        const seen = new Set<string>()
        const uniq = docs.filter((d) => {
          if (!d?.id || seen.has(d.id)) return false
          seen.add(d.id)
          return true
        })

        setPosts(uniq.slice(0, LIMIT))
      } catch (e) {
        console.error(e)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [tagValue])

  if (loading || !tagValue || posts.length === 0) return null

  const center = posts[0]
  const leftBig = posts[1] ?? center
  const leftSmall = posts[2] ?? leftBig
  const rightBig = posts[3] ?? leftSmall
  const rightSmall = posts[4] ?? rightBig

  const thumb = (p?: Post | null) => extractThumbFromBlocks(p) || '/placeholder.jpg'
  const href = (p?: Post) => (p ? `/posts/${p.slug}` : '#')

  const Badge = ({ post }: { post?: Post }) => {
    const dur = getDurationLabel(post)
    const label = dur || formatRelativeEs(getPostDate(post))
    if (!label) return null
    return (
      <div className="absolute left-2 top-2 z-10 rounded-md bg-[rgba(0,0,0,0.7)] px-2 py-0.5 text-[12px] font-semibold text-white">
        {label}
      </div>
    )
  }

  return (
    <section className="px-4 md:px-8 mt-14">
      <div className="mx-auto max-w-[1220px]">
        <h2 className="mb-6 text-[clamp(24px,3vw,40px)] font-extrabold text-[#0e1f28] capitalize">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Izquierda (3/12) */}
          <div className="lg:col-span-3 space-y-6">
            <Link href={href(leftBig)} className="block no-underline group">
              <div className="relative overflow-hidden rounded-lg bg-[#e9eef2] shadow-sm transition-transform transform-gpu group-hover:scale-[1.01]">
                <div className="w-full h-[180px] sm:h-[200px]">
                  <img
                    src={thumb(leftBig)}
                    alt={leftBig.title}
                    className="h-full w-full object-cover"
                  />
                  {/*   <Badge post={leftBig} /> */}
                </div>
              </div>
              <h3
                className="mt-3 text-[18px] font-extrabold leading-snug text-[#0e1f28] hover:underline"
                style={twoLineClamp}
                title={leftBig.title}
              >
                {leftBig.title}
              </h3>
            </Link>

            <Link href={href(leftSmall)} className="mt-1 flex items-start gap-4 no-underline group">
              <div className="relative h-[72px] w-[128px] shrink-0 overflow-hidden rounded-md bg-[#e9eef2] shadow-sm">
                <img
                  src={thumb(leftSmall)}
                  alt={leftSmall.title}
                  className="h-full w-full object-cover"
                />
                {/* <Badge post={leftSmall} /> */}
              </div>
              <div className="min-w-0">
                <h4
                  className="text-[15px] font-semibold leading-snug text-[#0e1f28] group-hover:underline"
                  style={twoLineClamp}
                  title={leftSmall.title}
                >
                  {leftSmall.title}
                </h4>
                <div className="mt-1 text-xs text-[#6b7b85]">
                  {formatRelativeEs(getPostDate(leftSmall))}
                </div>
              </div>
            </Link>
          </div>

          {/* Centro (6/12) */}
          <div className="lg:col-span-6">
            <Link href={href(center)} className="block no-underline group">
              <div className="relative overflow-hidden rounded-lg bg-[#e9eef2] shadow-md transition-transform transform-gpu group-hover:scale-[1.01]">
                <div className="w-full h-[360px] sm:h-[420px]">
                  <img
                    src={thumb(center)}
                    alt={center.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge post={center} />
                </div>
              </div>
              <h3
                className="mt-4 text-[clamp(22px,2.6vw,34px)] font-extrabold leading-snug text-[#0e1f28]"
                style={twoLineClamp}
                title={center.title}
              >
                {center.title}
              </h3>
              {getExcerpt(center) ? (
                <p className="mt-2 text-[15px] leading-relaxed text-[#2a3a43] line-clamp-3">
                  {getExcerpt(center)}
                </p>
              ) : null}
            </Link>
          </div>

          {/* Derecha (3/12) */}
          <div className="lg:col-span-3 space-y-6">
            <Link href={href(rightBig)} className="block no-underline group">
              <div className="flex items-start gap-4">
                <div className="relative overflow-hidden rounded-lg bg-[#e9eef2] shadow-sm flex-shrink-0 w-[120px] sm:w-[140px] h-[84px] sm:h-[96px]">
                  <img
                    src={thumb(rightBig)}
                    alt={rightBig.title}
                    className="h-full w-full object-cover"
                  />
                  {/* <Badge post={rightBig} /> */}
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-[18px] font-extrabold leading-snug text-[#0e1f28] hover:underline"
                    style={twoLineClamp}
                    title={rightBig.title}
                  >
                    {rightBig.title}
                  </h3>
                  {getExcerpt(rightBig) ? (
                    <p className="mt-2 text-sm text-[#6b7b85]" style={twoLineClamp}>
                      {getExcerpt(rightBig)}
                    </p>
                  ) : (
                    <div className="mt-2 text-xs text-[#6b7b85]">
                      {formatRelativeEs(getPostDate(rightBig))}
                    </div>
                  )}
                </div>
              </div>
            </Link>

            <Link
              href={href(rightSmall)}
              className="mt-1 flex items-start gap-4 no-underline group"
            >
              <div className="relative h-[72px] w-[128px] shrink-0 overflow-hidden rounded-md bg-[#e9eef2] shadow-sm">
                <img
                  src={thumb(rightSmall)}
                  alt={rightSmall.title}
                  className="h-full w-full object-cover"
                />
                {/*  <Badge post={rightSmall} /> */}
              </div>
              <div className="min-w-0">
                <h4
                  className="text-[15px] font-semibold leading-snug text-[#0e1f28] hover:underline"
                  style={twoLineClamp}
                  title={rightSmall.title}
                >
                  {rightSmall.title}
                </h4>
                <div className="mt-1 text-xs text-[#6b7b85]">
                  {formatRelativeEs(getPostDate(rightSmall))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
