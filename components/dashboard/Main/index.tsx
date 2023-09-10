import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSidebar } from '@/context/SidebarProvider'

export const Main = ({ children }: { children: ReactNode }) => {
  const { isSidebarOpen } = useSidebar()

  return (
    <main
      className={twMerge('flex flex-col p-10 w-full bg-gray-100 dark:bg-gray-600', isSidebarOpen ? 'ml-64' : 'ml-16')}
      style={{ transition: 'margin-left .1s ease-in-out', maxWidth: '-webkit-fill-available' }}
    >
      {children}
    </main>
  )
}
