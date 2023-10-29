import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { toast } from 'react-toastify'

import { useArticles } from '@/app/(dashboard)/dashboard/articles/ArticlesProvider'
import { EmptyStarIcon, EyeIcon, EyeSlashIcon, GlobeIcon, PenIcon, StarIcon, TrashIcon } from '@/components/icons'
import { defaultNotifyOptions } from '@/consts'
import { DashboardCategoriesQuery, DashboardCategoriesQueryVariables, UpdateArticleInput } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { FilterOperators, FilterTypes } from '@/utils'

import { BooleanCell, OptionsCell } from '../Table/components'
import { ITableColumn, ITableFilter } from '../Table/types'
import { ArticlesTableHeadersKeys } from './consts'

export const useColumns = () => {
  const { ID, TITLE, SLUG, AUTHOR, IS_HIDDEN, IS_HIGHLIGHTED, CATEGORY, MANAGEMENT } = ArticlesTableHeadersKeys
  const {
    refetchArticles,
    setFormDialog,
    updateArticleTuple: [updateArticle, { loading: updateArticleLoading }],
    deleteArticleTuple: [deleteArticle, { loading: deleteArticleLoading }],
  } = useArticles()

  const handleUpdate = (id: string, input: UpdateArticleInput) => {
    const notificationId = toast.loading('Updaing article...', defaultNotifyOptions)

    updateArticle({
      variables: {
        id,
        updateArticleInput: input,
      },
      update: (cache, { data }) => {
        if (!data?.updateArticle) return

        refetchArticles()
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
    if (!window.confirm('Confirm deleting category')) return

    const notificationId = toast.loading('Deleting article...', defaultNotifyOptions)

    deleteArticle({
      variables: { id },
      update: (cache, { data }) => {
        if (!data?.deleteArticle) return

        refetchArticles()
        toast.update(notificationId, {
          render: 'Article has been deleted',
          type: 'success',
          isLoading: false,
          ...defaultNotifyOptions,
        })
      },
    }).catch(() =>
      toast.update(notificationId, {
        render: 'There was an error while deleting article',
        type: 'error',
        isLoading: false,
        ...defaultNotifyOptions,
      }),
    )
  }

  const handleGoToPage = (slug: string) => {
    window.open('http://localhost:3000/article/' + slug, '_blank')
  }

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        title: 'Title',
        key: TITLE,
        dataIndex: TITLE,
        render: (title: string) => (
          <p
            className="overflow-hidden font-medium text-gray-800 dark:text-white"
            style={{
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              // @ts-ignore
              textWrap: 'balance',
            }}
          >
            {title}
          </p>
        ),
      },
      {
        title: 'Slug',
        key: SLUG,
        dataIndex: SLUG,
        isHidden: true,
      },
      {
        title: 'Author',
        key: AUTHOR,
        dataIndex: AUTHOR,
      },
      {
        title: 'Is hidden',
        dataIndex: IS_HIDDEN,
        key: IS_HIDDEN,
        render: BooleanCell,
      },
      {
        title: 'Is highlighted',
        dataIndex: IS_HIGHLIGHTED,
        key: IS_HIGHLIGHTED,
        render: BooleanCell,
      },
      {
        title: 'Category',
        key: CATEGORY,
        dataIndex: CATEGORY,
        isHidden: true,
      },
      {
        key: 'MANAGEMENT',
        dataIndex: MANAGEMENT,
        render: ({
          id,
          slug,
          isHidden,
          isHighlighted,
        }: {
          id: string
          slug: string
          isHidden: boolean
          isHighlighted: boolean
        }) => (
          <OptionsCell
            actions={[
              {
                text: 'Edit',
                Icon: PenIcon,
                handleClick: () => setFormDialog({ state: 'open', articleId: id }),
              },
              ...(isHighlighted
                ? [
                    {
                      text: 'Remove highlight',
                      Icon: EmptyStarIcon,
                      handleClick: () => handleUpdate(id, { isHighlighted: false }),
                      disabled: updateArticleLoading,
                    },
                  ]
                : [
                    {
                      text: 'Highlight',
                      Icon: StarIcon,
                      handleClick: () => handleUpdate(id, { isHighlighted: true }),
                      disabled: updateArticleLoading,
                    },
                  ]),
              ...(isHidden
                ? [
                    {
                      text: 'Display',
                      Icon: EyeIcon,
                      handleClick: () => handleUpdate(id, { isHidden: false }),
                      disabled: updateArticleLoading,
                    },
                  ]
                : [
                    {
                      text: 'Hide',
                      Icon: EyeSlashIcon,
                      handleClick: () => handleUpdate(id, { isHidden: true, isHighlighted: false }),
                      disabled: updateArticleLoading,
                    },
                  ]),
              ...(isHidden
                ? []
                : [
                    {
                      text: 'View article',
                      Icon: GlobeIcon,
                      handleClick: () => handleGoToPage(slug),
                    },
                  ]),
              {
                text: 'Delete',
                Icon: TrashIcon,
                handleClick: () => handleDelete(id),
                disabled: deleteArticleLoading,
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
