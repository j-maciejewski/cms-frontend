'use client'

import { useMemo, useState } from 'react'

import { useArticles } from '@/app/(dashboard)/dashboard/articles/ArticlesProvider'
import { PlusIcon } from '@/components/icons'

import { Pagination } from '../Pagination'
import { Table } from '../Table'
import { ArticleForm } from './components/ArticleForm'
import { dataRows } from './helpers'
import { useColumns, useFilters } from './hooks'

export const ArticlesTable = () => {
  const {
    articles,
    refetchArticles,
    searchText,
    handleChangeSearchText,
    filtersShown,
    setFiltersShown,
    formDialog,
    setFormDialog,
    formDialogRef,
  } = useArticles()
  const filters = useFilters()

  const [columns, setColumns] = useState(useColumns())

  const rows = useMemo(() => (articles ? dataRows(articles) : []), [articles])

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
        handleRefetch={refetchArticles}
        mainActionNode={{
          text: 'Create article',
          Icon: PlusIcon,
          onClick: () => setFormDialog({ state: 'open' }),
        }}
      />
      <Pagination options={[10, 20, 50]} />

      <dialog ref={formDialogRef} className="rounded-lg">
        {formDialog.state === 'open' && <ArticleForm />}
      </dialog>
    </>
  )
}
