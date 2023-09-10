import type { EditorThemeClasses } from 'lexical'

const theme: EditorThemeClasses = {
  blockCursor: 'blockCursor',
  characterLimit: 'characterLimit',
  code: 'code',
  codeHighlight: {
    atrule: 'tokenAttr',
    attr: 'tokenAttr',
    boolean: 'tokenProperty',
    builtin: 'tokenSelector',
    cdata: 'tokenComment',
    char: 'tokenSelector',
    class: 'tokenFunction',
    'class-name': 'tokenFunction',
    comment: 'tokenComment',
    constant: 'tokenProperty',
    deleted: 'tokenProperty',
    doctype: 'tokenComment',
    entity: 'tokenOperator',
    function: 'tokenFunction',
    important: 'tokenVariable',
    inserted: 'tokenSelector',
    keyword: 'tokenAttr',
    namespace: 'tokenVariable',
    number: 'tokenProperty',
    operator: 'tokenOperator',
    prolog: 'tokenComment',
    property: 'tokenProperty',
    punctuation: 'tokenPunctuation',
    regex: 'tokenVariable',
    selector: 'tokenSelector',
    string: 'tokenSelector',
    symbol: 'tokenProperty',
    tag: 'tokenProperty',
    url: 'tokenOperator',
    variable: 'tokenVariable',
  },
  embedBlock: {
    base: 'embedBlock',
    focus: 'embedBlockFocus',
  },
  hashtag: 'hashtag',
  heading: {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
  },
  image: 'editor-image',
  indent: 'indent',
  inlineImage: 'inline-editor-image',
  link: 'link',
  list: {
    listitem: 'listItem',
    listitemChecked: 'listItemChecked',
    listitemUnchecked: 'listItemUnchecked',
    nested: {
      listitem: 'nestedListItem',
    },
    olDepth: ['ol1', 'ol2', 'ol3', 'ol4', 'ol5'],
    ul: 'ul',
  },
  ltr: 'ltr',
  mark: 'mark',
  markOverlap: 'markOverlap',
  paragraph: 'paragraph',
  quote: 'quote',
  rtl: 'rtl',
  table: 'table',
  tableAddColumns: 'tableAddColumns',
  tableAddRows: 'tableAddRows',
  tableCell: 'tableCell',
  tableCellActionButton: 'tableCellActionButton',
  tableCellActionButtonContainer: 'tableCellActionButtonContainer',
  tableCellEditing: 'tableCellEditing',
  tableCellHeader: 'tableCellHeader',
  tableCellPrimarySelected: 'tableCellPrimarySelected',
  tableCellResizer: 'tableCellResizer',
  tableCellSelected: 'tableCellSelected',
  tableCellSortedIndicator: 'tableCellSortedIndicator',
  tableResizeRuler: 'tableCellResizeRuler',
  tableSelected: 'tableSelected',
  tableSelection: 'tableSelection',
  text: {
    bold: 'textBold',
    code: 'textCode',
    italic: 'textItalic',
    strikethrough: 'textStrikethrough',
    subscript: 'textSubscript',
    superscript: 'textSuperscript',
    underline: 'textUnderline',
    underlineStrikethrough: 'textUnderlineStrikethrough',
  },
}

export default theme
