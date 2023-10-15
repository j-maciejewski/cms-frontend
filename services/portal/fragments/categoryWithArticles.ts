import { gql } from '@apollo/client'

export const CATEGORY_WITH_ARTICLES_FRAGMENT = gql`
  fragment categoryWithArticles on Category {
    id
    name
    slug

    articles {
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
    }
  }
`
