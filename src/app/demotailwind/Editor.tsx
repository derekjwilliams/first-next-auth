'use client'

import type { BlockNoteEditor, PartialBlock } from '@blocknote/core'
// import { BlockNoteView } from '@blocknote/mantine'
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/react/style.css'

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
      <BlockNoteView editor={editor} editable={editable} theme='light' onChange={onChange} />
    </div>
  )
}

export default Editor
