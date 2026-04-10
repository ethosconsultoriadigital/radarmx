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

  const imgFromBlocks = extractThumbFromBlocks(doc)
  const hero = (doc as any)?.heroImage || (doc as any)?.image || null
  const fallbackUrl = hero?.url
  const imgUrl = imgFromBlocks || fallbackUrl
  const imgAlt = (hero?.alt as string) || titleToUse || 'Imagen'

  return (
    <article
      className={cn(
        'group flex min-h-full min-w-[250px] cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-card transition-shadow duration-200 hover:shadow-card-hover',
        className,
      )}
      ref={card.ref}
    >
      <Link
        href={href}
        className="relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={imgAlt}
            className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div
            className="aspect-[16/10] w-full bg-gradient-to-br from-muted to-muted/60"
            aria-hidden
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        {showCategories && hasCategories && (
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
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
          <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
            <Link
              className="not-prose text-inherit no-underline transition-colors hover:text-primary"
              href={href}
              ref={link.ref}
            >
              {titleToUse}
            </Link>
          </h3>
        )}

        {metaDescription && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
