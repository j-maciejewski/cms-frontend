'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ArticleInListFragment } from '@/gql/graphql'
import { imageOnError } from '@/utils'

interface IArticlePreview {
  type?: 'main' | 'secondary' | 'normal'
  article: ArticleInListFragment
}

export const ArticlePreview = ({ article, type }: IArticlePreview) => {
  const { id, title, slug, createdAt, leadImage } = article

  return (
    <div
      className={`gap-2 pb-2 border-b-2 border-cyan-500 ${
        type === 'main'
          ? 'row-span-6 col-span-6'
          : type === 'secondary'
          ? 'row-span-3 col-span-3'
          : 'row-span-2 col-span-2'
      }`}
    >
      <Link href={`/article/${slug}`} className="block mx-auto">
        <div
          className={`relative overflow-hidden ${
            type === 'main' ? 'aspect-[21/9]' : type === 'secondary' ? 'aspect-[16/8]' : 'aspect-[16/9]'
          }`}
        >
          <Image
            className="absolute top-0 left-0 block mx-auto w-full hover:opacity-90 cursor-pointer object-cover"
            src={'/image-not-available.png'}
            alt={title}
            onError={imageOnError}
            width={500}
            height={500}
          />
          {(type === 'main' || type === 'secondary') && (
            <div className="absolute bottom-2 left-2 tracking-wider w-[calc(100%-1rem)]">
              <span className="py-1 px-2 bg-green2-light/80 text-[16px]/[36px] font-semibold box-decoration-clone">
                {title}
              </span>
            </div>
          )}
        </div>
      </Link>
      {!(type === 'main' || type === 'secondary') && (
        <div className="tracking-wider w-[calc(100% - .5rem)] mt-2">
          <span className="font-medium text-[14px] box-decoration-clone">{title}</span>
        </div>
      )}
    </div>
  )
}
