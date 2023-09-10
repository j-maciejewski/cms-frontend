import { gql } from '@apollo/client'

import { ARTICLE_FRAGMENT } from '../fragments'

export const GET_ARTICLE = gql`
  query article($filter: ArticleFilterInput!) {
    article(filter: $filter) {
      ...article
    }
  }

  ${ARTICLE_FRAGMENT}
`
