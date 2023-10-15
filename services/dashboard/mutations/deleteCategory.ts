import { gql } from '@apollo/client'

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`
