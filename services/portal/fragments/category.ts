import { gql } from '@apollo/client'

export const PUBLIC_CATEGORY_FRAGMENT = gql`
  fragment publicCategory on PublicCategory {
    id
    name
    slug
  }
`
