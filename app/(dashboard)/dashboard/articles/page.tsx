import { ArticlesTable } from '@/components/dashboard'
import { GridProvider } from '@/context'
import { ArticlesGridInput, DashboardArticlesQuery, DashboardArticlesQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { dashboardQueries } from '@/services'
import { getGrid } from '@/utils'

import { ArticlesProvider } from './ArticlesProvider'

export const dynamic = 'force-dynamic'

export default async function ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const grid: ArticlesGridInput = searchParams ? getGrid(searchParams) : {}

  const { data: articlesData, error: articlesError } = await getClient().query<
    DashboardArticlesQuery,
    DashboardArticlesQueryVariables
  >({
    query: dashboardQueries.ARTICLES_LIST,
    variables: {
      grid,
    },
  })

  if (articlesError) return <>{JSON.stringify({ articlesError })}</>

  return (
    <>
      <GridProvider
        grid={grid}
        totalItems={articlesData.articles.total}
        currentItems={articlesData.articles.rows.length}
      >
        <ArticlesProvider articles={articlesData.articles.rows}>
          <ArticlesTable />
        </ArticlesProvider>
      </GridProvider>
    </>
  )
}
