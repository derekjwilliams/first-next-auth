'use client'

import { JSX, useEffect, useRef, useState } from 'react'

/* Lexical Design System */
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { TRANSFORMERS } from '@lexical/markdown'

/* Lexical Plugins Local */
import TreeViewPlugin from './plugins/TreeViewPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
// import AutoLinkPlugin from './plugins/AutoLinkPlugin'
// import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'

/* Lexical Plugins Remote */
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
// import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
// import { ListPlugin } from '@lexical/react/LexicalListPlugin'
// import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
// import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'

/* Lexical Others */
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import ExampleTheme from './themes/ExampleTheme'
// import ImagePlugin from './plugins/ImagePlugin'
import { ImageNode } from './nodes/ImageNode'
import useSupabase from '../../hooks/useSupabase'

/* Lexical Texts */
// import { textDailyStandup } from './text-daily-standup' //TODO, what is the intent here?

function Placeholder() {
  return <div className='editor-placeholder'>Enter some rich text...</div>
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  namespace: 'daily-standup-editor',
  // editorState: textDailyStandup,
  // Handling of errors during update
  onError(error: unknown) {
    throw error
  },
  // Any custom nodes go here
  nodes: [
    // HeadingNode,
    // ListNode,
    // ListItemNode,
    // QuoteNode,
    // CodeNode,
    // CodeHighlightNode,
    // TableNode,
    // TableCellNode,
    // TableRowNode,
    // AutoLinkNode,
    // LinkNode,
    // ImageNode,
  ],
}
interface EditorProps {
  serviceRequestId: string
}
export function Editor({ serviceRequestId }: EditorProps): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false)
  const [initialState, setInitialState] = useState<null | string>(null)

  const editorStateRef = useRef(null)
  const client = useSupabase()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await client
        .from('service_requests')
        .select('details')
        .eq('id', '1039b4ee-868b-47f4-9eb5-1bf10b24080a') // todo get from Service Request Id
        .single()

      if (error) {
        console.error('Error fetching content:', error)
      } else if (data && data.details) {
        setInitialState(data.details)
      }
    }

    fetchData()
  }, [serviceRequestId])

  const handleSave = async () => {
    if (editorStateRef.current) {
      const { error } = await client
        .from('service_requests')
        .update({ details: editorStateRef.current })
        .eq('id', '1039b4ee-868b-47f4-9eb5-1bf10b24080a') //todo, get this from the passed serviceRequestId.

      if (error) {
        console.error('Error saving content:', error)
      } else {
        console.log('Content saved successfully')
      }
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])
  const theme = {
    // Theme styling goes here
  }
  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  function onError(error: any) {
    throw error
  }
  if (!isMounted) return null
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    editorState: initialState,
    editorConfig: editorConfig,
  }
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className='editor-container'>
        <ToolbarPlugin />
        <div className='editor-inner'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {/* <ListPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <LinkPlugin />
          <TabIndentationPlugin />
          <AutoLinkPlugin />
          <ImagePlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
          {/* <TreeViewPlugin /> */}
        </div>
      </div>
      <button onClick={handleSave}>Save</button>
    </LexicalComposer>
  )
}
