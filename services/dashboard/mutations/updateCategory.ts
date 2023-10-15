import { gql } from '@apollo/client'

import { CATEGORY_FRAGMENT } from '../fragments'

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: String!, $updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {
      ...dashboardCategory
    }
  }

  ${CATEGORY_FRAGMENT}
`
