import { useMemo } from 'react'
import { toast } from 'react-toastify'

import { useCategories } from '@/app/(dashboard)/dashboard/categories/CategoriesProvider'
import { EyeIcon, EyeSlashIcon, GlobeIcon, PenIcon, TrashIcon } from '@/components/icons'
import { defaultNotifyOptions } from '@/consts'
import { DashboardCategoriesQuery, UpdateCategoryInput } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import { BooleanCell, OptionsCell } from '../Table/components'
import { ITableColumn } from '../Table/types'
import { CategoriesTableHeadersKeys } from './consts'

export const useColumns = (): ITableColumn[] => {
  const { ID, NAME, IS_HIDDEN, ARTICLES_COUNT, MANAGEMENT } = CategoriesTableHeadersKeys
  const {
    refetchCategories,
    setFormDialog,
    updateCategoryTuple: [updateCategory, { loading: updateCategoryLoading }],
    deleteCategoryTuple: [deleteCategory, { loading: deleteCategoryLoading }],
  } = useCategories()

  const handleUpdate = (id: string, input: UpdateCategoryInput) => {
    const notificationId = toast.loading('Updaing article...', defaultNotifyOptions)

    updateCategory({
      variables: {
        id,
        updateCategoryInput: input,
      },
      update: (cache, { data }) => {
        if (!data?.updateCategory) return

        refetchCategories()
        toast.update(notificationId, {
          render: 'Category has been updated',
          type: 'success',
          isLoading: false,
          ...defaultNotifyOptions,
        })
      },
    }).catch(() =>
      toast.update(notificationId, {
        render: 'There was an error while updating category',
        type: 'error',
        isLoading: false,
        ...defaultNotifyOptions,
      }),
    )
  }

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

  const handleGoToPage = (slug: string) => {
    window.open('http://localhost:3000/category/' + slug, '_blank')
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
        title: 'Is hidden',
        dataIndex: IS_HIDDEN,
        key: IS_HIDDEN,
        render: BooleanCell,
      },
      {
        key: 'MANAGEMENT',
        dataIndex: MANAGEMENT,
        render: ({
          id,
          slug,
          isHidden,
          articlesCount,
        }: {
          id: string
          slug: string
          isHidden: boolean
          articlesCount: number
        }) => (
          <OptionsCell
            actions={[
              {
                text: 'Edit',
                Icon: PenIcon,
                handleClick: () => setFormDialog({ state: 'open', categoryId: id }),
              },
              ...(isHidden
                ? [
                    {
                      text: 'Display',
                      Icon: EyeIcon,
                      handleClick: () => handleUpdate(id, { isHidden: false }),
                      disabled: updateCategoryLoading,
                    },
                  ]
                : [
                    {
                      text: 'Hide',
                      Icon: EyeSlashIcon,
                      handleClick: () => handleUpdate(id, { isHidden: true }),
                      disabled: updateCategoryLoading,
                    },
                  ]),
              ...(isHidden || articlesCount === 0
                ? []
                : [
                    {
                      text: 'Browse category',
                      Icon: GlobeIcon,
                      handleClick: () => handleGoToPage(slug),
                    },
                  ]),
              {
                text: 'Delete',
                Icon: TrashIcon,
                handleClick: () => handleDelete(id),
                disabled: deleteCategoryLoading,
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
