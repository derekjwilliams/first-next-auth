import { CantoItem } from '@/utils/canto.types'
import { cantoData } from './cantoData' // test data, in a real application the data would be fetched by an API
import React from 'react'
import { CantoTree } from '@/components/CantoTree'
export default async function Page() {
  const cantoItems: CantoItem[] = cantoData.results
  return (
    <div>
      <h1>Canto Image Albums</h1>
      <ul>
        <CantoTree items={cantoItems} />
      </ul>
    </div>
  )
}
