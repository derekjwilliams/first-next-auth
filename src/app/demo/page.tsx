'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function Home() {
  const Editor = useMemo(() => dynamic(() => import('@/components/Editor'), { ssr: false }), [])

  return (
    <main>
      <div>
        <Editor onChange={() => {}}/>
      </div>
    </main>
  )
}