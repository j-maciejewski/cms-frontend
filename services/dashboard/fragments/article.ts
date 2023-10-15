import { gql } from '@apollo/client'

export const ARTICLE_FRAGMENT = gql`
  fragment dashboardArticle on Article {
    id
    title
    slug
    leadImage
    content
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
