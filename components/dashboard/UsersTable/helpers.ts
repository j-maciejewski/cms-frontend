import { DashboardUserFragment } from '@/gql/graphql'

import { UsersTableHeadersKeys } from './consts'

export const dataRows = (users: DashboardUserFragment[]): Partial<Record<UsersTableHeadersKeys, any>>[] =>
  users.map((dataRow) => {
    const { id, email, firstName, lastName, avatar, role, isSuspended, isAnonymous } = dataRow

    return {
      id,
      email,
      name: `${firstName} ${lastName}`,
      avatar: avatar,
      role,
      isSuspended,
      isAnonymous,
      management: {
        id,
        isAnonymous,
        isSuspended,
      },
    } as Partial<Record<UsersTableHeadersKeys, any>>
  })
