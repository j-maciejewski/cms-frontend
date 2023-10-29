import { fetchPublicArticles } from '@/actions'
import { ArticlesGroupHeader, InfiniteScrollArticles, PageWrapper } from '@/components/portal'
import { ArticlesGridInputFilter } from '@/gql/graphql'

export default async function ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const searchQuery = typeof searchParams?.q === 'string' ? searchParams?.q : ''

  const filter: ArticlesGridInputFilter = {
    fullText: searchQuery,
  }

  const { data: articlesData, error: articlesError } = await fetchPublicArticles({ filter })

  if (articlesError) {
    return <>{JSON.stringify(articlesError)}</>
  }

  if (!articlesData) {
    return <>loading</>
  }

  return (
    <PageWrapper>
      {articlesData.publicArticles.total === 0 ? (
        <>
          <ArticlesGroupHeader label={`No articles found for: ${searchQuery}`} />
        </>
      ) : (
        <>
          <ArticlesGroupHeader label={`Found ${articlesData.publicArticles.total} articles for: ${searchQuery}`} />
          <InfiniteScrollArticles
            filter={filter}
            initialArticles={articlesData.publicArticles.rows}
            initialItemsCount={articlesData.publicArticles.total}
          />
        </>
      )}
    </PageWrapper>
  )
}
