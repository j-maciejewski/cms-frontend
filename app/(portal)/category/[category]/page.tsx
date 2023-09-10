import { ArticlePreview } from '@/components/portal'
import { queries } from '@/services'
import { getClient } from '@/lib/client'
import { ArticlesByCategoryQuery, ArticlesByCategoryQueryVariables } from '@/gql/graphql'

export default async function ({ params }: { params: { category: string; page: string } }) {
  const categorySlug = params?.category?.toLowerCase()
  const page = Number(params?.page ?? 1)

  const { data: articlesData, error: articlesError } = await getClient().query<
    ArticlesByCategoryQuery,
    ArticlesByCategoryQueryVariables
  >({
    query: queries.GET_ARTICLES_BY_CATEGORY,
    variables: {
      grid: {
        offset: page - 1,
        filter: {
          categorySlug: categorySlug,
        },
      },
    },
  })

  if (articlesError) {
    return <>{JSON.stringify(articlesError)}</>
  }

  if (!articlesData) {
    return <>loading</>
  }
  return (
    <>
      {/* {articlesQuantity > 5 && (
        <Pagination currentPage={currentPage} pageCount={Math.ceil(articlesQuantity / 5)} categoryName={categoryEncodedName} />
      )} */}
      <div className="font-medium mb-4 text-[30px]">{categorySlug}</div>
      <div className="grid grid-cols-6 gap-4">
        {articlesData.articles.map((article, idx) => (
          <ArticlePreview
            key={article.id}
            type={idx === 0 ? 'main' : idx <= 2 ? 'secondary' : 'normal'}
            article={{ ...article }}
          />
        ))}
      </div>
      {/* {articlesQuantity > 5 && (
        <Pagination currentPage={currentPage} pageCount={Math.ceil(articlesQuantity / 5)} categoryName={categoryEncodedName} />
      )} */}
    </>
  )
}
