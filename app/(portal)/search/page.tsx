import { fetchArticles } from '@/actions'
import { DisplayModeButtons, InfiniteScrollArticles } from '@/components/portal'
import { ArticlesGridInputFilter } from '@/gql/graphql'

export default async function ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const searchQuery = typeof searchParams?.q === 'string' ? searchParams?.q : ''

  const filter: ArticlesGridInputFilter = {
    fullText: searchQuery,
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
      {articlesData.articles.total === 0 ? (
        <div className="flex justify-between">
          <h3>No articles found for: {searchQuery}</h3>
          <DisplayModeButtons />
        </div>
      ) : (
        <>
          <div className="mb-4 text-[20px] font-medium">
            Found {articlesData.articles.total} articles for: {searchQuery}
          </div>
          <InfiniteScrollArticles
            filter={filter}
            initialArticles={articlesData.articles.rows}
            initialItemsCount={articlesData.articles.total}
          />
        </>
      )}
    </>
  )
}
