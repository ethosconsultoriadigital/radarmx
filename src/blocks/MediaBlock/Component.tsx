// components/blocks/MediaBlock.tsx
import React from 'react'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

// Importa el documento Media desde los tipos generados
import type { Media as MediaDoc } from '@/payload-types'

// Renombramos el componente "Media" para no chocar con el tipo "MediaDoc"
import { Media as MediaComponent } from '../../components/Media'

type RichTextData = React.ComponentProps<typeof RichText>['data']

// Tipo mínimo del bloque que necesitas aquí
type MediaBlockFields = {
  media?: number | MediaDoc | null
}

type Props = MediaBlockFields & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

function hasCaption(m: unknown): m is MediaDoc & { caption?: RichTextData } {
  return typeof m === 'object' && m !== null && 'caption' in (m as any)
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  const caption: RichTextData | undefined = hasCaption(media) ? (media.caption as any) : undefined

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <MediaComponent
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}

      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
