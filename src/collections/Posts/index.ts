import type { CollectionConfig, Field } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { RelatedPosts } from '@/blocks/RelatedPosts/config'
import { Embed } from '@/blocks/Embed/config'
import { Hero } from '@/blocks/Hero/config'
import { RichText } from '@/blocks/RichText/config'
import { Quote } from '@/blocks/Quote/config'
import { ImageBlock } from '@/blocks/Image/config'
import { Gallery } from '@/blocks/Gallery/config'
import { FactsList } from '@/blocks/FactsList/config'
import { Timeline } from '@/blocks/Timeline/config'
import { SEO } from '@/fields/SEO'

const contentBlocks: Field = {
  name: 'blocks',
  type: 'blocks',
  required: true,
  blocks: [Hero, RichText, Quote, ImageBlock, Gallery, FactsList, Timeline, Embed, RelatedPosts],
}

const templateOptions = [
  { label: 'Portada Clásica', value: 'classic' },
  { label: 'Explainer Rápido', value: 'explainer' },
  { label: 'Cronología', value: 'timeline' },
  { label: 'Multimedia', value: 'multimedia' },
  { label: 'Análisis/Opinión', value: 'opinion' },
] as const

type TemplateKey = (typeof templateOptions)[number]['value']

const TEMPLATES: Record<TemplateKey, any[]> = {
  classic: [
    { blockType: 'hero' },
    { blockType: 'lead' },
    { blockType: 'richText' },
    { blockType: 'quote' },
    { blockType: 'relatedPosts' },
  ],
  explainer: [
    { blockType: 'hero' },
    { blockType: 'factsList' },
    { blockType: 'richText' },
    { blockType: 'callout' },
    { blockType: 'relatedPosts' },
  ],
  timeline: [
    { blockType: 'hero' },
    { blockType: 'lead' },
    { blockType: 'timeline' },
    { blockType: 'image' },
    { blockType: 'richText' },
    { blockType: 'relatedPosts' },
  ],
  multimedia: [
    { blockType: 'hero', mediaType: 'videoUrl' },
    { blockType: 'richText' },
    { blockType: 'gallery' },
    { blockType: 'embed' },
    { blockType: 'relatedPosts' },
  ],
  opinion: [
    { blockType: 'hero' },
    { blockType: 'lead' },
    { blockType: 'richText' },
    { blockType: 'quote' },
    { blockType: 'image' },
    { blockType: 'relatedPosts' },
  ],
}

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [
          ({ value, data }) =>
            value ||
            data?.title
              ?.toLowerCase()
              ?.replace(/\s+/g, '-')
              ?.replace(/[^a-z0-9-]/g, ''),
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },

    // Taxonomías
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    { name: 'tags', type: 'text', hasMany: true },

    // Plantilla + bloques
    {
      name: 'templatePreset',
      type: 'select',
      options: templateOptions as any,
      defaultValue: 'classic',
      admin: { description: 'Plantilla inicial para rellenar los bloques automáticamente' },
    },

    contentBlocks,

    {
      type: 'collapsible',
      label: 'SEO',
      admin: {
        initCollapsed: true,
      },
      fields: [SEO],
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
    beforeValidate: [
      ({ operation, data }) => {
        if (operation === 'create') {
          const preset = data?.templatePreset as TemplateKey
          if (data && preset) {
            data.blocks = TEMPLATES[preset]
          }
        }
        return data
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
