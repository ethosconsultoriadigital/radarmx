import { describe, expect, it } from 'vitest'

import { absoluteURL, normalizeSiteURL } from '@/utilities/getURL'
import { toPublicMediaUrl } from '@/utilities/getMediaUrl'

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
    process.env.GCS_BUCKET = previousBucket
  })
})
