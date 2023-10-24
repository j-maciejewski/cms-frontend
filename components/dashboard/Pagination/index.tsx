import { twMerge } from 'tailwind-merge'

import { useGrid } from '@/context/dashboard'
import { calcPagination } from '@/utils'

import { ItemsPerPageSelect } from '../ItemsPerPageSelect'

const PaginationItem = ({
  text,
  active,
  disabled,
  handleClick,
}: {
  text: string
  active?: boolean
  disabled?: boolean
  handleClick?: () => void
}) => {
  return (
    <li>
      <button
        className={twMerge(
          'flex h-10 min-w-[40px] items-center justify-center border border-gray-200 bg-white px-3 leading-tight dark:border-gray-500 dark:bg-gray-700',
          active ? 'dark:bg-gray-800' : 'dark:bg-gray-700',
          (disabled || active) && 'opacity-70 dark:text-gray-500',
          !disabled &&
            !active &&
            'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white',
        )}
        disabled={active || disabled}
        onClick={handleClick}
      >
        {text}
      </button>
    </li>
  )
}

export const Pagination = ({ options }: { options?: number[] }) => {
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
    <nav className="flex items-center justify-between gap-3 pt-4" aria-label="Table navigation">
      <span className="mr-auto text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(activePage - 1) * itemsPerPage + 1} - {Math.min(activePage * itemsPerPage, totalItems)}
        </span>{' '}
        of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
      </span>
      {totalPages !== 1 && (
        <ul className="inline-flex -space-x-px text-sm [&>li:first-child_button]:rounded-l-lg [&>li:last-child_button]:rounded-r-lg">
          <PaginationItem text="Previous" handleClick={onPageChange(prev)} disabled={prev === null} />
          {items.map((page) => (
            <PaginationItem
              key={page}
              text={page !== null ? String(page) : '...'}
              disabled={page === null}
              active={page === current}
              handleClick={onPageChange(page)}
            />
          ))}
          <PaginationItem text="Next" handleClick={onPageChange(next)} disabled={next === null} />
        </ul>
      )}
      {options && <ItemsPerPageSelect options={options} />}
    </nav>
  )
}
