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
    <div ref={selectorWrapperRef} className="relative group">
      <button
        onClick={toggleSelector}
        className="h-10 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm text-center text-gray-500 hover:text-gray-700 bg-white rounded-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
        type="button"
      >
        {grid.limit ?? 10} per page
        <ChevronIcon className="w-2.5 h-2.5 ml-2.5" />
      </button>
      <div
        className={twMerge(
          'z-10 absolute bottom-[115%] bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700',
          !isSelectorOpen && 'hidden',
        )}
      >
        <ul className="py-2 text-sm dark:text-gray-200" aria-labelledby="states-button">
          {options.map((value, idx) => (
            <li key={idx}>
              <button
                type="button"
                className="no-border inline-flex w-full px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
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
