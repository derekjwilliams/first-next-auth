'use client'

import React from 'react'
import './styles.css'
import { Editor } from '@/components/LexicalTextEditor/Editor'

export default function Home() {
  return (
    <div className='App'>
      <Editor />
    </div>
  )
}
