import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isHeadingNode } from '@lexical/rich-text'
import {
  Bold,
  ChevronDown,
  ImagePlus,
  Italic,
  ListOrdered,
  RotateCcw,
  RotateCw,
  Strikethrough,
  Underline,
  Text,
  Heading1,
  Heading3,
  Heading2,
  Heading4,
  List,
  MessageSquareQuote,
  Code,
} from 'lucide-react'
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils'
import type { InsertImagePayload } from './ImagesPlugin'
import { INSERT_IMAGE_COMMAND } from './ImagesPlugin'
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  insertList,
  ListNode,
  REMOVE_LIST_COMMAND,
  removeList,
} from '@lexical/list'

import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import stylex from '@stylexjs/stylex'
import { $isCodeNode, getDefaultCodeLanguage, getCodeLanguages } from '@lexical/code'
import BlockOptionsDropdownList from '@/components/BlockOptionsDropdownList'

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
    marginRight: 10,
  },
})
//['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol']
const BlockTypeDecoration: React.FC<{ blockType: string }> = (props) => {
  switch (props.blockType) {
    case 'paragraph':
      return <Text {...stylex.props(styles.icon)} />
    case 'h1':
      return <Heading1 {...stylex.props(styles.icon)} />
    case 'h2':
      return <Heading2 {...stylex.props(styles.icon)} />
    case 'h3':
      return <Heading3 {...stylex.props(styles.icon)} />
    case 'h4':
      return <Heading4 {...stylex.props(styles.icon)} />
    case 'ul':
      return <List {...stylex.props(styles.icon)} />
    case 'ol':
      return <ListOrdered {...stylex.props(styles.icon)} />
    case 'quote':
      return <MessageSquareQuote {...stylex.props(styles.icon)} />
    case 'code':
      return <Code />
  }

  return <span />
}

// interface BlockOptionsDropdownListProps {
//   editor: LexicalEditor // Assuming editor is a LexicalEditor type
//   blockType: string // Assuming blockType is a string, update the type as needed
//   toolbarRef: RefObject<HTMLElement | null> // Assuming it's a ref to an HTMLElement
//   setShowBlockOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>> // Function to update the state
// }
// const BlockOptionsDropdownList: React.FC<BlockOptionsDropdownListProps> = ({
//   editor,
//   blockType,
//   toolbarRef,
//   setShowBlockOptionsDropDown,
// }) => {
//   // function BlockOptionsDropdownList({ editor, blockType, toolbarRef, setShowBlockOptionsDropDown }) {
//   const dropDownRef = useRef(null)

//   useEffect(() => {
//     const toolbar = toolbarRef.current
//     const dropDown = dropDownRef.current

//     if (toolbar !== null && dropDown !== null) {
//       const { top, left } = toolbar.getBoundingClientRect()
//       ;(dropDown as HTMLElement).style.top = `${top + 40}px`
//       ;(dropDown as HTMLElement).style.left = `${left}px`
//     }
//   }, [dropDownRef, toolbarRef])

//   useEffect(() => {
//     const dropDown = dropDownRef.current
//     const toolbar = toolbarRef.current

//     if (dropDown !== null && toolbar !== null) {
//       const handle = (event: { target: any }) => {
//         const target = event.target

//         if (!(dropDown as HTMLElement).contains(target) && !toolbar.contains(target)) {
//           setShowBlockOptionsDropDown(false)
//         }
//       }
//       document.addEventListener('click', handle)

//       return () => {
//         document.removeEventListener('click', handle)
//       }
//     }
//   }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef])

//   const formatParagraph = () => {
//     if (blockType !== 'paragraph') {
//       editor.update(() => {
//         const selection = $getSelection()

//         if ($isRangeSelection(selection)) {
//           $wrapNodes(selection, () => $createParagraphNode())
//         }
//       })
//     }
//     setShowBlockOptionsDropDown(false)
//   }

//   const formatLargeHeading = () => {
//     if (blockType !== 'h1') {
//       editor.update(() => {
//         const selection = $getSelection()

//         if ($isRangeSelection(selection)) {
//           $wrapNodes(selection, () => $createHeadingNode('h1'))
//         }
//       })
//     }
//     setShowBlockOptionsDropDown(false)
//   }

