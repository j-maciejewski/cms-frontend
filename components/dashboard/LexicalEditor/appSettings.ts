import { DEBUG_EDITOR, SHOW_TREE_VIEW } from '@/consts'

export type SettingName =
  | 'disableBeforeInput'
  | 'measureTypingPerf'
  | 'isRichText'
  | 'isCharLimit'
  | 'isMaxLength'
  | 'isCharLimitUtf8'
  | 'shouldUseLexicalContextMenu'
  | 'showTreeView'
  | 'showNestedEditorTreeView'
  | 'emptyEditor'
  | 'showTableOfContents'
  | 'tableCellMerge'
  | 'tableCellBackgroundColor'

export type Settings = Record<SettingName, boolean>

export const DEFAULT_SETTINGS: Settings = {
  disableBeforeInput: false,
  emptyEditor: true,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  shouldUseLexicalContextMenu: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  showTreeView: DEBUG_EDITOR && SHOW_TREE_VIEW,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
}
