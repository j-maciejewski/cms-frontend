import { gql } from '@apollo/client'

export const ARTICLE_FRAGMENT = gql`
  fragment article on Article {
    id
    content
    createdAt
    isHidden
    leadImage
    slug
    title
    updatedAt

    author {
      avatar
      firstName
      lastName
      id
    }

    category {
      id
      name
      slug
    }
  }
`
