'use client'

import { ReactNode, createContext, useContext, useMemo } from 'react'

import { CategoryFragment } from '@/gql/graphql'

interface ICategoriesContext {
  categories: CategoryFragment[]
}

interface ICategoriesProviderProps {
  categories: CategoryFragment[]
  children: ReactNode
}

const CategoriesProvider = (props: ICategoriesProviderProps) => {
  const { categories, ...rest } = props

  const value = useMemo(() => ({ categories }), [categories])

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
