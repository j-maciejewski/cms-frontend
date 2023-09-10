import { gql } from '@apollo/client'

import { CATEGORY_FRAGMENT } from '../fragments'

export const GET_CATEGORIES = gql`
  query categories {
    categories {
      ...category
    }
  }

  ${CATEGORY_FRAGMENT}
`
