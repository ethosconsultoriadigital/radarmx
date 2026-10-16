import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { gcsStorage } from '@payloadcms/storage-gcs'

import { Page, Post } from '@/payload-types'
import { authenticated } from '@/access/authenticated'
import { getServerSideURL } from '@/utilities/getURL'

// deploy

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Radar Mex` : 'Radar Mex'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  if (!doc?.slug || doc.slug === 'home') return url
  if ('status' in doc) return `${url}/posts/${doc.slug}`
  return `${url}/${doc.slug}`
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      access: {
        create: authenticated,
        delete: authenticated,
        read: () => true,
        update: authenticated,
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      access: {
        create: authenticated,
        delete: authenticated,
        read: () => true,
        update: authenticated,
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      // El formulario público del sitio hace POST anónimo. Lectura, edición y borrado no.
      access: {
        create: () => true,
        delete: authenticated,
        read: authenticated,
        update: () => false,
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      access: {
        create: () => false,
        delete: authenticated,
        read: () => true,
        update: authenticated,
      },
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  gcsStorage({
    enabled: Boolean(process.env.GCS_BUCKET?.trim()),
    collections: {
      media: {
        // La clave pública es el filename, no `/api/media/file/...`.
        // Con uniform bucket-level access, `acl: 'Public'` no basta: hace falta
        // `allUsers` con `roles/storage.objectViewer` en el bucket.
        generateFileURL: ({ filename, prefix }) => {
          const bucket = (process.env.GCS_BUCKET || 'payload-radarmex').trim()
          const key = [prefix, filename].filter(Boolean).join('/')
          return `https://storage.googleapis.com/${bucket}/${key}`
        },
      },
    },
    bucket: process.env.GCS_BUCKET as string,
    options: {
      apiEndpoint: process.env.GCS_ENDPOINT,
      projectId: process.env.GCS_PROJECT_ID,
      credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL,
        private_key: (process.env.GCS_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
      },
    },
    acl: 'Public',
  }),
]
