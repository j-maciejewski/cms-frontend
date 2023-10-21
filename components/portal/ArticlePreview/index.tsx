'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { IMAGES_URL } from '@/consts'
import { DisplayModes, useDisplayMode } from '@/context/DisplayModeProvider'
import { ArticleInListFragment } from '@/gql/graphql'

import { ImageWithFallback } from '../ImageWithFallback'

interface IArticlePreview {
  article: ArticleInListFragment
}

export const ArticlePreview = ({ article }: IArticlePreview) => {
  const { displayMode } = useDisplayMode()
  const { id, title, slug, createdAt, leadImage, author } = article

  dayjs.extend(relativeTime)

  return (
    <div className="flex flex-col border-b-2 border-primary pb-2">
      <Link href={`/article/${slug}`} className="mx-auto block">
        <div className="aspect-[16/9] overflow-hidden">
          <ImageWithFallback
            className="mx-auto block w-full cursor-pointer object-cover hover:opacity-90"
            width={600}
            height={250}
            alt={title}
            src={`${IMAGES_URL}/${leadImage}`}
          />
        </div>
      </Link>
      <div className="mt-2 grow tracking-wider">
        <span
          className={twMerge(
            'box-decoration-clone font-medium',
            displayMode === DisplayModes.TWO_PER_ROW && 'text-[18px]',
            displayMode === DisplayModes.THREE_PER_ROW && 'text-[16px]',
            displayMode === DisplayModes.FOUR_PER_ROW && 'text-[14px]',
          )}
        >
          {title}
        </span>
      </div>
      <div
        className={twMerge(
          'mt-2 flex justify-between font-medium tracking-wider text-gray-400',
          displayMode === DisplayModes.TWO_PER_ROW && 'text-[14px]',
          displayMode === DisplayModes.THREE_PER_ROW && 'text-[12px]',
          displayMode === DisplayModes.FOUR_PER_ROW && 'text-[10px]',
        )}
      >
        <span>
          {author?.firstName} {author?.lastName}
        </span>
        <span>{dayjs(Number(createdAt)).fromNow()}</span>
      </div>
    </div>
  )
}
