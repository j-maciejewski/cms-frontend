import { gql } from '@apollo/client'

import { USER_FRAGMENT } from '../fragments'

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      ...dashboardUser
    }
  }

  ${USER_FRAGMENT}
`
