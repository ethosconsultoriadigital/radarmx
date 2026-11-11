import type { CollectionBeforeChangeHook } from 'payload'

import { R2_OBJECT_PREFIX, useR2ForMedia } from '@/utilities/objectStorage'

/**
 * Marca solo el upload nuevo. Corre antes del adapter, así la clave en R2
 * queda `${R2_OBJECT_PREFIX}/<filename>`. Una edición sin archivo no toca el prefijo
 * y la nota vieja sigue resolviendo a GCS.
 */
export const markR2Prefix: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!useR2ForMedia() || !req.file || !data) return data
  data.prefix = R2_OBJECT_PREFIX
  return data
}
