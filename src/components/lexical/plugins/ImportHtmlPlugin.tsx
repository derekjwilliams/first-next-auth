import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodes } from 'lexical'
import { $generateNodesFromDOM } from '@lexical/html'
import { useEffect } from 'react'

export default function ImportHtmlPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const nodes = $generateNodesFromDOM(editor, doc)
      $insertNodes(nodes)
    })
  }, [editor, html])

  return null
}
