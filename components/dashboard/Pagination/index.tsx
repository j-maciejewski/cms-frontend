import { twMerge } from 'tailwind-merge'

import { useGrid } from '@/context/GridProvider'
import { calcPagination } from '@/utils'

import { ItemsPerPageSelect } from '../ItemsPerPageSelect'

const PaginationItem = (
  {
    text,
    active,
    disabled,
    handleClick,
  }: {
    text: string
    active?: boolean
    disabled?: boolean
    handleClick?: () => void
  },
) => {
  return (
    <li>
      <button
        className={twMerge(
          'flex items-center justify-center px-3 h-10 min-w-[40px] leading-tight',
          active
            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-white'
            : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
        )}
        disabled={active || disabled}
        onClick={handleClick}
      >
        {disabled ? '...' : text}
      </button>
    </li>
  )
}

export const Pagination = ({ options }: { options: number[] }) => {
  const { grid, currentItems, totalItems, handleChange } = useGrid()

  const activePage = grid.page ? parseInt(grid.page) : 1
  const itemsPerPage = grid.limit ? parseInt(grid.limit) : 10

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const { current, prev, next, items } = calcPagination(activePage, totalPages)

  const onPageChange = (value: number | null) => () => {
    if (value === null) return

    handleChange('page', value)
  }

  return (
    <nav className="flex items-center justify-between pt-4 gap-3" aria-label="Table navigation">
      <span className="mr-auto text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(activePage - 1) * itemsPerPage + 1} - {Math.min(activePage * itemsPerPage, totalItems)}
        </span>{' '}
        of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
      </span>
      {totalPages !== 1 && (
        <ul className="inline-flex -space-x-px text-sm [&>li:first-child_button]:rounded-l-lg [&>li:last-child_button]:rounded-r-lg">
          {prev && <PaginationItem text="Previous" handleClick={onPageChange(prev)} />}
          {items.map((page) => (
            <PaginationItem
              key={page}
              text={String(page)}
              disabled={page === null}
              active={page === current}
              handleClick={onPageChange(page)}
            />
          ))}
          {next && <PaginationItem text="Next" handleClick={onPageChange(next)} />}
        </ul>
      )}
      <ItemsPerPageSelect options={options} />
    </nav>
  )
}
