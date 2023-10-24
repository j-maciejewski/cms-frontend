import { Carousel, CategoryPreview, SectionHeader } from '@/components/portal'
import {
  PublicHighlightedArticlesQuery,
  PublicHighlightedArticlesQueryVariables,
  PublicHomePageArticlesQuery,
  PublicHomePageArticlesQueryVariables,
} from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { publicQueries } from '@/services'
import Loading from "./loading"

export default async function () {
  const { data: highlightedArticlesData, error: highlightedArticlesError } = await getClient().query<
    PublicHighlightedArticlesQuery,
    PublicHighlightedArticlesQueryVariables
  >({
    query: publicQueries.PUBLIC_HIGHLIGHTED_ARTICLES,
  })

  const { data: articlesByCategoryData, error: articlesByCategoryError } = await getClient().query<
    PublicHomePageArticlesQuery,
    PublicHomePageArticlesQueryVariables
  >({ query: publicQueries.PUBLIC_HOME_PAGE_ARTICLES })

  if (highlightedArticlesError || articlesByCategoryError) {
    return (
      <>
        {JSON.stringify(highlightedArticlesError)} {JSON.stringify(articlesByCategoryError)}
      </>
    )
  }

  if (!highlightedArticlesData || !articlesByCategoryData) {
    return <Loading />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-3 [&>*:not(:last-child)]:pb-3">
      {highlightedArticlesData?.publicHighlightedArticles &&
        highlightedArticlesData.publicHighlightedArticles.length > 0 && (
          <div className="w-full">
            <SectionHeader title="Highlights" className="mb-4" />
            <Carousel articles={highlightedArticlesData?.publicHighlightedArticles} />
          </div>
        )}

      {articlesByCategoryData.publicHomePageArticles
        .filter((category) => category.articles && category.articles.length > 0)
        .map((category) => (
          <CategoryPreview key={category.id} category={category} />
        ))}
    </div>
  )
}
