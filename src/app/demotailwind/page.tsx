'use client'

import './layout.css'
import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export default function page() {
  const Editor = useMemo(() => dynamic(() => import('./Editor'), { ssr: false }), [])
  return (
    <Editor onChange={() => {}} />
    // <main className='min-h-screen'>
    //   <div className='flex flex-col px-24 py-10 w-full'>
    //     <div className='group flex flex-col gap-2'>
    //       <TextareaAutosize
    //         placeholder='Untitled'
    //         className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
    //       />
    //     </div>
    //     <Editor onChange={() => {}} />
    //   </div>
    // </main>
  )
  // return <h1 className='text-3xl font-bold underline bg-slate-50'>Hello tailwind!</h1>
}
