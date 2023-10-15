import Image from 'next/image'
import Link from 'next/link'

import { IMAGES_URL } from '@/consts'
import { CategoryWithArticlesFragment } from '@/gql/graphql'

import { SectionHeader } from '../SectionHeader'

interface ICategoryPreview {
  category: CategoryWithArticlesFragment
}

export const CategoryPreview = ({ category }: ICategoryPreview) => {
  const [mainArticle, ...asideArticles] = category.articles ?? []

  return (
    <div className="w-full">
      <SectionHeader title={category.name} path={`/category/${category.slug}`} className="mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 row-span-2">
          <Link href={`article/${mainArticle?.slug}`}>
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                className="absolute left-0 top-0 h-full w-full object-cover duration-200 ease-in-out hover:scale-[1.01] hover:opacity-[.95]"
                width={600}
                height={250}
                alt={mainArticle?.title}
                src={`${IMAGES_URL}/${mainArticle.leadImage}`}
              />
              <div className="absolute bottom-2 left-2 w-[calc(100%-1rem)] tracking-wider">
                <span className="bg-primary/80 box-decoration-clone px-2 py-1 text-[20px]/[36px] font-semibold text-white">
                  {mainArticle?.title}
                </span>
              </div>
              {mainArticle.author && (
                <span className="absolute right-2 top-2 bg-primary/80 px-1.5 py-0.5 text-xs text-white">
                  {mainArticle?.author?.firstName} {mainArticle?.author?.lastName}
                </span>
              )}
            </div>
          </Link>
        </div>
        {asideArticles.map((article, idx) => (
          <div key={article.id} className={idx === 0 ? 'row-span-2' : ''}>
            <Link href={`/article/${article.slug}`}>
              <div className="relative aspect-[16/9] overflow-hidden duration-200 ease-in-out hover:opacity-90">
                <Image
                  className="absolute left-0 top-0 h-full w-full object-cover duration-200 ease-in-out hover:scale-[1.01] hover:opacity-[.95]"
                  width={480}
                  height={200}
                  alt={article.title}
                  src={`${IMAGES_URL}/${article.leadImage}`}
                />
              </div>
            </Link>
            <div className="w-[calc(100% - .5rem)] mt-2 tracking-wider hover:text-blue-700">
              <Link href={`/article/${article.slug}`}>
                <span className="box-decoration-clone text-[16px] font-medium">{article.title}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
