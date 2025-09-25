// blocks/FeatureWithSidebar/config.ts
import type { Block } from 'payload'

export const featureWithSidebar: Block = {
  slug: 'featureWithSidebar',
  labels: {
    singular: 'Destacado + Lista (auto)',
    plural: 'Destacados + Lista (auto)',
  },
  imageURL: 'https://placehold.co/600x400?text=Feature+Sidebar',
  // Sin campos: el componente se autoalimenta con la API (últimos posts)
  fields: [],
}
