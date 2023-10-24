import { Article, PageWrapper } from '@/components/portal'
import { PublicArticleQuery, PublicArticleQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { publicQueries } from '@/services'

export default async function ({ params }: { params: { article: string } }) {
  const articleSlug = params?.article?.toLowerCase()

  const { data: articleData, error: articleError } = await getClient().query<
    PublicArticleQuery,
    PublicArticleQueryVariables
  >({
    query: publicQueries.PUBLIC_ARTICLE,
    variables: {
      filter: {
        slug: articleSlug,
      },
    },
  })

  if (articleError) {
    return <>{JSON.stringify(articleError)}</>
  }

  if (!articleData || !articleData.publicArticle) {
    return <>loading</>
  }

  return (
    <PageWrapper>
      <Article article={articleData.publicArticle} />
    </PageWrapper>
  )
}
