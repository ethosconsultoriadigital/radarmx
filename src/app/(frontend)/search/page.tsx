import type { Metadata } from 'next/types'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Search } from '@/search/Component'
import PageClient from './page.client'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  noStore()
  const { q: query } = await searchParamsPromise
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Construye el where para buscar en posts (no en "search")
  const where: any = query
    ? {
        or: [
          { title: { like: query } },
          { 'seo.metaDescription': { like: query } },
          { 'seo.metaTitle': { like: query } },
          { slug: { like: query } },
        ],
      }
    : {}

  // En producción (sin draftMode), filtra por publicados
  if (!draft) {
    where.and = Array.isArray(where.and) ? where.and : []
    where.and.push({ status: { equals: 'published' } })
  }

  const postsRes = await payload.find({
    collection: 'posts',
    where,
    // Trae campos necesarios para que tus tarjetas puedan extraer imagen desde blocks
    depth: 3, // si aún no ves imágenes, sube a 4
    limit: 12,
    sort: '-publishedAt',
    draft,
    overrideAccess: draft,
    // pagination: false para menor overhead si no necesitas totalDocs
    pagination: true,
    select: {
      id: true,
      slug: true,
      title: true,
      categories: true,
      seo: true,
      blocks: true,
      image: true,
      heroImage: true,
      // agrega otros campos si los usas en la tarjeta/listado
      publishedAt: true,
      createdAt: true,
    },
  })

  return (
    <div className="pb-20 pt-12 md:pb-24 md:pt-16">
      <PageClient />
      <div className="container mb-12 md:mb-16">
        <div className="prose prose-neutral max-w-none text-center dark:prose-invert">
          <h1 className="mb-8 font-serif text-3xl font-semibold tracking-tight text-foreground md:mb-10 md:text-4xl lg:mb-14">
            Search
          </h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {postsRes.totalDocs > 0 ? (
        <CollectionArchive posts={postsRes.docs as any} />
      ) : (
        <div className="container rounded-lg border border-dashed border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
          No results found.
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | Radar Mex`,
  }
}
