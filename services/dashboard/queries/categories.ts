import { gql } from '@apollo/client'

import { CATEGORY_FRAGMENT } from '../fragments'

export const CATEGORIES = gql`
  query dashboardCategories {
    categories {
      ...dashboardCategory
    }
  }

  ${CATEGORY_FRAGMENT}
`
