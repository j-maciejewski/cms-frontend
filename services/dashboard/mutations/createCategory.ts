import { gql } from '@apollo/client'

import { CATEGORY_FRAGMENT } from '../fragments'

export const CREATE_CATEGORY = gql`
  mutation createCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      ...dashboardCategory
    }
  }

  ${CATEGORY_FRAGMENT}
`
