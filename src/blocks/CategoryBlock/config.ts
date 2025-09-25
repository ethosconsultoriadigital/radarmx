// blocks/CategoryBlock/config.ts
import type { Block } from 'payload'

export const categoryBlock: Block = {
  slug: 'categoryBlock', // <- en minúsculas
  labels: {
    singular: 'Bloque por categoría',
    plural: 'Bloques por categoría',
  },
  imageURL: 'https://placehold.co/600x400?text=Category+Block',
  fields: [
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Categoría',
      admin: {
        description: 'Selecciona la categoría desde la cual se alimentará el bloque.',
        width: '50%',
      },
    },
  ],
}
