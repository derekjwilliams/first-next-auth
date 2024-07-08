'use client' // This makes the component a client component

import React, { useRef } from 'react'
import '@blocknote/core/style.css' // Import BlockNote styles
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'
import { BlockNoteEditor, PartialBlock } from '@blocknote/core'

// Our <Editor> component we can reuse later

interface EditorProps {
  onChange: () => void
  initialContent?: string
  editable?: boolean
}

const Editor: React.FC<EditorProps> = ({ onChange, initialContent, editable = true }) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
  })
  return (
    <div>
      <BlockNoteView editor={editor} editable={editable} onChange={onChange} />
    </div>
  )
}

export default Editor
