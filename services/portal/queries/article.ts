import { gql } from '@apollo/client'

import { PUBLIC_ARTICLE_FRAGMENT } from '../fragments'

export const PUBLIC_ARTICLE = gql`
  query publicArticle($filter: ArticleFilterInput!) {
    publicArticle(filter: $filter) {
      ...publicArticle
    }
  }

  ${PUBLIC_ARTICLE_FRAGMENT}
`
