import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor } from 'lexical'
import { RefObject, useEffect, useRef } from 'react'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  insertList,
  REMOVE_LIST_COMMAND,
  removeList,
} from '@lexical/list'
import { $createCodeNode } from '@lexical/code'
import { Text, Heading1, Heading2, List, ListOrdered, MessageSquare, Code } from 'lucide-react'
import { mergeRegister } from '@lexical/utils'

interface BlockOptionsDropdownListProps {
  editor: LexicalEditor // Assuming editor is a LexicalEditor type
  blockType: string // Assuming blockType is a string, update the type as needed
  toolbarRef: RefObject<HTMLElement | null> // Assuming it's a ref to an HTMLElement
  setShowBlockOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>> // Function to update the state
}

const BlockOptionsDropdownList: React.FC<BlockOptionsDropdownListProps> = ({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}) => {
  const dropDownRef = useRef(null)

  useEffect(() => {
    const toolbar = toolbarRef.current
    const dropDown = dropDownRef.current

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect()
      ;(dropDown as HTMLElement).style.top = `${top + 40}px`
      ;(dropDown as HTMLElement).style.left = `${left}px`
    }
  }, [dropDownRef, toolbarRef])

  useEffect(() => {
    const dropDown = dropDownRef.current
    const toolbar = toolbarRef.current

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: { target: any }) => {
        const target = event.target

        if (!(dropDown as HTMLElement).contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false)
        }
      }
      document.addEventListener('click', handle)

      return () => {
        document.removeEventListener('click', handle)
      }
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef])

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'bullet')
          return true
        },
        1,
      ),
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          insertList(editor, 'number')
          return true
        },
        1,
      ),
      editor.registerCommand(
        REMOVE_LIST_COMMAND,
        () => {
          removeList(editor)
          return true
        },
        1,
      ),
    )
  }, [editor])

  const formatParagraph = () => {
    // if (blockType !== "paragraph") {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
    // }
    setShowBlockOptionsDropDown(false)
  }

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h1'))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode('h2'))
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.focus()
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.focus()
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection()

        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createCodeNode())
        }
      })
    }
    setShowBlockOptionsDropDown(false)
  }

  return (
    <div className='dropdown' ref={dropDownRef}>
      <button className='item' onClick={formatParagraph}>
        <Text />
        <span className='text'>Normal</span>
        {blockType === 'paragraph' && <span className='active' />}
      </button>
      <button className='item' onClick={formatLargeHeading}>
        <Heading1 />
        <span className='text'>Large Heading</span>
        {blockType === 'h1' && <span className='active' />}
      </button>
      <button className='item' onClick={formatSmallHeading}>
        <Heading2 />
        <span className='text'>Small Heading</span>
        {blockType === 'h2' && <span className='active' />}
      </button>
      <button className='item' onClick={formatBulletList}>
        <List />
        <span className='text'>Bullet List</span>
        {blockType === 'ul' && <span className='active' />}
      </button>
      <button className='item' onClick={formatNumberedList}>
        <ListOrdered />
        <span className='text'>Numbered List</span>
        {blockType === 'ol' && <span className='active' />}
      </button>
      <button className='item' onClick={formatQuote}>
        <MessageSquare />
        <span className='text'>Quote</span>
        {blockType === 'quote' && <span className='active' />}
      </button>
      <button className='item' onClick={formatCode}>
        <Code />
        <span className='text'>Code Block</span>
        {blockType === 'code' && <span className='active' />}
      </button>
    </div>
  )
}
export default BlockOptionsDropdownList
