import type { Block } from 'payload'

export const tagsBlock: Block = {
  slug: 'tagsBlock',
  labels: {
    singular: 'Bloque por etiquetas',
    plural: 'Bloques por etiquetas',
  },
  imageURL: 'https://placehold.co/600x400?text=Tags+Block',
  fields: [
    {
      name: 'tags',
      label: 'Etiquetas',
      type: 'text',
      hasMany: true, // admin escribe varias etiquetas como strings
      required: true,
      admin: {
        description: 'Una o varias etiquetas. Deben coincidir con el campo "tags" del Post.',
      },
    },
    {
      name: 'matchMode',
      label: 'Coincidencia',
      type: 'select',
      defaultValue: 'any',
      options: [
        { label: 'Cualquiera (OR)', value: 'any' },
        { label: 'Todas (AND)', value: 'all' },
      ],
      admin: { width: '50%' },
    },
    {
      name: 'title',
      label: 'Título (opcional)',
      type: 'text',
    },
    {
      name: 'rightCount',
      label: 'Cantidad en la lista izquierda',
      type: 'number',
      defaultValue: 5,
      admin: { width: '50%' },
    },
  ],
}
