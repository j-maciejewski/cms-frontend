'use client'

import { useQuery } from '@apollo/client'

import { ErrorMessage, Spinner } from '@/components/dashboard'
import { CategoriesTable } from '@/components/dashboard/CategoriesTable'
import { DashboardCategoriesQuery, DashboardCategoriesQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import { CategoriesProvider } from './CategoriesProvider'

export const dynamic = 'force-dynamic'

export default function () {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<DashboardCategoriesQuery, DashboardCategoriesQueryVariables>(dashboardQueries.CATEGORIES)

  if (categoriesLoading) return <Spinner className="m-auto h-16 w-16 animate-infinite-spin text-white" />

  if (categoriesError) return <ErrorMessage message={categoriesError.message} />

  return (
    <CategoriesProvider categories={categoriesData?.categories ?? []}>
      <CategoriesTable />
    </CategoriesProvider>
  )
}
