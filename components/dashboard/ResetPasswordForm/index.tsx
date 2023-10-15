'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

import { UserAvatarIcon } from '@/components/icons'
import { useLogin } from '@/context/LoginProvider'

import { TextInput } from '../FormElements/TextInput'

const ResetPasswordFormSchema = z.object({
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
})

export const ResetPasswordForm = () => {
  const { formData, handleChange } = useLogin()
  const [errors, setErrors] = useState<Partial<Record<'email', string[]>> | null>(null)
  const router = useRouter()
  const [emailSent, setEmailSent] = useState(false)

  const goToLoginPage = () => {
    router.push('/login', { scroll: false })
  }

  const handleResetPassword = () => {
    const result = ResetPasswordFormSchema.safeParse(formData)

    if (!result.success) {
      const formattedErrors = result.error.format()

      setErrors({
        email: formattedErrors.email?._errors ?? [],
      })

      return
    }

    setErrors(null)
    setEmailSent(true)
  }

  return (
    <>
      {emailSent ? (
        <div className="mb-5">
          <p className="text-center">Check your email for further instructions</p>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <TextInput
              Icon={UserAvatarIcon}
              errors={errors?.email}
              inputProps={{
                name: 'email',
                onChange: handleChange,
                value: formData.email,
                placeholder: 'Enter email...',
              }}
            />
          </div>
          <button
            className="mb-3 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={handleResetPassword}
          >
            Reset password
          </button>
        </>
      )}
      <p className="text-center text-xs">
        <span>Want to log in?</span>
        <button className="ml-2 font-semibold text-blue-500" onClick={goToLoginPage}>
          Return
        </button>
      </p>
    </>
  )
}
