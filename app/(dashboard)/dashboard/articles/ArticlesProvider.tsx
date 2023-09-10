'use client'

import { ChangeEvent, Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react'
import { DashboardArticleInListFragment } from '@/gql/graphql'
import { useGrid } from '@/context/GridProvider'
import { debounce } from 'lodash'

interface IArticlesContext {
  articles: DashboardArticleInListFragment[]
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
}

interface IArticlesProviderProps {
  articles: DashboardArticleInListFragment[]
  children: ReactNode
}

const ArticlesProvider = (props: IArticlesProviderProps) => {
  const { articles, ...rest } = props
  const { grid, handleChange } = useGrid()

  const triggerSearch = (searchValue: string) => {
    const trimmedValue = searchValue.trim()

    if (!trimmedValue) {
      handleChange('fullText', null)
      return
    }

    handleChange('fullText', trimmedValue)
  }

  const handleSearch = useMemo(() => debounce(triggerSearch, 1000), [])

  const [searchText, setSearchText] = useState(grid?.filter?.fullText ?? '')
  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value)
    handleSearch(evt.target.value)
  }

  const [filtersShown, setFiltersShown] = useState(false)

  const value = useMemo(
    () => ({ articles, searchText, handleChangeSearchText, filtersShown, setFiltersShown }),
    [articles, searchText, filtersShown],
  )

  return <ArticlesContext.Provider value={value} {...rest} />
}

const useArticles = () => {
  const context = useContext(ArticlesContext)

  if (context === undefined) {
    throw new Error('useArticles must be used within a ArticlesProvider')
  }

  return context
}

const ArticlesContext = createContext<IArticlesContext | undefined>(undefined)

export { ArticlesProvider, useArticles }
