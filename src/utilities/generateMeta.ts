import type { Metadata } from 'next'
import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { absoluteURL } from './getURL'
import { publicMediaUrl } from './mediaUrl'
import { DEFAULT_OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE_DEFAULT } from './site'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  if (image && typeof image === 'object') {
    const fromMedia = publicMediaUrl(image)
    if (fromMedia) return fromMedia
  }

  return absoluteURL(DEFAULT_OG_IMAGE_PATH)
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
  const isHome = !doc?.slug || doc.slug === 'home'
  const docTitle = doc && 'title' in doc ? doc.title : undefined

  const title = metaTitle
    ? `${metaTitle} | ${SITE_NAME}`
    : isHome
      ? SITE_TITLE_DEFAULT
      : docTitle
        ? `${docTitle} | ${SITE_NAME}`
        : SITE_TITLE_DEFAULT

  const resolvedDescription = description || (isHome ? SITE_DESCRIPTION : undefined)

  const path = isHome ? '/' : typeof doc?.slug === 'string' && doc.slug ? `/${doc.slug}` : '/'

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical: path,
    },
    openGraph: mergeOpenGraph({
      title,
      description: resolvedDescription || SITE_DESCRIPTION,
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
      url: path,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description: resolvedDescription || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
