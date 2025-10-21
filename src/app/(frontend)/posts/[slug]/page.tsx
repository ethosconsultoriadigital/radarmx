// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ContentBlocks from '@/blocks/ContentBlocks/Component'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { draftMode } from 'next/headers'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Category, Media, Post } from '@/payload-types'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { isObj } from '@/utilities/isObj'
import { getPostImage } from '@/utilities/getPostImage'

export const revalidate = 60

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

  return posts.docs.map(({ slug }) => ({ slug }))
}

// ----------------- generateMetadata -----------------
type GenerateMetadataCtx = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: GenerateMetadataCtx): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) return { title: 'No encontrado | Diario en Contexto' }

  const metaTitle = post.seo?.metaTitle || post.title
  const metaDescription = post.seo?.metaDescription || ''
  const canonical =
    post.seo?.canonical || `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`
  const og = post.seo?.openGraph || {}
  const tw = post.seo?.twitter || {}

  const ogImg = getMediaUrl((og.ogImage as Media)?.url)
  const twImg = getMediaUrl((tw.image as Media)?.url)

  const robotsIndex = post.seo?.robotsIndex !== 'noindex'
  const robotsFollow = post.seo?.robotsFollow !== 'nofollow'
  const advanced = !!post.seo?.robotsAdvanced

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
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
      siteName: og.ogSiteName || 'Diario en Contexto',
      locale: og.ogLocale || 'es_MX',
      images: ogImg ? [{ url: ogImg, alt: post.title }] : undefined,
    },
    twitter: {
      card: tw.card || 'summary_large_image',
      title: tw.title || metaTitle,
      description: tw.description || metaDescription,
      images: twImg ? [twImg] : undefined,
      creator: tw.creator || '',
    },
  }
}

// ----------------- Página -----------------
export default async function PostPage({ params }: GenerateMetadataCtx) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const post = await fetchPost(slug, 4)
  if (!post || (post.status === 'draft' && !draft)) notFound()

  const pubISO = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined

  // JSON-LD
  const jsonldEnabled = post.seo?.jsonld?.enable !== false
  const jsonldType = post.seo?.jsonld?.type || 'NewsArticle'
  const jsonldImg = getPostImage(post)

  const jsonld = jsonldEnabled
    ? {
        '@context': 'https://schema.org',
        '@type': jsonldType,
        headline: post.seo?.jsonld?.headline || post.seo?.metaTitle || post.title,
        mainEntityOfPage: `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`,
        datePublished: pubISO,
        image: jsonldImg ? [jsonldImg] : undefined,
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
    <main className="container mx-auto px-4 pt-24">
      {draft && <LivePreviewListener />}

      {/* Mobile: 1 col; Desktop: 3 cols (artículo ocupa 2) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        <article itemScope itemType="https://schema.org/NewsArticle" className="md:col-span-2">
          <div className="sr-only">
            <h1 itemProp="headline">{post.title}</h1>
            {pubISO && <time itemProp="datePublished" dateTime={pubISO} />}
          </div>

          <ContentBlocks blocks={blocks.filter((r) => r.blockType !== 'relatedPosts')} />

          <div className="mt-12 pb-12 border-t border-neutral-200 dark:border-neutral-800 pt-6 text-sm text-neutral-600 dark:text-neutral-400">
            {post.categories?.length ? (
              <p className="mt-2">
                Categorías{' '}
                {(post.categories as unknown as Category[]).map((c, i) => (
                  <span key={c.id}>
                    {i > 0 ? ', ' : ''}
                    <a href={`/categoria/${c.slug}`} className="underline hover:no-underline">
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
          <div className="w-full flex flex-col gap-4">
            <h4 className="text-lg">Noticias relacionadas</h4>
            <RelatedPosts docs={relatedDocsFinal} />
          </div>
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
