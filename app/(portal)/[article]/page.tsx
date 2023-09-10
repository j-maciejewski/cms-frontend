import { Article } from '@/components/portal'
import { getClient } from '@/lib/client'
import { ArticleQuery, ArticleQueryVariables } from '@/gql/graphql'
import { queries } from '@/services'

export default async function ({ params }: { params: { article: string } }) {
  const articleSlug = params?.article?.toLowerCase()

  const { data: articleData, error: articleError } = await getClient().query<ArticleQuery, ArticleQueryVariables>({
    query: queries.GET_ARTICLE,
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
