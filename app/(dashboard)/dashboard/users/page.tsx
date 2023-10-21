'use client'

import { useQuery } from '@apollo/client'

import { ErrorMessage, Spinner } from '@/components/dashboard'
import { UsersTable } from '@/components/dashboard/UsersTable'
import { GridProvider } from '@/context'
import { DashboardUsersQuery, DashboardUsersQueryVariables, UsersGridInput } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { getGrid } from '@/utils'

import { UsersProvider } from './UsersProvider'

export const dynamic = 'force-dynamic'

export default function ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const grid: UsersGridInput = searchParams ? getGrid(searchParams) : {}

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery<DashboardUsersQuery, DashboardUsersQueryVariables>(dashboardQueries.USERS, {
    variables: { grid },
    notifyOnNetworkStatusChange: true,
  })

  if (usersLoading) return <Spinner className="m-auto h-16 w-16 animate-infinite-spin text-white" />

  if (usersError) return <ErrorMessage message={usersError.message} />

  return (
    <GridProvider
      grid={grid}
      totalItems={usersData?.users?.total ?? 0}
      currentItems={usersData?.users?.rows?.length ?? 0}
    >
      <UsersProvider users={usersData?.users?.rows ?? []} refetchUsers={refetchUsers}>
        <UsersTable />
      </UsersProvider>
    </GridProvider>
  )
}
