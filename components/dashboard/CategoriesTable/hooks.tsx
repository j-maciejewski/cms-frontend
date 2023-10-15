import { useMemo } from 'react'

import { useCategories } from '@/app/(dashboard)/dashboard/categories/CategoriesProvider'
import { PenIcon, TrashIcon } from '@/components/icons'
import { DashboardCategoriesQuery } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import { ITableColumn } from '../Table/types'
import { CategoriesTableHeadersKeys } from './consts'

export const useColumns = (): ITableColumn[] => {
  const { ID, NAME, ARTICLES_COUNT } = CategoriesTableHeadersKeys
  const {
    setFormDialog,
    deleteCategoryTuple: [deleteCategory, { loading }],
  } = useCategories()

  const handleDelete = (id: string) => {
    if (!window.confirm('Confirm deleting category')) return

    deleteCategory({
      variables: { id },
      update: (cache, { data }) => {
        const cacheData: DashboardCategoriesQuery | null = cache.readQuery({
          query: dashboardQueries.CATEGORIES,
        })

        if (!cacheData || !data?.deleteCategory) return

        cache.writeQuery({
          query: dashboardQueries.CATEGORIES,
          data: {
            ...cacheData,
            categories: cacheData.categories.filter((category) => category.id !== data.deleteCategory?.id),
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
        title: 'Articles',
        dataIndex: ARTICLES_COUNT,
        key: ARTICLES_COUNT,
      },
      {
        key: 'MANAGEMENT',
        dataIndex: ID,
        render: (id: string) => (
          <div className="flex w-min gap-2">
            <button
              className="inline-flex items-center rounded-lg bg-blue-500 p-2 text-sm text-gray-300 hover:bg-blue-600"
              onClick={() => setFormDialog({ state: 'open', categoryId: id })}
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
