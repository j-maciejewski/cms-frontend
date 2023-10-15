import { gql } from '@apollo/client'

import { ARTICLE_FRAGMENT } from '../fragments'

export const GET_HIGHLIGHTED_ARTICLES = gql`
  query highlightedArticles {
    highlightedArticles {
      ...article
    }
  }

  ${ARTICLE_FRAGMENT}
`
