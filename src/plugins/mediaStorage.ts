import { gcsStorage } from '@payloadcms/storage-gcs'
import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

import {
  gcsPublicFileURL,
  r2Endpoint,
  resolveStoredMediaURL,
  useR2ForMedia,
} from '@/utilities/objectStorage'

/**
 * Un solo adapter para `media`. Si `R2_BUCKET` está definido, R2 reemplaza a GCS.
 * Si no, se conserva el plugin de GCS (apagado cuando `GCS_BUCKET` está vacío).
 */
export function mediaStoragePlugin(): Plugin {
  if (useR2ForMedia()) {
    if (!process.env.R2_PUBLIC_URL?.trim()) {
      throw new Error('R2_PUBLIC_URL es obligatorio cuando R2_BUCKET está definido.')
    }

    return s3Storage({
      bucket: process.env.R2_BUCKET!.trim(),
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => resolveStoredMediaURL({ filename, prefix }),
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        // R2 exige `auto`. El SDK no lo usa como región AWS.
        region: 'auto',
        endpoint: r2Endpoint(),
        // Path-style: https://<account>.r2.cloudflarestorage.com/<bucket>/<key>.
        // R2 acepta esa forma. Sin esto el SDK mueve el bucket al hostname.
        forcePathStyle: true,
        // AWS SDK >= 3.729 manda checksums CRC32 por defecto. R2 responde 400 si van incluidos.
        requestChecksumCalculation: 'WHEN_REQUIRED',
        responseChecksumValidation: 'WHEN_REQUIRED',
      },
    })
  }

  return gcsStorage({
    enabled: Boolean(process.env.GCS_BUCKET?.trim()),
    collections: {
      media: {
        // La clave pública es el filename, no `/api/media/file/...`.
        // Con uniform bucket-level access, `acl: 'Public'` no basta: hace falta
        // `allUsers` con `roles/storage.objectViewer` en el bucket.
        generateFileURL: ({ filename, prefix }) => gcsPublicFileURL({ filename, prefix }),
      },
    },
    bucket: process.env.GCS_BUCKET as string,
    options: {
      apiEndpoint: process.env.GCS_ENDPOINT,
      projectId: process.env.GCS_PROJECT_ID,
      credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL,
        private_key: (process.env.GCS_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
      },
    },
    acl: 'Public',
  })
}
