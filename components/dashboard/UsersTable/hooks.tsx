import Link from 'next/link'
import { useMemo } from 'react'

import { DASHBOARD_ROUTES } from '@/consts/routes'

import { ITableColumn } from '../Table/types'
import { UsersTableHeadersKeys } from './consts'

export const useColumns = (): ITableColumn[] => {
  const { ID, NAME, EMAIL, AVATAR, ROLE, IS_SUSPENDED, IS_ANONYMOUS } = UsersTableHeadersKeys

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: NAME,
        key: NAME,
        render: (title: string) => (
          <p className="font-medium text-gray-800 whitespace-nowrap dark:text-white">{title}</p>
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
          <>
            <Link
              href={`${DASHBOARD_ROUTES.EDIT_ARTICLE}/${id}`}
              className="font-medium px-2 py-1 rounded-lg text-blue-600 dark:text-blue-500"
            >
              Edit
            </Link>
          </>
        ),
      },
    ],
    [],
  )

  return columns
}
