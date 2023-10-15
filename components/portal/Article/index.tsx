import Image from 'next/image'
import Link from 'next/link'

import { IMAGES_URL } from '@/consts'
import { ArticleFragment } from '@/gql/graphql'
import { formatDate } from '@/utils'

import { ShareNodesIcon } from '../../icons'

interface IArticle {
  article: ArticleFragment
}

export const Article = ({ article }: IArticle) => {
  // https://www.onet.pl/

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${article.title} https://www.onet.pl/article/5edb93db7310ae2580f5d8dc`,
  )}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    'https://www.onet.pl/article/5edb93db7310ae2580f5d8dc',
  )}`

  return (
    <div>
      <div className="flex justify-between">
        <Link href={`/category/${article.category?.slug}`}>
          <span className="font-semibold uppercase">{article.category?.name}</span>
        </Link>
        <div className="flex items-center">
          <span className="text-[12px]">{formatDate(article.updatedAt)}</span>
          <button className="ml-3">
            <ShareNodesIcon height={16} />
          </button>
        </div>
      </div>
      <div className="my-4">
        <span className="bg-primary/80 box-decoration-clone p-2 text-[32px]/[64px] font-semibold text-white">
          {article.title}
        </span>
      </div>
      <div className="mb-4">
        <Image
          className="w-full object-cover"
          width={600}
          height={250}
          alt={article?.title}
          src={`${IMAGES_URL}/${article.leadImage}`}
        />
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
      <div>
        <a href={facebookShareUrl} target="_blank">
          fb
        </a>
      </div>
      <div>
        <a href={twitterShareUrl} target="_blank">
          twitter
        </a>
      </div>
    </div>
  )
}
