import { InfiniteScrollArticles } from '@/components/portal'
import { CategoryNameHeader } from '@/components/portal/CategoryNameHeader'
import { ArticlesGridInputFilter } from '@/gql/graphql'

import { fetchArticles } from '../../../../actions'

export default async function ({ params }: { params: { category: string } }) {
  const categorySlug = params?.category?.toLowerCase()

  const filter: ArticlesGridInputFilter = {
    categorySlug,
  }

  const { data: articlesData, error: articlesError } = await fetchArticles({ filter })

  if (articlesError) {
    return <>{JSON.stringify(articlesError)}</>
  }

  if (!articlesData) {
    return <>loading</>
  }

  return (
    <>
      <CategoryNameHeader slug={categorySlug} />
      <InfiniteScrollArticles
        filter={filter}
        initialArticles={articlesData.articles.rows}
        initialItemsCount={articlesData.articles.total}
      />
    </>
  )
}
