'use client'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown'
import LexicalToolbar from './plugins/ToolbarPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { $createCodeNode, $isCodeNode, CodeHighlightNode, CodeNode } from '@lexical/code'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { theme } from './theme'
import { ImageNode } from '@/components/lexical/nodes/ImageNode'
import ImagesPlugin from '@/components/lexical/plugins/ImagesPlugin'
import CustomOnChangePlugin from './plugins/CustomOnChangePlugin' //TODO should we use the @lexical/react/LexicalOnChangePlugin?
import stylex from '@stylexjs/stylex'
import ImportHtmlPlugin from './plugins/ImportHtmlPlugin'
import { sizes } from '@derekjwilliams/stylextras-open-props-pr/sizes.stylex'
import { useState } from 'react'
import { $createTextNode, $getRoot } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

const styles = stylex.create({
  editorContainer: {
    margin: '10px auto 10px auto',
    borderRadius: '2px',
    color: '#000',
    position: 'relative',
    lineHeight: '20px',
    fontWeight: 400,
    textAlign: 'left',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  editorInput: {
    minHeight: '150px',
    resize: 'none',
    fontSize: '15px',
    caretColor: 'rgb(5, 5, 5)',
    position: 'relative',
    tabSize: 1,
    outline: '0',
    padding: sizes.spacing2,
    // padding: '15px 10px',
  },
  editorInner: {
    background: '#fff',
    position: 'relative',
  },
  editorPlaceholder: {
    color: '#999',
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    top: '15px',
    left: '10px',
    fontSize: '15px',
    userSelect: 'none',
    display: 'inline-block',
    pointerEvents: 'none',
  },
})

function onError(error: any) {
  console.error(error)
}

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  readOnly: boolean
  data: string
  // placeholder?: string
  // name: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MarkdownToggle({
  markdownMode,
  toggleMarkdownMode,
}: {
  markdownMode: boolean
  toggleMarkdownMode: () => void
}) {
  const [editor] = useLexicalComposerContext()

  const handleToggle = () => {
    editor.update(() => {
      const root = $getRoot()

      // Convert content based on the mode
      const currentContent = markdownMode
        ? $convertToMarkdownString(TRANSFORMERS)
        : $convertFromMarkdownString(root.getTextContent() || '', TRANSFORMERS)
      root.clear().append($createCodeNode('markdown').append($createTextNode(currentContent || '')))
    })

    toggleMarkdownMode()
  }

  return (
    <button type='button' className='toggle-markdown-button' onClick={handleToggle}>
      Toggle Markdown {markdownMode ? 'Off' : 'On'}
    </button>
  )
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, readOnly, data }) => {
  const [markdownMode, setMarkdownMode] = useState(false)

  const toggleMarkdownMode = () => {
    setMarkdownMode((prev) => !prev)
  }

  const initialConfig = {
    namespace: 'RichTextEditor-1',
    theme,
    onError,
    editable: !readOnly,
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

  if (readOnly === false) {
    return (
      <div {...stylex.props(styles.editorContainer)}>
        <LexicalComposer initialConfig={initialConfig}>
          <LexicalToolbar></LexicalToolbar>
          <div {...stylex.props(styles.editorInner)}>
            <RichTextPlugin
              contentEditable={<ContentEditable {...stylex.props(styles.editorInput)} />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            {markdownMode && <MarkdownShortcutPlugin transformers={TRANSFORMERS} />}
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <ImagesPlugin />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CustomOnChangePlugin value={value} onChange={onChange} />
          </div>

          {/* <MarkdownToggle markdownMode={markdownMode} toggleMarkdownMode={toggleMarkdownMode} /> */}
          {/* <MarkdownActions markdownMode={markdownMode} /> */}
          {/* {markdownMode && <MarkdownShortcutPlugin transformers={TRANSFORMERS} />} */}
        </LexicalComposer>
      </div>
    )
  } else
    return (
      <div {...stylex.props(styles.editorContainer)}>
        <LexicalComposer initialConfig={initialConfig}>
          <div {...stylex.props(styles.editorInner)}>
            <ImportHtmlPlugin html={data} />
            <RichTextPlugin
              contentEditable={<ContentEditable {...stylex.props(styles.editorInput)} />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ImagesPlugin />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CustomOnChangePlugin value={value} onChange={onChange} />
          </div>
        </LexicalComposer>
      </div>
    )
}
