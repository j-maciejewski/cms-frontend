import { gql } from '@apollo/client'

import { PUBLIC_ARTICLE_FRAGMENT } from '../fragments'

export const PUBLIC_HIGHLIGHTED_ARTICLES = gql`
  query publicHighlightedArticles {
    publicHighlightedArticles {
      ...publicArticle
    }
  }

  ${PUBLIC_ARTICLE_FRAGMENT}
`
