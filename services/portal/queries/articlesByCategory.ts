import { gql } from '@apollo/client'

import { ARTICLE_IN_LIST_FRAGMENT } from '../fragments'

export const GET_ARTICLES_BY_CATEGORY = gql`
  query articlesByCategory($grid: ArticlesGridInput) {
    articles(grid: $grid) {
      total
      rows {
        ...articleInList
      }
    }
  }

  ${ARTICLE_IN_LIST_FRAGMENT}
`
