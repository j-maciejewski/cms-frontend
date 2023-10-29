import { gql } from '@apollo/client'

import { CATEGORY_IN_LIST_FRAGMENT } from '../fragments'

export const CATEGORIES = gql`
  query dashboardCategories {
    categories {
      ...dashboardCategoryInList
    }
  }

  ${CATEGORY_IN_LIST_FRAGMENT}
`
