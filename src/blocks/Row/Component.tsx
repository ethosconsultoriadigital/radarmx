import * as React from 'react'
import type { RowBlock, ColSpan } from './types'
import { RenderBlocks } from '../RenderBlocks'
import clsx from 'clsx'

const gridColsClass = (n?: number, prefix = '') => (n ? `${prefix}grid-cols-${n}` : '')

const spanClass = (span?: number, prefix = '') => (span ? `${prefix}col-span-${span}` : '')

const maxWidthClass = (mw?: RowBlock['maxWidth']) => {
  switch (mw) {
    case 'lg':
      return 'max-w-lg'
    case 'xl':
      return 'max-w-xl'
    case '2xl':
      return 'max-w-2xl'
    case '7xl':
      return 'max-w-7xl'
    case 'full':
      return ''
    default:
      return 'max-w-7xl'
  }
}

const backgroundClass = (bg?: RowBlock['background']) => {
  switch (bg) {
    case 'white':
      return 'bg-card text-card-foreground'
    case 'neutral-900':
      return 'bg-foreground text-background'
    case 'zinc-50':
      return 'bg-muted/80 text-foreground'
    case 'panel':
      return 'rounded-2xl border border-border bg-card/80 text-card-foreground shadow-card backdrop-blur-md'
    default:
      return ''
  }
}

const spanToClasses = (span?: ColSpan) =>
  [
    spanClass(span?.base),
    spanClass(span?.sm, 'sm:'),
    spanClass(span?.md, 'md:'),
    spanClass(span?.lg, 'lg:'),
    spanClass(span?.xl, 'xl:'),
  ]
    .filter(Boolean)
    .join(' ')

const colsToClasses = (cols?: ColSpan) =>
  [
    gridColsClass(cols?.base),
    gridColsClass(cols?.sm, 'sm:'),
    gridColsClass(cols?.md, 'md:'),
    gridColsClass(cols?.lg, 'lg:'),
    gridColsClass(cols?.xl, 'xl:'),
  ]
    .filter(Boolean)
    .join(' ')

export function RowView(props: RowBlock) {
  const {
    asContainer = true,
    maxWidth = '7xl',
    background = 'transparent',
    paddingY = 'py-8 md:py-12',
    gap = 'gap-6 md:gap-8',
    alignY = 'items-start',
    alignX = 'justify-start',
    cols = { base: 1, md: 2 },
    cells = [],
    className = '',
  } = props

  const Wrapper: React.ElementType = asContainer ? 'div' : React.Fragment
  const wrapperProps = asContainer
    ? {
        className: `h-full mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass(maxWidth)}`,
      }
    : {}

  return (
    <div
      className={clsx(
        backgroundClass(background),
        paddingY,
        className,
        'mx-auto h-full max-w-[1170px]',
      )}
    >
      <Wrapper {...wrapperProps}>
        <div className={['grid', gap, alignY, alignX, colsToClasses(cols)].join(' ')}>
          {cells.map((cell) => {
            const spanClasses = spanToClasses(cell.span)
            return (
              <div key={cell.id} className={clsx('h-full', spanClasses, cell.vAlign)}>
                <RenderBlocks blocks={cell.blocks || []} className="h-full" />
              </div>
            )
          })}
        </div>
      </Wrapper>
    </div>
  )
}
