import { getGcsBaseUrl } from './getMediaUrl'

/**
 * Prefijo de clave solo para objetos nuevos en R2.
 * Las filas viejas no lo tienen: su URL pública sigue siendo la de GCS
 * y no se reescribe. No es un default de Payload, porque un default
 * se aplicaría también al leer documentos anteriores.
 */
export const R2_OBJECT_PREFIX = 'r2'

export function useR2ForMedia(): boolean {
  return Boolean(process.env.R2_BUCKET?.trim())
}

/** Endpoint S3 de R2. `R2_ENDPOINT` gana sobre `R2_ACCOUNT_ID`. */
export function r2Endpoint(): string {
  const explicit = process.env.R2_ENDPOINT?.trim().replace(/\/+$/, '')
  if (explicit) return explicit

  const accountId = process.env.R2_ACCOUNT_ID?.trim()
  if (!accountId) {
    throw new Error('Define R2_ENDPOINT o R2_ACCOUNT_ID cuando R2_BUCKET está definido.')
  }

  return `https://${accountId}.r2.cloudflarestorage.com`
}

export function objectKey(prefix: string | null | undefined, filename: string): string {
  return [prefix?.replace(/^\/+|\/+$/g, ''), filename.replace(/^\/+/, '')].filter(Boolean).join('/')
}

export function gcsPublicFileURL({
  filename,
  prefix,
}: {
  filename: string
  prefix?: string | null
}): string {
  return `${getGcsBaseUrl()}/${objectKey(prefix, filename)}`
}

/** `${R2_PUBLIC_URL}/${prefix?}/${filename}` sin barras duplicadas. */
export function r2PublicFileURL({
  filename,
  prefix,
}: {
  filename: string
  prefix?: string | null
}): string {
  const base = (process.env.R2_PUBLIC_URL || '').trim().replace(/\/+$/, '')
  if (!base) {
    throw new Error('R2_PUBLIC_URL es obligatorio cuando R2_BUCKET está definido.')
  }

  return `${base}/${objectKey(prefix, filename)}`
}

/**
 * URL que ve el sitio. Con R2 activo, solo las filas con prefijo (uploads nuevos)
 * salen de R2. El resto conserva la URL de GCS ya publicada.
 */
export function resolveStoredMediaURL({
  filename,
  prefix,
}: {
  filename: string
  prefix?: string | null
}): string {
  const normalized = prefix?.replace(/^\/+|\/+$/g, '') || undefined
  if (useR2ForMedia() && normalized) {
    return r2PublicFileURL({ filename, prefix: normalized })
  }

  return gcsPublicFileURL({
    filename,
    prefix: useR2ForMedia() ? undefined : normalized,
  })
}
