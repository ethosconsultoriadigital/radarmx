import { ImageBlockT, Media } from '@/payload-types'
import { mediaUrl } from '@/utilities/mediaUrl'
import clsx from 'clsx'

export function ImageBlockComp({ image, alt, display = 'inline', caption, credit }: ImageBlockT) {
  const url = mediaUrl(image as Media)
  return (
    <figure
      className={clsx(
        'my-8',
        display === 'full' ? 'w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]' : '',
      )}
      itemProp="image"
    >
      <img
        src={url}
        alt={alt || 'Imagen'}
        className={clsx('mx-auto', display === 'full' ? 'w-full' : 'max-w-4xl w-full')}
        loading="lazy"
      />
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 text-center">
          {caption}
          {caption && credit && ' · '}
          {credit && <span>Crédito: {credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}
