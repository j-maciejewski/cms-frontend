'use client'

import { useMemo, useState } from 'react'

import { useUsers } from '@/app/(dashboard)/dashboard/users/UsersProvider'
import { PlusIcon } from '@/components/icons'

import { Pagination } from '../Pagination'
import { Table } from '../Table'
import { UserForm } from './components'
import { dataRows } from './helpers'
import { useColumns } from './hooks'

export const UsersTable = () => {
  const {
    users,
    refetchUsers,
    searchText,
    handleChangeSearchText,
    filtersShown,
    setFiltersShown,
    formDialog,
    setFormDialog,
    formDialogRef,
  } = useUsers()

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
        handleRefetch={refetchUsers}
        mainActionNode={{
          text: 'Create user',
          Icon: PlusIcon,
          onClick: () => setFormDialog({ state: 'open' }),
        }}
      />
      <Pagination options={[10, 20, 50]} />

      <dialog ref={formDialogRef} className="rounded-lg">
        {formDialog.state === 'open' && <UserForm />}
      </dialog>
    </>
  )
}
