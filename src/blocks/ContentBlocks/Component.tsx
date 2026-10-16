import {
  EmbedBlockT,
  FactsListBlockT,
  GalleryBlockT,
  HeroBlockT,
  ImageBlockT,
  QuoteBlockT,
  RelatedPostsBlockT,
  RichTextBlockT,
  TimelineBlockT,
} from '@/payload-types'
import { EmbedBlock } from '../Embed/Component'
import { FactsListBlock } from '../FactsList/Component'
import { GalleryBlock } from '../Gallery/Component'
import { HeroBlock } from '../Hero/Component'
import { ImageBlockComp } from '../Image/Component'
import { QuoteBlock } from '../Quote/Component'
import { RelatedPosts } from '../RelatedPosts/Component'
import { TimelineBlock } from '../Timeline/Component'
import RichText from '@/components/RichText'

type AnyBlock =
  | HeroBlockT
  | RichTextBlockT
  | QuoteBlockT
  | ImageBlockT
  | GalleryBlockT
  | FactsListBlockT
  | TimelineBlockT
  | EmbedBlockT
  | RelatedPostsBlockT

export function ContentBlocks({ blocks }: { blocks: AnyBlock[] }) {
  if (!blocks?.length) return null

  return (
    <div>
      {blocks.map((block, idx) => {
        const key = block.id || `${block.blockType}-${idx}`
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} {...(block as HeroBlockT)} />
          case 'richText':
            return <RichText key={key} data={(block as RichTextBlockT).data} enableProse={false} />
          case 'quote':
            return <QuoteBlock key={key} {...(block as QuoteBlockT)} />
          case 'image':
            return <ImageBlockComp key={key} {...(block as ImageBlockT)} />
          case 'gallery':
            return <GalleryBlock key={key} {...(block as GalleryBlockT)} />
          case 'factsList':
            return <FactsListBlock key={key} {...(block as FactsListBlockT)} />
          case 'timeline':
            return <TimelineBlock key={key} {...(block as TimelineBlockT)} />
          case 'embed':
            return <EmbedBlock key={key} {...(block as EmbedBlockT)} />
          case 'relatedPosts':
            return <RelatedPosts key={key} {...(block as RelatedPostsBlockT)} />
          default:
            return null
        }
      })}
    </div>
  )
}

export default ContentBlocks
