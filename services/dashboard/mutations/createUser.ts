import { gql } from '@apollo/client'

import { USER_FRAGMENT } from '../fragments'

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ...dashboardUser
    }
  }

  ${USER_FRAGMENT}
`
