import { gql } from '@apollo/client'

export const CREATE_MESSAGE = gql`
  mutation createMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput)
  }
`
