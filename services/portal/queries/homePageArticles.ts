import { gql } from '@apollo/client'

import { CATEGORY_WITH_ARTICLES_FRAGMENT } from '../fragments'

export const GET_HOME_PAGE_ARTICLES = gql`
  query homePageArticles {
    homePageArticles {
      ...categoryWithArticles
    }
  }

  ${CATEGORY_WITH_ARTICLES_FRAGMENT}
`
