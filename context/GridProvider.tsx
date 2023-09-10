'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

interface IGridContext<T> {
  grid: T
  currentItems: number
  totalItems: number
  handleChange: (key: keyof T, value: unknown) => void
}

interface IGridProviderProps<T> {
  grid: T
  currentItems: number
  totalItems: number
  children: ReactNode
}

const GridProvider = <GridInput,>(props: IGridProviderProps<GridInput>) => {
  const { grid: initialGrid, totalItems, currentItems, ...rest } = props
  const router = useRouter()
  const pathname = usePathname()

  const [grid, setGrid] = useState<GridInput>(initialGrid)

  const handleChange = (key: keyof GridInput, value: GridInput[keyof GridInput]) => {
    setGrid((prev) => {
      const newGrid = { ...prev }

      if (value) newGrid[key] = value
      else delete newGrid[key]

      return newGrid
    })
  }

  useEffect(() => {
    if (JSON.stringify(grid) !== JSON.stringify(initialGrid)) {
      const path = `${pathname}${
        Object.keys(grid).length > 0
          ? `?${Object.entries(grid)
              .map(([key, value]) => `${key}=${value}`)
              .join('&')}`
          : ''
      }`

      router.push(path, { scroll: false })
    }
  }, [grid])

  const value = useMemo(() => ({ grid, totalItems, currentItems, handleChange }), [grid])

  return <GridContext.Provider value={value} {...rest} />
}

const useGrid = () => {
  const context = useContext(GridContext)

  if (context === undefined) {
    throw new Error('useGrid must be used within a GridProvider')
  }

  return context
}

const GridContext = createContext<IGridContext<GridInput> | undefined>(undefined)

export { GridProvider, useGrid }
