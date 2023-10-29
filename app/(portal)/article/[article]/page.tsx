import { redirect } from 'next/navigation'

import { Article, PageWrapper } from '@/components/portal'
import { PublicArticle, PublicArticleQuery, PublicArticleQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { publicQueries } from '@/services'

import Loading from '../../loading'

export default async function ({ params }: { params: { article: string } }) {
  const articleSlug = params?.article?.toLowerCase()

  const {
    data: articleData,
    loading: articleLoading,
    error: articleError,
  } = await getClient().query<PublicArticleQuery, PublicArticleQueryVariables>({
    query: publicQueries.PUBLIC_ARTICLE,
    variables: {
      filter: {
        slug: articleSlug,
      },
    },
  })

  if (articleError || (!articleLoading && !articleData.publicArticle)) {
    redirect('/')
  }

  if (articleLoading) {
    return <Loading />
  }

  return (
    <PageWrapper>
      <Article article={articleData.publicArticle as PublicArticle} />
    </PageWrapper>
  )
}
