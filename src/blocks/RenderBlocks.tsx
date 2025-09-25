import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RowView } from './Row/Component'
import HeroGrid from './HeroGrid/Component'
import CategoryMenu from './CategoryMenu/Component'
import PerspectiveEconomyChart from './PerspectiveEconomyChart/Component'
import RichText from '@/components/RichText'
import FeatureWithSidebarComponent from './FeatureWithSidebar/Component'
import CategoryBlockComponent from './CategoryBlock/Component'
import TagsBlockComponent from './TagsBlock/Component'
import SingleTagBlockComponent from './SingleTagBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  row: RowView,
  heroGrid: HeroGrid,
  categoryMenu: CategoryMenu,
  perspectiveEconomy: PerspectiveEconomyChart,
  richText: RichText,
  featureWithSidebar: FeatureWithSidebarComponent,
  categoryBlock: CategoryBlockComponent,
  tagsBlock: TagsBlockComponent,
  singleTagBlock: SingleTagBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  className?: string
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer className={props.className} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
