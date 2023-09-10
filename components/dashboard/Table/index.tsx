import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo } from 'react'

import { MagnifierIcon } from '@/components/icons'

import { ActionNode, ColumnsSelector, ToggleFiltersButton } from './components'
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
  mainActionNode?: IActionProps
}

export const Table = (
  {
    columns,
    setColumns,
    rows,
    mainActionNode,
    searchText,
    handleChangeSearchText,
    filters,
    filtersShown,
    setFiltersShown,
  }: ITable,
) => {
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
      <div className="flex gap-3 mb-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifierIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 dark:text-white"
            placeholder="Search for items"
            value={searchText}
            onChange={handleChangeSearchText}
          />
        </div>
        {filters.length > 0 && <ToggleFiltersButton setFiltersShown={setFiltersShown} />}
        <ColumnsSelector columns={columns} toggleColumn={toggleColumn} />
        <div className="grow" />
        {mainActionNode && <ActionNode {...mainActionNode} />}
      </div>
      {filtersShown && (
        <div className="grid grid-cols-5 gap-3 mb-5">
          {filters.map((filter, idx) => (
            <div key={idx} className="w-full">
              <div className="mb-1 text-gray-500 text-sm">{filter.label}</div>
              <input className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-full dark:text-white" />
            </div>
          ))}
        </div>
      )}
      {rows.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {filteredColumns.map((column, idx) => (
                  <th key={idx} scope="col" className="px-6 py-3">
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(odd)]:border-b [&>tr:nth-child(odd)]:dark:bg-gray-800 [&>tr:nth-child(even)]:border-b [&>tr:nth-child(even)]:bg-gray-50 [&>tr:nth-child(even)]:dark:bg-gray-700 [&>tr]:dark:border-gray-700">
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
        <div className="flex grow justify-center items-center">No results for given query</div>
      )}
    </>
  )
}
