const theme = {
  // Direction and Alignment
  ltr: 'text-left',
  rtl: 'text-right',

  // Text Elements
  paragraph: 'mb-4 text-gray-800 leading-relaxed',
  quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600',

  // Headings
  heading: {
    h1: 'text-3xl font-bold mb-4 text-gray-800',
    h2: 'text-2xl font-semibold mb-3 text-gray-800',
    h3: 'text-xl font-medium mb-2 text-gray-700',
    h4: 'text-lg font-medium mb-2 text-gray-600',
  },

  // Lists
  list: {
    nested: {
      listitem: 'ml-4 list-inside', // Indent nested list items
    },
    ol: 'list-decimal list-inside mb-4 ml-4', // Ordered list style
    ul: 'list-disc list-inside mb-4 ml-4', // Unordered list style
    listitem: 'mb-2', // Base list item
    listitemChecked: 'mb-2 line-through text-gray-500', // Checked list item
    listitemUnchecked: 'mb-2 text-gray-800', // Unchecked list item
  },
  link: 'text-blue-500 hover:text-blue-700 underline',
  // Inline Text Formatting
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    superscript: 'align-super text-xs',
    subscript: 'align-sub text-xs',
  },

  // Hashtags
  hashtag: 'text-blue-500 hover:underline cursor-pointer',

  // Code Highlighting
  code: 'font-mono text-sm bg-gray-100 px-2 py-1 rounded',
  codeHighlight: {
    atrule: 'text-purple-500 font-bold',
    attr: 'text-blue-500',
    boolean: 'text-orange-500',
    builtin: 'text-indigo-500',
    cdata: 'text-gray-400 italic',
    char: 'text-green-500',
    class: 'text-yellow-500',
    'class-name': 'text-yellow-600 font-semibold',
    comment: 'text-gray-500 italic',
    constant: 'text-red-500',
    deleted: 'text-red-700 line-through',
    doctype: 'text-gray-400 italic',
    entity: 'text-orange-400',
    function: 'text-blue-500',
    important: 'text-red-600 font-bold',
    inserted: 'text-green-600 underline',
    keyword: 'text-purple-500 font-semibold',
    namespace: 'text-indigo-400',
    number: 'text-orange-400',
    operator: 'text-gray-700',
    prolog: 'text-gray-400 italic',
    property: 'text-green-500',
    punctuation: 'text-gray-600',
    regex: 'text-green-400',
    selector: 'text-pink-400',
    string: 'text-green-500',
    symbol: 'text-yellow-500',
    tag: 'text-blue-500',
    url: 'text-indigo-500 underline',
    variable: 'text-red-500',
  },

  // Code Block
  codeBlock: 'font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded',

  // Images
  image: 'max-w-full rounded-lg shadow-md',
}

//export default tailwindTheme

/*
const CssBasedTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: '',
  quote: 'editor-quote',
  heading: {
    h1: 'font-bold text-3xl',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
    h6: 'editor-heading-h6',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listItem',
    listitemChecked: 'editor-listItemChecked',
    listitemUnchecked: 'editor-listItemUnchecked',
  },
  hashtag: 'editor-hashtag',
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'font-bold editor-textBold',
    code: 'editor-textCode',
    italic: 'italic',
    strikethrough: 'line-through',
    subscript: 'editor-textSubscript',
    superscript: 'editor-textSuperscript',
    underline: 'underline',
    underlineStrikethrough: 'underlineStrikethrough',
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
}
*/

export { theme }
