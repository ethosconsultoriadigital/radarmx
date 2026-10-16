import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface Props {
  disableNotFound?: boolean
  url: string
}

function publicPath(
  relationTo: 'pages' | 'posts' | undefined,
  slug: string | null | undefined,
): string | null {
  if (!slug) return null
  if (relationTo === 'posts') return `/posts/${slug}`
  if (slug === 'home') return '/'
  return `/${slug}`
}

async function resolveReference(
  reference:
    | {
        relationTo: 'pages' | 'posts'
        value: number | Page | Post
      }
    | null
    | undefined,
): Promise<string | null> {
  if (!reference) return null

  if (typeof reference.value === 'object') {
    return publicPath(reference.relationTo, reference.value?.slug)
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const document = await payload.findByID({
      collection: reference.relationTo,
      id: reference.value,
      depth: 0,
      disableErrors: true,
    })
    return publicPath(reference.relationTo, document?.slug)
  } catch {
    return null
  }
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()
  const redirectItem = redirects.find((item) => item.from === url)

  if (redirectItem) {
    const customUrl = redirectItem.to?.url
    if (customUrl && customUrl !== url) {
      redirect(customUrl === '/home' ? '/' : customUrl)
    }

    const referenceUrl = await resolveReference(redirectItem.to?.reference)
    if (referenceUrl && referenceUrl !== url) redirect(referenceUrl)
  }

  if (disableNotFound) return null

  notFound()
}
