import { UsersTable } from '@/components/dashboard/UsersTable'
import { DashboardUsersQuery, DashboardUsersQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { dashboardQueries } from '@/services'

import { UsersProvider } from './UsersProvider'

export const dynamic = 'force-dynamic'

export default async function () {
  const { data: usersData, error: usersError } = await getClient().query<
    DashboardUsersQuery,
    DashboardUsersQueryVariables
  >({
    query: dashboardQueries.USERS,
  })

  if (usersError) return <>{JSON.stringify({ usersError })}</>

  return (
    <UsersProvider users={usersData.users}>
      <UsersTable />
    </UsersProvider>
  )
}
