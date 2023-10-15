import { gql } from '@apollo/client'

import { ARTICLE_FRAGMENT } from '../fragments'

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: String!, $updateArticleInput: UpdateArticleInput!) {
    updateArticle(id: $id, updateArticleInput: $updateArticleInput) {
      ...dashboardArticle
    }
  }

  ${ARTICLE_FRAGMENT}
`
