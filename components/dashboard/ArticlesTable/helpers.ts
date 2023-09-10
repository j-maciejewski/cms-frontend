import { DashboardArticleInListFragment } from '@/gql/graphql'
import { ArticlesTableHeadersKeys } from './consts'

export const dataRows = (
  articlesList: DashboardArticleInListFragment[],
): Partial<Record<ArticlesTableHeadersKeys, any>>[] =>
  articlesList.map((dataRow) => {
    const { id, title, author, category } = dataRow

    return {
      id: id,
      title: title,
      author: author ? `${author.firstName} ${author.lastName}` : null,
      category: category?.name ?? null,
    }
  })
