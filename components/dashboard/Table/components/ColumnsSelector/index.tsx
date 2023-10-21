import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ColumnsIcon } from '@/components/icons'
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
    <div ref={selectorWrapperRef} className="group relative">
      <button
        onClick={toggleSelector}
        className="button inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
      >
        Columns
        <ColumnsIcon className="ml-2 h-3 w-3" />
      </button>
      <div
        className={twMerge(
          'absolute left-[50%] top-[115%] z-10 translate-x-[-50%] divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700',
          !isSelectorOpen && 'hidden',
        )}
      >
        <ul className="flex flex-col gap-1 py-2 text-sm dark:text-gray-200">
          {columns
            .filter((column) => column.title)
            .map((column, idx) => (
              <li key={idx} className="flex items-center whitespace-nowrap px-3">
                <input
                  type="checkbox"
                  className="mr-1 inline-flex hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
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
