'use client'

import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

interface ISidebarContext {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

interface ISidebarProviderProps {
  children: ReactNode
}

const SidebarProvider = (props: ISidebarProviderProps) => {
  const [isSidebarOpen, setSidebar] = useState<boolean>(true)

  const toggleSidebar = () => setSidebar((prev) => !prev)

  const value = useMemo(() => ({ isSidebarOpen, toggleSidebar }), [isSidebarOpen])

  return <SidebarContext.Provider value={value} {...props} />
}

const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

const SidebarContext = createContext<ISidebarContext | undefined>(undefined)

export { SidebarProvider, useSidebar }
