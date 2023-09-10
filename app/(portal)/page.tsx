import { Carousel, CategoryPreview, SectionHeader } from '@/components/portal'
import { Article, Category } from '@/types'
import { fetcher } from '@/utils'

export default async function () {
  const { data: highlightedArticlesData, error: highlightedArticlesError } = await fetcher<{ articles: Article[] }>(
    `/articles/highlights`,
    {
      next: { revalidate: 10 },
    },
  )

  const { data: articlesByCategoryData, error: articlesByCategoryError } = await fetcher<{
    categories: (Category & { articles: Article[] })[]
  }>(`/articles/each-category`, {
    next: { revalidate: 10 },
  })

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
    <div className="flex min-h-screen flex-col items-center justify-between gap-3 [&>*:not(:last-child)]:pb-3 [&>*:not(:last-child)]:border-b-2 [&>*:not(:last-child)]:border-sky-500">
      <div>
        <SectionHeader title="Highlights" className="mb-4" />
        <Carousel articles={highlightedArticlesData?.articles} />
      </div>

      {articlesByCategoryData.categories.map(({ articles, ...category }) => (
        <CategoryPreview key={category._id} category={category} articles={articles} />
      ))}
    </div>
  )
}
