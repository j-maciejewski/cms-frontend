'use client'

import { UserAvatarIcon } from '@/components/icons'
import { useLogin } from '@/context/LoginProvider'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { TextInput } from '../TextInput'
import { useState } from 'react'

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

    console.log('SEND')
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
            className="w-full mb-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
            onClick={handleResetPassword}
          >
            Reset password
          </button>
        </>
      )}
      <p className="text-xs text-center">
        <span>Want to log in?</span>
        <button className="ml-2 text-blue-500 font-semibold" onClick={goToLoginPage}>
          Return
        </button>
      </p>
    </>
  )
}
