import { gql } from '@apollo/client'

import { ARTICLE_FRAGMENT } from '../fragments'

export const CREATE_ARTICLE = gql`
  mutation createArticle($createArticleInput: CreateArticleInput!) {
    createArticle(createArticleInput: $createArticleInput) {
      ...dashboardArticle
    }
  }

  ${ARTICLE_FRAGMENT}
`
