import type { GlobalConfig } from 'payload'

export const HomeHighlights: GlobalConfig = {
  slug: 'home-highlights',
  label: 'Home: Recientes',
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Recientes',
      admin: { description: 'Título de la sección en la página principal' },
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Fondo opcional difuminado' },
    },
    {
      name: 'count',
      type: 'number',
      defaultValue: 4,
      min: 2,
      max: 4,
      required: true,
      admin: {
        description: 'Cuántas noticias recientes mostrar (entre 2 y 4), ordenadas por fecha de publicación',
      },
    },
  ],
}
