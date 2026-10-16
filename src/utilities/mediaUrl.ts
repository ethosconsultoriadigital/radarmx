import { Media } from '@/payload-types'
import { getMediaUrl } from './getMediaUrl'

type MediaLike = Pick<Media, 'filename' | 'url'> | string | number | null | undefined

/** Prefiere el filename (clave real en GCS) sobre la ruta interna `/api/media/file`. */
export const mediaUrl = (m?: MediaLike) => {
  if (!m || typeof m === 'number') return undefined
  if (typeof m === 'string') {
    const url = getMediaUrl(m)
    return url || undefined
  }
  const url = getMediaUrl(m.filename || m.url)
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
