import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  const payload = await getPayload({ config: configPromise })

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = (await Promise.all(
        selectedDocs.map(async (post) => {
          if (typeof post.value === 'number') return Promise.resolve({})

          const res = await payload.findByID({
            collection: 'posts',
            id: (post.value as Post).id,
            select: {
              id: true,
              slug: true,
              seo: true,
              title: true,
              categories: true,
              publishedAt: true,
              tags: true,
            },
          })
          return res
        }),
      )) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="h-full w-full py-4" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-12 md:mb-16">
          <RichText
            className="ms-0 max-w-[48rem] prose-headings:font-serif"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
