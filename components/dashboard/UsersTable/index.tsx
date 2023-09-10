'use client'

import { useMemo, useState } from 'react'

import { useUsers } from '@/app/(dashboard)/dashboard/users/UsersProvider'
import { PlusIcon } from '@/components/icons'

import { Table } from '../Table'
import { dataRows } from './helpers'
import { useColumns } from './hooks'

export const UsersTable = () => {
  const { users, searchText, handleChangeSearchText, filtersShown, setFiltersShown } = useUsers()

  const [columns, setColumns] = useState(useColumns())
  const rows = useMemo(() => (users ? dataRows(users) : []), [users])

  return (
    <>
      <Table
        columns={columns}
        setColumns={setColumns}
        rows={rows}
        searchText={searchText}
        handleChangeSearchText={handleChangeSearchText}
        filters={[]}
        filtersShown={filtersShown}
        setFiltersShown={setFiltersShown}
        mainActionNode={{
          text: 'Create user',
          Icon: PlusIcon,
          onClick: () => {},
        }}
      />
    </>
  )
}
