import { Article } from '@/components/portal'
import { ArticleQuery, ArticleQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { portalQueries } from '@/services'

export default async function ({ params }: { params: { article: string } }) {
  // return <div>test</div>
  const articleSlug = params?.article?.toLowerCase()

  const { data: articleData, error: articleError } = await getClient().query<ArticleQuery, ArticleQueryVariables>({
    query: portalQueries.GET_ARTICLE,
    variables: {
      filter: {
        slug: articleSlug,
      },
    },
  })

  if (articleError) {
    return <>{JSON.stringify(articleError)}</>
  }

  if (!articleData || !articleData.article) {
    return <>loading</>
  }

  return (
    <>
      <Article article={articleData.article} />
    </>
  )
}
