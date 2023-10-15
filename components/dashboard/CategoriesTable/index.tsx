'use client'

import { useMemo, useRef, useState } from 'react'

import { useCategories } from '@/app/(dashboard)/dashboard/categories/CategoriesProvider'
import { PlusIcon } from '@/components/icons'

import { Table } from '../Table'
import { CategoryForm } from './components'
import { dataRows } from './helpers'
import { useColumns } from './hooks'

export const CategoriesTable = () => {
  const {
    categories,
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

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (!modalRef.current) return

  //     const dialogDimensions = modalRef.current.getBoundingClientRect()
  //     if (
  //       e.clientX < dialogDimensions.left ||
  //       e.clientX > dialogDimensions.right ||
  //       e.clientY < dialogDimensions.top ||
  //       e.clientY > dialogDimensions.bottom
  //     ) {
  //       if (window.confirm('Are you sure you want to cancel?')) modalRef.current.close()
  //     }
  //   }

  //   modalRef.current?.addEventListener('click', handleClickOutside)

  //   return () => modalRef.current?.removeEventListener('click', handleClickOutside)
  // }, [])

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
          text: 'Create category',
          Icon: PlusIcon,
          onClick: () => setFormDialog({ state: 'open' }),
        }}
      />

      <dialog ref={formDialogRef} className="rounded-lg">
        {formDialog.state === 'open' && <CategoryForm />}
      </dialog>
    </>
  )
}
