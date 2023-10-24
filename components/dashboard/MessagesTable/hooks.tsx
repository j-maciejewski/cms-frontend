import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { useArticles } from '@/app/(dashboard)/dashboard/articles/ArticlesProvider'
import { PenIcon, ReplyIcon, TrashIcon } from '@/components/icons'
import { DASHBOARD_ROUTES } from '@/consts/routes'
import { useGrid } from '@/context/dashboard/GridProvider'
import { DashboardArticlesQuery, DashboardCategoriesQuery, DashboardCategoriesQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { FilterOperators, FilterTypes } from '@/utils'

import { ITableColumn, ITableFilter } from '../Table/types'
import { MessagesTableHeadersKeys } from './consts'

export const useColumns = () => {
  const { ID, NAME, EMAIL, CONTENT } = MessagesTableHeadersKeys

  //   text-wrap: balance;

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        title: 'Name',
        key: NAME,
        dataIndex: NAME,
        render: (title: string) => (
          <p className="whitespace-nowrap font-medium text-gray-800 dark:text-white">{title}</p>
        ),
      },
      {
        title: 'Email',
        key: EMAIL,
        dataIndex: EMAIL,
      },
      {
        title: 'Content',
        key: CONTENT,
        dataIndex: CONTENT,
        render: (content: string) => (
          <p
            className="overflow-hidden"
            style={{
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              // @ts-ignore
              textWrap: 'balance',
            }}
          >
            {content}
          </p>
        ),
      },
      {
        key: 'MANAGEMENT',
        dataIndex: ID,
        render: (id: string) => (
          <div className="flex w-min gap-2">
            <button
              className="inline-flex items-center rounded-lg bg-blue-500 p-2 text-sm text-gray-300 hover:bg-blue-600"
              // onClick={() => setFormDialog({ state: 'open', articleId: id })}
              title="Reply to message"
            >
              <ReplyIcon className="h-3 w-3" />
            </button>
            <button
              className="inline-flex items-center rounded-lg bg-red-500 p-2 text-sm text-gray-300 hover:bg-red-600"
              // onClick={() => handleDelete(id)}
              // disabled={loading}
              title="Delete message"
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

export const useFilters = () => {
  const filters: ITableFilter[] = []

  return filters
}
