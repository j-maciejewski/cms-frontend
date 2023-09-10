import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
  fragment dashboardUser on User {
    id
    email
    firstName
    lastName
    avatar
    role
    isSuspended
    isAnonymous
  }
`
