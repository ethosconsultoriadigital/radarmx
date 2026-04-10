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

function toUrl(val: unknown): string | undefined {
  if (!val) return undefined
  if (typeof val === 'string') return getMediaUrl(val) || val
  if (typeof val === 'object') {
    const m = val as Media
    return mediaUrl(m) || getMediaUrl((m as any)?.url) || (m as any)?.url
  }
  return undefined
}

export function extractThumbFromBlocks(post?: Post | null): string | undefined {
  const blocks = post?.blocks
  if (!Array.isArray(blocks)) return undefined

  for (const b of blocks as any[]) {
    try {
      if (!b) continue
      const t = b?.blockType

      if (t === 'hero') {
        const heroUrl =
          toUrl(b?.image) || toUrl(b?.image?.image) || (b?.image?.url as string | undefined)
        if (heroUrl) return heroUrl
      }

      if (t === 'image') {
        const imageUrl = toUrl(b?.image) || (b?.image?.url as string | undefined)
        if (imageUrl) return imageUrl
      }

      if (t === 'gallery' && Array.isArray(b?.images)) {
        const first = b.images[0]
        const galUrl =
          toUrl(first?.image) || toUrl(first) || (first?.image?.url as string | undefined)
        if (galUrl) return galUrl
      }

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
      {introContent && (
        <div className="mb-8 md:mb-10">
          <RichText
            className="prose-headings:font-serif"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
        {docs?.map((post, index) => {
          if (!post || typeof post === 'string') return null

          const fromBlocks = extractThumbFromBlocks(post)

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

          const fromDirect = toUrl((post as any)?.heroImage) || toUrl((post as any)?.image)

          const imgSrc = fromBlocks || fromSEO || fromDirect || '/placeholder.jpg'
          const href = `/posts/${post.slug}`
          const dateLabel = dayjs(post.publishedAt || post.createdAt).format('D MMM YYYY')

          return (
            <article
              key={post.id ?? index}
              className="group flex gap-4 overflow-hidden rounded-lg border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-card-hover md:gap-5 md:p-4"
            >
              <a
                href={href}
                className="relative block h-24 w-28 shrink-0 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-28 md:w-36"
              >
                <img
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  src={imgSrc}
                  alt=""
                  loading="lazy"
                />
              </a>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <a
                  href={href}
                  className="line-clamp-2 font-serif text-base font-semibold leading-snug text-foreground transition-colors hover:text-primary"
                >
                  {post.title}
                </a>
                <span className="mt-1 text-xs text-muted-foreground">{dateLabel}</span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
