import { gql } from '@apollo/client'

import { CATEGORY_FRAGMENT } from '../fragments'

export const CATEGORY = gql`
  query dashboardCategory($id: String!) {
    category(id: $id) {
      ...dashboardCategory
      articlesCount
    }
  }

  ${CATEGORY_FRAGMENT}
`
