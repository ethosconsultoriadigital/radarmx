import { describe, expect, it } from 'vitest'

import { absoluteURL, normalizeSiteURL } from '@/utilities/getURL'
import { toPublicMediaUrl } from '@/utilities/getMediaUrl'
import { mediaUrl } from '@/utilities/mediaUrl'
import { markR2Prefix } from '@/collections/Media/hooks/markR2Prefix'
import {
  r2Endpoint,
  r2PublicFileURL,
  resolveStoredMediaURL,
  isR2MediaEnabled,
} from '@/utilities/objectStorage'

describe('URLs públicas', () => {
  it('quita la barra final del origen', () => {
    expect(normalizeSiteURL('https://www.radarmex.com/')).toBe('https://www.radarmex.com')
    expect(normalizeSiteURL('www.radarmex.com/')).toBe('https://www.radarmex.com')
  })

  it('no duplica barras al armar una ruta', () => {
    const previous = process.env.NEXT_PUBLIC_SERVER_URL
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://www.radarmex.com/'
    expect(absoluteURL('/posts/nota')).toBe('https://www.radarmex.com/posts/nota')
    expect(absoluteURL('/')).toBe('https://www.radarmex.com')
    process.env.NEXT_PUBLIC_SERVER_URL = previous
  })

  it('convierte la ruta interna de media en la clave pública de GCS', () => {
    const previousBucket = process.env.GCS_BUCKET
    process.env.GCS_BUCKET = 'payload-radarmex'
    expect(toPublicMediaUrl('/api/media/file/nota.jpg')).toBe(
      'https://storage.googleapis.com/payload-radarmex/nota.jpg',
    )
    expect(
      toPublicMediaUrl('https://storage.googleapis.com/payload-radarmex//api/media/file/nota.jpg'),
    ).toBe('https://storage.googleapis.com/payload-radarmex/nota.jpg')
    expect(toPublicMediaUrl('https://storage.googleapis.com/payload-radarmex/nota.jpg')).toBe(
      'https://storage.googleapis.com/payload-radarmex/nota.jpg',
    )
    expect(toPublicMediaUrl('/radarmex_profile.png')).toBe('/radarmex_profile.png')
    expect(toPublicMediaUrl('https://pub-example.r2.dev/r2/nota.png')).toBe(
      'https://pub-example.r2.dev/r2/nota.png',
    )
    process.env.GCS_BUCKET = previousBucket
  })

  it('respeta la URL absoluta y no la sustituye por el filename de GCS', () => {
    const previousBucket = process.env.GCS_BUCKET
    process.env.GCS_BUCKET = 'payload-radarmex'
    expect(
      mediaUrl({
        filename: 'nota.png',
        url: 'https://storage.googleapis.com/payload-radarmex/nota.png',
      }),
    ).toBe('https://storage.googleapis.com/payload-radarmex/nota.png')
    expect(
      mediaUrl({
        filename: 'nota.png',
        url: 'https://pub-example.r2.dev/r2/nota.png',
      }),
    ).toBe('https://pub-example.r2.dev/r2/nota.png')
    expect(mediaUrl({ filename: 'nota.png', url: '/api/media/file/nota.png' })).toBe(
      'https://storage.googleapis.com/payload-radarmex/nota.png',
    )
    process.env.GCS_BUCKET = previousBucket
  })
})

describe('almacenamiento R2 o GCS', () => {
  const keys = ['R2_BUCKET', 'R2_ACCOUNT_ID', 'R2_ENDPOINT', 'R2_PUBLIC_URL', 'GCS_BUCKET'] as const
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]))

  function restore() {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key]
      else process.env[key] = previous[key]
    }
  }

  it('elige R2 solo cuando R2_BUCKET tiene valor', () => {
    delete process.env.R2_BUCKET
    process.env.GCS_BUCKET = 'payload-radarmex'
    expect(isR2MediaEnabled()).toBe(false)
    process.env.R2_BUCKET = ' radarmex '
    expect(isR2MediaEnabled()).toBe(true)
    restore()
  })

  it('arma el endpoint con la cuenta o respeta R2_ENDPOINT', () => {
    delete process.env.R2_ENDPOINT
    process.env.R2_ACCOUNT_ID = 'abc123'
    expect(r2Endpoint()).toBe('https://abc123.r2.cloudflarestorage.com')
    process.env.R2_ENDPOINT = 'https://minio.local/s3/'
    expect(r2Endpoint()).toBe('https://minio.local/s3')
    restore()
  })

  it('deja en GCS los archivos sin prefijo y publica en R2 los nuevos', () => {
    process.env.R2_BUCKET = 'radarmex'
    process.env.R2_PUBLIC_URL = 'https://pub-example.r2.dev/'
    process.env.GCS_BUCKET = 'payload-radarmex'
    expect(resolveStoredMediaURL({ filename: 'vieja.jpg' })).toBe(
      'https://storage.googleapis.com/payload-radarmex/vieja.jpg',
    )
    expect(resolveStoredMediaURL({ filename: null })).toBe(
      'https://storage.googleapis.com/payload-radarmex/',
    )
    expect(resolveStoredMediaURL({ filename: 'nueva.jpg', prefix: 'r2' })).toBe(
      'https://pub-example.r2.dev/r2/nueva.jpg',
    )
    expect(r2PublicFileURL({ filename: 'nueva.jpg', prefix: 'r2' })).toBe(
      'https://pub-example.r2.dev/r2/nueva.jpg',
    )
    restore()
  })

  it('marca el prefijo r2 solo en un upload con R2 activo', () => {
    process.env.R2_BUCKET = 'radarmex'
    const file = {
      name: 'a.png',
    } as unknown as NonNullable<Parameters<typeof markR2Prefix>[0]['req']['file']>
    const call = (args: unknown) => markR2Prefix(args as Parameters<typeof markR2Prefix>[0])
    expect(call({ data: { alt: 'nueva' }, req: { file } })).toMatchObject({
      alt: 'nueva',
      prefix: 'r2',
    })
    expect(call({ data: { alt: 'edicion', prefix: null }, req: {} })).toMatchObject({
      alt: 'edicion',
      prefix: null,
    })
    delete process.env.R2_BUCKET
    expect(call({ data: { alt: 'gcs' }, req: { file } })).toEqual({ alt: 'gcs' })
    restore()
  })
})
