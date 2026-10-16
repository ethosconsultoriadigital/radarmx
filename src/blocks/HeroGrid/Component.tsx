import Link from 'next/link'
import { getHeroGridData } from './getHeroGridData'
import { Post } from '@/payload-types'
import { getPostImage } from '@/utilities/getPostImage'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

type HeroGridBlock = {
  source: 'latest' | 'byCategory' | 'manual'
  category?: string | { id: string }
  posts?: Array<string | { id: string }>
  limit?: number
  offset?: number
  showDates?: boolean
  locale?: 'es' | 'en' | 'pt'
}

function formatDate(date?: string | null, locale = 'es') {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}

const PostGrid = ({ doc, showDates }: { doc: Post; showDates: boolean }) => {
  const cover = (p: Post) => {
    const image = getPostImage(p)

    return {
      src: image,
      alt: p.seo?.metaTitle || p.title,
    }
  }

  const href = (p?: Post) => (p?.slug ? `/posts/${p.slug}` : '#')

  const { src, alt } = cover(doc)
  return (
    <Link href={href(doc)} aria-hidden="true">
      <div className="relative group overflow-hidden h-full">
        {src && (
          <img
            loading="lazy"
            className="object-cover object-center m-0 w-100 transition-all group-hover:scale-110 h-full w-full aspect-square"
            alt={alt || 'Imagen'}
            src={src}
          />
        )}

        <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        <div className="p-2 absolute bottom-0 left-0">
          <div className="text-white">{doc.title}</div>
          {showDates && (
            <div className="anwp-pg-post-teaser__bottom-meta mt-1 position-relative mb-2">
              <span className="posted-on m-0">
                <span className="screen-reader-text">Posted on</span>
                <time className="anwp-pg-published" dateTime={doc.publishedAt ?? ''}>
                  {formatDate(doc.publishedAt)}
                </time>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default async function HeroGrid(props: HeroGridBlock) {
  const { source, category, posts, limit = 5, offset = 0, showDates = true, locale = 'es' } = props
  const payload = await getPayload({ config: payloadConfig })

  const docs = (await getHeroGridData({
    payload,
    source,
    category,
    posts,
    limit,
    offset,
    locale,
  })) as Post[]

  if (!docs?.length) return null

  const [main, ...rest] = docs

  return (
    <div className="grid grid-cols-12 grid-rows-2 gap-1 w-full">
      {/* Col principal */}
      <div className="col-span-6 row-span-2">
        {main && <PostGrid doc={main} showDates={showDates} />}
      </div>

      {/* Col secundaria izquierda (2 items) */}

      {rest.map((p, i) => {
        return (
          <div key={p.id ?? i} className="col-span-3">
            <PostGrid doc={p} showDates={showDates} />
          </div>
        )
      })}
    </div>
  )
}
