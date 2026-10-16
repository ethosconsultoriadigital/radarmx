import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SITE_DESCRIPTION } from '@/utilities/site'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug: requestedSlug } = await paramsPromise

  // La portada vive en `/`. `/home` no es una URL pública.
  if (requestedSlug === 'home') {
    notFound()
  }

  const slug = requestedSlug || 'home'
  const url = slug === 'home' ? '/' : `/${slug}`

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = page

  return (
    <main className="pb-20 pt-8 md:pb-24 md:pt-12">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {slug === 'home' ? (
        <div className="container mb-8 md:mb-10">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Radar Mex
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {SITE_DESCRIPTION}
          </p>
        </div>
      ) : null}

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug: requestedSlug } = await paramsPromise
  if (requestedSlug === 'home') {
    notFound()
  }

  const slug = requestedSlug || 'home'
  const page = await queryPageBySlug({
    slug,
  })

  if (!page && requestedSlug) {
    return {
      title: 'Página no encontrada | Radar Mex',
      robots: { index: false, follow: false },
    }
  }

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
