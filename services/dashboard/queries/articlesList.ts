import { gql } from '@apollo/client'

import { ARTICLE_IN_LIST_FRAGMENT } from '@/services/dashboard/fragments/articleInList'

export const ARTICLES_LIST = gql`
  query dashboardArticles($grid: ArticlesGridInput) {
    articles(grid: $grid) {
      total
      rows {
        ...dashboardArticleInList
      }
    }
  }

  ${ARTICLE_IN_LIST_FRAGMENT}
`
