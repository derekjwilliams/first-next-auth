'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export default function Home() {
  const Editor = useMemo(() => dynamic(() => import('@/components/Editor'), { ssr: false }), [])
  return (
    <main className='min-h-screen'>
      <Editor />
    </main>
  )
}
