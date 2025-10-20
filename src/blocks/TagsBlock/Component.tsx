import Link from 'next/link'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { CSSProperties } from 'react'

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

const POST_TAGS_FIELD = 'tags'

// Imagen desde blocks del post (ajusta a tu schema si tienes un campo thumbnail directo)
function extractThumbFromBlocks(post?: Post | null): string | undefined {
  const blocks = post?.blocks
  if (!Array.isArray(blocks)) return undefined
  for (const b of blocks) {
    try {
      if (!b) continue
      const t = b?.blockType
      if (t === 'hero' && b?.image?.url) return b.image.url as string
      if (t === 'image' && b?.image?.url) return b.image.url as string
      if (t === 'gallery' && Array.isArray(b?.images)) {
        const first = b.images[0]
        if (first?.image?.url) return first.image.url as string
      }
      if (b?.image?.url) return b.image.url as string
    } catch {
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

/**
 * Truncado multilinea a 2 renglones con ellipsis (compatible).
 */
const twoLineClamp: CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

async function getPostsByTags(inputTags: string[], matchMode: 'any' | 'all', total: number) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const tagClauses = inputTags.map((tag) => ({
    [POST_TAGS_FIELD]: { contains: tag },
  }))

  const where: any = { and: [] as any[] }
  if (!draft) where.and.push({ status: { equals: 'published' } })

  if (matchMode === 'all') {
    // Debe contener TODOS los tags
    where.and.push(...tagClauses)
  } else {
    // Debe contener AL MENOS uno
    where.and.push({ or: tagClauses })
  }

  // 1) publishedAt desc
  const res1 = await payload.find({
    collection: 'posts',
    draft,
    depth: 2,
    limit: total,
    sort: '-publishedAt',
    overrideAccess: draft,
    where,
  })

  let docs = (res1.docs || []) as unknown as Post[]

  // 2) fallback createdAt desc
  if (!docs.length) {
    const res2 = await payload.find({
      collection: 'posts',
      draft,
      depth: 2,
      limit: total,
      sort: '-createdAt',
      overrideAccess: draft,
      where,
    })
    docs = (res2.docs || []) as unknown as Post[]
  }

  return docs
}

export default async function TagsBlockComponent(props: Props) {
  // Evita caché en este render
  noStore()

  // Soporta {...block} o data={block}
  const cfg = (props.data ?? (props as BlockData)) as BlockData | undefined
  const inputTags = (cfg?.tags || []).map((t) => String(t).trim()).filter(Boolean)
  const matchMode = (cfg?.matchMode || 'any') as 'any' | 'all'
  const rightCount = Math.max(1, Number(cfg?.rightCount ?? 4))
  const total = 1 + rightCount

  if (!inputTags.length) return null

  const title = cfg?.title || inputTags.join(' · ')
  const docs = await getPostsByTags(inputTags, matchMode, total)
  const leftPost = docs[0] ?? null
  const rightPosts = docs.slice(1, total)

  if (!leftPost) return null

  const leftHref = `/posts/${leftPost.slug}`
  const leftThumb = extractThumbFromBlocks(leftPost) || '/placeholder.jpg'
  const leftDate = getPostDate(leftPost)

  return (
    <section className="px-4 md:px-8 mt-14">
      <div className="mx-auto max-w-[1220px]">
        {title ? (
          <h2 className="mb-5 text-[clamp(22px,3.2vw,44px)] font-extrabold leading-tight text-[#0e1f28] capitalize">
            {title}
          </h2>
        ) : null}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
                        <div className="relative w-full h-[140px] sm:h-[120px] lg:h-[100px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={thumb}
                            alt={p.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                      </div>

                      <h4
                        className="mt-3 text-[17px] font-extrabold leading-snug text-[#0e1f28] hover:underline"
                        style={twoLineClamp}
                        title={p.title}
                      >
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

              <h3
                className="mt-4 text-[clamp(26px,3.2vw,40px)] font-extrabold leading-snug text-[#0e1f28]"
                style={twoLineClamp}
                title={leftPost.title}
              >
                {leftPost.title}
              </h3>

              {getExcerpt(leftPost) ? (
                <p className="mt-3 text-[15px] leading-relaxed text-[#2a3a43] line-clamp-3">
                  {getExcerpt(leftPost)}
                </p>
              ) : null}

              <div className="mt-3 text-sm text-[#6b7b85]">{formatRelativeEs(leftDate)}</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
