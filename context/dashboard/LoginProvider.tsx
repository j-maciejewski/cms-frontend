'use client'

import { ChangeEvent, ReactNode, createContext, useContext, useMemo, useState } from 'react'

type FormData = {
  email: string
  password: string
}

interface ILoginContext {
  formData: FormData
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void
  clearPassword: () => void
}

interface ILoginProviderProps {
  children: ReactNode
}

const LoginProvider = (props: ILoginProviderProps) => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const clearPassword = () => {
    setFormData((prev) => ({ ...prev, password: '' }))
  }

  const value = useMemo(() => ({ formData, handleChange, clearPassword }), [formData])

  return <LoginContext.Provider value={value} {...props} />
}

const useLogin = () => {
  const context = useContext(LoginContext)

  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider')
  }

  return context
}

const LoginContext = createContext<ILoginContext | undefined>(undefined)

export { LoginProvider, useLogin }
