import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createTextNode, $getRoot } from 'lexical'
import { $createCodeNode, $isCodeNode } from '@lexical/code'
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown'
import { TRANSFORMERS } from '@lexical/markdown'

export const MarkdownActions = ({ markdownMode }: { markdownMode: boolean }) => {
  const [editor] = useLexicalComposerContext()

  const handleOnClick = () => {
    editor.update(() => {
      const root = $getRoot()
      const firstChild = root.getFirstChild()

      if ($isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown') {
        // Markdown -> Node
        $convertFromMarkdownString(firstChild.getTextContent(), TRANSFORMERS)
      } else {
        // Node -> Markdown
        const markdown = $convertToMarkdownString(TRANSFORMERS)
        root.clear().append($createCodeNode('markdown').append($createTextNode(markdown)))
      }
    })
  }
  return (
    <div>
      <button type='button' onClick={handleOnClick}>
        MARKDOWN
      </button>
    </div>
  )
}
