import type { GlobalConfig } from 'payload'

export const HomeHighlights: GlobalConfig = {
  slug: 'home-highlights',
  label: 'Home: Recientes por categoría (4 columnas)',
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Recientes',
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Fondo opcional difuminado' },
    },
    {
      type: 'array',
      name: 'columns',
      label: 'Columnas',
      labels: { singular: 'Columna', plural: 'Columnas' },
      minRows: 4,
      maxRows: 4,
      admin: { description: 'Define exactamente 4 columnas' },
      fields: [
        {
          name: 'mode',
          type: 'select',
          required: true,
          defaultValue: 'latestByCategory',
          options: [
            { label: 'Último de categoría', value: 'latestByCategory' },
            { label: 'Post manual', value: 'manualPost' },
          ],
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          admin: {
            condition: (_, siblingData) => siblingData?.mode === 'latestByCategory',
          },
        },
        {
          name: 'post',
          type: 'relationship',
          relationTo: 'posts',
          admin: {
            description: 'Elige el post a fijar en esta columna',
            condition: (_, siblingData) => siblingData?.mode === 'manualPost',
          },
        },
        {
          name: 'dateOverride',
          label: 'Fecha a mostrar (opcional)',
          type: 'date',
          admin: {
            description: 'Si lo dejas vacío, se usará la fecha publicada del post (publishedAt)',
          },
        },
      ],
    },
  ],
}
