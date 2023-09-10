'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { useCategories } from '@/app/(dashboard)/dashboard/categories/CategoriesProvider'
import { PlusIcon } from '@/components/icons'

import { Table } from '../Table'
import { TextInput } from '../TextInput'
import { dataRows } from './helpers'
import { useColumns } from './hooks'

export const CategoriesTable = () => {
  const { categories, searchText, handleChangeSearchText, filtersShown, setFiltersShown } = useCategories()

  const [columns, setColumns] = useState(useColumns())
  const rows = useMemo(() => (categories ? dataRows(categories) : []), [categories])

  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!modalRef.current) return

      console.log(1)

      const dialogDimensions = modalRef.current.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        if (window.confirm('Are you sure you want to cancel?')) modalRef.current.close()
      }
    }

    modalRef.current?.addEventListener('click', handleClickOutside)

    return () => modalRef.current?.removeEventListener('click', handleClickOutside)
  }, [])

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
          onClick: () => {
            if (modalRef.current) modalRef.current.showModal()
          },
        }}
      />
      <dialog ref={modalRef} className="p-4 rounded-lg">
        <p className="mb-3">Create category</p>
        <div className="mb-5">
          <TextInput
            inputProps={{
              name: 'email',
              onChange: () => {},
              value: '',
              placeholder: 'Enter name...',
            }}
          />
        </div>
        <div>
          <button className="text-sm py-2 px-3">Submit</button>
        </div>
      </dialog>
    </>
  )
}
