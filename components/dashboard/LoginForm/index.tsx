'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

import { KeyIcon, UserAvatarIcon } from '@/components/icons'
import { useLogin } from '@/context/LoginProvider'

import { TextInput } from '../TextInput'

const LoginFormSchema = z.object({
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
})

export const LoginForm = () => {
  const { formData, handleChange, clearPassword } = useLogin()
  const [errors, setErrors] = useState<Partial<Record<'email' | 'password', string[]>> | null>(null)
  const router = useRouter()

  const goToResetPasswordPage = () => {
    clearPassword()
    router.push('/reset-password', { scroll: false })
  }

  const handleLogin = () => {
    const result = LoginFormSchema.safeParse(formData)

    if (!result.success) {
      const formattedErrors = result.error.format()

      setErrors({
        email: formattedErrors.email?._errors ?? [],
        password: formattedErrors.password?._errors ?? [],
      })

      return
    }

    setErrors(null)

    console.log('SEND')
  }

  return (
    <>
      <div className="mb-5">
        <TextInput
          Icon={UserAvatarIcon}
          errors={errors?.email}
          inputProps={{ name: 'email', onChange: handleChange, value: formData.email, placeholder: 'Enter email...' }}
        />
      </div>
      <div className="mb-5">
        <TextInput
          Icon={KeyIcon}
          errors={errors?.password}
          inputProps={{
            type: 'password',
            name: 'password',
            onChange: handleChange,
            value: formData.password,
            placeholder: 'Enter password...',
          }}
        />
      </div>
      <button
        type="button"
        className="w-full mb-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
        onClick={handleLogin}
      >
        Log in
      </button>
      <p className="text-xs text-center">
        <span>Forgot your password?</span>
        <button type="button" className="ml-2 text-blue-500 font-semibold" onClick={goToResetPasswordPage}>
          Reset password
        </button>
      </p>
    </>
  )
}
