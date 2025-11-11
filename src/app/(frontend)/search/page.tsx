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
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {postsRes.totalDocs > 0 ? (
        // Pásale los posts reales (no docs de "search") para que la Card/ PostCard
        // pueda usar extractThumbFromBlocks en blocks
        <CollectionArchive posts={postsRes.docs as any} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Search`,
  }
}
