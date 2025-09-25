import type { Block } from 'payload'

export const singleTagBlock: Block = {
  slug: 'singleTagBlock',
  labels: {
    singular: 'Bloque por etiqueta',
    plural: 'Bloques por etiqueta',
  },
  imageURL: 'https://placehold.co/600x400?text=Single+Tag+Block',
  fields: [
    {
      name: 'tag',
      label: 'Etiqueta',
      type: 'text',
      required: true,
      admin: {
        description:
          'Etiqueta para filtrar los posts. Debe coincidir con el campo "tags" de la colección Posts.',
        width: '50%',
      },
    },
  ],
}
