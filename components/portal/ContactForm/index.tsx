'use client'

import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { TextArea, TextInput } from '@/components/dashboard/FormElements'
import { defaultNotifyOptions } from '@/consts'
import { CreateMessageMutation, CreateMessageMutationVariables } from '@/gql/graphql'
import { publicMutations } from '@/services'

interface IContactFormInputs {
  name: string
  email: string
  content: string
}

export const ContactForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IContactFormInputs>()

  const [createMutation] = useMutation<CreateMessageMutation, CreateMessageMutationVariables>(
    publicMutations.CREATE_MESSAGE,
  )

  const onSubmit: SubmitHandler<IContactFormInputs> = async (data) => {
    const notificationId = toast.loading('Sending message...', defaultNotifyOptions)

    createMutation({
      variables: {
        createMessageInput: data,
      },
    })
      .then(() => {
        toast.update(notificationId, {
          render: 'Your message has been sent',
          type: 'success',
          isLoading: false,
          ...defaultNotifyOptions,
        })

        reset()
      })
      .catch(() =>
        toast.update(notificationId, {
          render: 'There was an error while sending your message',
          type: 'error',
          isLoading: false,
          ...defaultNotifyOptions,
        }),
      )
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <TextInput
            inputProps={{
              placeholder: 'Enter your name',
              ...register('name', {
                required: 'This is required',
                minLength: {
                  value: 3,
                  message: 'This input exceed maxLength.',
                },
              }),
            }}
          />
          <TextInput
            inputProps={{
              placeholder: 'Enter your contact email',
              ...register('email', {
                required: 'This is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              }),
            }}
          />
        </div>
        <TextArea
          textareaProps={{
            placeholder: 'Enter your message',
            rows: 8,
            className: 'min-h-[100px] max-h-[500px]',
            ...register('content', {
              required: 'This is required',
              minLength: {
                value: 3,
                message: 'This input exceed maxLength.',
              },
            }),
          }}
        />
        <button
          type="submit"
          className="block w-full rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Send message
        </button>
      </form>
    </>
  )
}
