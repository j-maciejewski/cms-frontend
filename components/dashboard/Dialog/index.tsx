import { ReactNode, SyntheticEvent, forwardRef } from 'react'

interface IDialog {
  children: ReactNode
}

export const Dialog = forwardRef<HTMLDialogElement, IDialog>(({ children }, ref) => {
  const handleCancel = (evt: SyntheticEvent<HTMLDialogElement, Event>) => {
    evt.preventDefault()
  }

  return (
    <dialog ref={ref} className="rounded-lg" onCancel={handleCancel}>
      {children}
    </dialog>
  )
})
