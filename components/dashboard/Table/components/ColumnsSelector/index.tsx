import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useOutsideClick } from '@/hooks'

import { ITableColumn } from '../../types'

interface IColumnsSelector {
  columns: ITableColumn[]
  toggleColumn: (key: ITableColumn['key']) => void
}

export const ColumnsSelector = ({ columns, toggleColumn }: IColumnsSelector) => {
  const [isSelectorOpen, setSelector] = useState(false)

  const toggleSelector = () => setSelector((prev) => !prev)
  const closeSelector = () => setSelector(false)

  const selectorWrapperRef = useOutsideClick<HTMLDivElement>(closeSelector)

  return (
    <div ref={selectorWrapperRef} className="relative group">
      <button
        onClick={toggleSelector}
        className="button px-4 py-2 text-sm font-medium text-center inline-flex items-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:text-gray-700 dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Columns
      </button>
      <div
        className={twMerge(
          'z-10 absolute top-[115%] left-[50%] translate-x-[-50%] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700',
          !isSelectorOpen && 'hidden',
        )}
      >
        <ul className="flex flex-col gap-1 py-2 text-sm dark:text-gray-200">
          {columns
            .filter((column) => column.title)
            .map((column, idx) => (
              <li key={idx} className="flex items-center px-3">
                <input
                  type="checkbox"
                  className="inline-flex mr-1 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  checked={!column.isHidden}
                  onChange={() => toggleColumn(column.key)}
                />
                {column.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
