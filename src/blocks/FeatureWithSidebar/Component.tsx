'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Category = { id: string; slug?: string; title?: string }
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
  return p?.publishedAt || p?.createdAt || p?.updatedAt
}

/**
 * Estilos inline para truncado multilinea a 2 renglones con ellipsis.
 * (Evita depender del plugin `line-clamp` de Tailwind.)
 */
const twoLineClamp: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

export default function FeatureWithSidebarComponent() {
  const [leftPost, setLeftPost] = useState<Post | null>(null)
  const [rightPosts, setRightPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const qs1 = new URLSearchParams({
          'where[status][equals]': 'published',
          depth: '2',
          limit: '5',
          sort: '-publishedAt',
        })
        let res = await fetch(`${API}/api/posts?${qs1.toString()}`, { cache: 'no-store' })
        let data = await res.json()
        let docs: Post[] = data?.docs || []

        if (!docs.length) {
          const qs2 = new URLSearchParams({
            depth: '2',
            limit: '5',
            sort: '-createdAt',
          })
          res = await fetch(`${API}/api/posts?${qs2.toString()}`, { cache: 'no-store' })
          data = await res.json()
          docs = data?.docs || []
        }

        if (docs.length) {
          setLeftPost(docs[0])
          setRightPosts(docs.slice(1, 5))
        } else {
          setLeftPost(null)
          setRightPosts([])
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return null
  if (!leftPost) return null

  const leftTitle = leftPost.title
  const leftUrl = `/posts/${leftPost.slug}`
  const leftImage = extractThumbFromBlocks(leftPost) || '/placeholder.jpg'

  return (
    <section className="px-4 md:px-8">
      <div className="mx-auto max-w-[1220px]">
        <h2 className="mb-4 text-[clamp(24px,3vw,40px)] font-extrabold text-[#0e1f28] border-b-2 w-fit border-red-600">
          Recientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Izquierda: hero (2/3 en md+) */}
          <div className="md:col-span-2">
            <Link href={leftUrl} className="block no-underline">
              <div className="relative overflow-hidden rounded-xl bg-[#e9eef2]">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leftImage}
                    alt={leftTitle}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Aplicamos truncado multilinea a 2 lineas */}
              <h2
                className="mt-4 font-extrabold leading-[1.02] text-[clamp(28px,3.2vw,56px)] text-[#0e1f28]"
                style={twoLineClamp}
                title={leftTitle}
              >
                {leftTitle}
              </h2>
            </Link>
          </div>

          {/* Derecha: lista de 4 recientes (1/3 en md+, abajo en mobile) */}
          <aside className="md:col-span-1">
            <div className="flex flex-col gap-6">
              {rightPosts.map((post) => {
                const thumb = extractThumbFromBlocks(post) || '/placeholder.jpg'
                const href = `/posts/${post.slug}`
                const date = getPostDate(post)

                return (
                  <article key={post.id} className="flex items-center gap-4">
                    <Link
                      href={href}
                      className="inline-block h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
                      title={post.title}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumb} alt={post.title} className="h-full w-full object-cover" />
                    </Link>

                    <div className="min-w-0">
                      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.3px] text-[#6c8b9a]">
                        Recientes
                      </div>

                      {/* Título de la lista: máximo 2 renglones */}
                      <Link
                        href={href}
                        className="block max-w-[28ch] font-bold text-[#12313f] no-underline"
                        title={post.title}
                        style={twoLineClamp}
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
          </aside>
        </div>
      </div>
    </section>
  )
}
