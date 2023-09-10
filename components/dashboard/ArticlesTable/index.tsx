'use client'

import { useMemo, useState } from 'react'

import { useArticles } from '@/app/(dashboard)/dashboard/articles/ArticlesProvider'
import { PlusIcon } from '@/components/icons'
import { DASHBOARD_ROUTES } from '@/consts/routes'

import { Pagination } from '../Pagination'
import { Table } from '../Table'
import { dataRows } from './helpers'
import { useColumns, useFilters } from './hooks'

export const ArticlesTable = () => {
  const { articles, searchText, handleChangeSearchText, filtersShown, setFiltersShown } = useArticles()
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
        mainActionNode={{
          text: 'Create article',
          Icon: PlusIcon,
          href: DASHBOARD_ROUTES.CREATE_ARTICLE,
        }}
      />
      <Pagination options={[10, 20, 50]} />
    </>
  )
}
