import Image from 'next/image'
import Link from 'next/link'

import { Article, Category } from '@/types'

import { SectionHeader } from '../SectionHeader'

interface ICategoryPreview {
  category: Category
  articles: Article[]
}

export const CategoryPreview = ({ category, articles }: ICategoryPreview) => {
  const [mainArticle, ...asideArticles] = articles

  return (
    <div className="w-full">
      <SectionHeader title={category.name} path={`/category/${category.encodedName}`} className="mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="row-span-2 col-span-2">
          <Link href={`article/${mainArticle._id}`}>
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover ease-in-out duration-200 hover:opacity-[.95] hover:scale-[1.01]"
                width={600}
                height={250}
                alt={mainArticle.title}
                src={mainArticle.image}
              />
              <div className="absolute bottom-2 left-2 tracking-wider w-[calc(100%-1rem)]">
                <span className="py-1 px-2 bg-green2-light/80 text-[20px]/[36px] font-semibold box-decoration-clone">
                  {mainArticle.title}
                </span>
              </div>
              <span className="absolute top-2 right-2 bg-green2-light/95 px-1.5 py-0.5 text-xs">
                {mainArticle.author}
              </span>
            </div>
          </Link>
        </div>
        {asideArticles.map((article, idx) => (
          <div key={article._id} className={idx === 0 ? 'row-span-2' : ''}>
            <Link href={`/article/${article._id}`}>
              <div className="relative aspect-[16/9] overflow-hidden ease-in-out duration-200 hover:opacity-90">
                <Image
                  className="absolute top-0 left-0 w-full h-full object-cover ease-in-out duration-200 hover:opacity-[.95] hover:scale-[1.01]"
                  width={480}
                  height={200}
                  alt={article.title}
                  src={'/image-not-available.png'}
                />
              </div>
            </Link>
            <div className="tracking-wider w-[calc(100% - .5rem)] mt-2">
              <span className="font-medium text-[16px] box-decoration-clone">{article.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
