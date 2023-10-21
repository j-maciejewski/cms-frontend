'use client'

import { useMemo, useState } from 'react'

import { useMessages } from '@/app/(dashboard)/dashboard/inbox/MessagesProvider'

import { Pagination } from '../Pagination'
import { Table } from '../Table'
import { dataRows } from './helpers'
import { useColumns, useFilters } from './hooks'

export const MessagesTable = () => {
  const { messages, refetchMessages, searchText, handleChangeSearchText, filtersShown, setFiltersShown } = useMessages()
  const filters = useFilters()

  const [columns, setColumns] = useState(useColumns())

  const rows = useMemo(() => (messages ? dataRows(messages) : []), [messages])

  return (
    <>
      <Table
        columns={columns}
        setColumns={setColumns}
        rows={rows}
        searchText={searchText}
        handleChangeSearchText={handleChangeSearchText}
        filters={filters}
        filtersShown={filtersShown}
        setFiltersShown={setFiltersShown}
        handleRefetch={refetchMessages}
      />
      <Pagination options={[10, 20, 50]} />
    </>
  )
}
