import { GalleryBlockT, Media } from '@/payload-types'
import { mediaUrl } from '@/utilities/mediaUrl'
import clsx from 'clsx'

export function GalleryBlock({ items = [], layout = 'grid' }: GalleryBlockT) {
  if (!items?.length) return null
  return (
    <section className="my-10" aria-label="Galería de imágenes">
      <div
        className={clsx(
          layout === 'grid' && 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
          layout === 'masonry' && 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4',
          layout === 'carousel' && 'flex overflow-x-auto gap-4 snap-x',
        )}
      >
        {items.map((it, i) => {
          const url = mediaUrl(it.image as Media)
          const fig = (
            <figure
              key={i}
              className={clsx(
                layout === 'carousel' ? 'min-w-[280px] snap-start' : '',
                'break-inside-avoid',
              )}
            >
              <img
                src={url}
                alt={it.alt || 'Imagen'}
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
              {it.caption && (
                <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {it.caption}
                </figcaption>
              )}
            </figure>
          )
          return fig
        })}
      </div>
    </section>
  )
}
