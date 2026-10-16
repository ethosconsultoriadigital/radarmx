import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

function revalidatePostSurfaces(slug: string | null | undefined) {
  if (slug) revalidatePath(`/posts/${slug}`)
  revalidatePath('/')
  revalidatePath('/posts')
  revalidateTag('posts-sitemap')
  revalidateTag('news-sitemap')
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      if (doc._status === 'published') {
        const path = `/posts/${doc.slug}`

        payload.logger.info(`Revalidating post at path: ${path}`)

        revalidatePostSurfaces(doc.slug)
      }

      // If the post was previously published, we need to revalidate the old path
      if (previousDoc?._status === 'published' && doc._status !== 'published') {
        const oldPath = `/posts/${previousDoc.slug}`

        payload.logger.info(`Revalidating old post at path: ${oldPath}`)

        revalidatePostSurfaces(previousDoc.slug)
      }
    } catch (error) {
      payload.logger.error({ err: error, msg: 'No se pudo revalidar la nota' })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    try {
      revalidatePostSurfaces(doc?.slug)
    } catch {
      // La revalidación no debe impedir borrar la nota.
    }
  }

  return doc
}
