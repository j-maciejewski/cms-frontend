'use server'

import {
  ArticlesGridInputFilter,
  PublicArticlesByCategoryQuery,
  PublicArticlesByCategoryQueryVariables,
} from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { publicQueries } from '@/services'

interface IFetchPublicArticles {
  page?: number
  filter: ArticlesGridInputFilter
}

export const fetchPublicArticles = async ({ page = 1, filter }: IFetchPublicArticles) => {
  const publicArticlesResponse = await getClient().query<
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

  return publicArticlesResponse
}
