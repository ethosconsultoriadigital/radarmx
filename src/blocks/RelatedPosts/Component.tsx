// blocks/RelatedPosts/Component.tsx
import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Media, Post } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { mediaUrl } from '@/utilities/mediaUrl'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import dayjs from 'dayjs'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

// Helper mínimo para resolver string | Media a URL
function toUrl(val: unknown): string | undefined {
  if (!val) return undefined
  if (typeof val === 'string') return getMediaUrl(val) || val
  if (typeof val === 'object') {
    const m = val as Media
    return mediaUrl(m) || getMediaUrl((m as any)?.url) || (m as any)?.url
  }
  return undefined
}

// MISMA ESTRUCTURA/ORDEN que tu función, pero resolviendo relaciones Media
export function extractThumbFromBlocks(post?: Post | null): string | undefined {
  const blocks = post?.blocks
  if (!Array.isArray(blocks)) return undefined

  for (const b of blocks as any[]) {
    try {
      if (!b) continue
      const t = b?.blockType

      // hero
      if (t === 'hero') {
        // tu versión original revisaba b.image.url directamente; aquí resolvemos Media/string
        const heroUrl =
          toUrl(b?.image) || toUrl(b?.image?.image) || (b?.image?.url as string | undefined)
        if (heroUrl) return heroUrl
      }

      // image
      if (t === 'image') {
        const imageUrl = toUrl(b?.image) || (b?.image?.url as string | undefined)
        if (imageUrl) return imageUrl
      }

      // gallery (primer elemento)
      if (t === 'gallery' && Array.isArray(b?.images)) {
        const first = b.images[0]
        const galUrl =
          toUrl(first?.image) || toUrl(first) || (first?.image?.url as string | undefined)
        if (galUrl) return galUrl
      }

      // fallback genérico
      if (b?.image?.url || b?.image) {
        const anyUrl = toUrl(b?.image) || (b?.image?.url as string | undefined)
        if (anyUrl) return anyUrl
      }
    } catch {
      continue
    }
  }

  return undefined
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('w-full', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 gap-4 md:gap-8 items-stretch">
        {docs?.map((post, index) => {
          if (!post || typeof post === 'string') return null

          // 1) blocks (hero/image/gallery) usando tu función
          const fromBlocks = extractThumbFromBlocks(post)

          // 2) SEO (openGraph / jsonld) como respaldo
          const og = post.seo?.openGraph?.ogImage as Media | undefined
          const jsonldImage = post.seo?.jsonld?.image as unknown
          let fromSEO: string | undefined =
            (og && (mediaUrl(og) || getMediaUrl((og as any)?.url))) || undefined
          if (!fromSEO) {
            if (Array.isArray(jsonldImage)) {
              for (const it of jsonldImage) {
                const u = toUrl(it)
                if (u) {
                  fromSEO = u
                  break
                }
              }
            } else {
              fromSEO = toUrl(jsonldImage)
            }
          }

          // 3) Campos directos comunes
          const fromDirect = toUrl((post as any)?.heroImage) || toUrl((post as any)?.image)

          const imgSrc = fromBlocks || fromSEO || fromDirect || '/placeholder.jpg'
          const href = `/posts/${post.slug}`
          const dateLabel = dayjs(post.publishedAt || post.createdAt).format('MMMM DD, YYYY')

          return (
            <article key={post.id ?? index} className="flex gap-4">
              <a href={href} className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="border object-cover object-center w-[100%]"
                  src={imgSrc}
                  alt={post.title}
                  loading="lazy"
                />
              </a>
              <div className="flex flex-col">
                <a href={href} className="text-sm font-bold line-clamp-2 hover:underline">
                  {post.title}
                </a>
                <span className="text-xs">{dateLabel}</span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
