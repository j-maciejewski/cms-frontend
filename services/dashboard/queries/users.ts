import { gql } from '@apollo/client'

import { USER_FRAGMENT } from '../fragments'

export const USERS = gql`
  query dashboardUsers($grid: UsersGridInput) {
    users(grid: $grid) {
      total
      rows {
        ...dashboardUser
      }
    }
  }

  ${USER_FRAGMENT}
`