//   const formatSmallHeading = () => {
//     if (blockType !== 'h2') {
//       editor.update(() => {
//         const selection = $getSelection()

//         if ($isRangeSelection(selection)) {
//           $wrapNodes(selection, () => $createHeadingNode('h2'))
//         }
//       })
//     }
//     setShowBlockOptionsDropDown(false)
//   }

//   const formatBulletList = () => {
//     if (blockType !== 'ul') {
//       //editor.focus
//       editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
//     } else {
//       //editor.focus
//       editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
//     }
//     setShowBlockOptionsDropDown(false)
//   }

//   const formatNumberedList = () => {
//     if (blockType !== 'ol') {
//       editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
//     } else {
//       editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
//     }
//     setShowBlockOptionsDropDown(false)
//   }

//   const formatQuote = () => {
//     if (blockType !== 'quote') {
//       editor.update(() => {
//         const selection = $getSelection()

//         if ($isRangeSelection(selection)) {
//           $wrapNodes(selection, () => $createQuoteNode())
//         }
//       })
//     }
//     setShowBlockOptionsDropDown(false)
//   }

//   const formatCode = () => {
//     if (blockType !== 'code') {
//       editor.update(() => {
//         const selection = $getSelection()

//         if ($isRangeSelection(selection)) {
//           $wrapNodes(selection, () => $createCodeNode())
//         }
//       })
//     }
//     setShowBlockOptionsDropDown(false)
//   }

//   return (
//     <div className='dropdown' ref={dropDownRef}>
//       <button className='item' onClick={formatParagraph}>
//         <span className='icon paragraph' />
//         <span className='text'>Normal</span>
//         {blockType === 'paragraph' && <span className='active' />}
//       </button>
//       <button className='item' onClick={formatLargeHeading}>
//         <span className='icon large-heading' />
//         <span className='text'>Large Heading</span>
//         {blockType === 'h1' && <span className='active' />}
//       </button>
//       <button className='item' onClick={formatSmallHeading}>
//         <span className='icon small-heading' />
//         <span className='text'>Small Heading</span>
//         {blockType === 'h2' && <span className='active' />}
//       </button>
//       <button className='item' onClick={formatBulletList}>
//         <span className='icon bullet-list' />
//         <span className='text'>Bullet List</span>
//         {blockType === 'ul' && <span className='active' />}
//       </button>
//       <button className='item' onClick={formatNumberedList}>
//         <span className='icon numbered-list' />
//         <span className='text'>Numbered List</span>
//         {blockType === 'ol' && <span className='active' />}
//       </button>
//       <button className='item' onClick={formatQuote}>
//         <span className='icon quote' />
//         <span className='text'>Quote</span>
//         {blockType === 'quote' && <span className='active' />}
//       </button>
//       <button className='item' onClick={formatCode}>
//         <span className='icon code' />
//         <span className='text'>Code Block</span>
//         {blockType === 'code' && <span className='active' />}
//       </button>
//     </div>
//   )
// }
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
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(null)
  const [codeLanguage, setCodeLanguage] = useState('')

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
      const anchorNode = selection.anchor.getNode()
      const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const type = parentList ? parentList.getTag() : element.getTag()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType()
          setBlockType(type)
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
          }
        }
      }

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
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'bullet')
          return true
        },
        LowPriority,
      ),
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'number')
          return true
        },
        LowPriority,
      ),
      editor.registerCommand(
        REMOVE_LIST_COMMAND,
        () => {
          removeList(editor)
          return true
        },
        LowPriority,
      ),
    )
  }, [editor, $updateToolbar])

  const codeLanguges = useMemo(() => getCodeLanguages(), [])
  const onCodeLanguageSelect = useCallback(
    (e: { target: { value: string } }) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value)
          }
        }
      })
    },
    [editor, selectedElementKey],
  )

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
              {/* <span className={'icon block-type ' + blockType} /> */}
              <BlockTypeDecoration blockType={blockType} />
              {/* <span className='text'>{blockTypeToBlockName[blockType as keyof typeof blockTypeToBlockName]}</span> */}
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
