import { gql } from '@apollo/client'

export const PUBLIC_ARTICLE_FRAGMENT = gql`
  fragment publicArticle on PublicArticle {
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

    category {
      id
      name
      slug
    }
  }
`
