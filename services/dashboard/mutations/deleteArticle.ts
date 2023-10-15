import { gql } from '@apollo/client'

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: String!) {
    deleteArticle(id: $id) {
      id
    }
  }
`
