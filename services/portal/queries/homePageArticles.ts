import { gql } from '@apollo/client'

import { PUBLIC_CATEGORY_WITH_ARTICLES_FRAGMENT } from '../fragments'

export const PUBLIC_HOME_PAGE_ARTICLES = gql`
  query publicHomePageArticles {
    publicHomePageArticles {
      ...publicCategoryWithArticles
    }
  }

  ${PUBLIC_CATEGORY_WITH_ARTICLES_FRAGMENT}
`
