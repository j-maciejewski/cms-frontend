'use client'

import client from '@/apollo-client'
import { CategoriesQuery } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { useQuery } from '@apollo/client'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

type Category = { id: string; name: string; slug: string }

interface ICategoriesContext {
  categories: Category[]
  refetch: () => void
}

interface ICategoriesProviderProps {
  children: ReactNode
}

const CategoriesProvider = (props: ICategoriesProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([])

  const { data, error, refetch } = useQuery<CategoriesQuery>(dashboardQueries.CATEGORIES, { client })

  useEffect(() => {
    ;(async () => {
      if (error) throw new Error('Error')

      const categories = data?.categories ?? []

      setCategories(categories.map((cat) => ({ id: cat.id, name: cat.name, slug: cat.slug })))
    })()
  }, [data, error])

  const value = useMemo(() => ({ categories, refetch }), [categories, refetch])

  return <CategoriesContext.Provider value={value} {...props} />
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
