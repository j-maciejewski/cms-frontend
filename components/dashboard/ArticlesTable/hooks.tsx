import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { DASHBOARD_ROUTES } from '@/consts/routes'
import { DashboardCategoriesQuery, DashboardCategoriesQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { FilterOperators, FilterTypes } from '@/utils'

import { ITableColumn, ITableFilter } from '../Table/types'
import { ArticlesTableHeadersKeys } from './consts'

export const useColumns = () => {
  const { ID, TITLE, AUTHOR, CATEGORY } = ArticlesTableHeadersKeys

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        title: 'Title',
        key: TITLE,
        dataIndex: TITLE,
        isTextIndexed: true,
        render: (title: string) => (
          <p className="font-medium text-gray-800 whitespace-nowrap dark:text-white">{title}</p>
        ),
      },
      {
        title: 'Author',
        key: AUTHOR,
        dataIndex: AUTHOR,
        isTextIndexed: true,
      },
      {
        title: 'Category',
        key: CATEGORY,
        dataIndex: CATEGORY,
        isTextIndexed: true,
        isHidden: true,
      },
      {
        key: 'MANAGEMENT',
        dataIndex: ID,
        render: (id: string) => (
          <Link
            href={`${DASHBOARD_ROUTES.EDIT_ARTICLE}/${id}`}
            className="font-medium px-2 py-1 rounded-lg text-blue-600 dark:text-blue-500"
          >
            Edit
          </Link>
        ),
      },
    ],
    [],
  )

  return columns
}

export const useFilters = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<DashboardCategoriesQuery, DashboardCategoriesQueryVariables>(dashboardQueries.CATEGORIES)

  const { IN } = FilterOperators
  const { MULTI_SELECT } = FilterTypes
  const { CATEGORY } = ArticlesTableHeadersKeys

  const filters: ITableFilter[] = [
    {
      filterType: MULTI_SELECT,
      fieldKey: CATEGORY,
      label: 'Categories',
      operator: IN,
      options: categoriesData?.categories?.map((category) => ({ value: category.id, label: category.name })) ?? [],
      loading: categoriesLoading,
      error: Boolean(categoriesError),
    },
  ]

  return filters
}
