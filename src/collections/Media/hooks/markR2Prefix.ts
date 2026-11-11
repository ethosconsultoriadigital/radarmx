import type { CollectionBeforeChangeHook } from 'payload'

import { R2_OBJECT_PREFIX, isR2MediaEnabled } from '@/utilities/objectStorage'

/**
 * Marca solo el upload nuevo. Corre antes del adapter, así la clave en R2
 * queda `${R2_OBJECT_PREFIX}/<filename>`. Una edición sin archivo no toca el prefijo
 * y la nota vieja sigue resolviendo a GCS.
 */
export const markR2Prefix: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!isR2MediaEnabled() || !req.file || !data) return data
  data.prefix = R2_OBJECT_PREFIX
  return data
}
