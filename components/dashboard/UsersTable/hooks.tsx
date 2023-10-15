import Link from 'next/link'
import { useMemo } from 'react'

import { useUsers } from '@/app/(dashboard)/dashboard/users/UsersProvider'
import { PenIcon, TrashIcon } from '@/components/icons'
import { DASHBOARD_ROUTES } from '@/consts/routes'
import { DashboardUsersQuery } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import { ITableColumn } from '../Table/types'
import { UsersTableHeadersKeys } from './consts'

export const useColumns = (): ITableColumn[] => {
  const { ID, NAME, EMAIL, AVATAR, ROLE, IS_SUSPENDED, IS_ANONYMOUS } = UsersTableHeadersKeys
  const {
    setFormDialog,
    deleteUserTuple: [deleteUser, { loading }],
  } = useUsers()

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
            users: cacheData.users.filter((user) => user.id !== data.deleteUser?.id),
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
        render: (value: Boolean) => JSON.stringify(value),
      },
      {
        title: 'Is anonymous',
        dataIndex: IS_ANONYMOUS,
        key: IS_ANONYMOUS,
        render: (value: Boolean) => JSON.stringify(value),
      },
      {
        key: 'MANAGEMENT',
        dataIndex: ID,
        render: (id: string) => (
          <div className="flex w-min gap-2">
            <button
              className="inline-flex items-center rounded-lg bg-blue-500 p-2 text-sm text-gray-300 hover:bg-blue-600"
              onClick={() => setFormDialog({ state: 'open', userId: id })}
              title="Update category"
            >
              <PenIcon className="h-3 w-3" />
            </button>
            <button
              className="inline-flex items-center rounded-lg bg-red-500 p-2 text-sm text-gray-300 hover:bg-red-600"
              onClick={() => handleDelete(id)}
              disabled={loading}
              title="Delete category"
            >
              <TrashIcon className="h-3 w-3" />
            </button>
          </div>
        ),
      },
    ],
    [],
  )

  return columns
}
