import { gql } from '@apollo/client'

export const CATEGORY_IN_LIST_FRAGMENT = gql`
  fragment dashboardCategoryInList on Category {
    id
    name
    slug
    isHidden
    articlesCount
  }
`
