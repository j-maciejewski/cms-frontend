import { gql } from '@apollo/client'

export const ARTICLE_IN_LIST_FRAGMENT = gql`
  fragment articleInList on Article {
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
