import { Carousel, CategoryPreview, SectionHeader } from '@/components/portal'
import {
  HighlightedArticlesQuery,
  HighlightedArticlesQueryVariables,
  HomePageArticlesQuery,
  HomePageArticlesQueryVariables,
} from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { portalQueries } from '@/services'

export default async function () {
  const { data: highlightedArticlesData, error: highlightedArticlesError } = await getClient().query<
    HighlightedArticlesQuery,
    HighlightedArticlesQueryVariables
  >({
    query: portalQueries.GET_HIGHLIGHTED_ARTICLES,
  })

  const { data: articlesByCategoryData, error: articlesByCategoryError } = await getClient().query<
    HomePageArticlesQuery,
    HomePageArticlesQueryVariables
  >({ query: portalQueries.GET_HOME_PAGE_ARTICLES })

  if (highlightedArticlesError || articlesByCategoryError) {
    return (
      <>
        {JSON.stringify(highlightedArticlesError)} {JSON.stringify(articlesByCategoryError)}
      </>
    )
  }

  if (!highlightedArticlesData || !articlesByCategoryData) {
    return <>loading</>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-3 [&>*:not(:last-child)]:pb-3">
      {highlightedArticlesData?.highlightedArticles && highlightedArticlesData.highlightedArticles.length > 0 && (
        <div className="w-full">
          <SectionHeader title="Highlights" className="mb-4" />
          <Carousel articles={highlightedArticlesData?.highlightedArticles} />
        </div>
      )}

      {articlesByCategoryData.homePageArticles
        .filter((category) => category.articles && category.articles.length > 0)
        .map((category) => (
          <CategoryPreview key={category.id} category={category} />
        ))}
    </div>
  )
}
