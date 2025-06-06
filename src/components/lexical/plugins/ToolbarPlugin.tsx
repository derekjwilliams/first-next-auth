import { $createLinkNode, $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { Link, Unlink } from 'lucide-react'
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
  $createTextNode,
  $insertNodes,
} from 'lexical'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import stylex from '@stylexjs/stylex'
import { $isCodeNode, getDefaultCodeLanguage, getCodeLanguages } from '@lexical/code'
import BlockOptionsDropdownList from '@/components/BlockOptionsDropdownList'
import LinkDialog from '../plugins/LinkDialog' // Adjust import path as needed

const LowPriority = 1

export function ImageURLPrompt() {
  const sourcePrompt = prompt('Enter the URL of the image:', '')
  return sourcePrompt
}
// Add this to your existing toolbar component

const styles = stylex.create({
  icon: {
    color: '#303030',
    height: '18px',
    width: '28px',
    marginRight: 10,
  },
  toolbarContainer: {
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
    msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
    scrollbarWidth: 'none', // Hide scrollbar in Firefox
    '::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar in Chrome/Safari
    },
  },
  toolbarContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: '4px',
    padding: '4px',
  },
  toolbarButton: {
    flexShrink: 0, // Prevent buttons from shrinking
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const $updateToolbar = () => {
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
  }

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

  const codeLanguges = getCodeLanguages()
  const onCodeLanguageSelect = (e: { target: { value: string } }) => {
    editor.update(() => {
      if (selectedElementKey !== null) {
        const node = $getNodeByKey(selectedElementKey)
        if ($isCodeNode(node)) {
          node.setLanguage(e.target.value)
        }
      }
    })
  }

  function LinkButton() {
    const [editor] = useLexicalComposerContext()
    const [isLink, setIsLink] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedText, setSelectedText] = useState('')

    const updateToolbar = useCallback(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const node = selection.getNodes()[0]
        const parent = node.getParent()

        // Store selected text for the dialog
        setSelectedText(selection.getTextContent())

        if ($isLinkNode(node)) {
          setIsLink(true)
          setLinkUrl(node.getURL())
        } else if (parent && $isLinkNode(parent)) {
          setIsLink(true)
          setLinkUrl(parent.getURL())
        } else {
          setIsLink(false)
          setLinkUrl('')
        }
      }
    }, [])

    useEffect(() => {
      return mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar()
          })
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar()
            return false
          },
          1,
        ),
      )
    }, [editor, updateToolbar])

    const handleLinkInsert = useCallback(() => {
      setIsDialogOpen(true)
    }, [])

    const handleLinkConfirm = useCallback(
      (url: string, text: string) => {
        editor.update(() => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            if (text && text !== selectedText) {
              // If custom text is provided and different from selected text
              // Remove selected content and insert new link with custom text
              selection.removeText()
              const linkNode = $createLinkNode(url)
              linkNode.append($createTextNode(text))
              $insertNodes([linkNode])
            } else {
              // Use existing selection or URL as text
              if (selection.isCollapsed() && !text) {
                // No selection and no custom text, use URL as text
                const linkNode = $createLinkNode(url)
                linkNode.append($createTextNode(url))
                $insertNodes([linkNode])
              } else {
                // Use selected text or custom text
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, url)
              }
            }
          }
        })
        setIsDialogOpen(false)
      },
      [editor, selectedText],
    )

    const handleLinkCancel = useCallback(() => {
      setIsDialogOpen(false)
    }, [])

    const removeLink = useCallback(() => {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }, [editor])

    return (
      <>
        <button
          type='button'
          onClick={handleLinkInsert}
          className={`toolbar-item ${isLink ? 'active' : ''}`}
          aria-label='Insert link'>
          <Link {...stylex.props(styles.icon)} />
        </button>
        {isLink && (
          <button
            type='button'
            onClick={removeLink}
            className='toolbar-item'
            aria-label='Remove link'>
            <Unlink {...stylex.props(styles.icon)} />
          </button>
        )}
        <LinkDialog
          isOpen={isDialogOpen}
          initialUrl={linkUrl}
          initialText={selectedText}
          onConfirm={handleLinkConfirm}
          onCancel={handleLinkCancel}
        />
      </>
    )
  }

  return (
    <>
      <div
        {...stylex.props(styles.toolbarContainer)}
        // className='toolbar'
        ref={toolbarRef}
        style={{ backgroundColor: 'rgb(252, 253, 254)' }}>
        <div {...stylex.props(styles.toolbarContent)}>
          {supportedBlockTypes.has(blockType) && (
            <>
              <button
                type='button'
                {...stylex.props(styles.toolbarButton)}
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
            {...stylex.props(styles.toolbarButton)}
            className={`toolbar-item-button toolbar-item spaced ${isBold ? 'style-selected' : ''}`}>
            <Bold {...stylex.props(styles.icon)} />
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
            }}
            {...stylex.props(styles.toolbarButton)}
            className={`toolbar-item-button toolbar-item spaced ${isItalic ? 'style-selected' : ''}`}>
            <Italic {...stylex.props(styles.icon)} />
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
            }}
            {...stylex.props(styles.toolbarButton)}
            className={`toolbar-item-button toolbar-item spaced ${isUnderline ? 'style-selected' : ''}`}>
            <Underline {...stylex.props(styles.icon)} />
          </button>
          <button
            type='button'
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
            }}
            {...stylex.props(styles.toolbarButton)}
            className={`toolbar-item-button toolbar-item spaced ${isStrikethrough ? 'style-selected' : ''}`}>
            <Strikethrough {...stylex.props(styles.icon)} />
          </button>
          <button
            type='button'
            disabled={!canUndo}
            onClick={() => {
              editor.dispatchCommand(UNDO_COMMAND, undefined)
            }}
            {...stylex.props(styles.toolbarButton)}
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
            {...stylex.props(styles.toolbarButton)}
            className='toolbar-item-button toolbar-item spaced'
            aria-label='Redo'>
            <RotateCw {...stylex.props(styles.icon)} />
          </button>
          <LinkButton />
          <button
            type='button'
            onClick={() =>
              insertImage({
                altText: 'URL image',
                src: ImageURLPrompt() || '',
              })
            }
            {...stylex.props(styles.toolbarButton)}
            className={'toolbar-item-button toolbar-item spaced'}>
            <ImagePlus {...stylex.props(styles.icon)} />
          </button>
        </div>
      </div>
    </>
  )
}
