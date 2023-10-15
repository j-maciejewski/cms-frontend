import { gql } from '@apollo/client'

export const BASIC_CATEGORY_FRAGMENT = gql`
  fragment basicDashboardCategory on Category {
    id
    name
  }
`
