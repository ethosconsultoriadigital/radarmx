'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { getPostImage } from '@/utilities/getPostImage'

export type CardPostData = Pick<Post, 'id' | 'slug' | 'title' | 'categories' | 'seo'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc: Post
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, title, seo } = doc || {}
  const { metaDescription } = seo || {}
  const jsonldImg = getPostImage(doc)

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = metaDescription?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer min-w-[250px]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!jsonldImg && <div className="">No image</div>}
        {jsonldImg && <img src={jsonldImg} className="aspect-video w-full object-cover" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

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
            )}
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
          <div className="mt-2">{metaDescription && <p>{sanitizedDescription}</p>}</div>
        )}
      </div>
    </article>
  )
}
