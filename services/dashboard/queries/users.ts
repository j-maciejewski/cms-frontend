import { gql } from '@apollo/client'

import { USER_FRAGMENT } from '../fragments'

export const USERS = gql`
  query dashboardUsers {
    users {
      ...dashboardUser
    }
  }

  ${USER_FRAGMENT}
`
