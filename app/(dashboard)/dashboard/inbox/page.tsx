'use client'

import { useQuery } from '@apollo/client'

import { ErrorMessage, MessagesTable, Spinner } from '@/components/dashboard'
import { GridProvider } from '@/context'
import { DashboardMessagesQuery, DashboardMessagesQueryVariables, MessagesGridInput } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { getGrid } from '@/utils'

import { MessagesProvider } from './MessagesProvider'

export const dynamic = 'force-dynamic'

export default function ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const grid: MessagesGridInput = searchParams ? getGrid(searchParams) : {}

  const {
    data: messagesData,
    loading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery<DashboardMessagesQuery, DashboardMessagesQueryVariables>(dashboardQueries.MESSAGES, {
    variables: { grid },
    notifyOnNetworkStatusChange: true,
  })

  if (messagesLoading) return <Spinner className="m-auto h-16 w-16 animate-infinite-spin text-white" />

  if (messagesError) return <ErrorMessage message={messagesError.message} />

  return (
    <GridProvider
      grid={grid}
      totalItems={messagesData?.messages?.total ?? 0}
      currentItems={messagesData?.messages?.rows?.length ?? 0}
    >
      <MessagesProvider messages={messagesData?.messages?.rows ?? []} refetchMessages={refetchMessages}>
        <MessagesTable />
      </MessagesProvider>
    </GridProvider>
  )
}
