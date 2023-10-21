'use client'

import { useMemo, useState } from 'react'

import { useCategories } from '@/app/(dashboard)/dashboard/categories/CategoriesProvider'
import { PlusIcon } from '@/components/icons'

import { Pagination } from '../Pagination'
import { Table } from '../Table'
import { CategoryForm } from './components'
import { dataRows } from './helpers'
import { useColumns } from './hooks'

export const CategoriesTable = () => {
  const {
    categories,
    refetchCategories,
    searchText,
    handleChangeSearchText,
    filtersShown,
    setFiltersShown,
    formDialog,
    setFormDialog,
    formDialogRef,
  } = useCategories()

  const [columns, setColumns] = useState(useColumns())
  const rows = useMemo(() => (categories ? dataRows(categories) : []), [categories])

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
        handleRefetch={refetchCategories}
        mainActionNode={{
          text: 'Create category',
          Icon: PlusIcon,
          onClick: () => setFormDialog({ state: 'open' }),
        }}
      />
      <Pagination />

      <dialog ref={formDialogRef} className="rounded-lg">
        {formDialog.state === 'open' && <CategoryForm />}
      </dialog>
    </>
  )
}
