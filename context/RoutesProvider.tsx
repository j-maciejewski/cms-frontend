'use client'

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useCategories } from './CategoriesProvider'

type Route = { name: string; path: string }

interface IRoutesContext {
  routes: Route[]
}

interface IRoutesProviderProps {
  children: ReactNode
}

const RoutesProvider = (props: IRoutesProviderProps) => {
  const { categories } = useCategories()
  const [routes, setRoutes] = useState<Route[]>([])

  useEffect(() => {
    setRoutes([
      { name: 'Home', path: '/' },
      ...categories.map((cat) => ({ name: cat.name, path: `/category/${cat.slug}` })),
    ])
  }, [categories])

  const value = useMemo(() => ({ routes }), [routes])

  return <RoutesContext.Provider value={value} {...props} />
}

const useRoutes = () => {
  const context = useContext(RoutesContext)

  if (context === undefined) {
    throw new Error('useRoutes must be used within a RoutesProvider')
  }

  return context
}

const RoutesContext = createContext<IRoutesContext | undefined>(undefined)

export { RoutesProvider, useRoutes }
