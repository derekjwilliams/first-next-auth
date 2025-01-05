import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { Bold, ChevronDown, ImagePlus, Italic, RotateCcw, RotateCw, Strikethrough, Underline } from 'lucide-react'
import { mergeRegister } from '@lexical/utils'
import type { InsertImagePayload } from './ImagesPlugin'
import { INSERT_IMAGE_COMMAND } from './ImagesPlugin'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import BlockOptionsDropdownList from '../../BlockOptionsDropdownList'
import stylex from '@stylexjs/stylex'

const LowPriority = 1

export function ImageURLPrompt() {
  const sourcePrompt = prompt('Enter the URL of the image:', '')
  return sourcePrompt
}

const styles = stylex.create({
  icon: {
    color: '#303030',
    height: '18px',
    width: '18px',
  },
})

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [blockType, setBlockType] = useState('paragraph')
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false)

  const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol'])
  const blockTypeToBlockName = {
    code: 'Code Block',
    h1: 'Large Heading',
    h2: 'Small Heading',
    h3: 'Heading',
    h4: 'Heading',
    h5: 'Heading',
    ol: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
    ul: 'Bulleted List',
  }

  const insertImage = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
  }

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      // const anchorNode = selection.anchor.getNode()
      // const parent = anchorNode.getTopLevelElementOrThrow()
      // setBlockType(parent.getType() || 'paragraph')
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar()
          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        LowPriority,
      ),
    )
  }, [editor, $updateToolbar])

  return (
    <>
      <div className='toolbar' ref={toolbarRef}>
        {supportedBlockTypes.has(blockType) && (
          <>
            <button
              type='button'
              className='toolbar-item block-controls'
              onClick={() => setShowBlockOptionsDropDown(!showBlockOptionsDropDown)}
              aria-label='Formatting Options'>
              <span className={'icon block-type ' + blockType} />
              <span className='text'>{blockTypeToBlockName[blockType as keyof typeof blockTypeToBlockName]}</span>
              <ChevronDown />
            </button>
            {/* see https://codesandbox.io/p/sandbox/vigilant-kate-5tncvy */}
            {showBlockOptionsDropDown &&
              createPortal(
                <BlockOptionsDropdownList
                  editor={editor}
                  blockType={blockType}
                  toolbarRef={toolbarRef}
                  setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
                />,
                document.body,
              )}
          </>
        )}

        <button
          type='button'
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }}
          className={`toolbar-item-button toolbar-item spaced ${isBold ? 'style-selected' : ''}`}>
          <Bold {...stylex.props(styles.icon)} />
        </button>
        <button
          type='button'
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }}
          className={`toolbar-item-button toolbar-item spaced ${isItalic ? 'style-selected' : ''}`}>
          <Italic {...stylex.props(styles.icon)} />
        </button>
        <button
          type='button'
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }}
          className={`toolbar-item-button toolbar-item spaced ${isUnderline ? 'style-selected' : ''}`}>
          <Underline {...stylex.props(styles.icon)} />
        </button>
        <button
          type='button'
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
          }}
          className={`toolbar-item-button toolbar-item spaced ${isStrikethrough ? 'style-selected' : ''}`}>
          <Strikethrough {...stylex.props(styles.icon)} />
        </button>
        <button
          type='button'
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined)
          }}
          className='toolbar-item-button toolbar-item spaced'
          aria-label='Undo'>
          <RotateCcw {...stylex.props(styles.icon)} />
        </button>
        <button
          type='button'
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined)
          }}
          className='toolbar-item-button toolbar-item spaced'
          aria-label='Redo'>
          <RotateCw {...stylex.props(styles.icon)} />
        </button>
        <button
          type='button'
          onClick={() =>
            insertImage({
              altText: 'URL image',
              src: ImageURLPrompt() || '',
            })
          }
          className={'toolbar-item-button toolbar-item spaced'}>
          <ImagePlus {...stylex.props(styles.icon)} />
        </button>
      </div>
    </>
  )
}
