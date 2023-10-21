import Link from 'next/link'

import { IMAGES_URL } from '@/consts'
import { ArticleFragment } from '@/gql/graphql'
import { formatDate } from '@/utils'

import { ImageWithFallback } from '../ImageWithFallback'
import { ShareButton } from '../ShareButton'

interface IArticle {
  article: ArticleFragment
}

export const Article = ({ article }: IArticle) => {
  return (
    <div>
      <div className="flex justify-between">
        <Link href={`/category/${article.category?.slug}`}>
          <span className="font-medium tracking-wider">{article.category?.name}</span>
        </Link>
        <div className="flex items-center">
          <span className="mr-3 text-[12px]">{formatDate(article.updatedAt)}</span>
          <ShareButton label={article.title} />
        </div>
      </div>
      <div className="my-4">
        <span className="bg-primary/80 box-decoration-clone p-2 text-[32px]/[64px] font-semibold text-white">
          {article.title}
        </span>
      </div>
      <div className="mb-4">
        <ImageWithFallback
          className="w-full object-cover"
          width={600}
          height={250}
          alt={article?.title}
          src={`${IMAGES_URL}/${article.leadImage}`}
        />
      </div>
      <div>
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>
      </div>
    </div>
  )
}
