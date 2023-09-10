import { DashboardCategoryFragment } from '@/gql/graphql'

import { CategoriesTableHeadersKeys } from './consts'

export const dataRows = (categories: DashboardCategoryFragment[]): Partial<Record<CategoriesTableHeadersKeys, any>>[] =>
  categories.map((dataRow) => {
    const { id, name, articlesCount } = dataRow

    return {
      id: id,
      name: name,
      articlesCount: articlesCount,
    }
  })
