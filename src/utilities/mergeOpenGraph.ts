import type { Metadata } from 'next'
import { absoluteURL } from './getURL'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_LOCALE,
  SITE_TITLE_DEFAULT,
  DEFAULT_OG_IMAGE_PATH,
} from './site'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: SITE_DESCRIPTION,
  images: [
    {
      url: absoluteURL(DEFAULT_OG_IMAGE_PATH),
      alt: SITE_NAME,
    },
  ],
  siteName: SITE_NAME,
  title: SITE_TITLE_DEFAULT,
  locale: SITE_OG_LOCALE,
  url: absoluteURL('/'),
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  const locale = og && 'locale' in og && og.locale ? og.locale : SITE_OG_LOCALE

  return {
    ...defaultOpenGraph,
    ...og,
    locale,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
