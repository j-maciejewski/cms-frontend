import './ContentEditable.css'

import { ContentEditable } from './styled'

export default function LexicalContentEditable(
  { className, isEditing }: { className?: string; isEditing: boolean },
): JSX.Element {
  return <ContentEditable isEditing={isEditing} className={className || 'ContentEditable__root'} />
}
