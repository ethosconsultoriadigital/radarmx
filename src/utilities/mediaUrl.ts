import { Media } from '@/payload-types'
import { getMediaUrl } from './getMediaUrl'

type MediaLike = Pick<Media, 'filename' | 'url'> | string | number | null | undefined

/**
 * Una URL absoluta guardada (GCS histórico o R2 nuevo) se respeta.
 * El filename solo reconstruye GCS cuando no hay URL absoluta: así una nota
 * vieja sin `url` sigue apuntando al bucket anterior.
 */
export const mediaUrl = (m?: MediaLike) => {
  if (!m || typeof m === 'number') return undefined
  if (typeof m === 'string') {
    const url = getMediaUrl(m)
    return url || undefined
  }
  const stored = m.url?.trim()
  const source = stored && /^https?:\/\//i.test(stored) ? stored : m.filename || stored
  const url = getMediaUrl(source)
  return url || undefined
}

/** Imagen para Open Graph: tamaño `og` si existe, si no el original. */
export const publicMediaUrl = (m?: Media | number | string | null): string | undefined => {
  if (!m || typeof m === 'number') return undefined
  if (typeof m === 'string') return mediaUrl(m)
  const og = m.sizes?.og
  return mediaUrl({
    filename: og?.filename || m.filename,
    url: og?.url || m.url,
  })
}
