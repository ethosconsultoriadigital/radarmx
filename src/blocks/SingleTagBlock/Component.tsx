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
  // tolera también venir como array desde otro bloque
  tags?: string[]
  title?: string
}

type Props = Partial<BlockData> & { data?: BlockData }

const API = process.env.NEXT_PUBLIC_SERVER_URL || ''
const POST_TAGS_FIELD = 'tags'

// Helpers
function extractThumbFromBlocks(post?: Post | null): string | undefined {
  const blocks = post?.blocks
  if (!Array.isArray(blocks)) return undefined
  for (const b of blocks) {
    const t = b?.blockType
    if (t === 'hero' && b?.media?.url) return b.media.url as string
    if (t === 'image' && b?.image?.url) return b.image.url as string
    if (t === 'gallery' && Array.isArray(b?.images) && b.images[0]?.image?.url)
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

export default function SingleTagBlockComponent(props: Props) {
  const cfg = (props.data ?? (props as BlockData)) as BlockData | undefined

  // Acepta tag o bien la primera de un array tags
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

  // Queremos 5 posts (centro, izquierda big+mini, derecha big+mini)
  const LIMIT = 5

  // Build query params
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
        // 1) por publishedAt
        let res = await fetch(`${API}/api/posts?${buildParams('-publishedAt').toString()}`, {
          cache: 'no-store',
        })
        let data = await res.json()
        let docs: Post[] = data?.docs || []

        // 2) fallback por createdAt
        if (!docs.length) {
          res = await fetch(`${API}/api/posts?${buildParams('-createdAt').toString()}`, {
            cache: 'no-store',
          })
          data = await res.json()
          docs = data?.docs || []
        }

        // Únicos por id
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

  // Asignación por posición
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
      <div className="absolute left-2 top-2 rounded bg-[rgba(0,0,0,0.65)] px-2 py-0.5 text-[12px] font-semibold text-white">
        {label}
      </div>
    )
  }

  return (
    <section className="px-4 md:px-[20%] mt-14">
      <h2 className="mb-5 text-[clamp(24px,3vw,40px)] font-extrabold text-[#0e1f28]">
        {sectionTitle}
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Izquierda (3/12): grande + mini */}
        <div className="lg:col-span-3">
          {/* Grande */}
          <Link href={href(leftBig)} className="block no-underline">
            <div className="relative overflow-hidden rounded-lg bg-[#e9eef2]">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb(leftBig)}
                  alt={leftBig.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <Badge post={leftBig} />
              </div>
            </div>
            <h3 className="mt-3 text-[18px] font-extrabold leading-snug text-[#0e1f28] hover:underline">
              {leftBig.title}
            </h3>
          </Link>

          {/* Mini */}
          <Link href={href(leftSmall)} className="mt-6 flex items-start gap-4 no-underline">
            <div className="relative h-[72px] w-[128px] shrink-0 overflow-hidden rounded-md bg-[#e9eef2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb(leftSmall)}
                alt={leftSmall.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <Badge post={leftSmall} />
            </div>
            <div className="min-w-0">
              <h4 className="line-clamp-3 text-[15px] font-semibold leading-snug text-[#0e1f28] hover:underline">
                {leftSmall.title}
              </h4>
              <div className="mt-1 text-xs text-[#6b7b85]">
                {formatRelativeEs(getPostDate(leftSmall))}
              </div>
            </div>
          </Link>
        </div>

        {/* Centro (6/12): hero grande */}
        <div className="lg:col-span-6">
          <Link href={href(center)} className="block no-underline">
            <div className="relative overflow-hidden rounded-lg bg-[#e9eef2]">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb(center)}
                  alt={center.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <Badge post={center} />
              </div>
            </div>
            <h3 className="mt-4 text-[clamp(22px,2.6vw,34px)] font-extrabold leading-snug text-[#0e1f28]">
              {center.title}
            </h3>
            {getExcerpt(center) ? (
              <p className="mt-2 text-[15px] leading-relaxed text-[#2a3a43]">
                {getExcerpt(center)}
              </p>
            ) : null}
          </Link>
        </div>

        {/* Derecha (3/12): grande tipo “imagen izq + texto der” + mini */}
        <div className="lg:col-span-3">
          {/* Grande lado a lado */}
          <Link href={href(rightBig)} className="block no-underline">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg bg-[#e9eef2]">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb(rightBig)}
                    alt={rightBig.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <Badge post={rightBig} />
                </div>
              </div>
              <h3 className="text-[18px] font-extrabold leading-snug text-[#0e1f28] hover:underline">
                {rightBig.title}
              </h3>
            </div>
          </Link>

          {/* Mini */}
          <Link href={href(rightSmall)} className="mt-6 flex items-start gap-4 no-underline">
            <div className="relative h-[72px] w-[128px] shrink-0 overflow-hidden rounded-md bg-[#e9eef2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb(rightSmall)}
                alt={rightSmall.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <Badge post={rightSmall} />
            </div>
            <div className="min-w-0">
              <h4 className="line-clamp-3 text-[15px] font-semibold leading-snug text-[#0e1f28] hover:underline">
                {rightSmall.title}
              </h4>
              <div className="mt-1 text-xs text-[#6b7b85]">
                {formatRelativeEs(getPostDate(rightSmall))}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
