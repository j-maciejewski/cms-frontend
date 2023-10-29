import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { MagnifierIcon } from '@/components/icons'

import { ActionNode, ColumnsSelector, RefreshDataButton, ToggleFiltersButton } from './components'
import { IActionProps, ITableColumn, ITableFilter, ITableRow } from './types'

interface ITable {
  columns: ITableColumn[]
  setColumns: Dispatch<SetStateAction<ITableColumn[]>>
  rows: ITableRow[]
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filters: ITableFilter[]
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
  handleRefetch?: () => void
  mainActionNode?: IActionProps
}

export const Table = ({
  columns,
  setColumns,
  rows,
  mainActionNode,
  searchText,
  handleChangeSearchText,
  filters,
  filtersShown,
  setFiltersShown,
  handleRefetch,
}: ITable) => {
  const filteredColumns = useMemo(() => columns.filter((column) => !column.isHidden), [columns])

  const toggleColumn = useCallback(
    (key: ITableColumn['key']) => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => (column.key === key ? { ...column, isHidden: !column.isHidden } : column)),
      )
    },
    [setColumns],
  )

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative h-min">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifierIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-80 rounded-lg border border-gray-200 p-2 pl-10 text-sm text-gray-500 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            placeholder="Search for items"
            value={searchText}
            onChange={handleChangeSearchText}
          />
        </div>
        {filters.length > 0 && <ToggleFiltersButton setFiltersShown={setFiltersShown} />}
        <ColumnsSelector columns={columns} toggleColumn={toggleColumn} />
        {handleRefetch !== undefined && <RefreshDataButton handleRefetch={handleRefetch} />}
        {mainActionNode && <ActionNode {...mainActionNode} />}
      </div>
      {filtersShown && (
        <div className="mb-5 grid grid-cols-5 gap-3">
          {filters.map((filter, idx) => (
            <div key={idx} className="w-full">
              <div className="mb-1 text-sm text-gray-500">{filter.label}</div>
              <input className="block w-full rounded-lg border border-gray-200 p-2 text-sm text-gray-900 dark:text-white" />
            </div>
          ))}
        </div>
      )}
      {rows.length > 0 ? (
        <div className="shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {filteredColumns.map((column, idx) => (
                  <th key={idx} scope="col" className={twMerge('px-6 py-3', !column.title && 'w-[1px]')}>
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(even)]:border-b [&>tr:nth-child(even)]:bg-gray-50 [&>tr:nth-child(even)]:dark:bg-gray-700 [&>tr:nth-child(odd)]:border-b [&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(odd)]:dark:bg-gray-800 [&>tr]:dark:border-gray-700">
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {filteredColumns.map((column, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      {column.render ? column.render(row[column.dataIndex]) : row[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex grow items-center justify-center">No results for given query</div>
      )}
    </>
  )
}
