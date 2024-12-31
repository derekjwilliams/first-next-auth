'use client'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import LexicalToolbar from './plugins/ToolbarPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import theme from './theme'
import { ImageNode } from '@/components/lexical/nodes/ImageNode'
import ImagesPlugin from '@/components/lexical/plugins/ImagesPlugin'
import ImageToolbar from '@/components/lexical/plugins/ImageToolbar'

function onError(error: any) {
  console.error(error)
}
// TODO handle getting the data and putting it here, could be done with a prop or maybe a hook
export default function RichTextEditor() {
  const initialConfig = {
    namespace: 'RichTextEditor-1',
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
    ],
  }

  return (
    <div className='editor-container'>
      <LexicalComposer initialConfig={initialConfig}>
        <LexicalToolbar></LexicalToolbar>
        <ImageToolbar></ImageToolbar>
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<div>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ImagesPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </LexicalComposer>
    </div>
  )
}
