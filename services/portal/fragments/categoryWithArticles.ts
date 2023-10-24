import { gql } from '@apollo/client'

export const PUBLIC_CATEGORY_WITH_ARTICLES_FRAGMENT = gql`
  fragment publicCategoryWithArticles on PublicCategory {
    id
    name
    slug

    articles {
      id
      content
      createdAt
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
