// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ContentBlocks from '@/blocks/ContentBlocks/Component'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { draftMode } from 'next/headers'
import { publicMediaUrl } from '@/utilities/mediaUrl'
import { Category, Media, Post } from '@/payload-types'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { isObj } from '@/utilities/isObj'
import { getPostImage } from '@/utilities/getPostImage'
import { absoluteURL } from '@/utilities/getURL'
import { SITE_NAME, SITE_OG_LOCALE } from '@/utilities/site'

// `draftMode()` en una ruta estática generada bajo demanda lanza DYNAMIC_SERVER_USAGE
// y la nota nueva responde 500 hasta el siguiente deploy. El render dinámico
// publica la URL en el primer request; el hook afterChange revalida la portada y los sitemaps.
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

async function fetchPost(slug: string, depth = 2) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth,
    where: { slug: { equals: slug } },
  })

  return (result.docs?.[0] as Post) || null
}

async function fetchRelatedByCategories(post: Post, limit = 4) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: payloadConfig })

  const categoryIds = (post.categories || [])
    .map((c: any) => (typeof c === 'string' ? c : (c as Category)?.id))
    .filter(Boolean) as string[]

  if (!categoryIds.length) return [] as Post[]

  const where: any = {
    and: [
      { id: { not_equals: post.id } },
      { or: categoryIds.map((id) => ({ categories: { contains: id } })) },
    ],
  }
  if (!draft) where.and.unshift({ status: { equals: 'published' } })

  // 1) publishedAt desc
  let res = await payload.find({
    collection: 'posts',
    draft,
    depth: 3, // sube depth para traer Media dentro de blocks/seo
    limit,
    sort: '-publishedAt',
    overrideAccess: draft,
    where,
  })
  let docs = (res.docs || []) as Post[]

  // 2) fallback createdAt desc
  if (!docs.length) {
    res = await payload.find({
      collection: 'posts',
      draft,
      depth: 3, // mantener depth alto en fallback también
      limit,
      sort: '-createdAt',
      overrideAccess: draft,
      where,
    })
    docs = (res.docs || []) as Post[]
  }

  return docs
}

// ----------------- generateStaticParams -----------------
export async function generateStaticParams() {
  const payload = await getPayload({ config: payloadConfig })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return posts.docs
    .filter((post): post is typeof post & { slug: string } => Boolean(post.slug))
    .map(({ slug }) => ({ slug }))
}

// ----------------- generateMetadata -----------------
type GenerateMetadataCtx = { params: Promise<{ slug: string }> }

function postDescription(post: Post): string {
  if (post.seo?.metaDescription?.trim()) return post.seo.metaDescription.trim()

  for (const block of post.blocks || []) {
    if (block.blockType === 'hero' && block.subtitle?.trim()) return block.subtitle.trim()
    if (block.blockType === 'quote' && block.text?.trim()) return block.text.trim()
  }

  return post.title
}

function formatPublishedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export async function generateMetadata({ params }: GenerateMetadataCtx): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) {
    return {
      title: 'No encontrado | Radar Mex',
      robots: { index: false, follow: false },
    }
  }

  const metaTitle = post.seo?.metaTitle || post.title
  const metaDescription = postDescription(post)
  const canonical = (post.seo?.canonical || absoluteURL(`/posts/${post.slug}`)).replace(
    /([^:]\/)\/+/g,
    '$1',
  )
  const og = post.seo?.openGraph || {}
  const tw = post.seo?.twitter || {}

  const ogImg =
    publicMediaUrl(og.ogImage as Media) ||
    getPostImage(post) ||
    absoluteURL('/radarmex_profile.png')
  const twImg = publicMediaUrl(tw.image as Media) || ogImg

  const robotsIndex = post.seo?.robotsIndex !== 'noindex'
  const robotsFollow = post.seo?.robotsFollow !== 'nofollow'
  const advanced = !!post.seo?.robotsAdvanced

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical },
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
      nocache: undefined,
      noarchive: advanced || undefined,
      nosnippet: advanced || undefined,
      noimageindex: advanced || undefined,
    },
    openGraph: {
      type: og.ogType || 'article',
      title: og.ogTitle || metaTitle,
      description: og.ogDescription || metaDescription,
      url: canonical,
      siteName: og.ogSiteName || SITE_NAME,
      locale: og.ogLocale || SITE_OG_LOCALE,
      images: ogImg ? [{ url: ogImg, alt: post.title }] : undefined,
    },
    twitter: {
      card: tw.card || 'summary_large_image',
      title: tw.title || metaTitle,
      description: tw.description || metaDescription,
      images: twImg ? [twImg] : undefined,
      ...(tw.creator ? { creator: tw.creator } : {}),
    },
  }
}

