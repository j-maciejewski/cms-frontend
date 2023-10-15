import { gql } from '@apollo/client'

import { BASIC_CATEGORY_FRAGMENT } from '../fragments'

export const BASIC_CATEGORIES = gql`
  query basicDashboardCategories {
    categories {
      ...basicDashboardCategory
    }
  }

  ${BASIC_CATEGORY_FRAGMENT}
`
