import { gql } from '@apollo/client'

export const MESSAGE_FRAGMENT = gql`
  fragment dashboardMessage on Message {
    id
    name
    email
    content
    replySent
  }
`
