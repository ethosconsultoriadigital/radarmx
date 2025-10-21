'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import type { Post } from '@/payload-types'

export type CardPostData = Pick<Post, 'id' | 'slug' | 'title' | 'categories' | 'seo'>

type Props = {
  alignItems?: 'center'
  className?: string
  doc: Post
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}

// Misma estructura solicitada: hero → (gallery primer item)
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
  }
  return undefined
}

export const Card: React.FC<Props> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo = 'posts', showCategories, title: titleFromProps } = props

  const { slug, categories, title, seo } = doc || {}
  const { metaDescription } = seo || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = metaDescription?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  // Imagen desde blocks (hero → gallery) con fallback simple
  const imgFromBlocks = extractThumbFromBlocks(doc)
  const hero = (doc as any)?.heroImage || (doc as any)?.image || null
  const fallbackUrl = hero?.url
  const imgUrl = imgFromBlocks || fallbackUrl
  const imgAlt = (hero?.alt as string) || titleToUse || 'Imagen'

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer min-w-[250px]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        <img
          src={imgUrl}
          alt={imgAlt}
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            <div>
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category) {
                  const categoryTitle = (category as any).title || 'Untitled category'
                  const isLast = index === categories.length - 1
                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }
                return null
              })}
            </div>
          </div>
        )}

        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {metaDescription && (
          <div className="mt-2">
            <p>{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
