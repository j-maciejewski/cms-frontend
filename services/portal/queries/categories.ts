import { gql } from '@apollo/client'

import { PUBLIC_CATEGORY_FRAGMENT } from '../fragments'

export const PUBLIC_CATEGORIES = gql`
  query publicCategories {
    publicCategories {
      ...publicCategory
    }
  }

  ${PUBLIC_CATEGORY_FRAGMENT}
`
