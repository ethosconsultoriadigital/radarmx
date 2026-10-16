import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Redirect } from '@/payload-types'

export async function getRedirects(depth = 1): Promise<Redirect[]> {
  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 500,
    pagination: false,
  })

  return redirects
}

/**
 * Dedup por request. No usa `unstable_cache`: envolver `getPayload` ahí
 * lanzaba en runtime (headers dentro del caché) y las URLs inexistentes
 * respondían 500 en lugar de llegar a `notFound()`.
 */
export const getCachedRedirects = cache(async (): Promise<Redirect[]> => {
  try {
    return await getRedirects()
  } catch (error) {
    console.error('No se pudieron cargar las redirecciones', error)
    return []
  }
})
