import { DashboardArticleInListFragment } from '@/gql/graphql'

import { ArticlesTableHeadersKeys } from './consts'

export const dataRows = (
  articlesList: DashboardArticleInListFragment[],
): Partial<Record<ArticlesTableHeadersKeys, any>>[] =>
  articlesList.map((dataRow) => {
    const { id, title, slug, author, category, isHidden, isHighlighted } = dataRow

    return {
      id,
      title,
      slug,
      author: author ? `${author.firstName} ${author.lastName}` : null,
      category: category?.name ?? null,
      isHidden,
      isHighlighted,
      management: {
        id,
        slug,
        isHidden,
        isHighlighted,
      },
    }
  })
