import { gql } from '@apollo/client'

export const ARTICLE_IN_LIST_FRAGMENT = gql`
  fragment dashboardArticleInList on Article {
    id
    title
    slug
    createdAt
    isHidden
    isHighlighted
    author {
      id
      firstName
      lastName
    }
    category {
      id
      name
      slug
    }
  }
`
