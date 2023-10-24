import { gql } from '@apollo/client'

export const PUBLIC_ARTICLE_IN_LIST_FRAGMENT = gql`
  fragment publicArticleInList on PublicArticle {
    id
    title
    slug
    createdAt
    leadImage
    author {
      id
      firstName
      lastName
    }
  }
`
