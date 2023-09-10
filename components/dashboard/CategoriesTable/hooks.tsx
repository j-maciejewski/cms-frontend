import Link from 'next/link'
import { useMemo } from 'react'

import { DASHBOARD_ROUTES } from '@/consts/routes'

import { ITableColumn } from '../Table/types'
import { CategoriesTableHeadersKeys } from './consts'

export const useColumns = (): ITableColumn[] => {
  const { ID, NAME, ARTICLES_COUNT } = CategoriesTableHeadersKeys

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
        title: 'Articles',
        dataIndex: ARTICLES_COUNT,
        key: ARTICLES_COUNT,
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
