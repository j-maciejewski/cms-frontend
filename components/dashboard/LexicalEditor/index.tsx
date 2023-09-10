'use client'

import './index.css'
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { EditorState, LexicalEditor as TLexicalEditor, TextNode } from 'lexical'
import dynamic from 'next/dynamic'

import { SettingsContext } from './context/SettingsContext'
import { SharedHistoryContext } from './context/SharedHistoryContext'
import { ExtendedTextNode } from './nodes/ExtendedTextNode'
import PlaygroundNodes from './nodes/PlaygroundNodes'
import { TableContext } from './plugins/TablePlugin'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'

export interface ILexicalEditor {
  value?: string
  onChange?: (lexicalEditor: TLexicalEditor, editorState: EditorState) => void
  isEditing?: boolean
  uploadImages?: boolean
  autoSaveKey?: string | null | undefined
  dataTestId?: string
  initialValue?: string
  isDisabled?: boolean
  quoteContent?: {
    contentHtml: string
    author: string
    type: string
  }
}

const Editor = dynamic(() => import('./Editor'), { ssr: false })

export function LexicalEditor(props: ILexicalEditor): JSX.Element {
  const {
    value = '',
    onChange,
    isEditing = false,
    uploadImages = true,
    autoSaveKey = undefined,
    dataTestId,
    initialValue = '',
    quoteContent = undefined,
    isDisabled = false,
  } = props

  const initialConfig: InitialConfigType = {
    editorState: undefined,
    namespace: 'Playground',
    nodes: [
      ...PlaygroundNodes,
      ExtendedTextNode,
      {
        replace: TextNode,
        with: (node: TextNode) => new ExtendedTextNode(node.__text, node.__key),
      },
    ],
    onError: (error: Error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,
  }

  return (
    <SettingsContext>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <div className="editor-shell">
              <Editor
                value={value}
                onChange={onChange}
                isEditing={isEditing}
                autoSaveKey={autoSaveKey}
                uploadImages={uploadImages}
                dataTestId={dataTestId}
                initialValue={initialValue}
                quoteContent={quoteContent}
                isDisabled={isDisabled}
              />
            </div>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  )
}
