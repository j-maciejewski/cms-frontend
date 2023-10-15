'use server'

import { ArticlesByCategoryQuery, ArticlesByCategoryQueryVariables, ArticlesGridInputFilter } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { portalQueries } from '@/services'

interface IFetchArticles {
  page?: number
  filter: ArticlesGridInputFilter
}

export const fetchArticles = async ({ page = 1, filter }: IFetchArticles) => {
  const articlesResponse = await getClient().query<ArticlesByCategoryQuery, ArticlesByCategoryQueryVariables>({
    query: portalQueries.GET_ARTICLES_BY_CATEGORY,
    variables: {
      grid: {
        limit: 24,
        page: page,
        filter,
      },
    },
  })

  return articlesResponse
}
