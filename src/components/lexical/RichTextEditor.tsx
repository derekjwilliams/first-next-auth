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
import { theme } from './theme'
import { ImageNode } from '@/components/lexical/nodes/ImageNode'
import ImagesPlugin from '@/components/lexical/plugins/ImagesPlugin'
import CustomOnChangePlugin from './plugins/CustomOnChangePlugin'
import stylex from '@stylexjs/stylex'
import ImportHtmlPlugin from './plugins/ImportHtmlPlugin'
import { fonts } from '../../app/open-props/lib/fonts.stylex'
import { sizes } from '../../app/open-props/lib/sizes.stylex'
import { borders } from '../../app/open-props/lib/borders.stylex'

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

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, readOnly, data }) => {
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
            <ImagesPlugin />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CustomOnChangePlugin value={value} onChange={onChange} />
          </div>
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
