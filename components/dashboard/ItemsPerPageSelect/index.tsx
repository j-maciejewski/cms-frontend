'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ChevronIcon } from '@/components/icons'
import { useGrid } from '@/context/GridProvider'
import { useOutsideClick } from '@/hooks'

export const ItemsPerPageSelect = ({ options }: { options: number[] }) => {
  const { grid, handleChange } = useGrid()
  const [isSelectorOpen, setSelector] = useState(false)

  const toggleSelector = () => setSelector((prev) => !prev)
  const closeSelector = () => setSelector(false)

  const onChangeItemsPerPage = (value: number) => () => {
    handleChange('limit', value)
    closeSelector()
  }

  const selectorWrapperRef = useOutsideClick<HTMLDivElement>(closeSelector)

  return (
    <div ref={selectorWrapperRef} className="group relative">
      <button
        onClick={toggleSelector}
        className="z-10 inline-flex h-10 flex-shrink-0 items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-800"
        type="button"
      >
        {grid.limit ?? 10} per page
        <ChevronIcon className="ml-2.5 h-2.5 w-2.5" />
      </button>
      <div
        className={twMerge(
          'absolute bottom-[115%] z-10 w-full divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700',
          !isSelectorOpen && 'hidden',
        )}
      >
        <ul className="py-2 text-sm dark:text-gray-200" aria-labelledby="states-button">
          {options.map((value, idx) => (
            <li key={idx}>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onChangeItemsPerPage(value)}
              >
                <div className="inline-flex items-center">{value} per page</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
