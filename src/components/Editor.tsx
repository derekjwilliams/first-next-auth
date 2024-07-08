'use client' // This makes the component a client component

import React, { useRef } from 'react'
import '@blocknote/core/style.css' // Import BlockNote styles
import { BlockNoteView } from '@blocknote/shadcn'
import '@blocknote/shadcn/style.css'
import { useCreateBlockNote } from '@blocknote/react'

// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote()
  return <BlockNoteView editor={editor} />
}
