'use client'

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { z } from 'zod'

import { KeyIcon, UserAvatarIcon } from '@/components/icons'
import { useLogin } from '@/context/dashboard'
import { LoginMutation, LoginMutationVariables } from '@/gql/graphql'
import { dashboardMutations } from '@/services'

import { TextInput } from '../FormElements/TextInput'

const LoginFormSchema = z.object({
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
})

export const LoginForm = () => {
  const { formData, handleChange, clearPassword } = useLogin()
  const [errors, setErrors] = useState<Partial<Record<'email' | 'password', string[]>> | null>(null)
  const router = useRouter()

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(dashboardMutations.LOGIN)

  const goToResetPasswordPage = () => {
    clearPassword()
    router.push('/reset-password', { scroll: false })
  }

  const handleLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const result = LoginFormSchema.safeParse(formData)

    if (!result.success) {
      const formattedErrors = result.error.format()

      setErrors({
        email: formattedErrors.email?._errors ?? [],
        password: formattedErrors.password?._errors ?? [],
      })

      return
    }

    login({ variables: { email: formData.email, password: formData.password } }).then(() => router.push('/dashboard'))

    setErrors(null)
  }

  return (
    <form onSubmit={handleLogin}>
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
        type="submit"
        className="mb-3 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Log in
      </button>
      <p className="text-center text-xs">
        <span>Forgot your password?</span>
        <button type="button" className="ml-2 font-semibold text-blue-500" onClick={goToResetPasswordPage}>
          Reset password
        </button>
      </p>
    </form>
  )
}
