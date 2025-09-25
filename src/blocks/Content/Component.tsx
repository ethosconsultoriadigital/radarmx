// ContentBlock.tsx
import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '../../components/Link'

type ColumnSize = 'full' | 'half' | 'oneThird' | 'twoThirds'

// Toma los tipos de los componentes para no usar "any"
type RichTextProps = React.ComponentProps<typeof RichText>
type CMSLinkProps = React.ComponentProps<typeof CMSLink>

type Column = {
  enableLink?: boolean
  link?: CMSLinkProps
  richText?: RichTextProps['data']
  size?: ColumnSize
}

type ContentBlockProps = {
  columns?: Column[]
}

const colsSpanClasses: Record<ColumnSize, '12' | '8' | '6' | '4'> = {
  full: '12',
  half: '6',
  oneThird: '4',
  twoThirds: '8',
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ columns }) => {
  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns?.length
          ? columns.map((col, index) => {
              const { enableLink, link, richText, size } = col
              const span = colsSpanClasses[(size ?? 'full') satisfies ColumnSize]

              return (
                <div
                  key={index}
                  className={cn(`col-span-4 lg:col-span-${span}`, {
                    'md:col-span-2': (size ?? 'full') !== 'full',
                  })}
                >
                  {richText && <RichText data={richText} enableGutter={false} />}
                  {enableLink && link && <CMSLink {...link} />}
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}