// ----------------- Página -----------------
export default async function PostPage({ params }: GenerateMetadataCtx) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const post = await fetchPost(slug, 4)
  if (!post || (!draft && post._status !== 'published' && post.status !== 'published')) notFound()

  const publishedSource = post.publishedAt || post.createdAt
  const pubISO = publishedSource ? new Date(publishedSource).toISOString() : undefined
  const modifiedISO = post.updatedAt ? new Date(post.updatedAt).toISOString() : pubISO
  const canonical = (post.seo?.canonical || absoluteURL(`/posts/${post.slug}`)).replace(
    /([^:]\/)\/+/g,
    '$1',
  )
  const description = postDescription(post)
  const hasHero = (post.blocks || []).some((block) => block.blockType === 'hero')

  // JSON-LD
  const jsonldEnabled = post.seo?.jsonld?.enable !== false
  const jsonldType = post.seo?.jsonld?.type || 'NewsArticle'
  const jsonldImg = getPostImage(post) || absoluteURL('/radarmex_profile.png')
  const siteUrl = absoluteURL('/')

  const jsonld = jsonldEnabled
    ? {
        '@context': 'https://schema.org',
        '@type': jsonldType,
        headline: post.seo?.jsonld?.headline || post.seo?.metaTitle || post.title,
        description,
        image: [jsonldImg],
        datePublished: pubISO,
        dateModified: modifiedISO,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: siteUrl,
        },
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: SITE_NAME,
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: absoluteURL('/radarmex_profile.png'),
            width: 800,
            height: 800,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical,
        },
      }
    : null

  const blocks = post.blocks ?? []

  // Bloque de relacionados (si existe)
  const relatedBlock = blocks.find((b) => b.blockType === 'relatedPosts') as
    | { manual?: unknown[] }
    | undefined

  const manualList = relatedBlock?.manual ?? []

  // Resolver manuales con depth alto para tener imágenes
  const relatedDocsManual = (
    await Promise.all(
      manualList.map(async (pp) => {
        if (isObj(pp)) {
          const p = await fetchPost((pp as Post).slug!, 3)
          return p
        }
        return null
      }),
    )
  ).filter((p): p is Post => Boolean(p))

  // Fallback por categorías si no hay manuales
  let relatedDocsFinal: Post[] = relatedDocsManual
  if (!relatedDocsFinal.length) {
    relatedDocsFinal = await fetchRelatedByCategories(post, 4)
  }

  return (
    <main className="container mx-auto px-4 pb-16 pt-12 md:pb-20 md:pt-16">
      {draft && <LivePreviewListener />}

      {/* Mobile: 1 col; Desktop: 3 cols (artículo ocupa 2) */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-16">
        <article itemScope itemType="https://schema.org/NewsArticle" className="md:col-span-2">
          {!hasHero ? (
            <h1 className="mb-3 font-serif text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              {post.title}
            </h1>
          ) : null}
          {pubISO ? (
            <p className="mb-6 text-sm text-muted-foreground">
              <time dateTime={pubISO}>{formatPublishedDate(pubISO)}</time>
            </p>
          ) : null}

          <ContentBlocks blocks={blocks.filter((r) => r.blockType !== 'relatedPosts')} />

          <div className="mt-12 border-t border-border pb-12 pt-6 text-sm text-muted-foreground">
            {post.categories?.length ? (
              <p className="mt-2">
                Categorías{' '}
                {(post.categories as unknown as Category[]).map((c, i) => (
                  <span key={c.id}>
                    {i > 0 ? ', ' : ''}
                    <a
                      href={`/categoria/${c.slug}`}
                      className="font-medium text-primary underline-offset-2 transition-colors hover:text-primary/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      {c.title}
                    </a>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </article>

        {/* En mobile queda debajo del artículo */}
        {relatedDocsFinal.length > 0 && (
          <aside className="flex w-full flex-col gap-4 border-t border-border pt-8 md:border-t-0 md:pt-0">
            <h2 className="font-serif text-lg font-semibold tracking-tight text-foreground md:text-xl">
              Noticias relacionadas
            </h2>
            <RelatedPosts docs={relatedDocsFinal} />
          </aside>
        )}
      </div>

      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />
      )}
    </main>
  )
}
