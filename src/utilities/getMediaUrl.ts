/**
 * URL pública de un archivo en el bucket de Google Cloud Storage.
 *
 * Payload guarda `url` como `/api/media/file/<archivo>`. Anteponer el host del
 * bucket producía `https://storage.googleapis.com/payload-radarmex//api/media/file/...`.
 * Esa clave no existe: GCS responde AccessDenied (403) en lugar de 404 cuando
 * no hay permiso de listado. El objeto real es `https://storage.googleapis.com/<bucket>/<filename>`
 * y hoy responde 200 si el objeto se subió con lectura pública.
 *
 * Si un objeto concreto sigue en 403 después de esta corrección, el bucket
 * `payload-radarmex` necesita lectura pública. Con uniform bucket-level access
 * el `acl: 'Public'` del plugin se ignora: hay que dar a `allUsers` el rol
 * `roles/storage.objectViewer` sobre el bucket. Con ACLs finos, los objetos
 * nuevos ya se suben como públicos (`acl: 'Public'` en el plugin).
 */
const DEFAULT_BUCKET = 'payload-radarmex'

export function getGcsBaseUrl(): string {
  const bucket = (process.env.GCS_BUCKET || DEFAULT_BUCKET).trim() || DEFAULT_BUCKET
  return `https://storage.googleapis.com/${bucket}`
}

function collapseDuplicateSlashes(url: string): string {
  return url.replace(/([^:]\/)\/+/g, '$1')
}

function filenameFromMediaPath(value: string): string | null {
  const withoutQuery = value.split('?')[0] || ''
  const apiMatch = withoutQuery.match(/\/api\/media\/file\/(.+)$/)
  const raw = apiMatch?.[1] ?? (withoutQuery.startsWith('/') ? '' : withoutQuery)
  if (!raw) return null
  try {
    return decodeURIComponent(raw).replace(/^\/+/, '')
  } catch {
    return raw.replace(/^\/+/, '')
  }
}

export function toPublicMediaUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    const normalized = collapseDuplicateSlashes(trimmed)
    if (/\/api\/media\/file\//.test(normalized)) {
      const filename = filenameFromMediaPath(normalized)
      return filename ? `${getGcsBaseUrl()}/${filename}` : normalized
    }
    return normalized
  }

  const filename = filenameFromMediaPath(trimmed)
  if (filename) return `${getGcsBaseUrl()}/${filename}`

  // Recursos del sitio (/logo.webp, /placeholder.jpg): no son objetos del bucket.
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const publicUrl = toPublicMediaUrl(url)
  if (!publicUrl || !cacheTag) return publicUrl

  const tag = encodeURIComponent(cacheTag)
  return `${publicUrl}${publicUrl.includes('?') ? '&' : '?'}${tag}`
}
