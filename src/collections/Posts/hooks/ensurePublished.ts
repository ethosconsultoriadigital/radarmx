import type { CollectionAfterChangeHook, CollectionBeforeChangeHook } from 'payload'

import type { Post } from '@/payload-types'

/**
 * El importador y el API crean notas con el campo editorial `status: 'published'`
 * (etiqueta «Publicado») pero, con `versions.drafts`, Payload deja `_status` en
 * `draft` si el cuerpo no trae `_status: 'published'`. Esas notas salen en la
 * portada (filtra `status`) y responden 404 en `/posts/[slug]` (filtra `_status`).
 * `publishedAt` tampoco se rellenaba: el hook `populatePublishedAt` solo está en Pages.
 */
export const ensurePublishedBeforeChange: CollectionBeforeChangeHook<Post> = ({
  data,
  originalDoc,
  operation,
}) => {
  if (!data || (operation !== 'create' && operation !== 'update')) return data

  const hasStatus = Object.prototype.hasOwnProperty.call(data, 'status')
  const hasWorkflow = Object.prototype.hasOwnProperty.call(data, '_status')
  const incomingStatus = hasStatus ? data.status : undefined
  const incomingWorkflow = hasWorkflow ? data._status : undefined

  // «Publicado» manda sobre un autosave en draft. El botón Publicar de Payload
  // (`_status: published`) también publica y alinea el campo editorial.
  // Borrador solo despublica si no viene un _status published en la misma escritura.
  const explicitDraft = incomingStatus === 'draft' && incomingWorkflow !== 'published'
  const shouldPublish =
    !explicitDraft && (incomingStatus === 'published' || incomingWorkflow === 'published')
  const shouldUnpublish = !shouldPublish && (explicitDraft || incomingWorkflow === 'draft')

  if (shouldPublish) {
    data.status = 'published'
    data._status = 'published'
    if (!data.publishedAt && !originalDoc?.publishedAt) {
      data.publishedAt = new Date().toISOString()
    }
  } else if (shouldUnpublish) {
    data.status = 'draft'
    data._status = 'draft'
  }

  return data
}

/**
 * Respaldo: si el sistema de drafts vuelve a guardar la nota como draft
 * después de `beforeChange`, la publicamos en un segundo write.
 */
export const ensurePublishedAfterChange: CollectionAfterChangeHook<Post> = async ({
  doc,
  req,
  context,
}) => {
  if (context.syncingPublication) return doc
  if (doc.status !== 'published') return doc
  if (doc._status === 'published' && doc.publishedAt) return doc

  try {
    await req.payload.update({
      collection: 'posts',
      id: doc.id,
      draft: false,
      overrideAccess: true,
      context: {
        ...context,
        syncingPublication: true,
      },
      data: {
        status: 'published',
        _status: 'published',
        publishedAt: doc.publishedAt || new Date().toISOString(),
      },
    })
  } catch (error) {
    req.payload.logger.error({
      err: error,
      msg: 'No se pudo publicar la nota marcada como Publicado',
    })
  }

  return doc
}
