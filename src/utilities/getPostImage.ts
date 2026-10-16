import { Media, Post } from '@/payload-types'
import { mediaUrl, publicMediaUrl } from './mediaUrl'

export const getPostImage = (post: Post) => {
  const fromSeo =
    publicMediaUrl((post.seo?.openGraph?.ogImage as Media) || null) ||
    publicMediaUrl((post.seo?.jsonld?.image as Media) || null) ||
    mediaUrl((post.seo?.jsonld?.image as Media) || (post.seo?.openGraph?.ogImage as Media))

  if (fromSeo) return fromSeo

  for (const block of post.blocks || []) {
    if (!block) continue
    if (block.blockType === 'hero' || block.blockType === 'image') {
      const image = 'image' in block ? block.image : undefined
      const url = mediaUrl(image as Media)
      if (url) return url
    }
    if (block.blockType === 'gallery' && Array.isArray(block.items) && block.items[0]?.image) {
      const url = mediaUrl(block.items[0].image as Media)
      if (url) return url
    }
  }

  return undefined
}
