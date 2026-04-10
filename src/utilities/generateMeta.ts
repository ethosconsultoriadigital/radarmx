import type { Metadata } from 'next'
import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

type Doc = Partial<Page> | Partial<Post> | null

function isPage(doc: Doc): doc is Partial<Page> {
  return !!doc && ('meta' in doc || 'layout' in doc)
}

function isPost(doc: Doc): doc is Partial<Post> {
  return !!doc && ('seo' in doc || 'blocks' in doc)
}

function normalizeMeta(doc: Doc): {
  title?: string | null
  description?: string | null
  image?: (number | null) | Media
} {
  if (isPage(doc)) {
    return {
      title: doc.meta?.title ?? null,
      description: doc.meta?.description ?? null,
      image: doc.meta?.image ?? null,
    }
  }
  if (isPost(doc)) {
    return {
      title: doc.seo?.metaTitle ?? null,
      description: doc.seo?.metaDescription ?? null,
      image: doc.seo?.openGraph?.ogImage ?? null,
    }
  }
  return {}
}

export const generateMeta = async (args: { doc: Doc }): Promise<Metadata> => {
  const { doc } = args

  const { title: metaTitle, description, image } = normalizeMeta(doc)
  const ogImage = getImageURL(image ?? null)

  const title = metaTitle ? `${metaTitle} | Radar Mex` : 'Radar Mex'

  // Construye la URL canónica relativa de forma segura
  const path =
    typeof doc?.slug === 'string' && doc.slug
      ? `/${doc.slug}`
      : Array.isArray((doc as any)?.slug)
        ? `/${(doc as any).slug.join('/')}`
        : '/'

  return {
    title,
    description: description ?? undefined,
    openGraph: mergeOpenGraph({
      title,
      description: description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      url: path,
    }),
  }
}
