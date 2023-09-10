import { CategoriesTable } from '@/components/dashboard/CategoriesTable'
import { DashboardCategoriesQuery, DashboardCategoriesQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { dashboardQueries } from '@/services'

import { CategoriesProvider } from './CategoriesProvider'

export const dynamic = 'force-dynamic'

export default async function () {
  const { data: categoriesData, error: categoriesError } = await getClient().query<
    DashboardCategoriesQuery,
    DashboardCategoriesQueryVariables
  >({
    query: dashboardQueries.CATEGORIES,
  })

  if (categoriesError) return <>{JSON.stringify({ categoriesError })}</>

  return (
    <CategoriesProvider categories={categoriesData.categories}>
      <CategoriesTable />
    </CategoriesProvider>
  )
}
