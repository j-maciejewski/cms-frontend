import { useMemo } from 'react'
import { toast } from 'react-toastify'

import { useUsers } from '@/app/(dashboard)/dashboard/users/UsersProvider'
import { PenIcon, TrashIcon } from '@/components/icons'
import { defaultNotifyOptions } from '@/consts'
import { DashboardUsersQuery, UpdateUserInput } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import { BooleanCell, OptionsCell } from '../Table/components'
import { ITableColumn } from '../Table/types'
import { UsersTableHeadersKeys } from './consts'

export const useColumns = (): ITableColumn[] => {
  const { ID, NAME, EMAIL, AVATAR, ROLE, IS_SUSPENDED, IS_ANONYMOUS, MANAGEMENT } = UsersTableHeadersKeys
  const {
    refetchUsers,
    setFormDialog,
    updateUserTuple: [updateUser, { loading: upodateUserLoading }],
    deleteUserTuple: [deleteUser, { loading: deleteUserLoading }],
  } = useUsers()

  const handleUpdate = (id: string, input: UpdateUserInput) => {
    const notificationId = toast.loading('Updaing article...', defaultNotifyOptions)

    updateUser({
      variables: { id, updateUserInput: input },
      update: (cache, { data }) => {
        if (!data?.updateUser) return

        refetchUsers()
        toast.update(notificationId, {
          render: 'Article has been updated',
          type: 'success',
          isLoading: false,
          ...defaultNotifyOptions,
        })
      },
    }).catch(() =>
      toast.update(notificationId, {
        render: 'There was an error while updating article',
        type: 'error',
        isLoading: false,
        ...defaultNotifyOptions,
      }),
    )
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('Confirm deleting user')) return

    deleteUser({
      variables: { id },
      update: (cache, { data }) => {
        const cacheData: DashboardUsersQuery | null = cache.readQuery({
          query: dashboardQueries.USERS,
        })

        if (!cacheData || !data?.deleteUser) return

        cache.writeQuery({
          query: dashboardQueries.USERS,
          data: {
            ...cacheData,
            users: cacheData.users.rows.filter((user) => user.id !== data.deleteUser?.id),
          },
        })
      },
    })
  }

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: NAME,
        key: NAME,
        render: (title: string) => (
          <p className="whitespace-nowrap font-medium text-gray-800 dark:text-white">{title}</p>
        ),
      },
      {
        title: 'Email',
        dataIndex: EMAIL,
        key: EMAIL,
      },
      {
        title: 'Role',
        dataIndex: ROLE,
        key: ROLE,
      },
      {
        title: 'Is suspended',
        dataIndex: IS_SUSPENDED,
        key: IS_SUSPENDED,
        render: BooleanCell,
      },
      {
        title: 'Is anonymous',
        dataIndex: IS_ANONYMOUS,
        key: IS_ANONYMOUS,
        render: BooleanCell,
      },
      {
        key: 'MANAGEMENT',
        dataIndex: MANAGEMENT,
        render: ({ id }: { id: string }) => (
          <OptionsCell
            actions={[
              {
                text: 'Edit',
                Icon: PenIcon,
                handleClick: () => setFormDialog({ state: 'open', userId: id }),
              },
              {
                text: 'Delete',
                Icon: TrashIcon,
                handleClick: () => handleDelete(id),
                disabled: deleteUserLoading,
              },
            ]}
          />
        ),
      },
    ],
    [],
  )

  return columns
}
