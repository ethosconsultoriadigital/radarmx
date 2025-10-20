import Link from 'next/link'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

// Si quieres forzar esto a SSR desde el segmento (page/layout), añade allí:
// export const dynamic = 'force-dynamic'
// export const revalidate = 0
// export const runtime = 'nodejs'

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

async function getHomeHighlightsData() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Lee el global con depth=2 para resolver relaciones
  const g = (await payload.findGlobal({
    slug: 'home-highlights',
    depth: 2,
    draft,
  })) as GlobalConfig | null

  const cfg: GlobalConfig | null = g ?? null
  const cols = (cfg?.columns || []).slice(0, 4)

  const items: { post: PostDoc; category?: Category; thumb?: string; date?: string }[] = []

  for (const col of cols) {
    if (!col) {
      items.push(undefined as any)
      continue
    }

    // Modo: post manual
    if (col.mode === 'manualPost' && col.post) {
      let post: PostDoc | null = null

      if (typeof col.post === 'object') {
        post = col.post as PostDoc
      } else {
        // Si vino como ID
        try {
          const byId = await payload.findByID({
            collection: 'posts',
            id: String(col.post),
            draft,
            depth: 2,
          })
          post = byId as unknown as PostDoc
        } catch {
          post = null
        }
      }

      if (post) {
        const cat =
          (Array.isArray(post.categories) && (post.categories[0] as Category)) || undefined
        const thumb = extractThumbFromBlocks(post.blocks) || '/placeholder.jpg'
        const date = col.dateOverride || getPostDate(post)
        items.push({ post, category: cat, thumb, date })
      } else {
        items.push(undefined as any)
      }
      continue
    }

    // Modo: último por categoría
    if (col.mode === 'latestByCategory' && col.category) {
      const catId =
        typeof col.category === 'object' ? (col.category as Category).id : String(col.category)

      // Filtra por status publicado y categoría
      const res = await payload.find({
        collection: 'posts',
        draft,
        depth: 2,
        limit: 1,
        sort: '-publishedAt',
        where: {
          and: [
            { status: { equals: 'published' } },
            // Para relaciones (array), equals suele funcionar; si tu schema requiere, cambia a { in: [catId] }
            { categories: { equals: catId } },
          ],
        },
      })

      const post = res.docs?.[0] as unknown as PostDoc | undefined
      if (post) {
        const cat = typeof col.category === 'object' ? (col.category as Category) : undefined
        const thumb = extractThumbFromBlocks(post.blocks) || '/placeholder.jpg'
        const date = col.dateOverride || getPostDate(post)
        items.push({ post, category: cat, thumb, date })
      } else {
        items.push(undefined as any)
      }
      continue
    }

    items.push(undefined as any)
  }

  while (items.length < 4) items.push(undefined as any)

  // Background
  let bgUrl: string | undefined
  if (cfg?.background && typeof cfg.background === 'object') {
    bgUrl = (cfg.background as Media).url
  }

  return { cfg, items, bgUrl }
}

export default async function HomeHighlights() {
  // Garantiza que no se cachee el resultado de este componente
  noStore()

  const { cfg, items, bgUrl } = await getHomeHighlightsData()
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
                  className="flex items-start gap-4 md:flex-row md:items-center md:gap-4"
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
