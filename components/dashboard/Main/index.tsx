import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSidebar } from '@/context/dashboard'

export const Main = ({ children }: { children: ReactNode }) => {
  const { isSidebarOpen } = useSidebar()

  return (
    <main
      className={twMerge(
        'flex w-full flex-col overflow-auto bg-gray-100 p-10 dark:bg-gray-600',
        isSidebarOpen ? 'ml-64' : 'ml-16',
      )}
      style={{ transition: 'margin-left .1s ease-in-out', maxWidth: '-webkit-fill-available' }}
    >
      {children}
    </main>
  )
}
