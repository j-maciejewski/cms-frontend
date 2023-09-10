import { Article as TArticle } from '../../../types'
import Link from 'next/link'
import { ShareNodesIcon } from '../../icons'
import { ArticleFragment } from '@/gql/graphql'

interface IArticle {
  article: ArticleFragment
}

export const Article = ({ article }: IArticle) => {
  // const { categories } = useContext(CategoriesContext)

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
        <Link href={`/${article.category?.slug}`}>
          <span className="uppercase font-medium">{article.category?.name}</span>
        </Link>
        <div className="flex items-center">
          <span className="text-[12px]">{new Date(article.createdAt).toLocaleDateString()}</span>
          <button className="ml-3">
            <ShareNodesIcon height={16} />
          </button>
        </div>
      </div>
      <div className="my-4">
        <span className="text-[34px]/[68px] font-semibold bg-green2-light/80 box-decoration-clone p-2">
          {article.title}
        </span>
      </div>
      <div>
        <img src={article.leadImage} alt={article.title} />
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
