import { Field } from 'payload'

export const SEO: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: { description: 'Metadatos para buscadores y redes sociales' },
  fields: [
    // --- Meta básicos
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      required: false,
      admin: { description: '≈ 50–60 caracteres' },
      maxLength: 70,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      required: false,
      admin: { description: '≈ 150–160 caracteres' },
      maxLength: 180,
    },
    { name: 'keywords', type: 'text', label: 'Keywords (coma separadas)', required: false },

    // --- Canonical
    {
      name: 'canonical',
      type: 'text',
      label: 'Canonical URL',
      admin: { description: 'Dejar vacío para autogenerar' },
    },

    // --- Robots
    {
      type: 'row',
      fields: [
        {
          name: 'robotsIndex',
          type: 'select',
          label: 'Index',
          defaultValue: 'index',
          options: [
            { label: 'index', value: 'index' },
            { label: 'noindex', value: 'noindex' },
          ],
        },
        {
          name: 'robotsFollow',
          type: 'select',
          label: 'Follow',
          defaultValue: 'follow',
          options: [
            { label: 'follow', value: 'follow' },
            { label: 'nofollow', value: 'nofollow' },
          ],
        },
      ],
    },
    {
      name: 'robotsAdvanced',
      type: 'checkbox',
      label: 'No archive / snippet / image index',
      defaultValue: false,
      admin: { description: 'Equivale a: noarchive, nosnippet, noimageindex' },
    },

    // --- Open Graph
    {
      name: 'openGraph',
      type: 'group',
      label: 'Open Graph',
      fields: [
        { name: 'ogTitle', type: 'text', label: 'OG Title' },
        { name: 'ogDescription', type: 'textarea', label: 'OG Description', maxLength: 200 },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image (1200×630 recomendado)',
        },
        {
          name: 'ogType',
          type: 'select',
          defaultValue: 'article',
          options: [
            { label: 'article', value: 'article' },
            { label: 'website', value: 'website' },
          ],
        },
        {
          name: 'ogSiteName',
          type: 'text',
          label: 'OG Site Name',
          defaultValue: 'Radar Mex',
        },
        { name: 'ogLocale', type: 'text', label: 'OG Locale', defaultValue: 'es_MX' },
      ],
    },

    // --- Twitter Cards
    {
      name: 'twitter',
      type: 'group',
      label: 'Twitter / X',
      fields: [
        {
          name: 'card',
          type: 'select',
          defaultValue: 'summary_large_image',
          options: [
            { label: 'summary', value: 'summary' },
            { label: 'summary_large_image', value: 'summary_large_image' },
          ],
        },
        { name: 'title', type: 'text', label: 'Twitter Title' },
        { name: 'description', type: 'textarea', label: 'Twitter Description', maxLength: 200 },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Twitter Image (≥ 1200×675)' },
        { name: 'creator', type: 'text', label: 'Twitter @creator' },
      ],
    },

    // --- JSON-LD
    {
      name: 'jsonld',
      type: 'group',
      label: 'JSON-LD',
      fields: [
        { name: 'enable', type: 'checkbox', label: 'Habilitar JSON-LD', defaultValue: true },
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          defaultValue: 'NewsArticle',
          options: [
            { label: 'NewsArticle', value: 'NewsArticle' },
            { label: 'Article', value: 'Article' },
            { label: 'BlogPosting', value: 'BlogPosting' },
          ],
        },
        { name: 'headline', type: 'text', label: 'Headline (si quieres override)' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagen principal' },
      ],
    },

    // --- Sitemap
    {
      name: 'sitemap',
      type: 'group',
      label: 'Sitemap',
      fields: [
        { name: 'exclude', type: 'checkbox', label: 'Excluir de sitemap', defaultValue: false },
        {
          name: 'changefreq',
          type: 'select',
          label: 'Changefreq',
          defaultValue: 'daily',
          options: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(
            (v) => ({ label: v, value: v }),
          ),
        },
        {
          name: 'priority',
          type: 'number',
          label: 'Priority',
          min: 0,
          max: 1,
          admin: { step: 0.1 },
          defaultValue: 0.8,
        },
      ],
    },
  ],
}
