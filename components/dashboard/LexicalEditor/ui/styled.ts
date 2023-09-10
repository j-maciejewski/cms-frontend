import { ContentEditable as ContentEditableItem } from '@lexical/react/LexicalContentEditable'
import styled from 'styled-components'

export const ContentEditable = styled(ContentEditableItem)<{ isEditing: boolean }>`
  ${({ isEditing }) => (isEditing ? 'min-height: 150px' : '')}
`
