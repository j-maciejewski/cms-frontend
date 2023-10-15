import './ContentEditable.css'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { twMerge } from 'tailwind-merge'

export default function LexicalContentEditable({ className, isEditing }: { className?: string; isEditing: boolean }) {
  return <ContentEditable className={twMerge(className, 'ContentEditable__root', isEditing && 'min-h-[150px]')} />
}
