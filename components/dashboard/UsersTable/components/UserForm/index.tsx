'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { useUsers } from '@/app/(dashboard)/dashboard/users/UsersProvider'
import { Spinner2Icon } from '@/components/icons'
import { DashboardUserFragment, DashboardUsersQuery } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import { TextInput } from '../../../FormElements/TextInput'

interface IUserFormInputs {
  firstName: string
  lastName: string
  email: string
}

export const UserForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserFormInputs>()

  const {
    formDialog,
    setFormDialog,
    users,
    createUserTuple: [createUser, { loading: createUserLoading }],
    updateUserTuple: [updateUser, { loading: updateUserLoading }],
  } = useUsers()

  if (formDialog.state === 'closed') return null

  if (formDialog.state === 'loading')
    return <Spinner2Icon className="m-auto h-8 w-8 animate-infinite-spin text-white" />

  const userData = formDialog.userId
    ? (users.find((user) => user.id === formDialog.userId) as DashboardUserFragment)
    : null

  const handleClose = () => setFormDialog({ state: 'closed' })

  const onSubmit: SubmitHandler<IUserFormInputs> = async (data) => {
    if (userData) {
      updateUser({
        variables: {
          id: userData.id,
          updateUserInput: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        },
        update: (cache, { data }) => {
          const cacheData: DashboardUsersQuery | null = cache.readQuery({
            query: dashboardQueries.USERS,
          })

          if (!cacheData || !data?.updateUser) return

          cache.writeQuery({
            query: dashboardQueries.USERS,
            data: {
              ...cacheData,
              users: cacheData.users.rows.map((user) =>
                user.id === data.updateUser.id ? { ...user, ...data.updateUser } : user,
              ),
            },
          })
        },
      })
    } else {
      createUser({
        variables: {
          createUserInput: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        },
        update: (cache, { data }) => {
          const cacheData: DashboardUsersQuery | null = cache.readQuery({
            query: dashboardQueries.USERS,
          })

          if (!cacheData || !data?.createUser) return

          cache.writeQuery({
            query: dashboardQueries.USERS,
            data: {
              ...cacheData,
              users: cacheData.users.rows.concat({ ...data.createUser }),
            },
          })
        },
      })
    }
  }

  return (
    <>
      {(createUserLoading || updateUserLoading) && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <Spinner2Icon className={twMerge('h-8 w-8 animate-infinite-spin text-white')} />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge('p-6', (createUserLoading || updateUserLoading) && 'invisible')}
      >
        <p className="mb-6 text-lg font-bold">{userData ? 'Update user' : 'Create user'}</p>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">First name</label>
          <TextInput
            errors={[...(errors.firstName?.message ? [errors.firstName?.message] : [])]}
            inputProps={{
              placeholder: 'Enter first name...',
              defaultValue: userData ? userData.firstName : '',
              ...register('firstName', {
                required: 'This is required',
                minLength: {
                  value: 3,
                  message: 'This input exceed maxLength.',
                },
              }),
            }}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Last name</label>
          <TextInput
            errors={[...(errors.lastName?.message ? [errors.lastName?.message] : [])]}
            inputProps={{
              placeholder: 'Enter first name...',
              defaultValue: userData ? userData.lastName : '',
              ...register('lastName', {
                required: 'This is required',
                minLength: {
                  value: 3,
                  message: 'This input exceed maxLength.',
                },
              }),
            }}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Email</label>
          <TextInput
            errors={[...(errors.email?.message ? [errors.email?.message] : [])]}
            inputProps={{
              placeholder: 'Enter email...',
              defaultValue: userData ? userData.email : '',
              ...register('email', {
                required: 'This is required',
                minLength: {
                  value: 3,
                  message: 'This input exceed maxLength.',
                },
              }),
            }}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
