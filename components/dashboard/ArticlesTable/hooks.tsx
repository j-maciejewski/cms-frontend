import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { useArticles } from '@/app/(dashboard)/dashboard/articles/ArticlesProvider'
import { PenIcon, TrashIcon } from '@/components/icons'
import { DASHBOARD_ROUTES } from '@/consts/routes'
import { useGrid } from '@/context/GridProvider'
import { DashboardArticlesQuery, DashboardCategoriesQuery, DashboardCategoriesQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { FilterOperators, FilterTypes } from '@/utils'

import { ITableColumn, ITableFilter } from '../Table/types'
import { ArticlesTableHeadersKeys } from './consts'

export const useColumns = () => {
  const { ID, TITLE, AUTHOR, CATEGORY } = ArticlesTableHeadersKeys
  const {
    refetchArticles,
    setFormDialog,
    deleteArticleTuple: [deleteArticle, { loading }],
  } = useArticles()
  const { grid } = useGrid()

  const handleDelete = (id: string) => {
    if (!window.confirm('Confirm deleting category')) return

    deleteArticle({
      variables: { id },
      update: (cache, { data }) => {
        if (!data?.deleteArticle) return

        refetchArticles({ grid })
      },
    })
  }

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        title: 'Title',
        key: TITLE,
        dataIndex: TITLE,
        isTextIndexed: true,
        render: (title: string) => (
          <p className="whitespace-nowrap font-medium text-gray-800 dark:text-white">{title}</p>
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
          <div className="flex w-min gap-2">
            <button
              className="inline-flex items-center rounded-lg bg-blue-500 p-2 text-sm text-gray-300 hover:bg-blue-600"
              onClick={() => setFormDialog({ state: 'open', articleId: id })}
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
