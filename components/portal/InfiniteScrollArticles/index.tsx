'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

import { fetchArticles } from '@/actions/fetchArticles'
import { DisplayModes, useDisplayMode } from '@/context/DisplayModeProvider'
import { ArticlesByCategoryQuery, ArticlesGridInputFilter } from '@/gql/graphql'

import { ArticlePreview } from '../ArticlePreview'
import { Spinner } from "../Spinner"

interface IInfiniteScrollArticles {
  filter: ArticlesGridInputFilter
  initialArticles: ArticlesByCategoryQuery['articles']['rows']
  initialItemsCount: number
}

export const InfiniteScrollArticles = ({ filter, initialArticles, initialItemsCount }: IInfiniteScrollArticles) => {
  const { displayMode } = useDisplayMode()
  const [articles, setArticles] = useState(initialArticles)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const [totalItems, setTotalItems] = useState(initialItemsCount)

  async function loadMoreArticles() {
    const nextPage = page + 1
    const articles = await fetchArticles({ filter, page: nextPage })

    if (articles?.data?.articles) {
      setPage(nextPage)
      setTotalItems(articles.data.articles.total)
      setArticles((prev: ArticlesByCategoryQuery['articles']['rows'] | undefined) => [
        ...(prev?.length ? prev : []),
        ...articles.data.articles.rows,
      ])
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreArticles()
    }
  }, [inView])

  return (
    <>
      <div
        className={twMerge(
          'grid gap-4',
          displayMode === DisplayModes.TWO_PER_ROW && 'grid-cols-2',
          displayMode === DisplayModes.THREE_PER_ROW && 'grid-cols-3',
          displayMode === DisplayModes.FOUR_PER_ROW && 'grid-cols-4',
        )}
      >
        {articles.map((article, idx) => (
          <ArticlePreview key={idx} article={{ ...article }} />
        ))}
      </div>

      {articles.length < totalItems && (
        <div
          ref={ref}
          className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
        >
          <Spinner className="h-10 w-10 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  )
}
