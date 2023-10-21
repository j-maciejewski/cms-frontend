import { fetchArticles } from '@/actions'
import { ArticlesGroupHeader, DisplayModeButtons, InfiniteScrollArticles } from '@/components/portal'
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
          <ArticlesGroupHeader label={`Found ${articlesData.articles.total} articles for: ${searchQuery}`} />
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
