'use client'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import * as React from 'react'

import '../nodes/ImageToolbar.css'

import type { InsertImagePayload } from './ImagesPlugin'
import { INSERT_IMAGE_COMMAND } from './ImagesPlugin'
import { JSX } from 'react'

export function FillURL() {
  const srcfile = prompt('Enter the URL of the image:', '')
  return srcfile
}

export default function ImageToolbar(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const onClick = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
  }

  return (
    <div className='toolbar'>
      <button
        type='button'
        onClick={() =>
          onClick({
            altText: 'URL image',
            src: FillURL() || '',
          })
        }
        className={'toolbar-item spaced '}>
        <span className='text'>Insert from URL</span>
      </button>
    </div>
  )
}
