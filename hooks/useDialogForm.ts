import { useEffect, useRef, useState } from 'react'

type BasicFormDialogState = { state: 'open' | 'loading' | 'closed' }

export const useDialogForm = <FormDialogState extends BasicFormDialogState>() => {
  const formDialogRef = useRef<HTMLDialogElement>(null)

  const [formDialog, setFormDialog] = useState<FormDialogState>({ state: 'closed' } as FormDialogState)

  useEffect(() => {
    if (formDialog.state === 'open') {
      formDialogRef.current?.showModal()
    } else {
      formDialogRef.current?.close()
    }
  }, [formDialog.state])

  return { formDialogRef, formDialog, setFormDialog }
}
