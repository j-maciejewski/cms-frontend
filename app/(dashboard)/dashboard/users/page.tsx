'use client'

import { useQuery } from '@apollo/client'

import { ErrorMessage, Spinner } from '@/components/dashboard'
import { UsersTable } from '@/components/dashboard/UsersTable'
import { DashboardUsersQuery, DashboardUsersQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import { UsersProvider } from './UsersProvider'

export const dynamic = 'force-dynamic'

export default function () {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery<DashboardUsersQuery, DashboardUsersQueryVariables>(dashboardQueries.USERS)

  if (usersLoading) return <Spinner className="m-auto h-16 w-16 animate-infinite-spin text-white" />

  if (usersError) return <ErrorMessage message={usersError.message} />

  return (
    <UsersProvider users={usersData?.users ?? []}>
      <UsersTable />
    </UsersProvider>
  )
}
