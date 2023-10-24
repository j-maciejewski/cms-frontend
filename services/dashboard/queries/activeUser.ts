import { gql } from '@apollo/client'

export const ACTIVE_USER = gql`
  query activeUser {
    activeUser {
      id
      firstName
      lastName
      email
      avatar
    }
  }
`
