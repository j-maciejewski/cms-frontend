import { gql } from '@apollo/client'

export const CATEGORY_FRAGMENT = gql`
  fragment dashboardCategory on Category {
    id
    name
    slug
  }
`
