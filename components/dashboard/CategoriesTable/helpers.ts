import { DashboardCategoryInListFragment } from '@/gql/graphql'

import { CategoriesTableHeadersKeys } from './consts'

export const dataRows = (
  categories: DashboardCategoryInListFragment[],
): Partial<Record<CategoriesTableHeadersKeys, any>>[] =>
  categories.map((dataRow) => {
    const { id, name, slug, isHidden, articlesCount } = dataRow

    return {
      id,
      name,
      isHidden,
      articlesCount,
      management: {
        id,
        slug,
        isHidden,
        articlesCount,
      },
    }
  })
