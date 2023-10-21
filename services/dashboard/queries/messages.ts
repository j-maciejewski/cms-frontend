import { gql } from '@apollo/client'

import { MESSAGE_FRAGMENT } from '../fragments'

export const MESSAGES = gql`
  query dashboardMessages($grid: MessagesGridInput) {
    messages(grid: $grid) {
      total
      rows {
        ...dashboardMessage
      }
    }
  }

  ${MESSAGE_FRAGMENT}
`
