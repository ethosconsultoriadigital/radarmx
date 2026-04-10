import { HeroBlockT, Media } from '@/payload-types'
import { isObj } from '@/utilities/isObj'
import { mediaUrl } from '@/utilities/mediaUrl'
import clsx from 'clsx'

export function HeroBlock(props: HeroBlockT) {
  const {
    overline,
    title,
    subtitle,
    mediaType = 'image',
    image,
    video,
    videoUrl,
    align = 'left',
    darkOverlay,
  } = props

  return (
    <header
      className={clsx(
        'relative mb-10 w-full overflow-hidden rounded-xl border border-border shadow-card md:rounded-2xl',
        mediaType === 'image' ? 'aspect-[16/9]' : '',
      )}
      aria-label="Cabecera de la nota"
    >
      {/* Fondo multimedia */}
      {mediaType === 'image' && (
        <figure className="h-full w-full">
          {/* Usa <img> por SEO de imágenes y compatibilidad sencilla */}
          <img
            src={isObj(image) ? mediaUrl(image as Media) : undefined}
            alt={isObj(image) ? (image as Media).alt || title : title}
            className="h-full w-full object-cover"
            loading="eager"
          />
          {subtitle && <meta itemProp="description" content={subtitle} />}
        </figure>
      )}

      {mediaType === 'video' && (
        <figure className="h-full w-full">
          <video
            className="h-full w-full object-cover"
            controls
            preload="metadata"
            aria-label={title}
          >
            <source src={isObj(video) ? mediaUrl(video as Media) : undefined} />
          </video>
        </figure>
      )}

      {mediaType === 'videoUrl' && videoUrl && (
        <figure className="h-full w-full">
          <iframe
            title={title}
            src={videoUrl}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </figure>
      )}

      {/* Overlay y texto */}
      <div
        className={clsx(
          'absolute inset-0 flex p-6 md:p-10',
          align === 'center'
            ? 'items-center justify-center text-center'
            : 'items-end justify-start',
          darkOverlay
            ? 'bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white'
            : 'bg-gradient-to-t from-background/95 via-background/55 to-transparent text-foreground dark:from-background/90',
        )}
      >
        <div className="w-full max-w-4xl">
          {overline && (
            <p
              className={clsx(
                'text-sm uppercase tracking-wider md:text-base',
                darkOverlay ? 'text-white/90' : 'text-primary',
              )}
              aria-label="Sección"
            >
              {overline}
            </p>
          )}
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p
              className={clsx(
                'mt-3 text-base md:text-lg',
                darkOverlay ? 'text-white/95' : 'text-muted-foreground',
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
