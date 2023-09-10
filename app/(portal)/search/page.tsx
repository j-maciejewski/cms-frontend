import { ArticlePreview } from '@/components/portal'
import { Article } from '@/types'
import { fetcher } from '@/utils'

export default async function ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const searchQuery = searchParams?.q

  const { data: articlesData, error: articlesError } = await fetcher<{ articles: Article[]; quantity: number }>(
    `/articles/search/${searchQuery}`,
    {
      next: { revalidate: 10 },
    },
  )

  if (articlesError) {
    return <>{JSON.stringify(articlesError)}</>
  }

  if (!articlesData) {
    return <>loading</>
  }

  return (
    <>
      {articlesData.quantity === 0 ? (
        <h3>No articles found for: {searchQuery}</h3>
      ) : (
        <>
          <div className="font-medium mb-4 text-[20px]">
            Found {articlesData.quantity} articles for: {searchQuery}
          </div>
          <div className="grid grid-cols-6 gap-4">
            {articlesData.articles.map((article) => (
              <ArticlePreview key={article._id} article={{ ...article }} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
