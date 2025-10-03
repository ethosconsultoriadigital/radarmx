import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import React from 'react'

import type { Header as HeaderGlobal } from '@/payload-types'

export async function Header() {
  // Cargamos el global existente
  const headerData: HeaderGlobal = await getCachedGlobal('header', 1)()

  // Además, cargamos categorías desde Payload y las inyectamos en el prop "data"
  const payload = await getPayloadHMR({ config })
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'title',
    depth: 0,
    limit: 100,
  })

  // Mezclar datos del global con categorías (sin romper el tipo)
  const headerDataWithCategories = {
    ...headerData,
    categories,
  } as any

  return <HeaderClient data={headerDataWithCategories} />
}
