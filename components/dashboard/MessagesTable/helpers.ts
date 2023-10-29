import { DashboardMessageFragment } from '@/gql/graphql'

import { MessagesTableHeadersKeys } from './consts'

export const dataRows = (messagesList: DashboardMessageFragment[]): Partial<Record<MessagesTableHeadersKeys, any>>[] =>
  messagesList.map((dataRow) => {
    const { id, name, email, content } = dataRow

    return {
      id,
      name,
      email,
      content,
      management: {
        id,
      },
    }
  })
