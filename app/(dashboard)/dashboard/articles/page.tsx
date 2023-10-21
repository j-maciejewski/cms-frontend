'use client'

import { useQuery } from '@apollo/client'

import { ArticlesTable, ErrorMessage, Spinner } from '@/components/dashboard'
import { GridProvider } from '@/context'
import { ArticlesGridInput, DashboardArticlesQuery, DashboardArticlesQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { getGrid } from '@/utils'

import { ArticlesProvider } from './ArticlesProvider'

export const dynamic = 'force-dynamic'

export default function ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const grid: ArticlesGridInput = searchParams ? getGrid(searchParams) : {}

  const {
    data: articlesData,
    loading: articlesLoading,
    error: articlesError,
    refetch: refetchArticles,
  } = useQuery<DashboardArticlesQuery, DashboardArticlesQueryVariables>(dashboardQueries.ARTICLES_LIST, {
    variables: { grid },
    notifyOnNetworkStatusChange: true,
  })

  if (articlesLoading) return <Spinner className="m-auto h-16 w-16 animate-infinite-spin text-white" />

  if (articlesError) return <ErrorMessage message={articlesError.message} />

  return (
    <>
      <GridProvider
        grid={grid}
        totalItems={articlesData?.articles?.total ?? 0}
        currentItems={articlesData?.articles?.rows?.length ?? 0}
      >
        <ArticlesProvider articles={articlesData?.articles?.rows ?? []} refetchArticles={refetchArticles}>
          <ArticlesTable />
        </ArticlesProvider>
      </GridProvider>
    </>
  )
}
