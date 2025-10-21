import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

type PageProps = {
  params: Promise<{ slug: string }>
}

function truncate(str: string, max = 120) {
  if (!str) return ''
  const s = str.trim()
  if (s.length <= max) return s
  return s.slice(0, Math.max(0, max - 1)).trimEnd() + '…'
}

function getDescriptionFromBlocks(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ''
  for (const b of blocks) {
    if (b?.blockType === 'richText') {
      const text = extractTextFromLexical(b?.data?.root)
      if (text) return text
    }
  }
  for (const b of blocks) {
    if (b?.blockType === 'quote' && typeof b?.text === 'string' && b.text.trim()) {
      return b.text
    }
  }
  return ''
}

function extractTextFromLexical(node: any): string {
  if (!node) return ''
  let out = ''
  const visit = (n: any) => {
    if (!n) return
    if (n.type === 'text' && typeof n.text === 'string') {
      out += (out ? ' ' : '') + n.text
    }
    if (Array.isArray(n.children)) {
      for (const c of n.children) visit(c)
    }
  }
  visit(node)
  return out.trim()
}

// Misma estructura que pediste: hero → (gallery primer item)
function extractThumbFromBlocks(post?: { blocks?: any[] } | null): string | undefined {
  const blocks = post?.blocks
  if (!Array.isArray(blocks)) return undefined
  for (const b of blocks) {
    const t = b?.blockType
    if (t === 'hero' && b?.image?.url) return b.image.url as string
    if (t === 'gallery' && Array.isArray(b?.images)) {
      const first = b.images[0]
      if (first?.image?.url) return first.image.url as string
    }
    // continúa al siguiente bloque si no hubo match
  }
  return undefined
}

export default async function CategoryPage({ params }: PageProps) {
  noStore()
  const payload = await getPayload({ config: payloadConfig })
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params

  const page = 1
  const limit = 10

  // Buscar categoría por slug
  const catRes = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft,
    overrideAccess: draft,
    pagination: false,
  })
  if (!catRes.docs?.length) notFound()
  const category = catRes.docs[0] as any

  // Posts por categoría (sin cache, SSR, con preview)
  const where: any = { categories: { contains: category.id } }
  if (!draft) {
    // Filtrar a publicados cuando no es preview
    where.status = { equals: 'published' }
  }

  const postsRes = await payload.find({
    collection: 'posts',
    where,
    sort: '-publishedAt',
    depth: 3, // traer Media en blocks
    limit,
    page,
    draft,
    overrideAccess: draft,
  })

  const { docs: posts, hasNextPage, hasPrevPage, totalDocs, totalPages } = postsRes

  const buildPageHref = (newPage: number) => {
    const sp = new URLSearchParams()
    if (newPage > 1) sp.set('page', String(newPage))
    sp.set('limit', String(limit))
    const qs = sp.toString()
    return `/categoria/${slug}${qs ? `?${qs}` : ''}`
  }

  const formatDate = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })
      : null

  return (
    <main className="container py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Categoría: {category.title}</h1>
        <p className="text-sm text-gray-600 mt-2">
          {totalDocs} resultado{totalDocs === 1 ? '' : 's'}
          {totalPages > 1 && ` • Página ${page} de ${totalPages}`}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-600">No hay publicaciones en esta categoría.</p>
      ) : (
        <>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => {
              const href = `/posts/${post.slug || post.id}`

              // Primero: blocks (hero → gallery)
              const imgFromBlocks = extractThumbFromBlocks(post)

              // Fallbacks simples si no hay imagen en blocks
              const hero = post?.heroImage || post?.image || null
              const fallbackUrl = hero?.url

              const imgUrl = imgFromBlocks || fallbackUrl
              const imgAlt = (hero?.alt as string) || post.title || 'Imagen'

              const title = truncate(post.title || '', 80)
              const rawDesc =
                (typeof post.excerpt === 'string' && post.excerpt) ||
                getDescriptionFromBlocks(post?.blocks) ||
                ''
              const description = truncate(rawDesc, 160)

              // publishedAt con fallback a createdAt
              const published = formatDate(post?.publishedAt) || formatDate(post?.createdAt)

              return (
                <li
                  key={post.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition bg-white flex flex-col"
                >
                  {imgUrl && (
                    <a href={href}>
                      <img src={imgUrl} alt={imgAlt} className="w-full h-48 object-cover" />
                    </a>
                  )}

                  <div className="p-4 flex-1 flex flex-col">
                    <a
                      href={href}
                      className="text-lg font-semibold hover:text-red-600 line-clamp-2"
                    >
                      {title}
                    </a>

                    {published && (
                      <p className="mt-1 text-xs text-gray-500">Publicado: {published}</p>
                    )}

                    {description && (
                      <p className="mt-2 text-sm text-gray-700 line-clamp-3">{description}</p>
                    )}

                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((t: string) => (
                          <span
                            key={t}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-3">
              <a
                aria-disabled={!hasPrevPage}
                href={hasPrevPage ? buildPageHref(page - 1) : undefined}
                className={`px-4 py-2 border rounded ${
                  hasPrevPage ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                ← Anterior
              </a>

              <span className="text-sm text-gray-600">
                Página {page} de {totalPages}
              </span>

              <a
                aria-disabled={!hasNextPage}
                href={hasNextPage ? buildPageHref(page + 1) : undefined}
                className={`px-4 py-2 border rounded ${
                  hasNextPage ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                Siguiente →
              </a>
            </nav>
          )}
        </>
      )}
    </main>
  )
}
