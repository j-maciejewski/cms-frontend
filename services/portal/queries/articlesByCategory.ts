import { gql } from '@apollo/client'

import { PUBLIC_ARTICLE_IN_LIST_FRAGMENT } from '../fragments'

export const PUBLIC_ARTICLES_BY_CATEGORY = gql`
  query publicArticlesByCategory($grid: ArticlesGridInput) {
    publicArticles(grid: $grid) {
      total
      rows {
        ...publicArticleInList
      }
    }
  }

  ${PUBLIC_ARTICLE_IN_LIST_FRAGMENT}
`
