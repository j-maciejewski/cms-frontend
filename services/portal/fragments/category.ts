import { gql } from '@apollo/client'

export const CATEGORY_FRAGMENT = gql`
  fragment category on Category {
    id
    name
    slug
  }
`
