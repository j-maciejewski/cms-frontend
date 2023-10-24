'use server'

import {
  ArticlesGridInputFilter,
  PublicArticlesByCategoryQuery,
  PublicArticlesByCategoryQueryVariables,
} from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { publicQueries } from '@/services'

interface IFetchArticles {
  page?: number
  filter: ArticlesGridInputFilter
}

export const fetchArticles = async ({ page = 1, filter }: IFetchArticles) => {
  const articlesResponse = await getClient().query<
    PublicArticlesByCategoryQuery,
    PublicArticlesByCategoryQueryVariables
  >({
    query: publicQueries.PUBLIC_ARTICLES_BY_CATEGORY,
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
