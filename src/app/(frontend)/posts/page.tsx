import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <main className="pb-20 pt-12 md:pb-24 md:pt-16">
      <PageClient />
      <div className="container mb-10 border-b border-border pb-10 md:mb-12 md:pb-12">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <h1 className="mb-0 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Posts
          </h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          className="text-sm text-muted-foreground"
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs as any} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Posts | Radar Mex`,
  }
}
