'use client'

import { ChangeEvent, Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

import { CategoriesTableHeadersKeys } from '@/components/dashboard/CategoriesTable/consts'
import { DashboardCategoryFragment } from '@/gql/graphql'

interface ICategoriesContext {
  categories: DashboardCategoryFragment[]
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
}

interface ICategoriesProviderProps {
  categories: DashboardCategoryFragment[]
  children: ReactNode
}

const CategoriesProvider = (props: ICategoriesProviderProps) => {
  const { categories, ...rest } = props

  const [searchText, setSearchText] = useState('')
  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => setSearchText(evt.target.value)

  const [filtersShown, setFiltersShown] = useState(false)

  const indexedColumns = [CategoriesTableHeadersKeys.NAME]

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      indexedColumns.some((column) => {
        return (category[column] as string).toLowerCase().includes(searchText.toLowerCase())
      }),
    )
  }, [searchText, indexedColumns])

  const value = useMemo(
    () => ({ categories: filteredCategories, searchText, handleChangeSearchText, filtersShown, setFiltersShown }),
    [categories, searchText, filtersShown],
  )

  return <CategoriesContext.Provider value={value} {...rest} />
}

const useCategories = () => {
  const context = useContext(CategoriesContext)

  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider')
  }

  return context
}

const CategoriesContext = createContext<ICategoriesContext | undefined>(undefined)

export { CategoriesProvider, useCategories }
